import mongoose from 'mongoose';
import productModel from '../models/product.model';
// import { IProduct } from '../models/product.model';
import type { product } from '../models/product.model';
const findProducts = async (): Promise<product[]> => {
  return await productModel.find();
};

const createProduct = async (product): Promise<product> => {
  return await productModel.create(product);
};

const updateProduct = async (id: string, product): Promise<product | null> => {
  return await productModel.findByIdAndUpdate(id, product, {
    new: true,
    useFindAndModify: false,
  });
};

const findProductById = async (id: string): Promise<product | null> => {
  return await productModel.findById(id);
};

const deleteProduct = async (id: string): Promise<product | null> => {
  return await productModel.findByIdAndDelete(id);
};

export default {
  findProducts,
  createProduct,
  updateProduct,
  findProductById,
  deleteProduct,
};
