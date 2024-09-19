import React from 'react';
import Button from '../button/button';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../features/cart/cart.slice';

interface CartItemProps {
  item: { _id: string; title: string; stock: number; qty: number };
}
const CartItem = ({ item: { _id, title, stock, qty } }: CartItemProps) => {
  const dispatch = useDispatch();
  const handleIncrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(cartActions.increaseQuantity({ _id }));
  };

  return (
    <div key={_id}>
      <h3>{title}</h3>
      <p>Stock: {stock}</p>
      <p>Quantity: {qty}</p>

      <Button
        onClick={(e) => {
          dispatch(cartActions.deacreaseQuantity({ _id }));
        }}
      >
        -
      </Button>
      <Button
        onClick={(e) => {
          dispatch(cartActions.increaseQuantity({ _id }));
        }}
      >
        +
      </Button>

      <Button
        onClick={(e) => {
          dispatch(cartActions.removeProduct(_id));
        }}
      >
        remove
      </Button>
    </div>
  );
};

export default CartItem;
