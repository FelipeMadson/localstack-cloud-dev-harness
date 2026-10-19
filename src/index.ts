export * from './types.ts';
export * from './dynamo.ts';
export * from './sqs.ts';
export * from './s3.ts';

import { DynamoMock } from './dynamo.ts';
import { SqsMock } from './sqs.ts';
import { S3Mock } from './s3.ts';

export class LocalCloudHarness {
  readonly dynamo = new DynamoMock();
  readonly sqs = new SqsMock();
  readonly s3 = new S3Mock();
}
