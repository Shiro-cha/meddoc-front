import HeaderConnected from '../Header/Header_connected_healthcare.js';
import Footer from '../Footer/footer.js';
import React from 'react';
import { Outlet } from "react-router-dom";
// import { useAuth } from '../Private/Hook/useAuth.js';

function Layout() {

  return (
    <>
      <HeaderConnected />
         <Outlet/>
      {/* <Footer /> */}
    </>
  );
}
export default Layout;