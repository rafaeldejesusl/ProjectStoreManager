const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Procura todas as vendas', () => {
  
  before(() => {
    const execute = [[{
      sale_id: 1,
      date: "2021-09-09 00:45:23",
      product_id: 1,
      quantity: 5,
    },
    {
      sale_id: 2,
      date: "2021-09-09 00:45:23",
      product_id: 2,
      quantity: 10,
    }]];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um array', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.a('array');
    });

    it('de objetos com "saleId", "date", "productId" e "quantity"', async () => {
      const response = await salesModel.getAll();

      expect(response[0]).to.have.a.property('saleId');
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');
    });

  })
})

describe('Procura venda pelo id', () => {
  const saleId = 1;
  
  before(() => {
    const execute = [[{
      date: "2021-09-09 00:45:23",
      product_id: 1,
      quantity: 5,
    },
    {
      date: "2021-09-09 00:45:23",
      product_id: 2,
      quantity: 10,
    }]];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um array', async () => {
      const response = await salesModel.find(saleId);

      expect(response).to.be.a('array');
    });

    it('de objetos com "date", "productId" e "quantity"', async () => {
      const response = await salesModel.find(saleId);

      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');
    });

  })
})

describe('Cria vendas no DB sales', () => {
  
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
      const response = await salesModel.create();

      expect(response).to.be.a('object');
    });

    it('com a propriedade "id"', async () => {
      const response = await salesModel.create();

      expect(response).to.have.a.property('id');
    });

  })
})

describe('Cria vendas no DB sales_products', () => {
  const id = 1;
  const product_id = 1;
  const quantity = 5;
  
  before(() => {
    const execute = [{
      affectedRow: 1,
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await salesModel.createSP(id, product_id, quantity);

      expect(response).to.be.a('object');
    });

    it('com propriedades "productId" e "quantity"', async () => {
      const response = await salesModel.createSP(id, product_id, quantity);

      expect(response).to.have.a.property('productId');
      expect(response).to.have.a.property('quantity');
    });

  })
})

describe('Atualiza vendas no DB sales_products', () => {
  const id = 1;
  const product_id = 1;
  const quantity = 5;
  
  before(() => {
    const execute = [{
      affectedRow: 1,
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await salesModel.updateSP(id, product_id, quantity);

      expect(response).to.be.a('object');
    });

    it('com propriedades "productId" e "quantity"', async () => {
      const response = await salesModel.updateSP(id, product_id, quantity);

      expect(response).to.have.a.property('productId');
      expect(response).to.have.a.property('quantity');
    });

  })
})

describe('Deleta vendas no DB sales_products', () => {
  const id = 1;
  
  before(() => {
    const execute = [{
      affectedRow: 1,
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await salesModel.eraseSP(id);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id"', async () => {
      const response = await salesModel.eraseSP(id);

      expect(response).to.have.a.property('id');
    });

  })
})

describe('Deleta vendas no DB sales', () => {
  const id = 1;
  
  before(() => {
    const execute = [{
      affectedRow: 1,
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await salesModel.erase(id);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id"', async () => {
      const response = await salesModel.erase(id);

      expect(response).to.have.a.property('id');
    });

  })
})

describe('Retorna produtos no DB sales_products', () => {
  const id = 1;
  const productId = 1;
  
  before(() => {
    const execute = [[{
      sale_id: 1,
      product_id: 1,
      quantity: 5,
    }]];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(() => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await salesModel.findSP(id, productId);

      expect(response).to.be.a('object');
    });

    it('com propriedades "saleId", "productId" e "quantity"', async () => {
      const response = await salesModel.findSP(id, productId);

      expect(response).to.have.a.property('saleId');
      expect(response).to.have.a.property('productId');
      expect(response).to.have.a.property('quantity');
    });

  })
})