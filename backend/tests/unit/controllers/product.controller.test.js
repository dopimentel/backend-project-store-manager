const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productsFromService, productFromService, productFromServiceNotFound } = require('../mocks/product.mock');
const { productController } = require('../../../src/controllers');
const { validateProduct } = require('../../../src/middlewares/validateProductFields');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - PRODUCT CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Verificando se a função getAll retorna um array', async function () {
    sinon.stub(productService, 'getAll').resolves(productsFromService);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.getAll(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(productsFromService.data);
  });
  it('Verificando se a função findById retorna um objeto', async function () {
    sinon.stub(productService, 'findById').resolves(productFromService);

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
  });
  it('Verificando a função findById com id inexistente', async function () {
    sinon.stub(productService, 'findById').resolves(productFromServiceNotFound);

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
    validateProduct(req, res, next);
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
    validateProduct(req, res);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', '"name" is required'));
  });
});
