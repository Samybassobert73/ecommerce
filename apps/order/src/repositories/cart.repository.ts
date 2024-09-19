import cartModel from '../models/Cart';
import cartLineItemModel, { cartLineItem } from '../models/CartLineItem';

export type CartRepositoryType = {
  create: (id: string, listItem: cartLineItem) => Promise<string>;
};

export const create = async (
  customerId: string,
  { productId, itemName, variant, qty, price }: cartLineItem
) => {
  console.log(customerId, productId, itemName, variant, qty, price);

  let cart = await cartModel.findOne({ customerId });
  if (!cart) {
    cart = await cartModel.create({ customerId });
  }

  const { _id } = cart;
  await cartLineItemModel.create({
    cartId: _id,
    itemName,
    price,
    productId,
    qty,
    variant,
  });

  return _id;
};

export const findById = async (id) => {
  return await cartModel.findById(id);
};

export const updateCart = async (id, qty) => {
  //trouve cartlineitem
  let updatedCartLineItem = await cartLineItemModel.findByIdAndUpdate(id, qty, {
    new: true,
    useFindAndModify: false,
  });

  return updatedCartLineItem;
};

export default {
  create,
  updateCart,
  findById,
};
