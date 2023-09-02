const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { productFromDB, productsFromDB, productFromDBIdNotExists } = require('../mocks/product.mock');

describe('Realizando testes - PRODUCT MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Verificando se a função getAll retorna um array', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const products = await connection.execute();
    expect(products).to.be.an('array');
    expect(products).to.deep.equal([productsFromDB]);
  });

  it('Verificando se a função findById retorna um objeto quando o ID existe', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    const product = await productModel.findById(1);
    expect(product).to.be.an('object');
    expect(product).to.have.all.keys('id', 'name');
  });

  it('Verificando se a função findById retorna null quando o ID não existe', async function () {
    sinon.stub(connection, 'execute').resolves([productFromDBIdNotExists]);
    const product = await productModel.findById(10000);
    expect(product).to.equal(null);
  });
});