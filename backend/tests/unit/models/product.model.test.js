const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { productFromDB, productsFromDB, productFromDBIdNotExists } = require('../mocks/product.mock');

describe('Realizando testes - PRODUCT MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Listando os produtos com sucesso e retornar um array', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const products = await productModel.getAll();
    expect(products).to.be.an('array');
    expect(products).to.deep.equal(productsFromDB);
    expect(products).to.have.lengthOf(4);
  });

  it('Recuperando um produto pelo ID com sucesso e retornar um objeto', async function () {
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
  it('Insere um produto com sucesso e retorna com o id inserido', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const productId = await productModel.create('Produto Teste');
    expect(productId).to.be.an('number');
    expect(productId).to.equal(1);
  });
  it('Atualiza um produto com sucesso e retorna um objeto', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    const product = await productModel.update(1, 'Produto Teste');
    expect(product).to.be.an('object');
    expect(product).to.have.all.keys('id', 'name');
  });
  it('Verificando se a função update retorna null quando o ID não existe', async function () {
    sinon.stub(connection, 'execute').resolves([productFromDBIdNotExists]);
    const product = await productModel.update(10000, 'Produto Teste');
    expect(product).to.equal(null);
  });
  it('Deleta um produto com sucesso e retorna um objeto', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    const product = await productModel.deleteProduct(1);
    expect(product).to.be.an('object');
    expect(product).to.have.all.keys('id', 'name');
  });
  it('Verificando se a função deleteProduct retorna null quando o ID não existe', async function () {
    sinon.stub(connection, 'execute').resolves([productFromDBIdNotExists]);
    const product = await productModel.deleteProduct(10000);
    expect(product).to.equal(null);
  });
});