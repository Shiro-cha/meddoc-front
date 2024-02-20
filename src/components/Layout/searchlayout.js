import Header from '../Header/header.js';
import Footer from '../Footer/footer.js';
import Whyus from '../LandingPageContent/WhyUS.js';
import { lazy } from 'react';
import React from 'react';
import { Outlet, Link, useLocation, Route } from "react-router-dom";
import { SearchBar } from '../sections.js';
import Searchhealthcare from '../User/SearchHealthcare.js';

function SearchLayout() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const healhtproName = searchParams.get('healhtpro_name');
  const healhtproLocalisation = searchParams.get('healhtpro_localisation');

  console.log(healhtproName, healhtproLocalisation)

  return (
    <>
      <section className="bg-cyan-700 text-white py-auto max-w-screen justify-start sticky top-[68px] z-[100]">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 ">
          <div class="mr-auto place-self-center lg:col-span-7">

            <SearchBar defaultvalues={{ healhtpro_name: healhtproName, healhtpro_localisation: healhtproLocalisation }}></SearchBar>

          </div>

        </div>
      </section>
      {/* <Outlet /> */}
      <Searchhealthcare searchQuery={healhtproName} searchQueryWhere={healhtproLocalisation}></Searchhealthcare>

    </>
  );
}
export default SearchLayout;