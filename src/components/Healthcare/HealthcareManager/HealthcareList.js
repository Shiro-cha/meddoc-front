import { useState } from "react"
import { useEffect } from "react"
import { axiosPrivate } from "../../../api/axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Loaderpulse from "../../loader/loader_pulse";
import default_image from "../../../assets/image/default.png"


export default function HealthcareList() {
    const [healthCareData, sethealthCareData] = useState([]);
    const [loading, setLoading] = useState(true);

    // link
    const URL = "/company/"
    const URL_ADD_USER_HEALTHCARE = URL + "add_healthcare_user"
    const URL_GOTO_HEALTHCARE_OF_COMPANY = URL + "healthcare"
    const URL_GOTO_HEALTHCARE_CALENDAR_OF_COMPANY = URL + "healthcare_calendar"



    // URL for axios
    const URL_LIST_COMPANY_HEALTHCARE = URL + "healthPros"



    useEffect(() => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        try {
            axiosPrivate.get(URL_LIST_COMPANY_HEALTHCARE, { headers: headers }).then((response) => {
                console.log(response)
                sethealthCareData(response.data)
                setLoading(false);
            })

                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false);

                });

        }
        catch (err) {
            console.log("Error", err)
        }





    }, [])

    return (
        <>
            <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 sm:ml-64 ">
                <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <h2 class="text-xl font-bold text-gray-400 mb-6 uppercase">LISTE DES COMPTES à GéRés : (4 Maximums )</h2>
                    <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div class="w-full md:w-1/2">
                                <form class="flex items-center">
                                    <label for="simple-search" class="sr-only">Recherche</label>
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Recherche" required="">
                                        </input></div>
                                </form>
                            </div>
                            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <Link to={URL_ADD_USER_HEALTHCARE} class="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    Ajouter un autre compte
                                </Link>
                            </div>
                        </div>
                        <div className="flex  lg:flex-wrap place-content-center  w-full p-5  ">
                            {healthCareData.length > 0 ? (
                                healthCareData.map((data, index) => {
                                    return (
                                        <div index={index} class="w-full m-10  max-w-sm bg-white border border-gray-200 hover:shadow-md hover:scale-105 transform transition duration-200 hover:cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <div class="flex justify-end px-4 pt-4">
                                            {/* to={`${URL_GOTO_HEALTHCARE_CALENDAR_OF_COMPANY}/${data.id}`} */}
                                                <button class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">

                                                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                    </svg>
                                                </button>


                                            </div>
                                            {/* to={`${URL_GOTO_HEALTHCARE_OF_COMPANY}/${data.id}`} */}
                                            <button  class="flex flex-col items-center mx-auto pb-10">
                                                <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={default_image} alt="photo_doctor" />
                                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name} {data.firstName} </h5>
                                                <span class="text-md text-gray-500 dark:text-gray-400">{data.speciality.description}</span>
                                            </button>
                                            
                                        </div>
                                    )
                                }
                                )
                            ) : (
                                // ADD BUTTON ICONS
                                <div className="flex w-full flex-col items-center">
                                    {loading && (
                                        <>
                                            <Loaderpulse></Loaderpulse>
                                        </>
                                    )}

                                    {/* <div class="w-full md:m-auto my-4 mx-auto  max-w-sm bg-white border border-gray-200 hover:shadow-md hover:scale-105 transform transition duration-200 hover:cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <div class="flex justify-end px-4 pt-4">
                                                <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                                    <span class="sr-only">Open dropdown</span>
                                                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <Link to={URL_ADD_USER_HEALTHCARE}>
                                                <div class="flex flex-col items-center pb-10 " >
                                                    <button className="p-8">
                                                        <svg class="w-20 text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="grey" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </Link>
                                        </div> */}

                                </div>
                            )}



                        </div>


                    </div>
                </div>
            </section>

        </>
    )

}