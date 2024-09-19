// eslint-disable-next-line @typescript-eslint/no-unused-vars

// import CheckoutButton from '../components/checkoutButton/checkoutButton';

import Catalogue from '../components/catalogue/catalogue';
import Topnavbar from '../components/topnavbar/topnavbar';
import { GlobalStyles } from './globalStyles';

import Container from '../components/container/container';
import Loginnavbar from '../components/topnavbar/loginnavbar';
import styled from 'styled-components';
import Filter from '../components/filter/filter';
import BottomNav from '../components/bottomNav/bottomNav';
import User from '../components/user/user';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/notFound/notFound';
import Home from '../components/home/home';
import OrderSummary from '../components/orderSummary/orderSummary';
import Register from '../components/register/register';
import Login from '../components/login/login';

export function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="about" element={<About />} />
        <Route path="order-summary" element={<OrderSummary />} />
        <Route path="product" element={<Product />}>
          <Route index element={<NewProduct />} />

          <Route path="new" element={<NewProduct />} />
          <Route path="featured" element={<FeaturedProduct />} />
        </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
