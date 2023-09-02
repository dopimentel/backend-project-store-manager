const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { salesFromService } = require('../mocks/sale.mock');
const { saleService } = require('../../../src/services');

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
});