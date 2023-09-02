const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');

const { saleFromDB, salesFromDB, saleFromModel } = require('../mocks/sale.mock');

describe('Realizando testes - SALE MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verificando se a função getAll retorna um array', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    const sales = await connection.execute();

    expect(sales).to.be.an('array');
    expect(sales).to.deep.equal([salesFromDB]);
  });
  
  it('Verificando se a função findById retorna um objeto quando o ID existe', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);
    const sale = await saleModel.findById(2);

    expect(sale).to.be.an('array');
  });

});
