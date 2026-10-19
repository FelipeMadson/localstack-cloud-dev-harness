import type { DynamoItem } from './types.ts';

export class DynamoTable {
  readonly name: string;
  readonly partitionKey: string;
  private items = new Map<string, DynamoItem>();

  constructor(name: string, partitionKey: string) {
    this.name = name;
    this.partitionKey = partitionKey;
  }

  putItem(item: DynamoItem): void {
    const keyVal = String(item[this.partitionKey]);
    if (!keyVal) throw new Error(`Item ausente da partição: ${this.partitionKey}`);
    this.items.set(keyVal, { ...item });
  }

  getItem(key: string): DynamoItem | undefined {
    const it = this.items.get(key);
    return it ? { ...it } : undefined;
  }

  deleteItem(key: string): boolean {
    return this.items.delete(key);
  }

  scan(): DynamoItem[] {
    return Array.from(this.items.values()).map(i => ({ ...i }));
  }
}

export class DynamoMock {
  private tables = new Map<string, DynamoTable>();

  createTable(name: string, partitionKey: string): DynamoTable {
    const table = new DynamoTable(name, partitionKey);
    this.tables.set(name, table);
    return table;
  }

  getTable(name: string): DynamoTable | undefined {
    return this.tables.get(name);
  }
}
