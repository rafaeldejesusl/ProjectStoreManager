const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const productsModel = require('../../../models/productsModel');
const salesService = require('../../../services/salesService');

describe('Retorna todos as vendas', () => {
  describe('quando inserido com sucesso',() => {
    before(() => {
      const execute = [{
        saleId: 1,
        date: "2021-09-09 00:45:23",
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 2,
        date: "2021-09-09 00:45:23",
        productId: 2,
        quantity: 10,
      }];

      sinon.stub(salesModel, 'getAll').resolves(execute);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.a('array');
    });

    it('de objetos com "saleId", "date", "productId" e "quantity"', async () => {
      const response = await salesService.getAll();

      expect(response[0]).to.have.a.property('saleId');
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');
    });

  });
});

describe('Procura uma venda no DB', () => {
  describe('quando não existe o "id" procurado',() => {
    const id = 4;

    before(() => {
      const execute = [];

      sinon.stub(salesModel, 'find').resolves(execute);
    });

    after(() => {
      salesModel.find.restore();
    });

    it('retorna um boolean', async () => {
      const response = await salesService.find(id);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await salesService.find(id);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando existe a venda procurada',() => {
    const saleId = 1;
    
    before(() => {
      const execute = [{
        date: "2021-09-09 00:45:23",
        productId: 1,
        quantity: 5,
      },
      {
        date: "2021-09-09 00:45:23",
        productId: 2,
        quantity: 10,
      }];

      sinon.stub(salesModel, 'find').resolves(execute);
    });

    after(() => {
      salesModel.find.restore();
    });

    it('retorna um array', async () => {
      const response = await salesService.find(saleId);

      expect(response).to.be.a('array');
    });

    it('de objetos com "date", "productId" e "quantity"', async () => {
      const response = await salesService.find(saleId);

      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');
    });

  });
});

describe('Cria uma venda no DB', () => {
  describe('quando inserido incorretamente',() => {
    const itemsSold = [{
      productId: 1,
      quantity: 5,
    }];
    
    before(() => {
      const execute = {
        productId: 1,
        quantity: 5,
      };
      const execute1 = { id: 1 };
      const execute2 = { id: 1, name: 'algo', quantity: 1 }

      sinon.stub(productsModel, 'find').resolves(execute2);
      sinon.stub(productsModel, 'edit').resolves(execute2);
      sinon.stub(salesModel, 'createSP').resolves(execute);
      sinon.stub(salesModel, 'create').resolves(execute1);
    });

    after(() => {
      productsModel.find.restore();
      productsModel.edit.restore();
      salesModel.createSP.restore();
      salesModel.create.restore();
    });

    it('retorna um boolean', async () => {
      const response = await salesService.create(itemsSold);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await salesService.create(itemsSold);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando inserido com sucesso',() => {
    const itemsSold = [{
      productId: 1,
      quantity: 2,
    }];
    
    before(() => {
      const execute = {
        productId: 1,
        quantity: 5,
      };
      const execute1 = { id: 1 };
      const execute2 = { id: 1, name: 'algo', quantity: 10 }

      sinon.stub(productsModel, 'find').resolves(execute2);
      sinon.stub(productsModel, 'edit').resolves(execute2);
      sinon.stub(salesModel, 'createSP').resolves(execute);
      sinon.stub(salesModel, 'create').resolves(execute1);
    });

    after(() => {
      productsModel.find.restore();
      productsModel.edit.restore();
      salesModel.createSP.restore();
      salesModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesService.create(itemsSold);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "itemsSold" que é um array de objetos', async () => {
      const response = await salesService.create(itemsSold);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('itemsSold');
      expect(response.itemsSold[0]).to.have.a.property('productId');
      expect(response.itemsSold[0]).to.have.a.property('quantity');
    });

  });
});

describe('Atualiza uma venda no DB', () => {
  describe('quando inserido incorretamente',() => {
    const itemsSold = [{
      productId: 1,
      quantity: 5,
    }];
    const id = 1;
    
    before(() => {
      const execute = {
        productId: 1,
        quantity: 5,
      };
      const execute1 = { id: 1 };
      const execute2 = { id: 1, name: 'algo', quantity: 1 }

      sinon.stub(productsModel, 'find').resolves(execute2);
      sinon.stub(productsModel, 'edit').resolves(execute2);
      sinon.stub(salesModel, 'findSP').resolves(execute);
      sinon.stub(salesModel, 'updateSP').resolves(execute1);
    });

    after(() => {
      productsModel.find.restore();
      productsModel.edit.restore();
      salesModel.findSP.restore();
      salesModel.updateSP.restore();
    });

    it('retorna um boolean', async () => {
      const response = await salesService.update(id, itemsSold);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await salesService.update(id, itemsSold);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando inserido com sucesso',() => {
    const itemsSold = [{
      productId: 1,
      quantity: 2,
    }];
    const id = 1;
    
    before(() => {
      const execute = {
        productId: 1,
        quantity: 5,
      };
      const execute1 = { id: 1, name: 'algo', quantity: 10 }
      const execute2 = { quantity: 2 }

      sinon.stub(productsModel, 'find').resolves(execute1);
      sinon.stub(salesModel, 'findSP').resolves(execute2);
      sinon.stub(productsModel, 'edit').resolves(execute1);
      sinon.stub(salesModel, 'updateSP').resolves(execute);
    });

    after(() => {
      productsModel.find.restore();
      salesModel.findSP.restore();
      productsModel.edit.restore();
      salesModel.updateSP.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesService.update(id, itemsSold);

      expect(response).to.be.a('object');
    });

    it('com propriedades "saleId", "itemsSold" que é um array de objetos', async () => {
      const response = await salesService.update(id, itemsSold);

      expect(response).to.have.a.property('saleId');
      expect(response).to.have.a.property('itemUpdated');
      expect(response.itemUpdated[0]).to.have.a.property('productId');
      expect(response.itemUpdated[0]).to.have.a.property('quantity');
    });

  });
});

describe('Apaga uma venda no DB', () => {
  describe('quando não existe o "id" procurado',() => {
    const id = 4;

    before(() => {
      const execute = [];

      sinon.stub(salesModel, 'find').resolves(execute);
    });

    after(() => {
      salesModel.find.restore();
    });

    it('retorna um boolean', async () => {
      const response = await salesService.erase(id);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await salesService.erase(id);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando inserido com sucesso',() => {
    const id = 1;
    
    before(() => {
      const execute = {
        id: 1,
      };
      const execute1 = [{
        date: "2021-09-09 00:45:23",
        productId: 1,
        quantity: 5,
      }]
      const execute2 = { id: 1, name: 'algo', quantity: 10 }

      sinon.stub(salesModel, 'find').resolves(execute1);
      sinon.stub(productsModel, 'find').resolves(execute2);
      sinon.stub(productsModel, 'edit').resolves(execute2);
      sinon.stub(salesModel, 'eraseSP').resolves(execute);
      sinon.stub(salesModel, 'erase').resolves(execute);
    });

    after(() => {
      salesModel.find.restore();
      productsModel.find.restore();
      productsModel.edit.restore();
      salesModel.eraseSP.restore();
      salesModel.erase.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesService.erase(id);

      expect(response).to.be.a('object');
    });

    it('com a propriedade "id"', async () => {
      const response = await salesService.erase(id);

      expect(response).to.have.a.property('id');
    });

  });
});