import { useRef, useState } from 'react';
import { addDays, startOfWeek, endOfWeek, format } from 'date-fns';
import axios, { axiosPrivate } from '../../api/axios';
import Cookies from 'js-cookie';

import * as React from 'react';
import { Box, Button, Modal, Paper, TextField, Typography, styled } from '@mui/material';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    AppointmentTooltip,
    ConfirmationDialog,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { fr } from 'date-fns/locale';
import Errormessage, { toast } from '../Toast/Toast';
import Swal from 'sweetalert2';





const SAVE_AGENDA_URL = "/agenda/saveAgenda"
const SAVE_APPOINTMENT_AVG_URL = "/healthPro/saveAppointmentAvg"
const GET_WEEK_PARAMETRES_URL = '/healthPro/agendas'
const DELETE_HORAIRE_URL = '/healthPro/agendas'

const UPDATE_AGENDA_URL = "/agenda"









export const appointments = [
    {
    }
];


const RadioGroup = (props) => {

    if (props.type === 'endRepeat') {
        console.log("ITANY")

    }
    console.log("ITANY")

}

const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment

    if (props.type === 'multilineTextEditor') {
        return null;
    } return (
        <AppointmentForm.TextEditor {...props} />

    );

};
const Select = ({ readOnly, ...restProps }) => {
    console.log(restProps)
};





const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ customField: nextValue });
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >

            <AppointmentForm.Label
                text="Custom Field1"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.customField}
                onValueChange={onCustomFieldChange}
                placeholder="Custom field1"
            />
            <AppointmentForm.RadioGroup />

        </AppointmentForm.BasicLayout>
    );
};


