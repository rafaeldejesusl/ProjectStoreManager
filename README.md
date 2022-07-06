Este repositório contém um projeto desenvolvido enquanto pessoa estudante da @betrybe.

---


#  O que foi desenvolvido<br />

  Uma API utilizando a arquitetura MSC (model-service-controller)!

  A API construída é um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar produtos e vendas.

  Utiliza o banco MySQL para a gestão de dados. Além disso, a API é RESTful.

  <br />


# Funcionalidades
<br />

  - A pessoa usuária, independente de cadastro ou login, deve conseguir:

    - Adicionar, ler, deletar e atualizar produtos no estoque;

    - Enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe;

    - Ler, deletar e atualizar venda.

  - Para **todos os endpoints** garanta que:

    - Caso o recurso **não seja encontrado**, **aconteça um erro** ou **haja dados inválidos** na sua requisição, sua API deve retornar o status HTTP adequado com o body `{ message: <mensagem de erro> }`;

    - Todos os retornos de erro devem seguir o mesmo formato.

   <br />
 </details>

# Rodando a aplicação
<br />

  ## Com Docker

  > Apoś clonar o repositório, rode os serviços `node` e `db` com o comando `docker-compose up -d`.

  > Use o comando `docker exec -it store_manager bash`.

  > Instale as dependências [**Caso existam**] com `npm install`.

  > Use o comando `npm start` para rodar a aplicação.

  > Use o comando `npm test:mocha` para rodar os testes (Testes unitários cobrindo 100% da aplicação).


# Detalhes
<br />

Todos os endpoints estão no padrão REST

  - Usa os verbos HTTP adequados para cada operação;

  - Agrupa e padroniza as URLs em cada recurso;

  - Garante que os endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não;

  - E retorna os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

  <br />

