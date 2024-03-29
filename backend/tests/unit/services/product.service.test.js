const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productsFromModel } = require('../mocks/product.mock');
const { productService } = require('../../../src/services');

describe('Realizando testes - PRODUCT SERVICE:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Verificando se a função getAll retorna um todos os produtos', async function () {
    sinon.stub(productModel, 'getAll').resolves(productsFromModel);
    
    const serviceResponse = await productService.getAll();
    
    expect(serviceResponse).to.be.an('object');
  });
  it('Verificando se a função findById retorna um produto quando o ID existe', async function () {
    sinon.stub(productModel, 'findById').resolves(productsFromModel[0]);

    const serviceResponse = await productService.findById(1);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(productsFromModel[0]);
  });
  it('Verificando se a função findById retorna um erro quando o ID não existe', async function () {
    sinon.stub(productModel, 'findById').resolves(null);

    const serviceResponse = await productService.findById(10000);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.deep.equal({ message: 'Product not found' });
  });
});