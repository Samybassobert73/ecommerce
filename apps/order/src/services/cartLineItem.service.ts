import cartLineItemsRepository from '../repositories/cartLineItems.repository';

export const find = async (cartId) => {
  return await cartLineItemsRepository.find(cartId);
};

export const update = async (cartId, cartLineItemId, qty) => {
  return await cartLineItemsRepository.update(cartId, cartLineItemId, qty);
};

export default { find, update };
