export interface DynamoItem {
  [key: string]: unknown;
}

export interface SqsMessage {
  id: string;
  body: string;
  receiptHandle: string;
  receiveCount: number;
  visibleAt: number;
  sentAt: number;
}

export interface S3Object {
  key: string;
  data: Buffer;
  contentType: string;
  updatedAt: number;
}
