import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { LocalCloudHarness } from '../src/index.ts';

describe('LocalCloudHarness', () => {
  it('gerencia dados em tabela DynamoDB em memória', () => {
    const harness = new LocalCloudHarness();
    const table = harness.dynamo.createTable('Products', 'sku');

    table.putItem({ sku: 'PROD-01', name: 'Notebook', price: 3499.00 });
    const item = table.getItem('PROD-01');

    assert.ok(item);
    assert.equal(item.name, 'Notebook');
    assert.equal(item.price, 3499.00);

    const deleted = table.deleteItem('PROD-01');
    assert.equal(deleted, true);
    assert.equal(table.getItem('PROD-01'), undefined);
  });

  it('gerencia ciclo SQS com visibilidade e encaminhamento DLQ', () => {
    const harness = new LocalCloudHarness();
    const dlq = harness.sqs.createQueue('dead-letter');
    const queue = harness.sqs.createQueue('orders', {
      maxReceives: 2,
      deadLetterQueue: dlq,
      visibilityTimeoutMs: -100
    });

    queue.sendMessage('order_1001');
    assert.equal(queue.depth(), 1);

    const r1 = queue.receiveMessages(1);
    assert.equal(r1.length, 1);
    assert.equal(r1[0].receiveCount, 1);

    const r2 = queue.receiveMessages(1);
    assert.equal(r2.length, 1);
    assert.equal(r2[0].receiveCount, 2);

    const r3 = queue.receiveMessages(1);
    assert.equal(r3.length, 0);
    assert.equal(queue.depth(), 0);
    assert.equal(dlq.depth(), 1);

    const dlqMsgs = dlq.receiveMessages(1);
    assert.equal(dlqMsgs[0].body, 'order_1001');
  });

  it('gerencia armazenamento de objetos no S3 mock com prefixos', () => {
    const harness = new LocalCloudHarness();
    const bucket = harness.s3.createBucket('assets');

    bucket.putObject('images/logo.png', Buffer.from('PNG_CONTENT'), 'image/png');
    bucket.putObject('images/banner.jpg', Buffer.from('JPG_CONTENT'), 'image/jpeg');
    bucket.putObject('docs/readme.txt', 'Hello World', 'text/plain');

    const images = bucket.listObjects('images/');
    assert.equal(images.length, 2);

    const logo = bucket.getObject('images/logo.png');
    assert.ok(logo);
    assert.equal(logo.data.toString(), 'PNG_CONTENT');
    assert.equal(logo.contentType, 'image/png');
  });
});
