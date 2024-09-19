import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 8px 10px;
  background-color: rgb(37, 55, 70);
  color: #ffffff;
  border: none;
  cursor: pointer;
  height: fit-content;
  font-weight: 600;

  a {
    text-decoration: none;
    color: #ffffff;
  }
`;

export const OrderButton = styled(StyledButton)`
  background-color: #ffa200;
`;

export const addCartButton = styled(StyledButton)`
  /* Centre le bouton horizontalement */
  padding: 10px 20px;
  color: rgb(37, 55, 70);
  background-color: #ffffff70;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #fff;

    opacity: 1; /* Change l'opacité au hover pour un effet visuel */
  }
`;
