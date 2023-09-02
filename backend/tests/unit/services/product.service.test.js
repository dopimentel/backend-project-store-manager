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
});