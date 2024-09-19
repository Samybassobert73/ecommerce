import cartModel from '../models/Cart';
import cartLineItemModel from '../models/CartLineItem';

export const find = async (cartId) => {
  return await cartLineItemModel.find({ cartId });
};

export const update = async (cartId, cartLineItemId, qty) => {
  return await cartLineItemModel.findByIdAndUpdate(
    { _id: cartLineItemId },
    { qty },
    {
      new: true,
      useFindAndModify: false,
    }
  );
};

export default { find, update };
