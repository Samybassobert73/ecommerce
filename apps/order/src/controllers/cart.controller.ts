import { plainToClass } from 'class-transformer';
import CartLineItemDTO from '../dtos/cartLineItem.dto';
import cartService from '../services/cart.service';
import { validate } from 'class-validator';
export const post = async (req, res, next) => {
  const cartLineItemDTO = plainToClass(CartLineItemDTO, req.body, {
    excludeExtraneousValues: true,
  });

  const errors = await validate(cartLineItemDTO);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  try {
    await cartService.create({ ...cartLineItemDTO, customerId: '1' });
    res.status(200).json({ message: 'created' });
  } catch (err) {
    console.log(err);
  }
};

export const getById = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const cart = await cartService.findById(cartId);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const { qty } = req.body;
  try {
    await cartService.update(id, qty);
    res.status(200).json({ message: 'created' });
  } catch (err) {
    console.log(err);
  }
};

export default {
  post,
  update,
  getById,
};
