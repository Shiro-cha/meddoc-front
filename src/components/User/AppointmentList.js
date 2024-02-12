import { useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";
import { SearchSimpleInput } from "../SearchGeneralize/SearchInput";
import { PaginationComponent } from "../Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";




export default function Appointments() {
    const URL_GET_PATIENT = "/event/patient";
    const URL_CANCEL_PATIENT = "/event/cancelByPatient";
    const URL_EVENT_TYPE = "/event/patientEventTypes"
    const URL_STAT_PATIENT_APPOINTMENT_COUNT = "/stat/patient";

    const [appointments, setAppointments] = useState([])
    const [keyword, setkeyword] = useState("")
    const [dateKey, setDatekey] = useState("")
    const [filtredEventTypes, setfilteredEventItems] = useState([])
    const [eventTypes, setEventTypes] = useState([])
    const [statPatient, setStatpatient] = useState([])

    // ---------PAGINATION BASE------------
    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState();
    const [pageSize, setPageSize] = useState(5);



    useEffect(() => {

        setAppointments("")
        fetchAppointments(keyword, filtredEventTypes, dateKey)
        fetchEventType()
        fetchStatPatient()

    }, [currentPage, keyword, filtredEventTypes, dateKey])


    const fetchAppointments = async (search_key, filtres, dateKey) => {
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        const eventTypeIdsParam = filtres.join(',');

        let parsedDatekey
        if (dateKey.trim() !== "") {
            parsedDatekey = new Date(dateKey);
        } else {
            parsedDatekey = null;
        }

        const parametres = {
            page: currentPage,
            size: pageSize,
            keyword: `${search_key}`,
            eventTypeIds: eventTypeIdsParam,
            date: parsedDatekey
        }

        try {

            const response = await axiosPrivate.get(URL_GET_PATIENT, {
                headers: headers,
                params:
                    parametres
            });
            const data = response.data.content;
            const totalpage = response.data.totalPages

            setAppointments(data);
            setTotalElements(totalpage)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchStatPatient = async () => {
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        try {
            const response = await axiosPrivate.get(URL_STAT_PATIENT_APPOINTMENT_COUNT, { headers: headers })
            setStatpatient(response.data)

        }
        catch (err) {
            console.log(err)
        }
    }

    const fetchEventType = async () => {
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            const response = await axiosPrivate.get(URL_EVENT_TYPE, { headers: headers })
            setEventTypes(response.data)
        }
        catch (err) {
            console.log(err)
        }

    }



    const cancelAppointment = async (id_appointment) => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        try {

            Swal.fire({
                title: "Voulez-vous vraiment annuler ce rendez-vous ?",
                text: "Des annulations fréquentes de rendez-vous peuvent entraîner la suspension du compte.",
                showCancelButton: true,
                icon: 'warning',
                cancelButtonText: "Annuler",
                buttonsStyling: false,
                confirmButtonText: "Accepter",
                customClass: {
                    cancelButton: 'mx-4 text-white inline-flex items-center bg-red-400 hover:bg-red-400 focus:ring-2 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
                    confirmButton: 'mx-4 text-white inline-flex items-center bg-blue-700 hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
                },

            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    try {
                        await axiosPrivate.put(`${URL_CANCEL_PATIENT}/${id_appointment}`, {}, { headers: headers })
                        fetchAppointments(keyword, filtredEventTypes, dateKey)
                        Swal.fire("Terminer !", "", "success");
                    }
                    catch (err) {
                        Swal.fire("Erreur !", "", "error");
                    }
                }
            });


        }
        catch (err) {
            console.error('Error:', err);
        }
    }

    const navigate = useNavigate();

    // View consultation
    const view_consultation = async (data) => {

        navigate("/user/" + data?.id + "/one_consultation", { state: { data } })
    }


    const handleSearch = ({ searchKeyword, selectedItems, datesearch }) => {

        console.log("Search Keyword:", searchKeyword);
        console.log("Search date:", datesearch);
        setDatekey(datesearch)
        setkeyword(searchKeyword)
        setfilteredEventItems(selectedItems)
        setCurrentPage(0)

    };

    const [sortOrder, setSortOrder] = useState("asc");
    const [sortOrderStatus, setSortOrderStatus] = useState("asc");


    const handleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        console.log(sortOrder)
    };
    const handleSortStatus = () => {
        setSortOrderStatus(sortOrderStatus === "asc" ? "desc" : "asc");
        console.log(sortOrderStatus)
    };

    const onPageChange = (page) => {
        console.log("PAGE", page)
        setCurrentPage(page);
    };


    const StatusMap = {
        'total': 'Total',
        'made': 'Réalisé',
        'missed': 'Manqué',
        'postponed': 'Reporté',
        'waiting': 'À venir',
        'canceled': 'Annulé',
        "Need_feedback": "En attente de retour"
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
            case 'Need_feedback':
                return 'bg-gray-200';

            default:
                return 'bg-red-200'; // Default color if the filter name doesn't match
        }
    };



    return (
        <section class="bg-white dark:bg-gray-900 h-96 p-2 sm:ml-64">
            <h2 class="text-2xl font-bold text-gray-400">LISTE DES RENDEZ-VOUS</h2>
            {/* Search----------------------- */}
            <SearchSimpleInput onSearch={handleSearch} filters={eventTypes} disableCalendarInput={true}>  </SearchSimpleInput>
            <div className="mb-4 mx-auto w-full items-center justify-center grid grid-cols-6 px-20">

                {Object.keys(statPatient).map((status, index) => (
                    <div key={index}>
                        <h5 className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white ${getColorBasedOnFilter(status)}`}>
                            {StatusMap[status]}
                            <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold rounded-full">
                                {statPatient[status]}
                            </span>
                        </h5>
                    </div>
                ))}
            </div>

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 flex" onClick={handleSort}>
                                Date

                            </th>
                            <th scope="col" class="px-6 py-3" onClick={handleSort}>
                                Avec
                                {/* <svg class="w-4 -h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"></path>
                                </svg> */}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                NOM

                            </th>
                            <th scope="col" class="px-6 py-3">
                                Prénom(s)

                            </th>
                            <th scope="col" class="px-6 py-3">
                                Raison

                            </th>

                            <th scope="col" class="px-6 py-3 flex" onClick={handleSortStatus}>
                                Status
                                {/* <svg class="w-4 h-4 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"></path>
                                </svg> */}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Modifier
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Rapport
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
                                        <tr key={appointment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {formattedDate}
                                            </th>
                                            <td className="px-6 py-4">
                                                <Link to={`/user/search_healthcare/${appointment.healthpro_id}`} className="hover:text-blue-400" >
                                                    Dr {appointment.healthpro_name} {appointment.healthpro_firstname}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4" key={appointment.patient_id}>
                                                {appointment.patient_name}
                                            </td>
                                            <td className="px-6 py-4" key={appointment.patient_id}>
                                                {appointment.patient_first_name}
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
                                                    {
                                                        isFutur ? (appointment.event_name === "appointment" && (
                                                            <button key={index} onClick={() => cancelAppointment(appointment.id)} className="text-red-500 hover:text-red-600">
                                                                Annuler
                                                            </button>
                                                        )) : !isFutur ? (
                                                            <p>/</p>
                                                        ) : (
                                                            <p>/</p>

                                                        )
                                                    }

                                                </div>
                                            </td>
                                            <td className="px-6 py-4 flex items-center justify-center">

                                                {
                                                    appointment.event_name === "made" && (
                                                        <button onClick={() => { view_consultation(appointment) }}>

                                                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.828 10h6.239m-6.239 4h6.239M6 1v4a1 1 0 0 1-1 1H1m14-4v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z" />
                                                            </svg>

                                                        </button>
                                                    )
                                                }
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