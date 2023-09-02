const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');

const { saleFromDB, salesFromDB, saleFromDBIdNotExists } = require('../mocks/sale.mock');

describe('Realizando testes - SALE MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verificando se a função getAll retorna um array', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    const sales = await connection.execute();

    expect(sales).to.be.an('array');
    expect(sales[0]).to.be.an('array');
    expect(sales).to.deep.equal([salesFromDB]);
    expect(sales[0][0]).to.have.all.keys('date', 'productId', 'quantity', 'saleId');
  });
  
  it('Verificando se a função findById retorna um objeto quando o ID existe', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);
    const sale = await saleModel.findById(2);

    expect(sale).to.be.an('array');
  });

  it('Verificando se a função findById retorna null quando o ID não existe', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDBIdNotExists]);
    const sale = await saleModel.findById(10000);

    expect(sale).to.equal(null);
  });
});
