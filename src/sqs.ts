import type { SqsMessage } from './types.ts';

export interface SqsQueueOptions {
  visibilityTimeoutMs?: number;
  maxReceives?: number;
  deadLetterQueue?: SqsQueue;
}

export class SqsQueue {
  readonly name: string;
  private messages: SqsMessage[] = [];
  private options: Required<Omit<SqsQueueOptions, 'deadLetterQueue'>> & { deadLetterQueue?: SqsQueue };

  constructor(name: string, options: SqsQueueOptions = {}) {
    this.name = name;
    this.options = {
      visibilityTimeoutMs: options.visibilityTimeoutMs ?? 30000,
      maxReceives: options.maxReceives ?? 3,
      deadLetterQueue: options.deadLetterQueue
    };
  }

  sendMessage(body: string): SqsMessage {
    const msg: SqsMessage = {
      id: 'msg_' + Math.random().toString(36).substring(2, 10),
      body,
      receiptHandle: 'rh_' + Math.random().toString(36).substring(2, 12),
      receiveCount: 0,
      visibleAt: Date.now(),
      sentAt: Date.now()
    };
    this.messages.push(msg);
    return msg;
  }

  receiveMessages(maxCount = 1): SqsMessage[] {
    const now = Date.now();
    const result: SqsMessage[] = [];

    for (let i = 0; i < this.messages.length && result.length < maxCount; i++) {
      const msg = this.messages[i];
      if (msg.visibleAt <= now) {
        msg.receiveCount++;
        if (msg.receiveCount > this.options.maxReceives && this.options.deadLetterQueue) {
          this.options.deadLetterQueue.sendMessage(msg.body);
          this.messages.splice(i, 1);
          i--;
          continue;
        }

        msg.visibleAt = now + this.options.visibilityTimeoutMs;
        msg.receiptHandle = 'rh_' + Math.random().toString(36).substring(2, 12);
        result.push({ ...msg });
      }
    }

    return result;
  }

  deleteMessage(receiptHandle: string): boolean {
    const idx = this.messages.findIndex(m => m.receiptHandle === receiptHandle);
    if (idx !== -1) {
      this.messages.splice(idx, 1);
      return true;
    }
    return false;
  }

  depth(): number {
    return this.messages.length;
  }
}

export class SqsMock {
  private queues = new Map<string, SqsQueue>();

  createQueue(name: string, options?: SqsQueueOptions): SqsQueue {
    const q = new SqsQueue(name, options);
    this.queues.set(name, q);
    return q;
  }

  getQueue(name: string): SqsQueue | undefined {
    return this.queues.get(name);
  }
}
