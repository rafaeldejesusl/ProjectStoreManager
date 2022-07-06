const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { expect } = require('chai');

describe('Ao chamar o controller de getAll', () => {
  describe('quando inserido corretamente',() => {
    const response = {};
    const request = {};

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

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(execute);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('é chamado o código 200', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o array das vendas', async () => {
      await salesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });

});

describe('Ao chamar o controller de find', () => {
  describe('quando não existe a venda',() => {
    const response = {};
    const request = {};
    request.params = { id: '4' };

    before(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'find').resolves(execute);
    });

    after(() => {
      salesService.find.restore();
    });

    it('é chamado o código 404', async () => {
      await salesController.find(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o objeto de erro', async () => {
      await salesController.find(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('quando existe a venda',() => {
    const response = {};
    const request = {};
    request.params = { id: '1' };

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

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'find').resolves(execute);
    });

    after(() => {
      salesService.find.restore();
    });

    it('é chamado o código 200', async () => {
      await salesController.find(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o array da venda', async () => {
      await salesController.find(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });

});

describe('Ao chamar o controller de create', () => {
  describe('quando inserido incorretamente',() => {
    const response = {};
    const request = {};
    request.body = [{
      productId: 1,
      quantity: 5,
    },
    {
      productId: 2,
      quantity: 10,
    }];

    before(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'create').resolves(execute);
    });

    after(() => {
      salesService.create.restore();
    });

    it('é chamado o código 422', async () => {
      await salesController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o json com o objeto de erro', async () => {
      await salesController.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('quando inserido corretamente',() => {
    const response = {};
    const request = {};
    request.body = [{
      productId: 1,
      quantity: 5,
    },
    {
      productId: 2,
      quantity: 10,
    }];

    before(() => {
      const execute = {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 2
          },
          {
            productId: 2,
            quantity: 5
          }
        ]
      };

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'create').resolves(execute);
    });

    after(() => {
      salesService.create.restore();
    });

    it('é chamado o código 201', async () => {
      await salesController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com o objeto da venda', async () => {
      await salesController.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

});

describe('Ao chamar o controller de update', () => {
  describe('quando inserido incorretamente',() => {
    const response = {};
    const request = {};
    request.body = [{
      productId: 1,
      quantity: 5,
    },
    {
      productId: 2,
      quantity: 10,
    }];
    request.params = { id: 1 }

    before(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'update').resolves(execute);
    });

    after(() => {
      salesService.update.restore();
    });

    it('é chamado o código 422', async () => {
      await salesController.update(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o json com o objeto de erro', async () => {
      await salesController.update(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('quando inserido corretamente',() => {
    const response = {};
    const request = {};
    request.body = [{
      productId: 1,
      quantity: 5,
    },
    {
      productId: 2,
      quantity: 10,
    }];
    request.params = { id: 1 }

    before(() => {
      const execute = {
        id: 1,
        itemUpdated: [
          {
            productId: 1,
            quantity: 2
          },
          {
            productId: 2,
            quantity: 5
          }
        ]
      };

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'update').resolves(execute);
    });

    after(() => {
      salesService.update.restore();
    });

    it('é chamado o código 200', async () => {
      await salesController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o objeto da venda', async () => {
      await salesController.update(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

});

describe('Ao chamar o controller de erase', () => {
  describe('quando não existe a venda',() => {
    const response = {};
    const request = {};
    request.params = { id: '4' };

    before(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'erase').resolves(execute);
    });

    after(() => {
      salesService.erase.restore();
    });

    it('é chamado o código 404', async () => {
      await salesController.erase(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o objeto de erro', async () => {
      await salesController.erase(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('quando inserido corretamente',() => {
    const response = {};
    const request = {};
    request.params = { id: 1 }

    before(() => {
      const execute = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);

      response.end = sinon.stub().returns();

      sinon.stub(salesService, 'erase').resolves(execute);
    });

    after(() => {
      salesService.erase.restore();
    });

    it('é chamado o código 204', async () => {
      await salesController.erase(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });

  });

});