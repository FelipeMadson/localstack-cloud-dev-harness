# LocalStack Cloud Development Harness

Deterministic, in-memory AWS emulation harness for offline integration testing, developer workspaces, and rapid CI verification of DynamoDB, SQS, and S3 interactions.

[![CI](https://github.com/FelipeMadson/localstack-cloud-dev-harness/actions/workflows/ci.yml/badge.svg)](https://github.com/FelipeMadson/localstack-cloud-dev-harness/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*Read this in [Português](README.pt-BR.md).*

---

## Capabilities

- **DynamoDB Mock**: Partition and sort key indexation, conditional puts, key-value lookup, and batch operations.
- **SQS FIFO & Standard Emulation**: Queue lifecycle, message receipt handles, visibility timeout hiding, and Dead-Letter Queue (DLQ) redirection on max receive count.
- **S3 Object Store**: Bucket creation, byte storage, key prefix filtering, and object deletion.
- **Zero Heavy Runtimes**: Runs directly in Node.js without requiring Docker or Python daemons for unit/integration suites.

---

## Installation & Testing

```bash
git clone https://github.com/FelipeMadson/localstack-cloud-dev-harness.git
cd localstack-cloud-dev-harness
npm test
```

## License

MIT © [Felipe Madison](https://github.com/FelipeMadson)
