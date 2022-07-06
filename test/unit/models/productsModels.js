const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Procura todos os produtos', () => {
  
  before(() => {
    const execute = [[{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    },
    {
      id: 2,
      name: "Traje de encolhimento",
      quantity: 20
    }]];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um array', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.a('array');
    });

    it('de objetos com "id", "name" e "quantity"', async () => {
      const response = await productsModel.getAll();

      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');
    });

  })
})

describe('Procura produto pelo id', () => {
  const productId = 1;
  
  before(() => {
    const execute = [[{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    }]];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await productsModel.find(productId);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsModel.find(productId);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

  })
})

describe('Procura produto pelo name', () => {
  const name = "Martelo de Thor";
  
  before(() => {
    const execute = [[{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    }]];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await productsModel.findName(name);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsModel.findName(name);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

  })
})

describe('Cria produtos no DB', () => {
  const name = 'algo';
  const quantity = 2;
  
  before(() => {
    const execute = [{
      insertId: 1,
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await productsModel.create(name, quantity);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsModel.create(name, quantity);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

  })
})

describe('Edita produtos no DB', () => {
  const id = 1;
  const name = 'algo';
  const quantity = 2;
  
  before(() => {
    const execute = [{
      affectedRows: 1,
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await productsModel.edit(id, name, quantity);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsModel.edit(id, name, quantity);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

  })
})

describe('Deleta produtos no DB', () => {
  const id = 1;
  
  before(() => {
    const execute = [{
      affectedRows: 1,
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await productsModel.erase(id);

      expect(response).to.be.a('object');
    });

    it('com a propriedade "id"', async () => {
      const response = await productsModel.erase(id);

      expect(response).to.have.a.property('id');
    });

  })
})