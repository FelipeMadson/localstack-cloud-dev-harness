# LocalStack Cloud Development Harness

Harness de emulação e testes para AWS offline, proporcionando simulação em memória de DynamoDB, SQS e S3 com alta fidelidade para integração contínua e desenvolvimento local.

[![CI](https://github.com/FelipeMadson/localstack-cloud-dev-harness/actions/workflows/ci.yml/badge.svg)](https://github.com/FelipeMadson/localstack-cloud-dev-harness/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*Read this in [English](README.md).*

---

## Funcionalidades

- **Emulador DynamoDB**: Chaves de partição e ordenação, inserções condicionais e buscas atômicas em memória.
- **Emulador SQS**: Suporte a filas FIFO e padrão, ocultação por visibilidade temporária (visibility timeout) e encaminhamento para Dead-Letter Queue (DLQ).
- **Emulador S3**: Armazenamento de buffers, prefixos de busca hierárquicos e controle de objetos.
- **Execução Ultrarrápida**: Roda nativamente no Node.js sem demandar contêineres pesados para testes unitários.

---

## Licença

MIT © [Felipe Madson](https://github.com/FelipeMadson)
