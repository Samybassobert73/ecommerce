import productService from '../product.service';
import productModel from '../../models/product.model';

jest.mock('../../models/product.model');
beforeEach(() => {
  jest.clearAllMocks();
});

describe('CatalogueService', () => {
  it('have a getProducts function', () => {
    expect(typeof productService.findProducts).toBe('function');
  });
  it('should call productModel.find()', async () => {
    await productService.findProducts();
    expect(productModel.find).toHaveBeenCalled();
  });

  it('should return a list of product', async () => {
    (productModel.find as jest.Mock).mockReturnValue([{ name: 'Product 1' }]);
    const res = await productService.findProducts();
    expect(res).toEqual([{ name: 'Product 1' }]);
  });

  it('should have a createProduct function', () => {
    expect(typeof productService.createProduct).toBe('function');
  });

  it('should call productModel.create', async () => {
    const product = { name: 'Product 1' };
    await productService.createProduct(product);
    expect(productModel.create).toHaveBeenCalledWith(product);
  });

  it('should return the created product', async () => {
    (productModel.create as jest.Mock).mockReturnValue({ name: 'Product 1' });
    const res = await productService.createProduct({ name: 'Product 1' });
    expect(res).toEqual({ name: 'Product 1' });
  });

  //update
  it('should have an updateProduct function', () => {
    expect(typeof productService.updateProduct).toBe('function');
  });

  it('should call productModel.findByIdAndUpdate', async () => {
    const id = '1';
    const product = { name: 'Product 1' };
    await productService.updateProduct(id, product);
    expect(productModel.findByIdAndUpdate).toHaveBeenCalled();
  });

  it('should return the updated product', async () => {
    (productModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
      name: 'Product 1',
    });
    const res = await productService.updateProduct('1', { name: 'Product 1' });
    expect(res).toEqual({ name: 'Product 1' });
  });

  it('should have a findProductById function', () => {
    expect(typeof productService.findProductById).toBe('function');
  });

  it('should call productModel.findById', async () => {
    await productService.findProductById('1');
    expect(productModel.findById).toHaveBeenCalled();
  });

  it('should return the product', async () => {
    (productModel.findById as jest.Mock).mockReturnValue({ name: 'Product 1' });
    const res = await productService.findProductById('1');
    expect(res).toEqual({ name: 'Product 1' });
  });

  it('should have a deleteProduct function', async () => {
    expect(typeof productService.deleteProduct).toBe('function');
  });

  it('should call productModel.findByIdAndDelete', async () => {
    const id = '1';
    await productService.deleteProduct(id);
    expect(productModel.findByIdAndDelete).toHaveBeenCalled();
  });

  it('should return deleted product', async () => {
    const id = '1';
    (productModel.findByIdAndDelete as jest.Mock).mockReturnValue({
      name: 'Product 1',
    });
    const res = await productService.deleteProduct(id);
    expect(res).toEqual({ name: 'Product 1' });
  });
});
