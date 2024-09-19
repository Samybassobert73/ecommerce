import React from 'react';
import styled from 'styled-components';

const BackgroundDiv = styled.div`
  background-color: rgb(246, 246, 246);
`;
const Filter = () => {
  return (
    <BackgroundDiv>
      <div>
        <input type="number" placeholder="price" />
      </div>

      <div>
        <label htmlFor="taille"></label>
        <input type="checkbox" name="taille" />
      </div>
    </BackgroundDiv>
  );
};

export default Filter;
