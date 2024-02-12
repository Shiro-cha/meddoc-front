import Header from '../Header/header.js';
import Footer from '../Footer/footer.js';
import Whyus from '../LandingPageContent/WhyUS.js';

import React from 'react';
import { Outlet, Link } from "react-router-dom";

function Layout( ) {
    return (
      <>
      <Header/>
           <Outlet />
      <Footer/>
    </>
    );
  }
export default Layout;