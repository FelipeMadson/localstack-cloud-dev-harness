import type { S3Object } from './types.ts';

export class S3Bucket {
  readonly name: string;
  private objects = new Map<string, S3Object>();

  constructor(name: string) {
    this.name = name;
  }

  putObject(key: string, data: Buffer | string, contentType = 'application/octet-stream'): void {
    const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
    this.objects.set(key, {
      key,
      data: buf,
      contentType,
      updatedAt: Date.now()
    });
  }

  getObject(key: string): S3Object | undefined {
    const obj = this.objects.get(key);
    return obj ? { ...obj, data: Buffer.from(obj.data) } : undefined;
  }

  deleteObject(key: string): boolean {
    return this.objects.delete(key);
  }

  listObjects(prefix = ''): S3Object[] {
    return Array.from(this.objects.values())
      .filter(o => o.key.startsWith(prefix))
      .map(o => ({ ...o }));
  }
}

export class S3Mock {
  private buckets = new Map<string, S3Bucket>();

  createBucket(name: string): S3Bucket {
    const b = new S3Bucket(name);
    this.buckets.set(name, b);
    return b;
  }

  getBucket(name: string): S3Bucket | undefined {
    return this.buckets.get(name);
  }
}
