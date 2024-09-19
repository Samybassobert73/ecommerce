import productService from '../services/product.service';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import ProductDTO from '../dto/product.dto';
import { plainToClass } from 'class-transformer';
import { logger } from '../utils';
import { validate } from 'class-validator';
const getProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await productService.findProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const postProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const productDTO = plainToClass(ProductDTO, req.body, {
    excludeExtraneousValues: true,
  });

  const errors = await validate(productDTO);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  try {
    const newProduct = await productService.createProduct(productDTO);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const updateProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const product = req.body;
  try {
    const updatedProduct = await productService.updateProduct(id, product);
    if (updatedProduct === null) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

const findProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await productService.findProductById(id);
    if (product === null) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(id);
    if (deletedProduct === null) {
      res.status(404).json({ error: "can't find product" });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    next(err);
  }
};

export default {
  getProducts,
  postProduct,
  updateProduct,
  findProductById,
  deleteProduct,
};
