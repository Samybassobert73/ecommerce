import React from 'react';
import Navbar from '../navbar/navbar';
import { PiSuitcaseLight } from 'react-icons/pi';
import Button from '../button/button';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, getCartState } from '../../features/cart/cart.slice';
import Cart from '../cart/cart';
const Topnavbar = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => getCartState(state as any).showCart);
  return (
    <Navbar>
      <h2>Shop</h2>

      <Button
        onClick={() => {
          dispatch(cartActions.toggleCart());
        }}
      >
        <PiSuitcaseLight />
      </Button>

      {showCart && <Cart />}
    </Navbar>
  );
};

export default Topnavbar;
