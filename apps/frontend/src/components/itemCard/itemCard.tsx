import React from 'react';
import Card from '../card/card';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../features/cart/cart.slice';

import Button, { addCartButton as AddCardButton } from '../button/button';
import styled from 'styled-components';
interface ItemCardProps {
  product: { _id: string; title: string; stock: number; price: number };
}

const ItemCard = ({ product: { _id, title, stock, price } }: ItemCardProps) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(cartActions.addProduct({ _id, title, stock, qty: 1 }));
  };

  const StyledDiv = styled.div`
    position: relative; /* Le parent doit être relatif pour que l'enfant puisse être positionné absolument */
    width: 100%;
    height: 400px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* S'assure que l'image remplit le conteneur sans être déformée */
    }

    button {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  `;
  return (
    <Card>
      <StyledDiv>
        <img src="https://placehold.co/400x800/png" alt="placeholder" />
        <AddCardButton
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Add to cart
        </AddCardButton>
      </StyledDiv>
      <h3>{title}</h3>
      <h3>€ {price}</h3>
    </Card>
  );
};

export default ItemCard;
