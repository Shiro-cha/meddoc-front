import HeaderConnected from '../Header/header_connected.js';
import Footer from '../Footer/footer.js';
import React from 'react';
import { Outlet } from "react-router-dom";
import { useUserType } from '../Context/UserTypeContext.js';
import Header from '../Header/header.js';
// import { useAuth } from '../Private/Hook/useAuth.js';

function Layout() {
  const userType = useUserType();

  console.log(userType)

  return (
    <>
      {userType === 'Patient' ? <HeaderConnected/> : <HeaderConnected  />}
         <Outlet/>
      {/* <Footer /> */}
    </>
  );
}
export default Layout;