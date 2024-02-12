import { addDays, format, isAfter, isThisWeek, parseISO, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import Cookies from "js-cookie";

export function SummaryHealthcare({ healthcare_profil }) {

    const match = useMatch('admin/healthcare/:id');
    const GET_AGENDA_URL = ('/agenda/agendaTypes')

    let [healthcare_validHours, setHealthcare_validHours] = useState(
        []
    )


    const [appointmentsData, setappointmentsData] = useState({})


    // ALl list of healthcare services
    const fetchAppointmentForEachDoctorID = async (healthcareId, parametres) => {

        try {

            const response = await axios.post(GET_AGENDA_URL, parametres);
            const appointments = response.data.map((appointment) => ({
                title: 'LIBRE',
                _start: appointment._start,
                _end: appointment._end,

            }));

            setappointmentsData({ healthcareId, appointments });
            setHealthcare_validHours(appointments)



        } catch (error) {
            console.error('Error fetching data for doctor:', error);
            return { healthcareId, appointments: [] };
        }
    }
    let [currentWeekStart, setCurrentWeekStart] = useState(startOfDay(new Date()));


    useEffect(() => {
        const healthcareId = healthcare_profil?.healthPro_id || match?.params.id;
        const currentWeekEnd = addDays(currentWeekStart, 4);
        const currentWeekStartISO = format(currentWeekStart, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        const currentWeekEndISO = format(currentWeekEnd, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

        if (healthcareId) {
            const params = {
                healthProId: parseInt(healthcareId),
                start: currentWeekStartISO,
                end: currentWeekEndISO,
            };
            fetchAppointmentForEachDoctorID(healthcareId, params)
        }
    }, [currentWeekStart, healthcare_profil?.id, match?.params.id])






    const days = useMemo(() => {
        const next5Days = [];
        for (let i = 0; i < 5; i++) {
            const nextDay = addDays(currentWeekStart, i);
            next5Days.push(nextDay);
        }
        return next5Days;
    }, [currentWeekStart]);


    function prevWeek(index) {
        setCurrentWeekStart(addDays(currentWeekStart, -5));
    }

    function nextWeek(index) {
        setCurrentWeekStart(addDays(currentWeekStart, 5));
    }
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Paginations

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalpage: 1,
    });

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
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>

                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>

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

    const navigate = useNavigate();

    // CLick appointment
    function handleAppointmentClick(daydata, datekey, healthpro) {
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
                navigate("/user/take_appointment/" + healthpro.healthPro_id + "/" + datekey + "/" + daydata._start + "/" + daydata._end)
            }
            else {
                navigate('/login')
            }
        }
        catch (err) {
            console.error('Error fetching data:', err);

        }



    }
    return (
        <div class="mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#" className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="28" height="28" viewBox="0 0 15 15"><path fill="none" stroke="currentColor" d="M3.5 0v5m8-5v5M3 7.5h3m6 0H9m-6 3h3m3 0h3m-10.5-8h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" /></svg>
                <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Horaire</h5>
            </a>

            {/* Calendrier implementation */}
            <div className=" flex-col gap-1 w-full bg-white ">

                {/* Calendar body */}
                <div className="bg-white flex ">

                    {/* PREVIOUS BUTTON */}
                    <div className=" ">
                        <button
                            type="button "
                            className="flex justify-center mt-5 mx-auto"
                            onClick={() => prevWeek()}
                            disabled={isThisWeek(new Date(currentWeekStart))}
                        >
                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke={isThisWeek(new Date(currentWeekStart)) ? 'gray' : 'black'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </button>
                    </div>



                    {/* Calendar elements  */}
                    <div className="grid grid-cols-5 mt-0 mx-0 justify-items-center w-full h-[350px] overflow-auto  z-1">
                        {days.map((date, index) => {
                            const dayKey = format(date, 'yyyy-MM-dd');
                            // Filter valid hours for the specified dayKey
                            const validHoursForDays = healthcare_validHours.filter(hour => {
                                const start = new Date(hour._start);

                                const hourDayKey = format(start, 'yyyy-MM-dd'); // Assuming the date is in the same format as dayKey
                                // console.log(hourDayKey)
                                return hourDayKey === dayKey;
                            });
                            console.log(validHoursForDays)

                            // HEURES de disponibilité
                            const validHourArrays = healthcare_validHours.length > 0 ? healthcare_validHours : ["-"];

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
                                const date = parseISO(dateTimeString);
                                return format(date, 'HH:mm');
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

                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center space-between text-sm text-blue-500 font-bold w-full px-2 py-4 overflow-y  "

                                >
                                    <div className="sticky top-0 bg-white px-2 py-1  z-[2]">
                                        <div className="">{capitalize(format(date, "EEEE", { locale: fr }))}</div>
                                        <div classname="flex">{format(date, "d", { locale: fr })} {capitalize(format(date, "MMM", { locale: fr }))} {format(date, "yyyy")}</div>
                                    </div>
                                    <div className="flex flex-col gap-y-2">

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
                                                                        handleAppointmentClick(dayData, dayKey, healthcare_profil);
                                                                    }
                                                                }}
                                                            >
                                                                {formattedStartTime}
                                                                {/* {formattedEndTime} */}
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
                        })}
                    </div>



                    {/* NEXT BUTTON */}
                    <div className="">
                        <button
                            type="button"
                            className="flex justify-center w-4 h-4 mt-5 mx-auto"
                            onClick={nextWeek}
                        // disabled={isThisWeek(new Date(currentWeekStart)) }
                        >
                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke={'gray'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </button>
                    </div>

                </div>


            </div>




            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
            {/* {!match && (<a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center uppercase text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4 mr-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                </svg>
                Prendre rendez-vous
            </a>)} */}
        </div>
    )

}
export function PresentationHealthcare({ healthcare_profil }) {
    console.log(healthcare_profil.description)
    const [healthcare_description, sethealthcareDescription] = useState([]);

    const [showMore, setShowMore] = useState(false);
    // const parsedData = JSON.parse(healthcare_profil);
    // sethealthcareDescription(parsedData)

    useEffect(() => {
        try {
            const parsedDescription = JSON.parse(healthcare_profil.description);
            sethealthcareDescription(parsedDescription);
        } catch (error) {
            console.error('Error parsing healthcare description:', error);
        }
    }, [healthcare_profil.description]);

    const handleToggle = () => {
        setShowMore(!showMore);
    };


    return (
        <div class="my-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {/* <a href="#">
                <h4 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Presentation :</h4>
            </a>
            <div className="lg:w-1/2">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {showMore ? bref_description : bref_description.slice(0, 300)}
                    {bref_description.length > 300 && !showMore && (
                        <span>
                            ...{" "}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={handleToggle}
                            >
                                Voir plus
                            </button>
                        </span>
                    )}
                </p>

            </div> */}
            {/* <hr></hr> */}
            <h4 class="mt-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="mr-2" viewBox="0 0 48 48"><defs><mask id="ipTDegreeHat0"><g fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"><path fill="#555" d="M2 17.4L23.022 9l21.022 8.4l-21.022 8.4L2 17.4Z" /><path stroke-linecap="round" d="M44.044 17.51v9.223m-32.488-4.908v12.442S16.366 39 23.022 39c6.657 0 11.467-4.733 11.467-4.733V21.825" /></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTDegreeHat0)" /></svg>

                Diplômes nationaux et universitaires :</h4>
            <ul className="mb-4">
                {healthcare_description?.diplome && healthcare_description?.diplome.map((diplome, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-400 flex justify-start m-2">
                        <div className="mr-10 font-semibold tracking-tight text-gray-900 dark:text-white ">
                            {diplome.anne_diplome}
                        </div>
                        <div>
                            {diplome.lieu_diplome}
                        </div>
                    </li>
                ))}
            </ul>
            <hr></hr>

            <h4 class="mt-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v11q0 .825-.587 1.413T20 21H4Zm0-2h16V8H4v11Zm6-13h4V4h-4v2ZM4 19V8v11Z" /></svg>

                Expériences :</h4>
            <ul>
                {healthcare_description?.Experiences && healthcare_description?.Experiences.map((experience, index) => (

                    <li key={index} className="text-gray-700 dark:text-gray-400 my-2">
                        <div className="flex">
                            <div className="mr-4 font-semibold tracking-tight text-gray-900 dark:text-white ">
                                {experience.dateDebut} - {experience.dateFin}
                            </div>
                            <div >
                                {experience.poste}
                            </div>
                        </div>
                        {experience?.entreprise && (
                            <div className="m-2 ml-4">
                                {experience.entreprise}.
                            </div>
                        )}
                        <div className="ml-4">
                            <p>
                                {experience.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )

}
export function HoraireHealthcare(healthcare_profil) {
    return (
        <div class="my-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Horaire</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>


        </div>
    )

}
export function TarifsHealthcare({ healthcare_profil }) {
    console.log(healthcare_profil.description)
    const [healthcare_description, sethealthcareDescription] = useState([]);

    useEffect(() => {
        try {
            const parsedDescription = JSON.parse(healthcare_profil.description);
            sethealthcareDescription(parsedDescription);
        } catch (error) {
            console.error('Error parsing healthcare description:', error);
        }
    }, [healthcare_profil.description]);


    return (
        <div class="my-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="25" height="25" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M403.29 32H280.36a14.46 14.46 0 0 0-10.2 4.2L24.4 281.9a28.85 28.85 0 0 0 0 40.7l117 117a28.86 28.86 0 0 0 40.71 0L427.8 194a14.46 14.46 0 0 0 4.2-10.2v-123A28.66 28.66 0 0 0 403.29 32Z" /><path fill="currentColor" d="M352 144a32 32 0 1 1 32-32a32 32 0 0 1-32 32Z" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m230 480l262-262a13.81 13.81 0 0 0 4-10V80" /></svg>

                <h5 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Tarif(s) :</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
            <ul>
                {healthcare_description?.tarifs && healthcare_description?.tarifs.length > 1 && <hr />}

                {healthcare_description?.tarifs && healthcare_description?.tarifs.map((tarif, index) => (
                    <>
                        <li key={index} className="text-gray-700 dark:text-gray-400 flex m-2 justify-between">
                            <div className="w-1/2">
                                <p className="mr-10 font-semibold tracking-tight text-gray-900 dark:text-white self-center">
                                    {tarif.description}
                                </p>
                            </div>
                            <div className="font-bold ">
                                {tarif.prix}
                            </div>
                        </li>
                        {healthcare_description.tarifs.length > 1 && <hr />}

                    </>
                ))}
            </ul>

        </div>
    )

}

export function ContactHealthcare(healthcare_profil) {
    return (
        <div class=" p-6 h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contacts</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>

        </div>
    )

}