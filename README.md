## AWS Amplify Angular.js Starter Template

This repository provides a starter template for creating applications using Angular.js and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

This template equips you with a foundational Angular.js application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/angular/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/joaopelegrino/amplify-caas.git
cd amplify-caas
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo de template
cp src/environments/environment.template.ts src/environments/environment.ts
cp src/environments/environment.template.ts src/environments/environment.prod.ts

# Edite os arquivos e adicione sua chave API do Gemini
```

4. Execute o projeto:
```bash
npm start
```

## Funcionalidades

- Análise de conteúdo médico com IA
- Geração de artigos científicos
- Busca automática de referências
- Validação de informações profissionais

## Tecnologias

- Angular 17
- AWS Amplify
- Google Gemini AI
- TypeScript

## Contribuindo

1. Crie uma branch para sua feature:
```bash
git checkout -b feature/nome-da-feature
```

2. Faça suas alterações e commit:
```bash
git commit -m "feat: descrição da sua feature"
```

3. Push para o repositório:
```bash
git push origin feature/nome-da-feature
```

4. Abra um Pull Request

## Importante

- Nunca comite arquivos de ambiente (.env, environment.ts, environment.prod.ts)
- Mantenha as chaves de API seguras
- Siga o padrão de commits convencional