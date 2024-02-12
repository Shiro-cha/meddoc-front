import { Link, useNavigate } from "react-router-dom";
import { SearchSimpleInput } from "../SearchGeneralize/SearchInput";
import { PaginationComponent } from "../Pagination/Pagination";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { axiosPrivate } from "../../api/axios";

export default function HealthcarePatientEnabled() {
    const navigate = useNavigate()
    const view_consultation = (user_patient_id) => {
        navigate(`/healthcare/patient/${user_patient_id}/consultations_list`);
    }


    const URL_GET_PATIENT = "/healthPro/patientList";

    const [keyword, setkeyword] = useState("")
    // ---------PAGINATION BASE------------
    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState();
    const [pageSize, setPageSize] = useState(5);

    const [patientDatas, setPatientData] = useState([])

    const handleSearch = ({ searchKeyword, selectedItems, datesearch }) => {
        console.log("Search Keyword:", searchKeyword);
        setkeyword(searchKeyword)
        setCurrentPage(0)
    };



    const fetchPatientData = async (search_key) => {
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        const parametres = {
            page: currentPage,
            size: pageSize,
            keyword: `${search_key}`,
        }

        try {
            const response = await axiosPrivate.get(URL_GET_PATIENT, {
                headers: headers,
                params:
                    parametres
            });

            const data = response.data.content;
            const totalpage = response.data.totalPages
            console.log(response.data);

            setPatientData(data);
            setTotalElements(totalpage)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchPatientData()
    }, [currentPage, keyword])

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section class="bg-white dark:bg-gray-900 h-96 p-4 sm:ml-64">
            {/* SEARCH WITH FILTER */}
            <h2 class="text-2xl font-bold text-gray-400">LISTE DE MES PATIENTS :</h2>

            {/* <SearchSimpleInput onSearch={handleSearch} filters={[]} disableCalendarInput={false}></SearchSimpleInput> */}
            <div class="relative overflow-x-auto mt-5">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Patient
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Contact
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Dernière  date de rendez vous
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nombres de rendez vous pris
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Anciennes Consultations
                            </th>
                            {/* <th scope="col" class="px-6 py-3">
                                Fiches medicals
                            </th> */}

                        </tr>
                    </thead>
                    <tbody>

                        {patientDatas.length > 0 ? (
                            patientDatas.map((dataItem, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className=" flex flex-col px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <span className="text-lg mb-1">
                                            {dataItem.name}    {dataItem.firstname}
                                        </span>

                                        {/* <span className="text-md">
                                            {dataItem.gender ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M11 21v-2H9v-2h2v-2.1q-1.975-.35-3.238-1.888T6.5 9.45q0-2.275 1.613-3.862T12 4q2.275 0 3.888 1.588T17.5 9.45q0 2.025-1.263 3.563T13 14.9V17h2v2h-2v2h-2Zm1-8q1.45 0 2.475-1.025T15.5 9.5q0-1.45-1.025-2.475T12 6q-1.45 0-2.475 1.025T8.5 9.5q0 1.45 1.025 2.475T12 13Z" /></svg>

                                            ) : (

                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4v6h-2V7.425l-3.975 3.95q.475.7.725 1.488T15 14.5q0 2.3-1.6 3.9T9.5 20q-2.3 0-3.9-1.6T4 14.5q0-2.3 1.6-3.9T9.5 9q.825 0 1.625.237t1.475.738L16.575 6H14V4h6ZM9.5 11q-1.45 0-2.475 1.025T6 14.5q0 1.45 1.025 2.475T9.5 18q1.45 0 2.475-1.025T13 14.5q0-1.45-1.025-2.475T9.5 11Z" /></svg>
                                            )}
                                        </span> */}

                                        <span className="text-xs">
                                            {dataItem.address}
                                        </span>

                                        <span className="text-xs">
                                            {dataItem.email}
                                        </span>




                                    </th>

                                    <td className="px-6 py-4">

                                        {dataItem.contact}

                                    </td>
                                    <td className="px-6 py-4">

                                        {new Date(dataItem.latestAppointment).toLocaleString('fr-FR', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        }).replace(",", " à")}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dataItem.totalAppointment}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="flex">
                                            <div className="mx-4">
                                                <button onClick={() => view_consultation(dataItem.user_id)}>
                                                    <svg className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                                        <path stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))

                        ) :
                            <p class="text-gray-500 dark:text-gray-400 text-center mt-4 w-full ">
                                Pas de données disponibles
                            </p>

                        }

                        {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th  className="px-6 py-4 dark:text-white">
                                Andrialaza
                            </th>
                            <td className="px-6 py-4">
                                Narindra
                            </td>
                            <td className="px-6 py-4">
                                2023-11-23 à 7:30
                            </td>
                            <td className="px-6 py-4">
                                <Link>
                                    4
                                </Link>
                            </td>
                            <td className="px-6 py-4 ">
                                <div className="flex">
                                    <div className="mx-4">
                                        <button>
                                            <svg className="w-6 h-6 text-gray-400 hover:text-gray-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                                <path stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr> */}

                    </tbody>
                    <PaginationComponent currentPage={currentPage} totalPages={totalElements} onPageChange={onPageChange}></PaginationComponent>
                </table>
            </div>

        </section >
    )
}