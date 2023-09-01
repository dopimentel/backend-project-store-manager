const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { productFromDB, productsFromDB } = require('../mocks/product.mock');

describe('Realizando testes - PRODUCT MODEL:', function () {
  it('Verificando se a função getAll retorna um array', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const products = await connection.execute();
    expect(products).to.be.an('array');
  });

  it('Verificando se a função findById retorna um objeto', async function () {
    sinon.stub(connection, 'execute').resolves([productFromDB]);
    const product = await connection.execute();
    expect(product).to.be.an('object');
  });
});