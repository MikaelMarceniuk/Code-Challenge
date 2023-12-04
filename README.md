# Code Challenge

## Proposito do projeto

Demonstrar minhas habilidades e fluencia no desenvolvimento de APIs em NodeJS

## Descrição Geral do Projeto:

O projeto consiste em uma API que implementa operações CRUD (Create, Read, Update, Delete) para uma entidade fictícia denominada "Product". Todo o desenvolvimento aderiu rigorosamente aos princípios de Clean Code, visando manter o código claro, legível e facilmente mantido ao longo do tempo. Além disso, a arquitetura do projeto segue os princípios de Dependency Injection Design Pattern para promover a modularidade e a flexibilidade.

## Features

- CRUD de Produtos
- Testes automatizados end to end (Por enquanto)
- Gracefully stop: A aplicação implementa um processo de encerramento que opera de forma elegante em caso de ocorrer um erro não tratado. Esse procedimento assegura uma terminação controlada, encerrando de maneira ordenada as conexões e requisições que ainda estão em andamento antes de concluir o processo de encerramento.
- Tratamento de erros nao operacionais e operacionais

## Requisitos e Dependências:

Certifique-se de ter Node.js instalado (versão 18.18.2) e uma conexao com um bando de dados MongoDb.

## Instalação

Clone o repositório e execute o seguinte comando para instalar as dependências:

```sh
yarn install
```

## Configuração ambiente local:

Configure as variáveis de ambiente necessárias no arquivo .env seguindo o modelo fornecido no arquivo .env.example. Certifique-se de ajustar as configurações do banco de dados e outras variáveis conforme necessário.
Apos as configuracoes, execute o comando

```sh
yarn start:dev
```

## Estrutura do Código:

- /src: Contém o código-fonte principal.
- /src/db: Contem configuracao para Banco de Dados
- /src/enum: Contem arquivos Enum
- /src/middlewares: Contem middlewares utilizados na aplicacao
- /src/models: Define os modelos de dados da entidade "Product".
- /src/repository: Camada da aplicacao responsavel por fazer requisicoes no banco de dados, separado por models
- /src/resources: Conjunto de controllers e services de cada model
- /src/resources/controller: Camada da Aplicacao responsavel por receber requisicoes e retornar uma resposta para o cliente
- /src/resources/service: Camada da aplicacao responsavel por implementa a lógica de negócios.
- /src/types: Define interfaces e types utilizados na aplicacao
- /src/utils: Contem utilidades que e utilizado em toda a aplicacao

## API

A API oferece endpoints RESTful para realizar operações CRUD na entidade "Product", seguindo os princípios de Clean Code e Dependency Injection Design Pattern.

### Listar Produtos

**Endpoint:**

```http
GET /api/product
```

**Descrição:**
Retorna a lista completa de produtos salvos no banco de dados

**Query Params:**
Essa rota tambem contempla os seguintes filtros:

- price: number
- priceCondition: 'gt' (Maior que) | 'gte' (Maior igual que) | 'lt' (Menor que) | 'lte' (Menor igual que)
- description: string

**Exemplos utilizando os filtros**
Pegar todos os produtos com preco maior que 9.99

```http
GET /api/product?price=9.99&priceCondition=gt
```

Pegar todos os produtos que possuem "Jeans" na descricao

```http
GET /api/product?description=Jeans
```

Pegar todos os produtos que possuem "Alta qualidade" na descricao com preco maior e igual que 39.99

```http
GET /api/product?price=39.99&priceCondition=gte&description=Alta%20qualidade
```

### Listar produto por id

**Endpoint:**

```http
GET /api/product/:productId
```

**Descrição:**
Retorna um produto específico com base no ID fornecido.

### Criar produto

**Endpoint:**

```http
POST /api/products
```

**Descrição:**
Cria um novo produto com base nos dados fornecidos no corpo da solicitação.

**JSON esperado no body da requisicao**

```json
{
    "name": "string",
    "description": "string",
    "price": number
}
```

### Atualizar produto

**Endpoint:**

```http
PUT /api/products/:productId
```

**Descrição:**
Atualiza um produto existente com base no ID fornecido e nos dados fornecidos no corpo da solicitação.

**JSON esperado no body da requisicao**

```json
{
    "name"?: "string",
    "description"?: "string",
    "price"?: number
}
```

### Excluir produto

**Endpoint:**

```http
DELETE /api/products/:productId
```

**Descrição:**
Exclui um produto existente com base no ID fornecido.

## Testes

O projeto inclui por enquanto testes end to end para garantir a robustez da API inteira em varios fluxos.

### Configuracao

Por enquanto os testes utiliza as mesmas credenciais do .env para poder conectar ao banco de dados. Para uma sessao de testes bem feita e necessario ter um banco de dados limpo, para que os testes seren executados da forma q foram programadas. Em uma versao futura, os testes serao rodados em um banco de dados em memoria, para assegurar que todos os testes serao feitos em um novo banco de dados e tambem facilitar fluxos de CI/CD.

### Executando testes unitarios

Execute os testes usando o comando:

```sh
yarn test:end2end
```