export default function HealthcareAppointmentsSetting() {

    const [refreshPage, setRefreshPage] = useState(false);
    const toggleRefresh = () => {
        setRefreshPage((prevValue) => !prevValue);
    };

    const accessToken = Cookies.get('jwtToken')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const errRef = useRef();
    const successRef = useRef();



    const [startTime, setStartTime] = useState([])
    const [endTime, setEndTime] = useState([])

    const [averageTime, setAverageTime] = useState(30)
    const [selectedDate, setSelectedDate] = useState(null);


    const daysListWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

    const [checkedDays, setCheckedDays] = useState({
        Lundi: false, // Set default state for each day
        Mardi: false,  // For example, set 'Mardi' as default checked
        Mercredi: false,
        Jeudi: false,
        Vendredi: false,
        Samedi: false,
        Dimanche: false,
    });

    const handleSelectAllChange = (e) => {
        const selectAll = e.target.checked;
        const newCheckedDays = {};
        daysListWeek.forEach((day) => {
            newCheckedDays[day] = selectAll;
        });
        setCheckedDays(newCheckedDays);
    };


    const areAllChecked = Object.values(checkedDays).every((value) => value);


    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };
    const handeTimeAverage = (e) => {
        setAverageTime(e.target.value);
    };
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    }

    const handleCheckboxChange = (day) => {
        setCheckedDays({
            ...checkedDays,
            [day]: !checkedDays[day],
        });
    };





    // On Submit function
    const onSubmit = async (e) => {
        e.preventDefault();

        const checkedDayIndices = Object.keys(checkedDays)
            .filter(day => checkedDays[day])
            .map(day => daysListWeek.indexOf(day) + 1);
        const data = {
            "weekdays": checkedDayIndices,
            'start_time': startTime + ":00",
            'end_time': endTime + ":00",
        }
        console.log(data)

        try {
            setErrMsg('');
            const response = await axiosPrivate.post(SAVE_AGENDA_URL, data, { headers: headers })
            console.log(response)
            setSuccessMsg('Modification fait avec success !')
            toast("success", "Modification fait avec success !")
            get_all_agenda();


        } catch (error) {
            toast("error", "Une erreur est survenue !")
            setErrMsg('Une erreur est survenue ');
        }
    }

    const onSubmitAverage = async (e) => {

        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };


        e.preventDefault();
        const data = {
            "duration": averageTime,
            "created_at": selectedDate
        }
        console.log(data)

        setErrMsg('');
        setSuccessMsg('');
        Swal.fire({
            title: "Voulez-vous vraiment modifier votre temps de rendez-vous moyenne  ?",
            text: "Cette modifcation reportera tous les rendez-vous sur ce(s) plage(s) horaire(s).",
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
                    const response = await axiosPrivate.post(SAVE_APPOINTMENT_AVG_URL, data, { headers: headers });
                    if (response.status === 200) {
                        // setSuccessMsg('Modification fait avec succès !');
                        toast("success", "Modification fait avec succès !")
                        get_all_agenda();
                    }

                } catch (err) {

                    if (!err?.response) {
                        setErrMsg(err.response?.data.message);
                    } else if (err.response?.status === 400) {
                        setErrMsg(err.response?.data.message)
                    } else if (err.response?.status === 401) {
                        setErrMsg(err.response?.data.message);
                    } else {
                        setErrMsg("Une erreur est survenue !");
                    }


                }

            }
        });


    }

    const [data, setData] = React.useState(appointments);
    const startDayHour = 6
    const endDayHour = 23

    const formatDayScaleDate = (date, options) => {
        const { weekday } = options;
        const dayOfWeek = format(date, 'EEEE', { locale: fr });
        return weekday ? dayOfWeek : '';
    };

    const PREFIX = 'Demo';
    const classes = {
        dayScaleCell: `${PREFIX}-dayScaleCell `,
    };
    const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)({
        [`&.${classes.dayScaleCell}`]: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    });
    const DayScaleCell = ((
        { formatDate, ...restProps },
    ) => (
        <StyledWeekViewDayScaleCell
            {...restProps}
            formatDate={formatDayScaleDate}
            className={classes.dayScaleCell}
        />
    ));
    const get_all_agenda = () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };

            axiosPrivate.get(GET_WEEK_PARAMETRES_URL, { headers: headers })
                .then((response) => {

                    const originalAppointments = response.data.map(appointment => {

                        const dayOfWeekToStartWith = appointment.dayofweek;

                        const currentDate = new Date();
                        const currentDayOfWeek = currentDate.getDay(); // Get the current day of the week (0 for Sunday, 1 for Monday, and so on)

                        let daysToAdd;

                        if (dayOfWeekToStartWith < currentDayOfWeek) {
                            // If the desired day has already passed in the current week, calculate the days to the next occurrence
                            daysToAdd = - currentDayOfWeek + dayOfWeekToStartWith - 1;
                        } else if (dayOfWeekToStartWith > currentDayOfWeek) {
                            // If the desired day is in the future in the current week, calculate the days until that day
                            daysToAdd = dayOfWeekToStartWith - currentDayOfWeek - 1;
                        } else {
                            // If the desired day is today, no need to add days
                            daysToAdd = -1;
                        }

                        // Add the calculated number of days to the current date
                        currentDate.setDate(currentDate.getDate() + daysToAdd);

                        // Convert the modified date to an ISO string
                        const currentDateISOString = currentDate.toISOString().split('T')[0];

                        return {
                            id: appointment.id,
                            title: 'Horaire de rendez-vous',
                            startDate: `${currentDateISOString}T${appointment.start_time}`,
                            endDate: `${currentDateISOString}T${appointment.end_time}`,
                            location: 'Room 1',

                        };
                    });

                    setData(originalAppointments)
                    console.log(originalAppointments)

                }).catch((error) => {

                    console.error('Error fetching data:', error);

                });
        } catch (err) {

            console.error('Error fetching data:', err);

        }

    }
    React.useEffect(() => {

        get_all_agenda()

        // Rest of your code
    }, [refreshPage]);


    const [editingOptions, setEditingOptions] = React.useState({
        allowAdding: false,
        allowDeleting: false,
        allowUpdating: false,
        allowDragging: false,
        allowResizing: false,
    });

    const {
        allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
    } = editingOptions;

    const [currentDate, setCurrentDate] = useState(new Date());

    const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
        <WeekView.TimeTableCell
            {...restProps}
            onDoubleClick={allowAdding ? onDoubleClick : undefined}
        />
    )), [allowAdding]);

    const [addedAppointment, setAddedAppointment] = React.useState({});

    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);


    const onCommitChanges = React.useCallback(async ({ added, changed, deleted }) => {
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            setData([...data, { id: startingAddedId, ...added }]);
            console.log(data);
        }
        if (changed) {
            console.log('Data before updating:', data);
            setData(data.map(appointment => (
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
            console.log('Data after updating:', data);
        }
        if (deleted !== undefined) {
            const deletedAppointment = data.find(appointment => appointment.id === deleted);
            const data_will_changed = {
                id: deletedAppointment.id,
                startTime: deletedAppointment.startTime,
                endTime: deletedAppointment.endTime
            }
            try {
                await axiosPrivate.delete(`${DELETE_HORAIRE_URL}/${deletedAppointment.id}`, { headers: headers })
                setData(data.filter(appointment => appointment.id !== deleted));
            }
            catch (e) {
                console.log(e)
            }


        }

        console.log(data)
        setIsAppointmentBeingCreated(false);
    }, [setData, setIsAppointmentBeingCreated, data]);

    const onAddedAppointmentChange = React.useCallback((appointment) => {
        console.log(appointment)
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
    });


    // HEADER AND CONTENT APPOINTMENT TOOLTIPS

    // Modal close and open
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // header
    const Header = ({ children, appointmentData, onHide, ...restProps }) => {
        const [errMsg, setErrMsg] = useState('');

        // JOURS
        const formattedDate = format(new Date(appointmentData.startDate), 'EEEE', { locale: fr });
        const formattedDateUpperCase = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        //HEURES
        const startTime = format(new Date(appointmentData.startDate), 'HH:mm:ss');
        const endTime = format(new Date(appointmentData.endDate), 'HH:mm:ss');

        const [updatedstartTime, setupdateStartTime] = useState(startTime);
        const [updatedendTime, setupdatedEndTime] = useState(endTime);

        const formatTime = (time) => {
            // Ensure the time has seconds (if not provided)
            return time.length === 5 ? `${time}:00` : time;
        };

        //MODIFIER
        const modification_submit = async (e) => {
            setErrMsg('');
            e.preventDefault();
            const data = {
                id: appointmentData.id,
                start_time: formatTime(updatedstartTime),
                end_time: formatTime(updatedendTime),
            }

            console.log(data);
            try {
                const response = await axiosPrivate.put(UPDATE_AGENDA_URL, data, { headers: headers })
                if (response.status === 200) {
                    toast('success', "Modification terminer!")
                    handleClose()
                    onHide();
                    toggleRefresh()
                } else {
                    // toast('error', "Erreur lors de la modification !")
                    setErrMsg('Erreur lors de la modification !');
                    // handleClose()
                }

            } catch (error) {
                console.error(error);
                // handleClose()
                setErrMsg('Erreur lors de la modification !');
                toast('error', "Erreur lors de la modification !")
            }

        }

        //DELETE
        const deleteSetting = async () => {
            const id = appointmentData.id
            try {

                const response = await axiosPrivate.delete(`${UPDATE_AGENDA_URL}/${id}`, { headers: headers })

                console.log(response)
                if (response.status === 200) {
                    toast('success', "Modification terminer!")
                    handleClose()
                    onHide();
                    toggleRefresh()
                }

            } catch (error) {
                console.error(error);
                handleClose()
                toast('error', "Erreur lors de la modification !")
            }

        }

        const closeTooltip = () => {
            onHide();
        };


        return (
            <div
                {...restProps}
                className='flex justify-end space-x-4 bg-gray-50 p-2 '
            >
                <button
                    onClick={() => {
                        // alert(JSON.stringify(appointmentData));
                        handleOpen(); // Open the modal when the button is clicked
                    }}
                    style={{ cursor: 'pointer' }
                    }
                >
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                    </svg>
                </button >

                {/* DELETE BUTTON */}
                <button
                    onClick={deleteSetting}
                    style={{ cursor: 'pointer' }}
                    className='mr-2'
                >
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                    </svg>
                </button>
                <button
                    onClick={closeTooltip}
                    style={{ cursor: 'pointer' }}
                >
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>



                {/* MODAL */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        width: 300,
                        bgcolor: 'background.paper',
                        m: 'auto', // Center the modal horizontally
                        mt: '10%', // Adjust the top margin as needed
                        p: 4,
                        outline: 'none', // Remove the default outline
                        borderRadius: '10px'
                    }}>
                        <div>

                        </div>
                        <h2 className="text-2xl font-bold mb-4" >Modifier:</h2>
                        <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block w-full p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>

                        <form onSubmit={modification_submit}>

                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-bold mb-2" htmlFor="start_date">
                                        Heure de debut:
                                    </label>
                                    <input
                                        defaultValue={startTime}
                                        type="time"
                                        id="start_date"
                                        name="start_date"
                                        className="border border-gray-300 p-2 rounded-lg"
                                        value={updatedstartTime}
                                        onChange={(e) => setupdateStartTime(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-bold mb-2" htmlFor="end_date">
                                        Heure de fin:
                                    </label>
                                    <input
                                        defaultValue={endTime}
                                        type="time"
                                        id="end_date"
                                        name="end_date"
                                        className="border border-gray-300 p-2 rounded-lg"
                                        value={updatedendTime}
                                        onChange={(e) => setupdatedEndTime(e.target.value)}
                                    />
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

        return (
            <div className='flex flex-col p-4'>
                <div className='font-semibold'>{appointmentData.title}</div>
                <div className='flex my-2'>
                    <svg class="w-6 h-6 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                    </svg>
                    {`${formattedDateUpperCase}`}</div>
                <div className='flex'>
                    <svg class="w-6 h-6 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="gray" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {`${startTime} - ${endTime}`}</div>
            </div>
        );
    };




    return (
        <div className="sm:ml-64">
            <div className='m-4 flex-col'>
                <h1 className='text-xl font-semibold items-center'>Parametres du temps de rendez-vous moyenne:</h1>
                <div className='my-2'>
                    <p ref={errRef} className={errMsg ? "errmsg text-red-400 border  border-red-300 block w-full p-2.5 mt-2 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <p className={successMsg ? "errmsg text-green-400 border  border-green-300 block w-full p-2.5 mt-2 rounded ring-green-300" : "offscreen"} aria-live="assertive">{successMsg}</p>
                </div>

                <form
                    className="space-y-2 md:space-y-6 mb-4"
                    onSubmit={onSubmitAverage}
                    noValidate>
                    <div>
                        <label for="average_time" className='mr-2'>
                            Temps de rendez-vous en moyenne :
                        </label>

                        <input
                            id='average_time'
                            name='average_time'
                            type='number'
                            min='15'
                            className='mr-4 w-24 text-center'
                            value={averageTime}
                            onChange={handeTimeAverage}></input>
                        <label className='ml-2'>
                            mn
                        </label>
                    </div>
                    {/* <div>
                        <label for="average_time" className='mr-2'>
                            Ce changement prendra effet le :
                        </label>
                        <input
                            id="selected_date"
                            name="selected_date"
                            type="date"
                            className="text-center"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                        <label className='ml-2'>
                            (pas obligatoire)
                        </label>
                    </div> */}
                    <button type="submit" class="text-white bg-blue-600 my-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Valider</button>

                </form>

                <hr className='border'></hr>
                <h1 className='text-xl font-semibold items-center py-4'>Parametres hebdomadaire du rendez-vous:</h1>

                <div class="flex items-center pl-4 w-auto rounded dark:border-gray-700">

                    <input
                        id="select_all"
                        type="checkbox"
                        value=""
                        name="bordered-checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleSelectAllChange}
                        checked={areAllChecked}
                    >
                    </input>
                    <label for="select_all" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tous selectionés</label>

                </div>

                <div className='flex' >

                    <div className='w-1/2'>
                        <form
                            className="space-y-2 md:space-y-6"
                            onSubmit={onSubmit}
                            noValidate >
                            {daysListWeek.map((day, index) => (

                                <div className='my-4'>
                                    <label class="relative inline-flex items-center cursor-pointer" >
                                        <input
                                            type="checkbox"
                                            checked={checkedDays[day]}
                                            onChange={() => handleCheckboxChange(day)}
                                            key={index + 1}
                                            class="sr-only peer">
                                        </input>
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{day}</span>
                                    </label>
                                </div>
                            ))}
                            <div className='flex'>
                                <div>
                                    <label for="start time" className='mr-2'>
                                        Heure de debut :
                                    </label>
                                    <input
                                        id='start_time'
                                        name='start_time'
                                        type='time'
                                        min="09:00"
                                        max="18:00"
                                        value={startTime}
                                        onChange={handleStartTimeChange}
                                        className='mr-4'></input>

                                </div>

                                <div>
                                    <label for="end_time" className='mr-2'>
                                        Heure de fin :
                                    </label>

                                    <input
                                        id='end_time'
                                        name='end_time'
                                        type='time'
                                        min="09:00"
                                        max="18:00"
                                        className='mr-4'
                                        value={endTime}
                                        onChange={handleEndTimeChange}></input>
                                </div>
                            </div>
                            <button type="submit" class="text-white bg-blue-600 my-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Confirmer</button>

                        </form>

                    </div>

                </div>


                <div className='my-5'>
                    <Paper>
                        <Scheduler data={data} locale={"fr-FR"}     >
                            <EditingState
                                onCommitChanges={onCommitChanges}
                                addedAppointment={addedAppointment}
                                onAddedAppointmentChange={onAddedAppointmentChange}
                            />

                            <IntegratedEditing />
                            <WeekView
                                startDayHour={startDayHour}
                                // timeTableCellComponent={TimeTableCell}
                                endDayHour={endDayHour}
                                dayScaleCellComponent={DayScaleCell}

                            />
                            <ConfirmationDialog />
                            <Appointments />
                            <AppointmentTooltip
                                headerComponent={Header}
                                contentComponent={CustomAppointmentContent}
                            />

                        </Scheduler>
                    </Paper>
                </div>
            </div>
        </div>
    )
}