// import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import { useState, useEffect, useCallback, useMemo } from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { ViewState, EditingState, IntegratedEditing, } from '@devexpress/dx-react-scheduler';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    DragDropProvider,
    DayView,
    ViewSwitcher,
    TodayButton,
    DateNavigator,
    Toolbar,
    MonthView,
    Resources,
    AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';
import setting from '../../assets/svg/setting.svg';

// DATE
import { addDays, format, formatDistance, formatRelative, subDays } from 'date-fns'
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
import Cookies from 'js-cookie';
import { Box, MenuItem, Modal, Select } from '@mui/material';
import { fr } from 'date-fns/locale';
import { useRef } from 'react';
import { toast } from '../Toast/Toast';
import Swal from 'sweetalert2';

const link_setting = "/healthcare/appointment/settings"

//LES RENDEZ-VOUS LIBRES


export const appointments = [

];


const PREFIX = 'Demo';

//RE-USABLES CLASSES
export const classes = {
    container: `${PREFIX}-container`,
    text: `${PREFIX}-text`,
    formControlLabel: `${PREFIX}-formControlLabel`,
};

let GET_AGENDA_URL = ('/event')




const colorMap = {
    'Cancelled_by_healthpro': '#f26d61',
    'appointment': "#4CAF50",
    "unavailability": "#949799",
    "made": "#4287f5",
    "Need_feedback": "#ffb833",
    "missed": "#de0076"
    // "other": "#ffb833"

};

const translationMap = {
    'Cancelled_by_healthpro': 'Rendez-vous que vous avez annuler ',
    'appointment': 'Rendez-vous en attente',
    'unavailability': 'Evènement ou autres',
    "made": "Fait",
    "Need_feedback": "Nécessite une action",
    "missed": "Manqué",

};

