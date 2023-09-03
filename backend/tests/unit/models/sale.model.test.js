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
    const sales = await saleModel.getAll();
    expect(sales).to.be.an('array');
    expect(sales[0]).to.be.an('object');
    expect(sales[0]).to.have.all.keys('saleId', 'productId', 'date', 'quantity');
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

  it('Insere uma venda com sucesso e retorna o ID', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const id = await saleModel.createSale();

    expect(id).to.be.a('number');
  });

  it('Criando uma venda com sucesso e retornando o objeto da venda', async function () {
    sinon.stub(connection, 'execute').onCall(0)
      .resolves([{ insertId: 1 }]).onCall(1)
      .resolves([{ insertId: 1 }]);
    const products = [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ];
    const newSale = await saleModel.createSaleProduct(products);
    expect(newSale).to.be.an('object');
  });

  it('Deletando uma venda com sucesso e retornando o objeto da venda', async function () {
    sinon.stub(connection, 'execute').onCall(0).resolves([saleFromDB]).onCall(1)
      .resolves([{ affectedRows: 1 }]);

    const sale = await saleModel.deleteSale(1);

    expect(sale).to.be.an('array');
  });

  it('Deletando uma venda id não existe e retornando null', async function () {
    sinon.stub(connection, 'execute').onCall(0)
      .resolves([saleFromDBIdNotExists]).onCall(1)
      .resolves([{ affectedRows: 0 }]);

    const sale = await saleModel.deleteSale(1000);

    expect(sale).to.equal(null);
  });

  it('Atualizando a quantidade de um produto com sucesso e retornando um objeto', async function () {
    sinon.stub(connection, 'execute').onCall(0).resolves([saleFromDB]).onCall(1)
      .resolves([{ affectedRows: 1 }]);
    const newSale = await saleModel.updateProductQuantity(1, 1, 10);

    expect(newSale).to.be.an('object');
  });

  it('Atualizando a quantidade de um produto falha id não existe e retornando null', async function () {
    sinon.stub(connection, 'execute').onCall(0)
      .resolves([saleFromDBIdNotExists]).onCall(1)
      .resolves([{ affectedRows: 0 }]);
    const newSale = await saleModel.updateProductQuantity(1000, 1, 10);

    expect(newSale).to.equal(null);
  });
});
