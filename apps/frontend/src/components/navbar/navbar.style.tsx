import styled from 'styled-components';

export const StyledNavbar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #e2e2e2;
`;

export const UpperNavBar = styled(StyledNavbar)`
  background-color: rgb(246, 246, 246);
  align-items: end;
  justify-content: end;
`;

export const BlueNavBar = styled(StyledNavbar)`
  background-color: rgb(37, 55, 70);
  color: white;
`;
