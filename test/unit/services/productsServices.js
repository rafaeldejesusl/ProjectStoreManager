const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Retorna todos os produtos', () => {
  describe('quando inserido com sucesso',() => {
    before(() => {
      const execute = [{
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      },
      {
        id: 2,
        name: "Traje de encolhimento",
        quantity: 20
      }];

      sinon.stub(productsModel, 'getAll').resolves(execute);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.a('array');
    });

    it('de objetos com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsService.getAll();

      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');
    });

  });
});

describe('Procura um produto no DB', () => {
  describe('quando não existe o "id" procurado',() => {
    const id = 4;

    before(() => {
      const execute = undefined;

      sinon.stub(productsModel, 'find').resolves(execute);
    });

    after(() => {
      productsModel.find.restore();
    });

    it('retorna um boolean', async () => {
      const response = await productsService.find(id);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await productsService.find(id);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando existe o produto procurado',() => {
    const productId = 1;
    
    before(() => {
      const execute = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      };

      sinon.stub(productsModel, 'find').resolves(execute);
    });

    after(() => {
      productsModel.find.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.find(productId);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsService.find(productId);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

  });
});

describe('Cria um produto no DB', () => {
  describe('quando já existe o produto',() => {
    const name = 'algo';
    const quantity = 2;

    before(() => {
      const execute = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      };

      sinon.stub(productsModel, 'findName').resolves(execute);
    });

    after(() => {
      productsModel.findName.restore();
    });

    it('retorna um boolean', async () => {
      const response = await productsService.create(name, quantity);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await productsService.create(name, quantity);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando o produto ainda não existe',() => {
    const name = 'algo';
    const quantity = 2;
    
    before(() => {
      const execute = undefined;
      const execute1 = {
        id: 4,
        name: "algo",
        quantity: 2
      }

      sinon.stub(productsModel, 'findName').resolves(execute);
      sinon.stub(productsModel, 'create').resolves(execute1);
    });

    after(() => {
      productsModel.findName.restore();
      productsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.create(name, quantity);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsService.create(name, quantity);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

  });
});

describe('Edita um produto no DB', () => {
  describe('quando não existe o produto',() => {
    const id = 1;
    const name = 'algo';
    const quantity = 2;

    before(() => {
      const execute = undefined;

      sinon.stub(productsModel, 'find').resolves(execute);
    });

    after(() => {
      productsModel.find.restore();
    });

    it('retorna um boolean', async () => {
      const response = await productsService.edit(id, name, quantity);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await productsService.edit(id, name, quantity);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando o produto existe',() => {
    const id = 1;
    const name = 'algo';
    const quantity = 2;
    
    before(() => {
      const execute = {
        id: 4,
        name: "algo",
        quantity: 2
      };
      const execute1 = {
        id: 4,
        name: "algo",
        quantity: 2
      }

      sinon.stub(productsModel, 'find').resolves(execute);
      sinon.stub(productsModel, 'edit').resolves(execute1);
    });

    after(() => {
      productsModel.find.restore();
      productsModel.edit.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.edit(id, name, quantity);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsService.edit(id, name, quantity);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

  });
});

describe('Deleta um produto no DB', () => {
  describe('quando não existe o produto',() => {
    const id = 1;

    before(() => {
      const execute = undefined;

      sinon.stub(productsModel, 'find').resolves(execute);
    });

    after(() => {
      productsModel.find.restore();
    });

    it('retorna um boolean', async () => {
      const response = await productsService.erase(id);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await productsService.erase(id);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando o produto existe',() => {
    const id = 1;
    
    before(() => {
      const execute = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      };
      const execute1 = {
        id: 1,
      };

      sinon.stub(productsModel, 'find').resolves(execute);
      sinon.stub(productsModel, 'erase').resolves(execute1);
    });

    after(() => {
      productsModel.find.restore();
      productsModel.erase.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.erase(id);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsService.erase(id);

      expect(response).to.have.a.property('id');
    });

  });
});