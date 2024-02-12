
'use client';
// import { DarkThemeToggle, Flowbite, Dropdown } from 'flowbite-react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import useAuth from '../../security/hooks/useAuth';
import axios from '../../api/axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useUserType } from '../Context/UserTypeContext';
import Notification from "./Notification";
import SockJsClient from 'react-stomp';
import { useEffect } from "react";
import { useState } from "react";

// URL for axios API endpoint
const LOGOUT_URL = "/logout"


export default function HeaderConnected() {
    const { setAuth } = useAuth()
    const { userType } = useUserType();
    const navigate = useNavigate()
    const link_rendez_vous = "appointment"
    const link_health_book = "medical_history_book"
    const link_visits_book = "visits_logs_book"


    const link_user_dashboard = "dashboard"
    const link_user_profile = "profile"

    const link_user_setting = "settings"
    const link_healhcare_calendar = "calendar"
    const link_healhcare_patient_enabled = "patient_enabled"

    const link_company_user_healthpro = "healthcare_list"

    const link_list_actived_count = "actived_count"
    const link_admin_dashboard = "dashboard"
    const link_list_disable_count = "disable_count"
    const link_list_company_disable_count = "company_disable_count"
    const link_list_patient_disable_count = "patient_disable_count"


    const UserMenuItems = [
        {
            to: '',
            svg: (
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
            ),
            text: 'Accueil',
        },

        // {
        //     to: link_user_dashboard,
        //     svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
        //         <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        //         <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        //     </svg>),
        //     text: 'Dashboard',
        // },

        {
            to: link_rendez_vous,
            svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5h6M9 8h6m-6 3h6M4.996 5h.01m-.01 3h.01m-.01 3h.01M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" />
            </svg>),
            text: 'Rendez-vous',

        },
        // {
        //     to: link_health_book,
        //     svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
        //         <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 19A3.5 3.5 0 0 1 1 15.5V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v13.5A3.5 3.5 0 0 1 4.5 19Zm0 0H18a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-4.938a1 1 0 0 0-.697.283l-4.238 4.124a1.046 1.046 0 0 0-.164.208C6.986 18.228 6.184 18.705 4.5 19Zm0-4h.01m8.925-12.293 3.536 3.536a1 1 0 0 1 0 1.414L8 16.627v-9.9l4.02-4.02a1 1 0 0 1 1.415 0Z" />
        //     </svg>),
        //     text: 'Mon carnet de santé',

        // },
        // {
        //     to: link_visits_book,
        //     svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
        //         <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 19A3.5 3.5 0 0 1 1 15.5V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v13.5A3.5 3.5 0 0 1 4.5 19Zm0 0H18a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-4.938a1 1 0 0 0-.697.283l-4.238 4.124a1.046 1.046 0 0 0-.164.208C6.986 18.228 6.184 18.705 4.5 19Zm0-4h.01m8.925-12.293 3.536 3.536a1 1 0 0 1 0 1.414L8 16.627v-9.9l4.02-4.02a1 1 0 0 1 1.415 0Z" />
        //     </svg>),
        //     text: 'Mes consultations',

        // },

        {
            to: link_user_setting,
            svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 19A3.5 3.5 0 0 1 1 15.5V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v13.5A3.5 3.5 0 0 1 4.5 19Zm0 0H18a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-4.938a1 1 0 0 0-.697.283l-4.238 4.124a1.046 1.046 0 0 0-.164.208C6.986 18.228 6.184 18.705 4.5 19Zm0-4h.01m8.925-12.293 3.536 3.536a1 1 0 0 1 0 1.414L8 16.627v-9.9l4.02-4.02a1 1 0 0 1 1.415 0Z" />
            </svg>),
            text: 'Mes paramètres',

        },

        // Add more menu items as needed
    ];


    const healthcareMenuItems = [
        {
            to: link_user_dashboard,
            svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>),
            text: 'Tableau de bord',
        },

        {
            to: link_healhcare_calendar,
            svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
            </svg>),
            text: 'Calendrier',
        },


        // {
        //     to: link_rendez_vous,
        //     svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        //         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5h6M9 8h6m-6 3h6M4.996 5h.01m-.01 3h.01m-.01 3h.01M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" />
        //     </svg>),
        //     text: 'Mes Rendez_vous',
        //     number: 1
        // },


        {
            to: link_healhcare_patient_enabled,
            svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
            </svg>),
            text: 'Liste de mes patients',

        },
        {
            to: link_user_profile,
            svg: (
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.656 12.115a3 3 0 0 1 5.682-.015M13 5h3m-3 3h3m-3 3h3M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm6.5 4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                </svg>
            ),
            text: 'Mon profil',

        },

    ];

    const CompanyMenuItems = [

        {
            to: link_user_dashboard,
            svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>),
            text: 'Dashboard',
        },
        {
            to: link_company_user_healthpro,
            svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
            </svg>),
            text: 'Liste des personnels  à gerer',
        },
        {
            to: link_company_user_healthpro,
            svg: (<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5h6M9 8h6m-6 3h6M4.996 5h.01m-.01 3h.01m-.01 3h.01M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" />
            </svg>),
            text: 'Liste tous les Rendez_vous des personnels',
            number: 1
        },


    ];

    const AdminMenuItems = [
        {
            to: link_admin_dashboard,
            svg: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="7" x="8.5" y="6.5" rx=".5" /><rect width="5" height="3.01" x="8.5" y=".5" rx=".5" />
                <rect width="5" height="7" x=".5" y=".5" rx=".5" /><rect width="5" height="3.01" x=".5" y="10.49" rx=".5" /></g></svg>),
            text: 'Tableau de bord',
            color: 'text-gray-800'

        },

        {
            to: link_list_actived_count,
            svg: (
                <svg class="w-6 h-6 text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.656 12.115a3 3 0 0 1 5.682-.015M13 5h3m-3 3h3m-3 3h3M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm6.5 4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                </svg>
            ),
            text: 'Liste des comptes professionnels  ',
            color: 'text-green-500'
        },

        // {
        //     to: link_list_disable_count,
        //     svg: (
        //         <svg class="w-6 h-6 text-red-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        //             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
        //         </svg>
        //     ),
        //     text: 'Liste des comptes professionnels non actives ',
        //     color: 'text-red-400'

        // },
        // {
        //     to: link_list_company_disable_count,
        //     svg: (
        //         <svg class="w-6 h-6 text-orange-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="14" fill="none" viewBox="0 0 20 14">
        //             <path stroke="currentColor" stroke-width="2" d="M1 5h18M1 9h18m-9-4v8m-8 0h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1Z" />
        //         </svg>
        //     ),
        //     text: 'Liste des comptes des entreprises non actives ',
        //     color: 'text-orange-400'

        // },
        {
            to: link_list_patient_disable_count,

            svg: (
                <svg class="w-6 h-6 text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                </svg>
            ),
            text: 'Liste des comptes patients ',
            color: 'text-blue-500'

        },
    ];

    console.log(userType)

    const menuItems = userType === 'patient' ? UserMenuItems : userType === 'healthpro' ? healthcareMenuItems : userType === 'secretary' ? CompanyMenuItems : AdminMenuItems;


    const logout = async () => {

        const confirm_swall = await Swal.fire({
            title: 'Souhaitez-vous vraiment vous déconnecter ?',
            icon: 'question',
            iconHtml: '?',
            confirmButtonText: 'Déconnexion',
            cancelButtonText: 'Annuler',
            showCancelButton: true,
            showCloseButton: true
        })

        if (confirm_swall.isConfirmed) {
            try {

                const CookiesToken = Cookies.get("jwtToken")
                const response = await axios.post(LOGOUT_URL, [], {
                    headers: {
                        'Authorization': `Bearer ${CookiesToken}`,
                        'Content-Type': 'application/json'
                    },
                    // withCredentials: true
                })

                if (response.status === 200) {
                    Cookies.remove("jwtToken")
                    Cookies.remove("role")
                    navigate('/')

                } else {
                    console.log('erreur s')
                }
            }
            catch (e) {
                console.log(e)

            }

        }
    }


    return (
        <>
            <header className='sticky top-0 z-[100] color text'>
                {/* NAV BAR HORIZONTALE--------------------------------------------- */}
                <nav className="bg-white sticky border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 z-[100] border min-h-[68px] ">
                    <div class="flex flex- justify-between items-center">
                        <div class="flex justify-start items-center ">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar" type="button"
                                class="inline-flex items-center p-2 mr-4 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 
                             focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span class="sr-only">Open sidebar</span>
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="/" class="flex mr-4">
                                <img src={logo} className='lg:w-1/3 w-1/2 mr-3 ' alt='MEDDOC logo'></img>
                            </a>

                        </div>

                        {userType !== 'admin' && (
                            <div className="flex items-center ">
                                <Notification />
                            </div>
                        )}

                    </div>
                </nav>

                {/*----------------------------------- ASIDE---------------------------------------------- */}
                <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                        <ul class="space-y-2 font-medium">
                            {/* MENU ITEMS USERS */}
                            {menuItems.map((menuItem, index) => (
                                <li key={index}>
                                    <Link to={menuItem.to} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        {menuItem.svg}
                                        <span className={`ml-3 ${menuItem.color}`}>{menuItem.text}</span>
                                        {menuItem?.number && <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{menuItem.number}</span>}
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <button onClick={logout} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                    </svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Déconnexion</span>
                                </button>
                            </li>

                        </ul>
                    </div>
                </aside>

            </header>


        </>)
}