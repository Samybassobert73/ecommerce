import React from 'react';
import Navbar from '../navbar/navbar';
import { UpperNavBar } from '../navbar/navbar';
import { FaRegUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/user/user.slice';
const Loginnavbar = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );
  const token = useSelector((state: any) => state.user.token);

  console.log('token', token);
  console.log('isAuthenticated', isAuthenticated);
  return (
    <UpperNavBar>
      {isAuthenticated ? (
        <span>
          <NavLink to={'/profile'}>
            <FaRegUserCircle />
            profile
          </NavLink>
        </span>
      ) : (
        <>
          <span>
            <NavLink to={'/register'}>
              <FaRegUserCircle />
              register
            </NavLink>
          </span>

          <span>
            <NavLink to={'/login'}>
              <FaRegUserCircle />
              login
            </NavLink>
          </span>
        </>
      )}
    </UpperNavBar>
  );
};

export default Loginnavbar;
