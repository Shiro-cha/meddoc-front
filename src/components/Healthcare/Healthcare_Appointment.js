import Cookies from "js-cookie"
import { useState } from "react"
import { axiosPrivate } from "../../api/axios"
import { SearchSimpleInput } from "../SearchGeneralize/SearchInput"
import { useEffect } from "react"
import { PaginationComponent } from "../Pagination/Pagination"
import { Link, useParams } from "react-router-dom"

export default function HealthcareAppointments() {

    const URL_GET_PATIENT = "/event/healthpro";
    const URL_EVENT_TYPE = "/event/patientEventTypes"
    const [appointments, setAppointments] = useState([])
    const [keyword, setkeyword] = useState("")
    const [dateKey, setDatekey] = useState("")
    const [filtredEventTypes, setfilteredEventItems] = useState([])
    const [eventTypes, setEventTypes] = useState([])
    const [statPatient, setStatpatient] = useState([])


    const { id_user } = useParams();

    // ---------PAGINATION BASE------------
    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState();
    const [pageSize, setPageSize] = useState(5);



    const fetchAppointments = async (search_key, id_user) => {
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
            // const response = await axiosPrivate.get(URL_GET_HEALTHCARE_PATIENT + id_user, {
            //     headers: headers,
            //     params:
            //         parametres

            // });
            // const data = response.data.content;
            // const totalpage = response.data.totalPages
            // console.log(response.data);

            // setAppointments(data);
            // setTotalElements(totalpage)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        console.log(id_user)
        fetchAppointments(keyword, id_user)

    }, [currentPage, keyword, filtredEventTypes, id_user])


    const handleSearch = ({ searchKeyword, selectedItems, datesearch }) => {

        console.log("Search Keyword:", searchKeyword);
        console.log("Search date:", datesearch);
        setDatekey(datesearch)
        setkeyword(searchKeyword)
        setfilteredEventItems(selectedItems)
        setCurrentPage(0)

    };
    const onPageChange = (page) => {
        console.log("PAGE", page)
        setCurrentPage(page);
    };
    const getColorBasedOnFilter = (filterName) => {
        switch (filterName) {
            case 'postponed':
                return 'bg-yellow-200'; // Change this class based on your styling
            case 'made':
                return 'bg-green-400'; // Change this class based on your styling
            case 'missed':
                return 'bg-red-400'; // Change this class based on your styling
            case 'Cancelled_by_patient':
                return 'bg-black'; // Change this class based on your styling
            case 'Cancelled_by_healthpro':
                return 'bg-gray-400'; // Change this class based on your styling
            case 'appointment':
                return 'bg-blue-500';
            case 'total':
                return 'bg-blue-700';
            case 'canceled':
                return 'bg-gray-500';
            case 'waiting':
                return 'bg-blue-500';

            default:
                return 'bg-gray-200'; // Default color if the filter name doesn't match
        }
    };

    return (
        <section class="bg-white dark:bg-gray-900 h-96 p-4 sm:ml-64">
            <h2 class="text-2xl font-bold text-gray-400">LISTE DES RENDEZ-VOUS DU PATIENT :</h2>
            {/* <SearchSimpleInput onSearch={handleSearch} filters={[]} disableCalendarInput={false}>  </SearchSimpleInput> */}
            <div class="relative overflow-x-auto my-4">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Rendez vous avec
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date Rendez-vous
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description du rendez vous
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status du rendez vous
                            </th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (

                            appointments.map((appointment, index) => {
                                const dateObject = new Date(appointment.rdv_date);

                                const formattedDate = dateObject.toLocaleString('fr-FR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: false
                                });
                                const presentDay = new Date();

                                const isFutur = dateObject >= presentDay;
                                // console.log(isFutur);

                                return (
                                    <>
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {formattedDate}
                                            </th>
                                            <td className="px-6 py-4">
                                                <Link to={`/user/search_healthcare/${appointment.healthpro_id}`} className="hover:text-blue-400" >

                                                    {appointment.healthpro_firstname} {appointment.healthpro_name}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4" key={appointment.patient_id}>
                                                {appointment.patient_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {appointment.reason}
                                            </td>
                                            <td className="px-6 py-4 flex items-center justify-center">

                                                <div
                                                    className={`h-4 w-4 mr-2 rounded-full ${getColorBasedOnFilter(appointment.event_name)
                                                        }`}
                                                ></div>

                                                {/* {translateFilterName(appointment.event_name)} */}
                                            </td>
                                            <td className="px-6 py-4 items-center">
                                                <div className="flex justify-items-center">
                                                </div>
                                            </td>
                                           
                                        </tr>

                                    </>

                                )
                            }
                            )
                        ) : <p class="text-gray-500 dark:text-gray-400 text-center mt-4 w-full ">
                            Pas de données disponibles
                        </p>
                        }
                        <PaginationComponent currentPage={currentPage} totalPages={totalElements} onPageChange={onPageChange}></PaginationComponent>

                    </tbody>
                </table>
            </div>

        </section>
    )
}