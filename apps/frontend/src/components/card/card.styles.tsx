import styled from 'styled-components';

export const StyledCard = styled.div`
  padding: 8px 10px;

  transition: transform 0.3s ease-in-out; /* Transition fluide sur l'agrandissement */
  font-size: 0.7em;
  font-family: sans-serif;
  &:hover {
    transform: scale(1.05); /* Agrandit la carte de 5% lors du hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ajoute une légère ombre lors du hover */
  }
`;
