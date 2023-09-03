const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { serviceResponseNotFound, serviceResponseNoContent, serviceResponseSucessful, serviceResponseByIdSucessful, serviceResponseCreated } = require('../mocks/product.mock');
const { productController } = require('../../../src/controllers');
const { validateProduct } = require('../../../src/middlewares/validateProductFields');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - PRODUCT CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Verificando se é possivel listar os produtos com sucesso', async function () {
    sinon.stub(productService, 'getAll').resolves(serviceResponseSucessful);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.getAll(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(serviceResponseSucessful.data);
  });
  it('Buscando produto por id com sucesso - id existente', async function () {
    sinon.stub(productService, 'findById').resolves(serviceResponseByIdSucessful);

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(serviceResponseByIdSucessful.data);
  });
  it('Buscando produto por id com falha - id inexistente', async function () {
    sinon.stub(productService, 'findById').resolves(serviceResponseNotFound);

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findById(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', 'Product not found'));
  });

  it('Criando um produto com sucesso', async function () {
    sinon.stub(productService, 'create').resolves(serviceResponseCreated);

    const req = {
      body: {
        name: 'Skol Lata 250ml',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returnsThis();

    await productController.create(req, res);
    await validateProduct(req, res, next);

    expect(next).to.have.been.calledWith();
    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(serviceResponseCreated.data);
  });

  it('Produto não criado - requisicao sem o campo name', async function () {
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateProduct(req, res);

    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', '"name" is required'));
  });
  
  it('Produto não criado - requiscao com o campo name menor que 5 caracteres', async function () {
    const req = {
      body: {
        name: 'Skol',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await validateProduct(req, res);

    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', '"name" length must be at least 5 characters long'));
  });

  it('Atualizando um produto com sucesso', async function () {
    sinon.stub(productService, 'update').resolves(serviceResponseByIdSucessful);

    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Skol Lata 250ml',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.update(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(serviceResponseByIdSucessful.data);
  });

  it('Atualizando um produto com falha - id inexistente', async function () {
    sinon.stub(productService, 'update').resolves(serviceResponseNotFound);

    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Skol Lata 250ml',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.update(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', 'Product not found'));
  });

  it('Verificando um inputs valido da função create', async function () {
    const req = {
      body: {
        name: 'Skol Lata 250ml',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateProduct(req, res, next);

    expect(next).to.have.been.calledWith();
  });
  it('Verificando um inputs invalido da função create', async function () {
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await validateProduct(req, res);
    
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', '"name" is required'));
  });

  it('Deletando um produto com sucesso', async function () {
    sinon.stub(productService, 'deleteProduct').resolves(serviceResponseNoContent);

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.deleteProduct(req, res);

    expect(res.status).to.be.calledWith(204);
  });
  it('Deletando um produto com id inexistente', async function () {
    sinon.stub(productService, 'deleteProduct').resolves(serviceResponseNotFound);

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.deleteProduct(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', 'Product not found'));
  });
});
