import { useEffect, useState, useMemo } from "react";
import axios, { axiosPrivate, axiosSearch } from "../../api/axios";


import doctor_portrait from "../../assets/image/doctor_portrait.jpg"
import { Link, redirect, useNavigate } from 'react-router-dom';


import {
    add,
    addDays,
    addHours,
    eachDayOfInterval,
    eachMinuteOfInterval,
    endOfDay,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isAfter,
    isBefore,
    isEqual,
    isSameMonth,
    isThisMonth,
    isThisWeek,
    isToday,
    parse,
    parseISO,
    set,
    startOfDay,
    startOfToday,
    startOfWeek,
    startOfYesterday,
} from "date-fns";

import { fr } from "date-fns/locale"
import Cookies from "js-cookie";
import Loaderpulse from "../loader/loader_pulse";

import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';
import { RefreshGetListRelative } from "./User_Setting";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";



const READ_FILTER_DOCTOR_URL = "domain/_search"
const GET_AGENDA_URL = ('/agenda/agendaTypes')
const TAKE_RENDEZ_VOUS = ('/event/takeAppointment')
const PROCHE_LIST_URL = "/user/readRelative"


function Searchhealthcare({ searchQuery, searchQueryWhere }) {

    const navigate = useNavigate();
    const isSearchPage = window.location.pathname.startsWith('/search');

    const [doctorData, setDoctorData] = useState([]);
    const [proche_data, setProcheData] = useState([])
    const [modalData, setModalData] = useState({
        dayData: null,
        dayKey: null,
        doctorId: null,
    });

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalpage: 1,
    });

    const [isLoading, setIsLoading] = useState(false);

    const [healthProIds, sethealthProIds] = useState([
        { _id: 87 },
        { _id: 88 },
    ]);

    const [appointmentsData, setappointmentsData] = useState()


    const fetchAppointmentForEachDoctorID = async (healthcareId) => {
        const currentWeekEnd = addDays(currentWeekStart, 4);
        const currentWeekStartISO = format(currentWeekStart, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        const currentWeekEndISO = format(currentWeekEnd, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        // console.log("START:", currentWeekStartISO)
        // console.log("END:", currentWeekEndISO)
        // console.log("HEALCAREID", healthcareId)

        try {
            const params = {
                healthProId: parseInt(healthcareId),
                start: currentWeekStartISO,
                end: currentWeekEndISO,
            };

            const response = await axios.post(GET_AGENDA_URL, params);
            const appointments = response.data.map((appointment) => ({
                title: 'LIBRE',
                _start: appointment._start,
                _end: appointment._end,
                location: 'Room 1',
            }));


            return { healthcareId, appointments };
        } catch (error) {
            console.error('Error fetching data for doctor:', error);
            return { healthcareId, appointments: [] };
        }
    }
    // fetch All doctors list on mount
    useEffect(() => {
        setIsLoading(true);
        // navigate(`/user?searchQuery=${searchQuery}&searchQueryWhere=${searchQueryWhere}`);

        const parametres = {
            name: searchQuery,
            ou: searchQueryWhere,
            page: pagination.currentPage, // Pass the current page
        }

        //---------------------------------------- QUERY ELASTIC----------------------------------------
        let query;
        const normalizedSearchQuery = searchQuery ? searchQuery.toLowerCase() : '';
        const normalizedSearchQueryWhere = searchQueryWhere ? searchQueryWhere.toLowerCase() : ""

        // if (normalizedSearchQuery !== '' || normalizedSearchQueryWhere !== '') {

        //     query = {
        //         bool: {
        //             must: [],
        //         },
        //     };

        //     if (normalizedSearchQueryWhere !== '') {
        //         query.bool.must.push({
        //             term: {
        //                 address: normalizedSearchQueryWhere,
        //             },
        //         });
        //     }

        //     if (normalizedSearchQuery !== '') {
        //         query.bool.must.push({
        //             bool: {
        //                 should: [
        //                     { wildcard: { name: '*' + normalizedSearchQuery + '*' } },
        //                     { wildcard: { firstname: '*' + normalizedSearchQuery + '*' } },
        //                     { wildcard: { contact: '*' + normalizedSearchQuery + '*' } },
        //                     { wildcard: { email: '*' + normalizedSearchQuery + '*' } },
        //                 ],
        //             },
        //         });
        //     }
        // } else {
        //     query = {
        //         match_all: {},
        //     };
        // }


        if (normalizedSearchQuery !== '' || normalizedSearchQueryWhere !== '') {

            query = {
                bool: {
                    must: [],
                },
            };

            if (normalizedSearchQueryWhere !== '') {
                query.bool.must.push({
                    // term: {
                    //     address: normalizedSearchQueryWhere,
                    // },

                    "match": {
                        "address": normalizedSearchQueryWhere
                    }

                });
            }

            if (normalizedSearchQuery !== '') {
                query.bool.must.push({

                    // should: [
                    //     { wildcard: { name: '*' + normalizedSearchQuery + '*' } },
                    //     { wildcard: { firstname: '*' + normalizedSearchQuery + '*' } },
                    //     { wildcard: { contact: '*' + normalizedSearchQuery + '*' } },
                    //     { wildcard: { email: '*' + normalizedSearchQuery + '*' } },
                    // ],

                    "query_string": {
                        "fields": ["firstname", "name", "speciality^5", "order_num", "contact", "keywords^5", "email"],
                        "query": '*' + normalizedSearchQuery + '*'
                    }


                });
            }
        } else {
            query = {
                match_all: {},
            };
        }



        axiosSearch.post(READ_FILTER_DOCTOR_URL, {
            query
        })
            .then(async (response) => {
                // console.log(response);
                const fetchedHealhtcareData = response.data.hits.hits;

                setDoctorData(fetchedHealhtcareData);
                const extractedIds = fetchedHealhtcareData.map((healthcare) => healthcare._id);
                sethealthProIds(extractedIds);

                console.log("EXTREACTED ID", extractedIds);


                const appointmentsPromises = extractedIds.map((doctorId) => fetchAppointmentForEachDoctorID(doctorId));
                const appointmentsData = await Promise.all(appointmentsPromises);
                setappointmentsData(appointmentsData)
                console.log("Appointments Data for Each Doctor ID:", appointmentsData);

                setPagination({
                    currentPage: response.data.page,
                    totalPages: response.data.size,
                });

                setIsLoading(false);
            })

            .catch((error) => {

                console.error('Error fetching data:', error);
                setPagination({ currentPage: 0 })
                setDoctorData([])
                setIsLoading(false);
            });

    }, [pagination.currentPage, searchQuery, searchQueryWhere]);


    const [visible, setVisible] = useState(false);

    const show = async () => {
        list_all_relatives()
        setVisible(true);

    };

    const hide = () => {
        setVisible(false);
    };


    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedRelative, setSelectedRelative] = useState("");

    let [currentWeekStart, setCurrentWeekStart] = useState(startOfDay(new Date()));

    const methods_take_appointment = useForm()

    // useEffect(() => {

    //     // Rest of your code
    // }, [currentWeekStart, healthProIds]);

    // Date selection

    let today = startOfToday()

    const days = useMemo(() => {
        const next5Days = [];
        for (let i = 0; i < 5; i++) {
            const nextDay = addDays(currentWeekStart, i);
            next5Days.push(nextDay);
        }
        return next5Days;
    }, [currentWeekStart]);


    // Paginations
    function pagination_component() {
        return (
            <div className="sm:w-auto mx-auto sm:ml-64 " >
                <nav aria-label="Page navigation example " className="p-4 ">
                    <ul class="inline-flex items-center justify-center  text-sm">
                        <li>
                            <button onClick={prevPage}
                                class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" >Précedent</button>
                        </li>
                        <li>
                            <a href="" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>

                        </li>
                        <li>
                            <a href="" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>

                        </li>
                        <li>

                            <button onClick={nextPage} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Suivant</button>
                        </li>
                    </ul>
                </nav>
            </div>
        )

    }
    // Pagination precedent 
    function prevPage() {
        if (pagination.currentPage > 0) {
            setPagination((prevPagination) => ({
                ...prevPagination,
                currentPage: prevPagination.currentPage - 1,
            }));
        }
    }
    // Pagination suivante
    function nextPage() {
        if (pagination.currentPage < pagination.totalPages - 1) {
            setPagination((prevPagination) => ({
                ...prevPagination,
                currentPage: prevPagination.currentPage - 1,
            }));
        }
    }

    const list_all_relatives = async () => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        const response = await axiosPrivate.get(PROCHE_LIST_URL, { headers: headers }).then((response) => {

            setProcheData(response.data);
        }, [])

            .catch((error) => {
                setProcheData([])
                console.error('Error fetching data:', error);
            });
        console.log(response)
    }

    const onsubmit_take_appointment = (hour, dayKey, healthProId) => methods_take_appointment.handleSubmit(async appointment_input_informations => {
        try {
            const accessToken = Cookies.get('jwtToken')
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };

            const params = {
                "patientId": selectedRelative,
                "description": "PRENDRE RDV",
                "healthProId": healthProId,
                "end": hour._end,
                "start": hour._start
            };
            console.log(params);

            Swal.fire({
                title: "Voulez vous vraiment prendre ce rendez-vous?",
                showCancelButton: true,
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
                        await axiosPrivate.post(TAKE_RENDEZ_VOUS, params, { headers: headers })
                        Swal.fire("Rendez vous pris!", "", "success");
                    }
                    catch (err) {
                        Swal.fire("Erreur !", "", "error");

                    }


                }
            });



        } catch (err) {
            Swal.fire("Erreur !", "", "error");

        }

    })

    // Click rendez_vous
    const handleAppointmentClick = async (daydata, datekey, healthpro) => {
        console.log(daydata)
        console.log(datekey)

        const dateObject = new Date(daydata._start);

        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;


        const accessToken = Cookies.get('jwtToken')
        const role = Cookies.get('role')


        try {
            if (accessToken && role === 'patient') {
                navigate("/user/take_appointment/" + healthpro + "/" + datekey + "/" + daydata._start + "/" + daydata._end)
            }
            else {
                navigate('/login')
            }
        }
        catch (err) {
            console.error('Error fetching data:', err);

        }



    };

    return (
        <>
            {
                isLoading ? (
                    <div className="sm:ml-64">

                        <div className="flex flex-col items-center justify-center ">
                            <Loaderpulse>
                            </Loaderpulse>
                        </div>
                    </div>
                ) : doctorData.length > 0 ?
                    (
                        <>
                            {doctorData.map((doctor, index) => {
                                const doctorId = doctor._id
                                // console.log("DOCTOR ID", doctorId);
                                // console.log("DOCTOR APPOINTMENT DATA", appointmentsData);

                                const doctorAppointments = appointmentsData.find((data) => {
                                    // console.log('data.healthcareId._id:', data.healthcareId);
                                    // console.log('DOCTOR ID:', doctorId);
                                    return data.healthcareId === doctorId;
                                });


                                const found = doctorAppointments !== undefined;
                                // console.log(found);
                                return (
                                    <div className={`bg-grey-400  ${!isSearchPage ? 'p-4 sm:ml-64' : 'px-20 py-4'} rounded-lg`} key={index}>
                                        <div class="flex flex-col items-center w-full shadow-md rounded-lg ">
                                            <div className="flex mx- overflow-hidden  w-full shadow ">
                                                <div class="bg-gray-100 flex flex-col w-full items-center lg:w-[350px] py-3 px-4">
                                                    <div class="photo-wrapper p-2">
                                                        <img class="w-20 h-20 object-cover rounded-full mx-auto" src={doctor_portrait} alt="John Doe">
                                                        </img>
                                                    </div>
                                                    <div class="flex flex-col w-full items-center justify-center">
                                                        <div>
                                                            <h2 className="text-2xl font-semibold mb-2">Dr {doctor._source.name} {doctor._source.firstname}</h2>
                                                            <>
                                                                <p className="text-gray-600 text-sm"></p>
                                                                <p className="text-gray-600 text-sm mt-2">Specialité: {doctor._source.speciality}</p>
                                                                <p className="text-gray-600 text-sm mt-2 ">Address: {doctor._source.address}</p>
                                                                <p className="text-gray-600 text-sm mt-2 ">Contact: {doctor._source.contact}</p>
                                                                <p className="text-gray-600 text-sm my-2 ">Email: {doctor._source.email}</p>
                                                            </>
                                                        </div>

                                                        <div class="text-center m-10">
                                                            {Cookies.get('jwtToken') ? (
                                                                <Link to={`search_healthcare/${doctor._id}`} class="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4" href="s">Voir le profil</Link>

                                                            ) : (

                                                                <Link to={`/search_healthcare/${doctor._id}`} class="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4" href="s">Voir le profil</Link>
                                                            )
                                                            }

                                                        </div>

                                                    </div>
                                                </div>

                                                {/* Calendrier implementation */}
                                                <div className="hidden lg:block flex-col gap-1 w-full bg-white h-[350px] relative ">

                                                    {/* Calendar body */}
                                                    <div className="bg-gray-200 h-[350px]">
                                                        <div className="grid grid-cols-5 mt-0 mx-0 justify-items-center overflow-hidden ">

                                                            {doctorAppointments ? (


                                                                days.map((date, i) => {
                                                                    const dayKey = format(date, 'yyyy-MM-dd');

                                                                    // ------------------TEST----------------------------------------------------


                                                                    // Filter valid hours for the specified dayKey
                                                                    const validHoursForDays = doctorAppointments.appointments.filter(hour => {
                                                                        const start = new Date(hour._start);

                                                                        const hourDayKey = format(start, 'yyyy-MM-dd'); // Assuming the date is in the same format as dayKey
                                                                        // console.log(hourDayKey)
                                                                        return hourDayKey === dayKey;
                                                                    });

                                                                    // If validHoursForDay is empty, set it to ["-"]
                                                                    const validHourArrays = validHoursForDays.length > 0 ? validHoursForDays : ["-"];

                                                                    const maxLength = validHourArrays.length > 0 ? Math.max(...validHourArrays.map(hours => hours.length)) : 0;

                                                                    const validHoursForDay = validHoursForDays.reduce((result, hour) => {
                                                                        const start = new Date(hour._start);
                                                                        const hourDayKey = format(start, 'yyyy-MM-dd');

                                                                        if (!result[hourDayKey]) {
                                                                            result[hourDayKey] = [];
                                                                        }

                                                                        result[hourDayKey].push({
                                                                            _start: hour._start,
                                                                            _end: hour._end,
                                                                        });

                                                                        return result;
                                                                    }, {});


                                                                    function formatTime(dateTimeString) {
                                                                        if (dateTimeString === "-") {
                                                                            return "-";
                                                                        }

                                                                        const date = parseISO(dateTimeString); // Parse the date string into a Date object
                                                                        return format(date, 'HH:mm'); // Format the Date object as "HH.mm"
                                                                    }


                                                                    function createDashesObject() {
                                                                        return {
                                                                            _start: "-",
                                                                            _end: "-"
                                                                        };
                                                                    }

                                                                    // Calculate the number of dashes needed
                                                                    const dashesNeeded = maxLength - Object.keys(validHoursForDay).length;

                                                                    // Fill validHoursForDay with dashes
                                                                    for (let i = 0; i < dashesNeeded; i++) {
                                                                        const dayKey = format(date, 'yyyy-MM-dd');
                                                                        validHoursForDay[dayKey] = createDashesObject();
                                                                    }
                                                                    const formattedDate = format(date, 'dd MMMM', { locale: fr });
                                                                    return (
                                                                        <div
                                                                            key={i}
                                                                            className="flex flex-col items-center text-center text-sm text-blue-500 font-bold w-full px-2 py-4  "
                                                                        >
                                                                            <div className="">
                                                                                {format(date, "EEEE", { locale: fr }).charAt(0).toUpperCase() + format(date, "EEEE", { locale: fr }).slice(1)}
                                                                            </div>
                                                                            <div>{formattedDate}</div>
                                                                            <div className="flex flex-col gap-2 mt-4">
                                                                                {Object.keys(validHoursForDay).map((dayKey, index) => {
                                                                                    if (Array.isArray(validHoursForDay[dayKey])) {
                                                                                        return validHoursForDay[dayKey].map((dayData, hourIndex) => {
                                                                                            const formattedStartTime = dayData._start !== "-" ? formatTime(dayData._start) : "";
                                                                                            const formattedEndTime = dayData._end !== "-" ? formatTime(dayData._end) : "";
                                                                                            return (
                                                                                                <>

                                                                                                    <button
                                                                                                        key={index * 100 + hourIndex} // Use a unique key
                                                                                                        className={`${dayData._start !== "-" ? 'bg-gray-500 text-white px-2 py-1 m-1 rounded cursor-pointer w-20 hover-bg-blue-500' : 'bg-gray-400 text-white cursor-auto px-2 py-1 m-1 rounded w-20'}`}
                                                                                                        onClick={() => {
                                                                                                            if (dayData._start !== "-") {
                                                                                                                handleAppointmentClick(dayData, dayKey, doctor._id);
                                                                                                            }
                                                                                                        }}
                                                                                                    >
                                                                                                        {formattedStartTime}
                                                                                                    </button>

                                                                                                </>

                                                                                            );

                                                                                        });
                                                                                    } else {
                                                                                        // Handle the case when validHoursForDay[dayKey] is not an array
                                                                                        return (
                                                                                            <button
                                                                                                key={index}
                                                                                                className="bg-gray-400 text-white cursor-auto px-2 py-1 m-1 rounded w-20"
                                                                                            >
                                                                                                -
                                                                                            </button>
                                                                                        );
                                                                                    }
                                                                                })}

                                                                            </div>

                                                                        </div>
                                                                    );
                                                                })




                                                            ) : (

                                                                days.map((date, i) => {
                                                                    const dayKey = format(date, 'yyyy-MM-dd');


                                                                    return (
                                                                        <div
                                                                            key={i}
                                                                            className="flex flex-col items-center text-center space-between text-sm text-blue-500 font-bold w-full px-2 py-4  "
                                                                        >
                                                                            <div className="">{format(date, "EEEE", { locale: fr })}</div>
                                                                            <div>{format(date, "d")} {format(date, "MM")}</div>
                                                                            <div>
                                                                                <button
                                                                                    key={index}
                                                                                    className="bg-gray-400 text-white cursor-auto px-2 py-1 m-1 rounded w-20"
                                                                                >
                                                                                    - {/* You can add any text or UI element here for non-array cases */}
                                                                                </button>
                                                                            </div>

                                                                        </div>
                                                                    );
                                                                })
                                                            )}



                                                        </div>
                                                    </div>
                                                    <div className="absolute top-[300px] backdrop-blur-md w-full border-none text-md hover:text-blue-300 h-20 left-0 right-0 flex justify-center items-center z-10">
                                                        <Link to={`search_healthcare/${doctor._id}`}>Voir plus</Link>
                                                    </div>
                                                </div>


                                            </div>


                                        </div>

                                    </div>
                                )
                            }

                            )}

                            {/* {pagination_component()} */}


                        </>
                    )
                    : (
                        <div className="sm:ml-64">

                            <div className="flex flex-col items-center justify-center ">
                                <p>Aucun donnée ne correspond aux termes de recherche spécifiés </p>

                            </div>
                        </div>
                    )
            }


        </>

    )

}

export default Searchhealthcare