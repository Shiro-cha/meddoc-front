
'use client';
import { DarkThemeToggle, Flowbite, Dropdown } from 'flowbite-react';
import { Outlet, Link, useLocation } from "react-router-dom";
import logo from "../../assets/image/logo.png";

export default function Header() {

  const location = useLocation();

  const menu_items = [
    {
      title_text: "Accueil",
      link: "/",

    },
    {
      title_text: "A propos de nous",
      link: "/a_propos_de_nous",

    },
    {
      title_text: "Nos Services",
      link: "/nos-services",

    },
    {
      title_text: "FAQs",
      link: "/foire_aux_questions",

    },
    {
      title_text: "Contact",
      link: "/contact_us",

    },

  ]
  const menu_button_items = [
    {
      title_text: "Se connecter",
      link: "login",
      className: "text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"

    },
    {
      title_text: "Vous êtes practicients?",
      link: "healthcare_sign_up",
      className: "text-gray border border-blue-600  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:text-white focus:outline-none",
      new_blank:"_blank"
    }
  ]


  return (
    <header className='sticky top-0 z-[100]'>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-4 dark:bg-gray-800 min-h-[68px]">
        <div className="lg:flex justify-between items-center mx-auto ">

          <Link className="mr-3 h-6 sm:h-9 flex items-center w-[160px] sm:max-w-[180px]" to='/'>
            <img src={logo} alt='Medoc Logo'></img>

            {location.pathname === '/healthcare_sign_up' && (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">PRO</span>
            )}

          </Link>

          <div className="lg:flex hidden items-center lg:order-2">
      
            {menu_items.map((menuItem, index) => (
              <Link key={index} to={menuItem.link} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"  >{menuItem.title_text}</Link>
            ))}

            {menu_button_items.map((menuItem, index) => (
              <Link key={index} className={menuItem.className} to={menuItem.link} target={menuItem.new_blank}> {menuItem.title_text} </Link>
            ))}

            {/* ------------DARK MODE TOGGLE -------------------------------*/}
            <Flowbite>
              <DarkThemeToggle />
            </Flowbite>
          </div>
        </div>
      </nav>

    </header>)
}