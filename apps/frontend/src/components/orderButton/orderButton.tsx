import React, { useState } from 'react';
import { OrderButton as OrderBtn } from '../button/button';
type OrderButtonProps = {
  checkout: boolean;
};
const OrderButton = ({ checkout }: OrderButtonProps) => {
  const [active, setActive] = useState(checkout);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setActive(!active);
  };
  return (
    <OrderBtn
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {active ? 'order' : 'not order'}
    </OrderBtn>
  );
};

export default OrderButton;
