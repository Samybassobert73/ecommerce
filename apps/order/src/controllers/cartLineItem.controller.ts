import cartLineItemService from '../services/cartLineItem.service';

export const get = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const cart = await cartLineItemService.find(cartId);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res, next) => {
  const { cartId, cartlineitemid } = req.params;
  const { qty } = req.body;
  console.log(cartId, cartlineitemid);
  console.log(qty);
  try {
    const cart = await cartLineItemService.update(cartId, cartlineitemid, qty);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
  }
};

export default { get, update };
