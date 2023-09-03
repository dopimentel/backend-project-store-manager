const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { salesFromService, saleFromServiceCreated } = require('../mocks/sale.mock');
const { saleService, productService } = require('../../../src/services');
const { validateSaleItem } = require('../../../src/middlewares/validateSaleFields');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - SALE CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verificando se a função getAll retorna um array', async function () {
    sinon.stub(saleService, 'getAll').resolves(salesFromService);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.getAll(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(salesFromService.data);
  });
  it('Verificando inserção de venda com sucesso', async function () {
    sinon.stub(saleService, 'createSaleProduct').resolves(saleFromServiceCreated);

    const req = {
      body: [
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 3,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.createSaleProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(saleFromServiceCreated.data);
  });

  it('Verificando middleware validateSaleFields', async function () {
    sinon.stub(productService, 'findById').resolves({ status: 'SUCCESSFUL' });
    const req = {
      body: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returnsThis();

    await validateSaleItem(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Verificando middleware validateSaleFields com produto inexistente', async function () {
    sinon.stub(productService, 'findById').resolves({ status: 'NOT_FOUND' });
    const req = {
      body: [
      {
        productId: 10,
        quantity: 2,
      },
      {
        productId: 20,
        quantity: 3,
      },
    ],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returnsThis();

    await validateSaleItem(req, res, next);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    expect(next.getCalls()).to.have.lengthOf(0);
  });
});