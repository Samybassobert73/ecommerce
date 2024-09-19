import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, selectAllCart } from '../../features/cart/cart.slice';
import { StyledCart } from './cart.styles';
import OrderButton from '../orderButton/orderButton';

import CartItem from '../cartItem/cartItem';
import { NavLink } from 'react-router-dom';
import Button from '../button/button';
const Cart = () => {
  const cartItems = useSelector(selectAllCart);
  const dispatch = useDispatch();
  return (
    <StyledCart>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          {/* <OrderButton checkout={false} /> */}
          <Button>
            <NavLink to="/order-summary">order</NavLink>
          </Button>
        </>
      )}
    </StyledCart>
  );
};

export default Cart;
