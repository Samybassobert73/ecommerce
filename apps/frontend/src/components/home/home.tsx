import React from 'react';
import styled from 'styled-components';
import Loginnavbar from '../topnavbar/loginnavbar';

import Topnavbar from '../topnavbar/topnavbar';
import BottomNav from '../bottomNav/bottomNav';
import User from '../user/user';
import Filter from '../filter/filter';
import Catalogue from '../catalogue/catalogue';

const AppWrapper = styled.div`
  height: 100vh; /* Prend toute la hauteur de l'écran */
  display: flex;
  flex-direction: column; /* Permet de gérer les éléments verticalement */
  overflow: hidden; /* Évite le scroll */
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
  height: 100%;
`;
const Home = () => {
  return (
    <AppWrapper>
      <Loginnavbar />
      <Topnavbar />
      <BottomNav />
      <User />

      <Layout>
        <Filter />
        {/* <Container> */}
        <Catalogue />
        {/* </Container> */}
      </Layout>
    </AppWrapper>
  );
};

export default Home;
