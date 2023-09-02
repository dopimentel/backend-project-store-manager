const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productsFromService } = require('../mocks/product.mock');
const { productController } = require('../../../src/controllers');

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
});
