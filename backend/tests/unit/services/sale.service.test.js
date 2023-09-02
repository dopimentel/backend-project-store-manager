const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const { salesFromModel } = require('../mocks/sale.mock');
const { saleService } = require('../../../src/services');

describe('Realizando testes - SALE SERVICE:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Verificando se a função getAll retorna um todos os produtos', async function () {
    sinon.stub(saleModel, 'getAll').resolves(salesFromModel);
    
    const serviceResponse = await saleService.getAll();
    
    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(salesFromModel);
  });
  it('Verificando se a função findById retorna um produto quando o ID existe', async function () {
    sinon.stub(saleModel, 'findById').resolves(salesFromModel[0]);

    const serviceResponse = await saleService.findById(1);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(salesFromModel[0]);
  });
  it('Verificando se a função findById retorna um erro quando o ID não existe', async function () {
    sinon.stub(saleModel, 'findById').resolves(null);

    const serviceResponse = await saleService.findById(10000);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.deep.equal({ message: 'Sale not found' });
  });
});
