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
  it('Criando uma venda com sucesso e retornando o objeto da venda', async function () {
    sinon.stub(saleModel, 'createSaleProduct').resolves(salesFromModel[0]);

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
    const serviceResponse = await saleService.createSaleProduct(products);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('CREATED');
    expect(serviceResponse.data).to.deep.equal(salesFromModel[0]);
  });
  it('Verificando se a função deleteSale retorna um erro quando o ID não existe', async function () {
    sinon.stub(saleModel, 'findById').resolves(null);

    const serviceResponse = await saleService.deleteSale(10000);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.deep.equal({ message: 'Sale not found' });
  });
  it('Verificando se a função deleteSale retorna um objeto da venda deletada', async function () {
    sinon.stub(saleModel, 'findById').resolves(salesFromModel[0]);
    sinon.stub(saleModel, 'deleteSale').resolves(salesFromModel[0]);

    const serviceResponse = await saleService.deleteSale(1);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('NO_CONTENT');
    expect(serviceResponse.data).to.deep.equal(salesFromModel[0]);
  });
  it('Verificando se a função updateProductQuantity retorna um objeto da venda atualizada', async function () {
    sinon.stub(saleModel, 'findById').resolves(salesFromModel[0]);
    sinon.stub(saleModel, 'updateProductQuantity').resolves({ affectedRows: 1, newSale: salesFromModel[0] });

    const serviceResponse = await saleService.updateProductQuantity(1, 1, 2);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.deep.equal(salesFromModel[0]);
  });

  it('Verificando se a função updateProductQuantity retorna um erro quando o ID da venda não existe', async function () {
    sinon.stub(saleModel, 'updateProductQuantity').resolves(null);

    const serviceResponse = await saleService.updateProductQuantity(10000, 1, 2);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.deep.equal({ message: 'Sale not found' });
  });
  it('Verificando se a função updateProductQuantity retorna um erro quando o ID do produto não existe', async function () {
    sinon.stub(saleModel, 'findById').resolves(salesFromModel[0]);
    sinon.stub(saleModel, 'updateProductQuantity').resolves({ affectedRows: 0 });

    const serviceResponse = await saleService.updateProductQuantity(1, 10000, 2);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.deep.equal({ message: 'Product not found in sale' });
  });
});
