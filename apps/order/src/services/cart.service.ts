import mongoose from 'mongoose';
import { cartLineItem } from '../models/CartLineItem';
import cartRepository from '../repositories/cart.repository';
import { GetProductDetail } from '../utils/broker';

export const create = async (input) => {
  const product = await GetProductDetail(input.productId);

  if (product.stock < input.qty) {
    throw new Error();
  }
  return await cartRepository.create(input.customerId, {
    productId: new mongoose.Types.ObjectId(product.id),
    itemName: product.name,
    variant: input.variant,
    qty: input.qty,
    price: product.price,
  } as cartLineItem);
};

export const findById = async (id) => {
  return await cartRepository.findById(id);
};

export const update = async (id, qty) => {
  return await cartRepository.updateCart(id, qty);
};

export default {
  create,
  update,
  findById,
};
