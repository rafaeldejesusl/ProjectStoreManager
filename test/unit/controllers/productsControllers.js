const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const { expect } = require('chai');

describe('Ao chamar o controller de getAll', () => {
  describe('quando inserido corretamente',() => {
    const response = {};
    const request = {};

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

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(execute);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('é chamado o código 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o array dos produtos', async () => {
      await productsController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });

});

describe('Ao chamar o controller de find', () => {
  describe('quando não existe o produto',() => {
    const response = {};
    const request = {};
    request.params = { id: '4' };

    before(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'find').resolves(execute);
    });

    after(() => {
      productsService.find.restore();
    });

    it('é chamado o código 404', async () => {
      await productsController.find(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o objeto de erro', async () => {
      await productsController.find(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('quando existe o produto',() => {
    const response = {};
    const request = {};
    request.params = { id: '1' };

    before(() => {
      const execute = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      };

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'find').resolves(execute);
    });

    after(() => {
      productsService.find.restore();
    });

    it('é chamado o código 200', async () => {
      await productsController.find(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o objeto do produto', async () => {
      await productsController.find(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

});

describe('Ao chamar o controller de create', () => {
  describe('quando existe o produto',() => {
    const response = {};
    const request = {};
    request.body =  { name: "produto", quantity: 100 };

    before(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'create').resolves(execute);
    });

    after(() => {
      productsService.create.restore();
    });

    it('é chamado o código 409', async () => {
      await productsController.create(request, response);

      expect(response.status.calledWith(409)).to.be.equal(true);
    });

    it('é chamado o objeto de erro', async () => {
      await productsController.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('quando não existe o produto',() => {
    const response = {};
    const request = {};
    request.body =  { name: "Martelo de Thor", quantity: 10 };

    before(() => {
      const execute = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      };

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'create').resolves(execute);
    });

    after(() => {
      productsService.create.restore();
    });

    it('é chamado o código 201', async () => {
      await productsController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com o objeto do produto', async () => {
      await productsController.create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

});

describe('Ao chamar o controller de edit', () => {
  describe('quando não existe o produto',() => {
    const response = {};
    const request = {};
    request.body =  { name: "produto", quantity: 100 };
    request.params = { id: 1 };

    before(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'edit').resolves(execute);
    });

    after(() => {
      productsService.edit.restore();
    });

    it('é chamado o código 404', async () => {
      await productsController.edit(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o objeto de erro', async () => {
      await productsController.edit(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('quando existe o produto',() => {
    const response = {};
    const request = {};
    request.body =  { name: "Martelo de Thor", quantity: 10 };
    request.params = { id: 1 };

    before(() => {
      const execute = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      };

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'edit').resolves(execute);
    });

    after(() => {
      productsService.edit.restore();
    });

    it('é chamado o código 200', async () => {
      await productsController.edit(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o objeto do produto', async () => {
      await productsController.edit(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

});

describe('Ao chamar o controller de erase', () => {
  describe('quando não existe o produto',() => {
    const response = {};
    const request = {};
    request.params = { id: 1 };

    before(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'erase').resolves(execute);
    });

    after(() => {
      productsService.erase.restore();
    });

    it('é chamado o código 404', async () => {
      await productsController.erase(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o objeto de erro', async () => {
      await productsController.erase(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('quando existe o produto',() => {
    const response = {};
    const request = {};
    request.params = { id: 1 };

    before(() => {
      const execute = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);

      response.end = sinon.stub().returns();

      sinon.stub(productsService, 'erase').resolves(execute);
    });

    after(() => {
      productsService.erase.restore();
    });

    it('é chamado o código 204', async () => {
      await productsController.erase(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });

  });

});