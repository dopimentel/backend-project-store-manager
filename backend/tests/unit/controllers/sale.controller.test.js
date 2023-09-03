const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { serviceResponseCreated, serviceResponseSucessful, serviceResponseByIdSucessful, serviceResponseNotFound } = require('../mocks/sale.mock');
const { saleService, productService } = require('../../../src/services');
const { validateSaleItem } = require('../../../src/middlewares/validateSaleFields');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - SALE CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Listando todas as vendas com sucesso', async function () {
    sinon.stub(saleService, 'getAll').resolves(serviceResponseSucessful);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.getAll(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(serviceResponseSucessful.data);
  });

  it('Buscando venda por id com sucesso - id existente', async function () {
    sinon.stub(saleService, 'findById').resolves(serviceResponseByIdSucessful);

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(serviceResponseByIdSucessful.data);
  });

  it('Buscando venda por id com falha - id inexistente', async function () {
    sinon.stub(saleService, 'findById').resolves(serviceResponseNotFound);

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findById(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.have.been.calledWith(serviceResponseNotFound.data);
  });

  it('Criando uma venda com sucesso', async function () {
    sinon.stub(saleService, 'createSaleProduct').resolves(serviceResponseCreated);

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
    expect(res.json).to.be.calledWith(serviceResponseCreated.data);
  });

  it('Criando uma venda com falha - produto inexistente', async function () {
    sinon.stub(productService, 'findById').resolves(serviceResponseNotFound);
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

  it('Deleta uma venda com sucesso', async function () {
    sinon.stub(saleService, 'deleteSale').resolves(serviceResponseSucessful);

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.deleteSale(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(serviceResponseSucessful.data);
  });

  it('Deleta uma venda com falha - id inexistente', async function () {
    sinon.stub(saleService, 'deleteSale').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.deleteSale(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Sale not found' });
  });

  it('Atualiza a quantidade de um produto em uma venda com sucesso', async function () {
    sinon.stub(saleService, 'updateProductQuantity').resolves(serviceResponseSucessful);

    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {
        quantity: 2,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.updateProductQuantity(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(serviceResponseSucessful.data);
  });

  it('Atualiza a quantidade de um produto em uma venda com falha - id da venda inexistente', async function () {
    sinon.stub(saleService, 'updateProductQuantity').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {
        quantity: 2,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.updateProductQuantity(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Sale not found' });
  });
});