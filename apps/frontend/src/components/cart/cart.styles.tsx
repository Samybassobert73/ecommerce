import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const StyledCart = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  width: 300px;
  height: auto; /* Prend toute la hauteur de la fenêtre */
  padding: 16px;
  background-color: #ffffff;

  border: 1px solid #e2e2e2;

  z-index: 1000; /* S'assure que le panier est au-dessus des autres éléments */
  overflow-y: auto; /* Permet de scroller si le contenu dépasse */

  animation: ${fadeIn} 0.5s ease-out;
`;
