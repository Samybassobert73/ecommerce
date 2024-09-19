import productController from '../product.controller';
import httpMocks from 'node-mocks-http';
import productService from '../../services/product.service';
jest.mock('../../services/product.service');
let req, res, next;
beforeEach(() => {
  jest.clearAllMocks();
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('CatalogueController', () => {
  it('have a getProducts function', () => {
    expect(typeof productController.getProducts).toBe('function');
  });
  it('should call productService.find()', async () => {
    await productController.getProducts(req, res, next);
    expect(productService.findProducts).toHaveBeenCalled();
  });

  it('should return 200 response code', async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    (productService.findProducts as jest.Mock).mockReturnValue([
      { name: 'Product 1' },
    ]);
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual([{ name: 'Product 1' }]);
  });

  it('should handle errors', async () => {
    const errorMessage = { error: 'error finding products' };
    const rejectedPromise = Promise.reject(errorMessage);
    (productService.findProducts as jest.Mock).mockReturnValue(rejectedPromise);
    await productController.getProducts(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  //post

  it('should have a postProduct function', () => {
    expect(typeof productController.postProduct).toBe('function');
  });

  it('should call productService.create', async () => {
    req.body = { title: 'product 1', quantity: 100 };
    await productController.postProduct(req, res, next);
    expect(productService.createProduct).toHaveBeenCalledWith({
      title: 'product 1',
      quantity: 100,
    });
  });

  it('should return 201 response code', async () => {
    req.body = { title: 'product 1', quantity: 100 };
    await productController.postProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    req.body = { title: 'product 1', quantity: 100 };
    (productService.createProduct as jest.Mock).mockReturnValue({
      title: 'product 1',
      quantity: 100,
    });
    await productController.postProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      title: 'product 1',
      quantity: 100,
    });
  });

  it('should handle errors', async () => {
    const errorMessage = { error: 'error creating product' };
    const rejectedPromise = Promise.reject(errorMessage);
    (productService.createProduct as jest.Mock).mockReturnValue(
      rejectedPromise
    );
    await productController.postProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it('should have an updateProduct function', () => {
    expect(typeof productController.updateProduct).toBe('function');
  });

  it('should call productService.updateProduct', async () => {
    req.params.id = '1';
    req.body = { title: 'product 1', quantity: 100 };
    await productController.updateProduct(req, res, next);
    expect(productService.updateProduct).toHaveBeenCalledWith('1', {
      title: 'product 1',
      quantity: 100,
    });
  });

  it('should return response code 200', async () => {
    req.params.id = '1';
    req.body = { title: 'product 1', quantity: 100 };
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    req.params.id = '1';
    req.body = { title: 'product 1', quantity: 100 };
    (productService.updateProduct as jest.Mock).mockReturnValue({
      title: 'product 1',
      quantity: 100,
    });
    await productController.updateProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      title: 'product 1',
      quantity: 100,
    });
  });

  it('should handle errors', async () => {
    const errorMessage = { error: 'error updating product' };
    const rejectedPromise = Promise.reject(errorMessage);
    (productService.updateProduct as jest.Mock).mockReturnValue(
      rejectedPromise
    );
    await productController.updateProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle 404 when item doesnt exist', async () => {
    (productService.updateProduct as jest.Mock).mockReturnValue(null);
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should have a findProductById function', () => {
    expect(typeof productController.findProductById).toBe('function');
  });

  it('should call productService.findProductById with req.params.id', async () => {
    req.params.id = '1';
    await productController.findProductById(req, res, next);
    expect(productService.findProductById).toHaveBeenCalledWith('1');
  });
  it('should return response code 200', async () => {
    req.params.id = '1';
    await productController.findProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return json body in response', async () => {
    req.params.id = '1';
    (productService.findProductById as jest.Mock).mockReturnValue({
      title: 'Product 1',
    });
    await productController.findProductById(req, res, next);
    expect(res._getJSONData()).toStrictEqual({ title: 'Product 1' });
  });

  it('should handle errors', async () => {
    const errorMessage = { error: 'error finding product' };
    const rejectedPromise = Promise.reject(errorMessage);
    (productService.findProductById as jest.Mock).mockReturnValue(
      rejectedPromise
    );
    await productController.findProductById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle 404 when item doesnt exist', async () => {
    (productService.findProductById as jest.Mock).mockReturnValue(null);
    await productController.findProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should have a deleteProduct function', async () => {
    expect(typeof productController.deleteProduct).toBe('function');
  });

  it('should call productService.deleteProduct with id ', async () => {
    const id = '1';
    req.params.id = id;
    await productController.deleteProduct(req, res, next);
    expect(productService.deleteProduct).toHaveBeenCalledWith(id);
  });

  it('should return response status code 200', async () => {
    const id = '1';
    req.params = id;
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return json body in response', async () => {
    const id = '1';
    req.params = id;
    (productService.deleteProduct as jest.Mock).mockReturnValue({
      title: 'product 1',
    });
    await productController.deleteProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual({
      title: 'product 1',
    });
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle errors', async () => {
    const id = '1';
    req.params = id;
    const errorMessage = { error: "can't delete product" };
    const rejectedPromise = Promise.reject(errorMessage);
    (productService.deleteProduct as jest.Mock).mockReturnValue(
      rejectedPromise
    );
    await productController.deleteProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle 404 errors', async () => {
    const id = '1';
    req.params = id;
    (productService.deleteProduct as jest.Mock).mockReturnValue(null);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(404);
  });
});
