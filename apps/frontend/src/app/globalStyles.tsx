import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
body{
  margin: 0;
  font-family: 'DS Trade Gothic', 'Trade Gothic', sans-serif;; 
  color: rgb(37, 55, 70) 
}

a{
  text-decoration: none;
  color: rgb(37, 55, 70);
}

.error{
  color: red;
}
`;