const Legend = () => {

    return (
        <div className="flex justify-center flex-col lg:flex-row">
            {Object.keys(colorMap).map((key, index) => (
                <div key={index} className="flex items-center m-4">
                    <div
                        style={{ backgroundColor: colorMap[key], height: '1rem', width: '1rem', borderRadius: '50%', marginRight: '0.5rem' }}
                    ></div>
                    {translationMap[key] ? translationMap[key] : key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
            ))}
        </div>
    );
};

export default function HealthcareCalendar() {
    const match = useMatch('company/healthcare_calendar/:id');

    const navigate = useNavigate();

    // const [appointments,setAppointment] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    const currentDateChange = (newCurrentDate) => {
        setCurrentDate(newCurrentDate);
    };

    const [currentViewName, setCurrentViewName] = useState("Week");

    const currentViewNameChange = (newViewName) => {
        setCurrentViewName(newViewName);
    };

    const [data, setData] = React.useState(appointments);

    const [refresh, setRefresh] = useState(true);

    const [editingOptions, setEditingOptions] = React.useState({
        allowAdding: true,
        allowDeleting: true,
        allowUpdating: true,
        allowDragging: false,
        allowResizing: true,
    });
    const [addedAppointment, setAddedAppointment] = React.useState({});

    useEffect(() => {

        const accessToken = Cookies.get('jwtToken')
        // Calculate the start and end dates for the current week
        let firstDate, endDate;

        if (currentViewName === 'Week') {
            // Calculate the start and end dates for the current week
            firstDate = new Date(currentDate);
            firstDate.setDate(currentDate.getDate() - currentDate.getDay()); // Go back to the start of the week (Sunday)
            endDate = new Date(firstDate);
            endDate.setDate(firstDate.getDate() + 7); // Calculate the end of the week (Saturday)
        } else if (currentViewName === 'Day') {

            firstDate = subDays(new Date(currentDate), 1);
            endDate = addDays(new Date(currentDate), 1);
        } else if (currentViewName === 'Month') {
            // Calculate the start and end dates for the current month
            firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        }

        const formattedstartDate = firstDate.toISOString().split('T')[0];
        const formattedendDate = endDate.toISOString().split('T')[0];

        console.log('Start Date:', formattedstartDate);
        console.log('End Date:', formattedendDate);

        const daysListWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
        const dayOfWeek = daysListWeek[endDate.getDay()];

        console.log(`The day of the week for ${endDate} is ${dayOfWeek}`);

        try {
            let parametres = {
                start: formattedstartDate,
                end: formattedendDate,

            };
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };
            const currentPath = window.location.pathname;
            const targetPath = '/company/healthcare_calendar/';

            if (currentPath.startsWith(targetPath)) {
                const id = match?.params.id;
                parametres = {
                    healthProId: id,
                    start: formattedstartDate,
                    end: formattedendDate,

                };
                // Extract the parameters from the path
                const pathSegments = currentPath.split('/');
                const healthProId = pathSegments[pathSegments.length - 1];

                // Now you can use the healthProId in your request
                GET_AGENDA_URL = `/company/healthcare_calendar/${healthProId}`;
            }


            axiosPrivate.post(GET_AGENDA_URL, parametres, { headers: headers })
                .then((response) => {

                    console.log(response.data)
                    const originalAppointments = response.data.map(appointment => ({
                        id: appointment.id,
                        title: appointment.reason ? (appointment.reason) : 'Rendez-vous',
                        startDate: appointment.start_dt,
                        endDate: appointment.end_dt,
                        reason: appointment.reason,
                        status: appointment.status,
                        event: appointment.event_name,
                        patient: appointment.patient ? {
                            id: appointment?.patient.id,
                            name: appointment.patient.name,
                            firstname: appointment.patient.firstname,
                            email: appointment.patient.email

                        } : null,
                        consultations: appointment.consultation,

                    }));
                    console.log(originalAppointments);
                    setData(originalAppointments);


                }).catch((error) => {
                    console.error('Error fetching data:', error);
                });

        } catch (err) {

            console.error('Error fetching data:', err);

        }


        // Rest of your code
    }, [currentDate, currentViewName, match?.params.id, refresh]);




    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);

    const {
        allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
    } = editingOptions;



    const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            setData([...data, { id: startingAddedId, ...added }]);
            console.log(data);
        }
        if (changed) {
            setData(data.map(appointment => (
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
        }
        if (deleted !== undefined) {

            setData(data.filter(appointment => appointment.id !== deleted));
            console.log(data);
        }
        setIsAppointmentBeingCreated(false);
    }, [setData, setIsAppointmentBeingCreated, data]);


    const onAddedAppointmentChange = useCallback((appointment) => {
        console.log(appointment)
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
    });

    const TimeTableCell = useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
        <WeekView.TimeTableCell
            {...restProps}
            onDoubleClick={allowAdding ? onDoubleClick : undefined}
        />
    )), [allowAdding]);

    const today = {
        today: "Aujourd'hui",
    }
    const viewNames = ['Semaine', 'Jour', "Semaine de travail", "Mois"];


    const Appointment = ({
        children, style, ...restProps
    }) => {

        // BACKGROUND COLORS
        // const colors = restProps.data ? restProps.data.reason : null;
        const event_name = restProps.data ? restProps.data.event : null;
        const start_date = restProps.data ? restProps.data.startDate : null;
        // const end_date = restProps.data ? restProps.data.endDate : null;

        const startDate = new Date(start_date);
        // const endDate = new Date(end_date);
        const now = new Date();
        let backgroundColor;

        console.log("STARt", startDate)
        console.log("now", now)
        console.log("event", event_name)



        if ((startDate > now && event_name in colorMap) || event_name !== "appointment") {
            backgroundColor = colorMap[event_name];
        } else {
            backgroundColor = '#FFC908';
        }

        return (

            <Appointments.Appointment
                {...restProps}
                style={{
                    ...style,
                    backgroundColor,
                    borderRadius: '8px',
                }}
            >
                {children}
            </Appointments.Appointment>
        );


    }

    const URL_CANCEL_HEALTHCARE = "/event/cancelByHealthPro";
    const URL_ADD_EVENT_HEALTHCARE = "/event/putUnavailability";
    const URL_DELETE_EVENT_HEALTHCARE = "/event/deleteUnavailability";
    const URL_ABSENT_EVENT_HEALTHCARE = "/event/absent";


    //--------------APPOINTMENT---------------

    // header
    const Header = ({ children, appointmentData, onHide, ...restProps }) => {
        const [errMsg, setErrMsg] = useState('');

        // JOURS
        const formattedDate = format(new Date(appointmentData.startDate), 'EEEE', { locale: fr });
        const formattedDateUpperCase = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        //HEURES
        const startTime = format(new Date(appointmentData.startDate), 'HH:mm:ss');
        const endTime = format(new Date(appointmentData.endDate), 'HH:mm:ss');

        const startDate = new Date(appointmentData.startDate);
        const now = new Date();
        const [updatedstartTime, setupdateStartTime] = useState(startTime);
        const [updatedendTime, setupdatedEndTime] = useState(endTime);

        const formatTime = (time) => {
            // Ensure the time has seconds (if not provided)
            return time.length === 5 ? `${time}:00` : time;
        };

        //MODIFIER
        const valid_Appointement_submit = async (e) => {
            setErrMsg('');
            e.preventDefault();
            const data = {
                id: appointmentData.id,
                start_time: formatTime(updatedstartTime),
                end_time: formatTime(updatedendTime),
            }

        }

        const ValidationformStep = () => {
            console.log(appointmentData)
            navigate("/healthcare/valid_appointment/" + appointmentData.id, { state: appointmentData })
        }

        //CANCEL APPOINTMENT and DELETE EVENT
        const cancelAppointmentByHealthPro = async () => {
            try {
                onHide();
                Swal.fire({
                    title: appointmentData?.patient ? "Voulez-vous vraiment annuler ce rendez-vous ?" : "Voulez-vous vraiment supprimer cette évènement ?",
                    text: appointmentData?.patient ? "Cette annulation désactive automatiquement cet horaire." : "Cette action réactive les horaires disponibles sur cette évènement .",
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
                        closeTooltip()
                        try {
                            // CANCEL APPOINTMENT
                            if (appointmentData?.patient) {
                                const id = appointmentData.id;
                                const accessToken = Cookies.get('jwtToken');
                                const headers = {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${accessToken}`,
                                };

                                const response = await axiosPrivate.put(`${URL_CANCEL_HEALTHCARE}/${id}`, null, { headers: headers });

                                console.log(response);

                                if (response.status === 200) {
                                    toast('success', "Modification terminée!");
                                    setRefresh(!refresh)
                                    onHide();
                                    handleClose();
                                    closeTooltip()

                                }
                                closeTooltip()
                                Swal.fire("Terminé !", "", "success");

                            }
                            // DELETE EVENT
                            else {
                                const id = appointmentData.id;
                                const accessToken = Cookies.get('jwtToken');
                                const headers = {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${accessToken}`,
                                };

                                const response = await axiosPrivate.delete(`${URL_DELETE_EVENT_HEALTHCARE}/${id}`, { headers: headers });
                                console.log(response);
                                closeTooltip()
                                handleClose();
                                onHide();

                                if (response.status === 200) {
                                    toast('success', "Modification terminée!");
                                    setRefresh(!refresh)
                                    handleClose();
                                    closeTooltip()

                                }


                                handleClose();
                                closeTooltip()
                                Swal.fire("Terminé !", "", "success");
                            }

                        }
                        catch (error) {
                            onHide();
                            handleClose();
                            closeTooltip()
                            console.error("Error:", error);

                            const errorMessage =
                                error.response && error.response.data && error.response.data.message
                                    ? error.response.data.message
                                    : "Erreur !";

                            if (!error.response) {
                                Swal.fire(errorMessage, "", "error");
                            } else if (error.response.status === 400) {
                                Swal.fire(errorMessage, "", "error");
                            } else if (error.response.status === 401) {
                                Swal.fire(errorMessage, "", "error");
                            } else {
                                Swal.fire(errorMessage, "", "error");
                            }

                        }

                    }
                });

            } catch (error) {
                console.error(error);
                handleClose()
                toast('error', "Erreur lors de la modification !")
            }

        }

        // View consultation
        const view_consultation = async (data) => {

            navigate("/healthcare/" + data?.id + "/one_consultation", { state: { data } })

        }

        // MARQUER ABSENT
        const mark_absent = async (data) => {
            try {
                onHide();
                Swal.fire({
                    title: "Voulez-vous marquer ce rendez-vous comme absent ?",
                    text: "Ce marquage d'abscence est irreversible !",
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
                        closeTooltip()
                        try {
                            // MARK ABSENT
                            const id = appointmentData.id;
                            const accessToken = Cookies.get('jwtToken');
                            const headers = {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`,
                            };

                            const response = await axiosPrivate.put(`${URL_ABSENT_EVENT_HEALTHCARE}/${id}`, null, { headers: headers });
                            console.log(response);
                            closeTooltip()
                            handleClose();
                            onHide();

                            if (response.status === 200) {
                                toast('success', "Modification terminée!");
                                setRefresh(!refresh)
                                handleClose();
                                closeTooltip()
                            }


                            handleClose();
                            closeTooltip()
                            Swal.fire("Terminé !", "", "success");


                        }
                        catch (error) {
                            onHide();
                            handleClose();
                            closeTooltip()
                            console.error("Error:", error);

                            const errorMessage =
                                error.response && error.response.data && error.response.data.message
                                    ? error.response.data.message
                                    : "Erreur !";

                            if (!error.response) {
                                Swal.fire(errorMessage, "", "error");
                            } else if (error.response.status === 400) {
                                Swal.fire(errorMessage, "", "error");
                            } else if (error.response.status === 401) {
                                Swal.fire(errorMessage, "", "error");
                            } else {
                                Swal.fire(errorMessage, "", "error");
                            }

                        }

                    }
                });
            } catch (error) {

            }
        }

        // close tooltip
        const closeTooltip = () => {
            onHide();
        };

        const errRef = useRef();


        // HEADER AND CONTENT APPOINTMENT TOOLTIPS

        // Modal close and open
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        return (
            <div
                {...restProps}
                className='flex justify-end space-x-4 bg-gray-50 p-2 '
            >

                {/* Marquer absent */}
                {
                    startDate < now && appointmentData.event === "Need_feedback" && (
                        <button
                            onClick={() => {
                                mark_absent(appointmentData.id)
                            }
                            }
                            style={
                                { cursor: 'pointer' }
                            }
                        >
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                            </svg>
                        </button >

                    )
                }


                {/* EDIT */}
                {appointmentData.patient && appointmentData.event === "appointment" && (
                    <button
                        onClick={() => {
                            ValidationformStep()
                        }
                        }

                        style={
                            { cursor: 'pointer' }
                        }
                    >
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="green" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button >)
                }






                {/* DELETE/update BUTTON for appointment */}

                {
                    appointmentData.patient && appointmentData.event !== "made" && (<button
                        onClick={
                            cancelAppointmentByHealthPro}
                        style={{ cursor: 'pointer' }}
                        className='mr-2'
                    >
                        <svg class="w-6 h-6 text-red-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#fa6957" viewBox="0 0 19 17">
                            <path d="M2.057 6.9a8.718 8.718 0 0 1 6.41-3.62v-1.2A2.064 2.064 0 0 1 9.626.2a1.979 1.979 0 0 1 2.1.23l5.481 4.308a2.107 2.107 0 0 1 0 3.3l-5.479 4.308a1.977 1.977 0 0 1-2.1.228 2.063 2.063 0 0 1-1.158-1.876v-.942c-5.32 1.284-6.2 5.25-6.238 5.44a1 1 0 0 1-.921.807h-.06a1 1 0 0 1-.953-.7A10.24 10.24 0 0 1 2.057 6.9Z" />
                        </svg>
                    </button>)
                }


                {/* Button for made appointment/view consultation */}
                {
                    appointmentData.patient && appointmentData.event === "made" && (
                        <button
                            onClick={
                                () => view_consultation(appointmentData)}
                            style={{ cursor: 'pointer' }}
                            className='mr-2'
                        >
                            <svg class="w-6 h-6 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5h6M9 8h6m-6 3h6M4.996 5h.01m-.01 3h.01m-.01 3h.01M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" />
                            </svg>
                        </button>
                    )
                }


                {/* DELETE/update BUTTON for null conge/event */}
                {
                    appointmentData.patient == null && (<button
                        onClick={
                            cancelAppointmentByHealthPro}
                        style={{ cursor: 'pointer' }}
                        className='mr-2'
                    >
                        <svg class="w-6 h-6 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                        </svg>
                    </button>)
                }


                {/* CLOSE BUTTON */}
                <button
                    onClick={closeTooltip}
                    style={{ cursor: 'pointer' }}
                >
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>

                {children}
            </div >
        );
    };

    // content
    const CustomAppointmentContent = ({ appointmentData }) => {
        const formattedDate = format(new Date(appointmentData.startDate), 'EEEE', { locale: fr });
        const formattedDateUpperCase = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

        const startTime = format(new Date(appointmentData.startDate), 'HH:mm');
        const endTime = format(new Date(appointmentData.endDate), 'HH:mm');
        const date = format(new Date(appointmentData.startDate), 'yyyy-MM-dd', { locale: fr });


        return (

            <div className='relative flex'>
                <div className='flex flex-col p-4 '>
                    <div className='font-semibold'>{appointmentData.title}</div>

                    {appointmentData?.patient && (<div className='flex my-2'>
                        <svg class="w-6 h-6 mr-2 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                        </svg>
                        Avec : {appointmentData.patient.name} {appointmentData.patient.firstname}
                    </div>)}


                    <div className='flex my-2'>
                        <svg class="w-6 h-6 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                        </svg>
                        {`${formattedDateUpperCase}`} le {date}
                    </div>

                    <div className='flex'>
                        <svg class="w-6 h-6 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="gray" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {`${startTime} - ${endTime}`}
                    </div>
                </div>
                {appointmentData?.patient && (<div className='absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2'>
                    <img
                        className="w-20 h-20 rounded-full"
                        src={""}
                        alt={`Profile of ${appointmentData?.patient.name}`}
                    />
                </div>)}
            </div>
        );
    };


    // Modal close and open
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();

    const [updatedstartTime, setupdateStartTime] = useState("");
    const [updatedendTime, setupdatedEndTime] = useState("");
    const [raison, setRaison] = useState("");


    //AJOUTER EVENT/conge
    const add_evenement_submit = async (e) => {
        setErrMsg('');
        e.preventDefault();
        const raisonValue = e.target.elements['raison'].value;
        const startDateTime = new Date(updatedstartTime);
        const endDateTime = new Date(updatedendTime);

        if (startDateTime >= endDateTime) {
            handleClose();
            Swal.fire("Erreur !", "La date de début doit être antérieure à la date de fin.", "error");
            return;
        }

        const data = {
            start: startDateTime,
            end: endDateTime,
            reason: raisonValue,
        }

        console.log(data);

        try {
            handleClose();
            Swal.fire({
                title: "Voulez-vous vous ajouter cette évènement ?",
                text: "Cette ajout désactive repporte automatiquement les rendez-vous .",
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

                        const accessToken = Cookies.get('jwtToken')
                        const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        };

                        const response = await axiosPrivate.post(URL_ADD_EVENT_HEALTHCARE, data, { headers: headers });
                        console.log(response)
                        if (response.status === 200) {
                            toast('success', "Ajout avec succes!")
                            setRefresh(!refresh)
                            handleClose()
                        }

                        Swal.fire("Ajout avec succes !", "", "success");

                    }
                    catch (err) {
                        if (err?.response) {
                            const { message } = err.response.data; // Assuming your error response has these properties
                            const errorMessage = message || "Erreur inconnue";

                            Swal.fire(`Erreur ! ${errorMessage}`, "", "error");
                        } else {
                            Swal.fire('Pas de reponse du serveur', '', 'error');
                        }
                    }

                }
            });

        } catch (error) {
            console.error(error);
            handleClose()
            toast('error', "Erreur lors de la modification !")
        }

    }

    return (
        <div className='sm:ml-64'>

            <div className='m-4 flex flex-col space-y-5'>
                <h2 class="text-2xl font-bold text-gray-400">CALENDRIER:</h2>
                < Link to={link_setting} className='inline-flex items-center hover:text-blue-600'>
                    <img src={setting} alt='setting_svg' className='w-8 h-8 mr-2'></img>
                    Paramétrages
                </Link>

                <button
                    onClick={() => {
                        // alert(JSON.stringify(appointmentData));
                        handleOpen(); // Open the modal when the button is clicked
                    }}
                    style={{ cursor: 'pointer' }
                    }
                    className='inline-flex items-center hover:text-blue-600'>
                    <svg class="w-6 h-6 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                    </svg>
                    Créer un évènement ou prendre congé
                </button>

                {/* MODAL */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        width: 400,
                        bgcolor: 'background.paper',
                        m: 'auto', // Center the modal horizontally
                        mt: '10%', // Adjust the top margin as needed
                        p: 4,
                        outline: 'none', // Remove the default outline
                        borderRadius: '10px'
                    }}>
                        <div>

                        </div>
                        <h2 className="text-2xl font-bold mb-4" >Ajouter un évènement ou congé:</h2>
                        <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block w-full p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>

                        <form onSubmit={add_evenement_submit}>

                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-bold mb-2" htmlFor="start_date">
                                        Date de debut:
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="start_date_time"
                                        name="start_date_time"
                                        value={updatedstartTime}
                                        className="border border-gray-300 p-2 rounded-lg"
                                        onChange={(e) => setupdateStartTime(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-bold mb-2" htmlFor="start_date">
                                        Date de fin:
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="end_date_time"
                                        name="end_date_time"
                                        value={updatedendTime}
                                        className="border border-gray-300 p-2 rounded-lg"
                                        onChange={(e) => setupdatedEndTime(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-bold mb-2" htmlFor="raison">
                                        Raison:
                                    </label>
                                    <textarea
                                        id="raison"
                                        className="border border-gray-300 p-2 rounded-lg"
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        type='submit'
                                    >
                                        Sauvegarder
                                    </button>
                                </div>
                            </div>

                        </form>
                    </Box>
                </Modal>
            </div>
            {Legend()}

            <React.Fragment>
                {/* edit options */}
                {/* <EditingOptionsSelector
                    options={editingOptions}
                    onOptionsChange={handleEditingOptionsChange}
                /> */}
                <Paper>
                    <Scheduler
                        data={data}
                        // height={600}
                        locale={"fr-FR"}
                    >
                        <ViewState
                            defaultCurrentDate={Date.now()}
                            currentDate={currentDate}
                            onCurrentViewNameChange={currentViewNameChange}
                            onCurrentDateChange={currentDateChange}
                            defaultCurrentViewName="Week"
                        />
                        <EditingState
                            onCommitChanges={onCommitChanges}
                            addedAppointment={addedAppointment}
                            onAddedAppointmentChange={onAddedAppointmentChange}
                        />

                        <IntegratedEditing />

                        <DayView
                            startDayHour={0}
                            endDayHour={24}
                            displayName={viewNames[1]}
                        />

                        <WeekView
                            startDayHour={5}
                            endDayHour={24}
                            timeTableCellComponent={TimeTableCell}
                            displayName={viewNames[0]}
                        />

                        <MonthView displayName={viewNames[3]} />

                        <Toolbar />
                        <ViewSwitcher />
                        <DateNavigator />
                        <TodayButton messages={today} />
                        <Appointments
                            appointmentComponent={Appointment}
                        />
                        <AllDayPanel />
                        <AppointmentTooltip
                            headerComponent={Header}
                            contentComponent={CustomAppointmentContent}
                        />
                        {/* <AppointmentForm
                            messages={messages}
                            commandButtonComponent={CommandButton}
                            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
                        /> */}
                        {/* <DragDropProvider
                            allowDrag={allowDrag}
                            allowResize={allowResize}
                        /> */}

                    </Scheduler>
                </Paper>

            </React.Fragment>
        </div>

    );

}