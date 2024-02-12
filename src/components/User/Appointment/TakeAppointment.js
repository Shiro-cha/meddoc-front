import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Box, Modal } from "@mui/material";

export default function TakeAppointment() {
    const PROCHE_LIST_URL = "/user/readRelative"
    const POSTPONED_APPOINTMENT_LIST_URL = "/event/getPostponed"

    const TAKE_RENDEZ_VOUS = ('/event/takeAppointment')
    const URL_LIST_PROFILE_OF_HEALTHCARE = "/healthPro"

    const [profile, setprofile] = useState()
    const [description, setdescription] = useState()
    const navigate = useNavigate()
    const { healthcare_id, date, start, end } = useParams();


    const hourdateObject = new Date(start);
    const hours = hourdateObject.getHours();
    const minutes = hourdateObject.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    const dateObject = new Date(date);

    // Format the date to get the desired format
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(dateObject);


    const [selectedRelative, setSelectedRelative] = useState({});
    const [selectedTarifs, setselectedTarifs] = useState();
    const [selectedPostPoned, setselectedPostPoned] = useState();

    const [proche_data, setProcheData] = useState([])
    const [postponed_data, setPostponedData] = useState([])
    const [reason, setReason] = useState('');
    const methods_take_appointment = useForm()


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


    // GET POSTPONED

    const list_postponed = async (healthProId) => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        const response = await axiosPrivate.get(`${POSTPONED_APPOINTMENT_LIST_URL}/${healthProId}`, { headers: headers }).then((response) => {
            setPostponedData(response.data);
        }, [])
            .catch((error) => {
                setPostponedData([])
                console.error('Error fetching data:', error);
            });

        console.log(response)
    }



    useEffect(() => {
        list_all_relatives()
        findbyiD(healthcare_id)
        list_postponed(healthcare_id)
    }, [healthcare_id])

    const handleDescriptionChange = (e) => {
        setReason(e.target.value);
    };


    const findbyiD = async (id) => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        const response = await axiosPrivate.get(`${URL_LIST_PROFILE_OF_HEALTHCARE}/${id}`, { headers: headers }).then((response) => {
            setprofile(response.data)

            const data = JSON.parse(response.data.description || '{}');
            setdescription(data)


        }, [])

            .catch((error) => {
                setProcheData([])
                console.error('Error fetching data:', error);
            });
        console.log(response)
    }

    const onsubmit_take_appointment = () => methods_take_appointment.handleSubmit(async appointment_input_informations => {

        try {
            const accessToken = Cookies.get('jwtToken')
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };


            const params = {
                "patientId": selectedRelative.id,
                "reason": reason,
                "healthProId": healthcare_id,
                "end": end,
                "start": start,
                "tarifs": selectedTarifs
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
                        console.log(params)
                        await axiosPrivate.post(TAKE_RENDEZ_VOUS, params, { headers: headers })
                        Swal.fire("Rendez vous pris!", "", "success");
                        navigate("/user/appointment")
                    }
                    catch (err) {
                        Swal.fire("Erreur !", "", "error");
                        navigate("/user/search_healthcare/" + healthcare_id)
                    }


                }
            });



        } catch (err) {
            Swal.fire("Erreur !", "", "error");

        }


    })

    const onsubmit_retake_appointment = (postponed_data_id) => {
        try {
            const accessToken = Cookies.get('jwtToken')
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };


            const params = {

                "event_id": postponed_data_id,
                "end": end,
                "start": start,

            };
            console.log(params);
            handleClose()
            Swal.fire({
                title: "Voulez vous vraiment reprendre ce rendez-vous reporté?",
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
                        console.log(params)
                        await axiosPrivate.post(TAKE_RENDEZ_VOUS, params, { headers: headers })
                        Swal.fire("Rendez vous repris!", "", "success");
                        navigate("/user/appointment")
                    }
                    catch (err) {
                        Swal.fire("Erreur !", "", "error");
                        navigate("/user/search_healthcare/" + healthcare_id)
                    }


                }
            });



        } catch (err) {
            Swal.fire("Erreur !", "", "error");

        }
    }

    const [currentStep, setCurrentStep] = useState(1);

    const onNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const onPreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);

    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 5
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="flex flex-col space-y-5 ">
                        <div class="max-w-sm w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex p-2 bg-blue-950 rounded-t-lg justify-between">
                                <div className="flex text-white space-x-2">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                                    </svg>
                                    <p>
                                        {formattedDate}
                                    </p>
                                </div>

                                <div className="flex text-white space-x-2">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="white" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p>
                                        {formattedTime}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center p-7">

                                <div>
                                    <h2 className="text-md font-semibold ">Dr {profile?.name} {profile?.firstname}</h2>
                                    <p className="text-gray-600 text-sm"> {profile?.speciality_name}</p>
                                    <p className="text-gray-600 text-sm"> {profile?.email}</p>
                                    <p className="text-gray-600 text-sm"> {profile?.contact}</p>
                                </div>
                            </div>
                            <hr></hr>

                            {postponed_data && postponed_data.length > 0 && (<>
                                <div className="p-2">
                                    <button type="button"
                                        onClick={handleOpen}
                                        class=" p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        Selectionner le rendez-vous qui a été annuler par ce medecin:
                                    </button>
                                </div>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <div className="m-2 p-4">
                                            <label for="tarifs" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selectionner le rendez-vous qui a été annuler par ce medecin: </label>
                                            <div>
                                                {postponed_data?.map((postponed_data, index) => (
                                                    <div key={index} className="flex items-center justify-between mb-2">
                                                        <span>{postponed_data.patient.name} {postponed_data.patient.firstname}</span>

                                                        <span>   {new Date(postponed_data.start_dt).toLocaleString('fr-FR', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        }).replace(",", "à")}</span>

                                                        <button
                                                            className="p-1 text-xs bg-blue-500 text-white rounded-lg"
                                                            onClick={() => onsubmit_retake_appointment(postponed_data.id)}
                                                        >
                                                            Reprendre
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </Box>
                                </Modal>
                            </>

                            )}





                            <div className="p-4 rounded-b-lg">
                                <h4 className="text-md font-medium  px-2">Votre rendez-vous en détail:</h4>
                                <div className="px-8 flex-col space-y-2 rounded-b-lg ">

                                    {selectedRelative.name ? (
                                        <div className="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                                            </svg>
                                            Pour: {selectedRelative.name}
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                                            </svg>
                                            Pour: aucune
                                        </div>
                                    )
                                    }

                                    {reason ? (
                                        <div className="flex items-center w-fit">
                                            <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                            </svg>
                                            Notes: {reason}
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                            </svg>
                                            Notes: aucun
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-end w-full ">

                            <div>
                                <button type="button" onClick={onNextStep}>
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                );
            case 2:

                return (
                    <div className="">
                        <div className="flex p-4 justify-center space-x-5">
                            <div className="max-w-sm w-full bg-white  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="px-10 py-2">
                                    <p>Pour qui prenez-vous rendez-vous?</p>
                                    <FormProvider {...methods_take_appointment}>
                                        <form onSubmit={e => e.preventDefault()}>
                                            <div class="flex flex-col justify-between items-start ">
                                                <div className="m-2">

                                                    <select
                                                        value={selectedRelative.id} // Set the selected value
                                                        onChange={(e) => setSelectedRelative({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
                                                        name="person" id="person" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                        <option value={0} >Moi</option>
                                                        {proche_data?.map((data, index) => {
                                                            return (
                                                                <option key={index} value={data.id}>{data.name}</option>
                                                            )

                                                        })
                                                        }
                                                    </select>
                                                </div>
                                                {/* <div className="m-2">
                                                    <label for="tarifs" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service</label>
                                                    <select
                                                        value={selectedRelative.id} // Set the selected value
                                                        onChange={(e) => setselectedTarifs(e.target.value)}
                                                        id="tarifs" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        {description?.tarifs?.map((tarif, index) => (
                                                            <option key={index} value={tarif.prix}>
                                                                {tarif.description} - {tarif.prix}
                                                            </option>
                                                        ))}

                                                    </select>

                                                </div> */}

                                                {/* <div className="m-2">
                                                    <label for="tarifs" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selectionner le rendez-vous qui a été annuler par le medecin: </label>
                                                    <select
                                                        value={selectedPostPoned?.id} // Set the selected value
                                                        onChange={(e) => setselectedPostPoned(e.target.value)}
                                                        id="tarifs" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        {postponed_data?.map((postponed_data, index) => (
                                                            <option key={index} value={postponed_data.id}>
                                                                POSTPONED
                                                            </option>
                                                        ))}

                                                    </select>

                                                </div> */}

                                                <div className="m-2">
                                                    <label for="description" class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Raison de la visite:</label>
                                                    <textarea
                                                        value={reason}
                                                        onChange={handleDescriptionChange}
                                                        name="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descriptions..."></textarea>
                                                </div>
                                            </div>

                                        </form>
                                    </FormProvider>
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end w-full ">

                            <div>
                                <button type="button" onClick={onNextStep}>
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col space-y-5 ">
                        <div class=" w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex p-2 bg-blue-950 rounded-t-lg justify-between">
                                <div className="flex text-white space-x-2">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                                    </svg>
                                    <p>
                                        {formattedDate}
                                    </p>
                                </div>

                                <div className="flex text-white space-x-2">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="white" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p>
                                        {formattedTime}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center p-7">
                                <div class="photo-wrapper p-2">
                                    <img class="w-6 h-6 object-cover rounded-full mx-auto" alt="healthcare_image">
                                    </img>
                                </div>

                                <div>
                                    <h2 className="text-md font-semibold ">Dr {profile?.name} {profile?.firstname}</h2>
                                    <p className="text-gray-600 text-sm"> {profile?.speciality_name}</p>
                                    <p className="text-gray-600 text-sm"> {profile?.email}</p>
                                    <p className="text-gray-600 text-sm"> {profile?.contact}</p>
                                </div>
                            </div>
                            <hr></hr>

                            <div className="p-4 rounded-b-lg">
                                <h4 className="text-md font-medium  px-2">Votre rendez-vous en détail:</h4>
                                <div className="px-8 flex-col space-y-2 rounded-b-lg ">
                                    {/* <div className="flex items-center">
                                        <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 21">
                                            <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z" />
                                            </g>
                                        </svg>
                                        Cabinet du docteur Yann Legrain
                                    </div> */}

                                    {selectedRelative.name ? (
                                        <div className="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                                            </svg>
                                            Pour: {selectedRelative.name}
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                                            </svg>
                                            Pour: Moi meme
                                        </div>
                                    )
                                    }

                                    {reason ? (
                                        <div className="flex items-center w-fit">
                                            <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                            </svg>
                                            Notes: {reason}
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg class="w-4 h-4 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                            </svg>
                                            Notes: aucun
                                        </div>
                                    )}

                                </div>
                            </div>

                        </div>
                        <div className="flex justify-between w-full ">
                            <div>
                                <button type="button" onClick={onPreviousStep}>
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <button type="button" onClick={onsubmit_take_appointment()}>

                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                                    </svg>

                                </button>
                            </div>

                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const minProgressBarWidth = 33.33; // Set the minimum width (1/3) for the progress bar
    const maxProgressBarWidth = 99;   // Set the maximum width (100%) for the progress bar
    const progressBarWidth = `${Math.min(maxProgressBarWidth, minProgressBarWidth + ((currentStep - 1) / 3) * 100)}%`;

    return (

        <div className="sm:ml-64 justify-center  flex flex-col">
            {/* PROGRESS BAR */}
            <div className=" px-10 items-center">
                <h2 class="text-2xl w-full text-center font-bold p-4 uppercase">étapes :</h2>
                <div>
                    <div class="overflow-hidden rounded-full bg-gray-200">
                        <div style={{ width: progressBarWidth }} className="h-2 rounded-full bg-blue-500"></div>
                    </div>

                    <ol class="mt-4 grid grid-cols-4 text-sm font-medium text-gray-500">
                        <li class="flex items-center justify-start text-blue-600 sm:gap-1.5">
                            <span class="hidden sm:inline"> Choix du date</span>
                            <svg
                                class="h-6 w-6 sm:h-5 sm:w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                />
                            </svg>
                        </li>
                        <li class="flex items-center justify-start text-blue-600 sm:gap-1.5">
                            <span class="hidden sm:inline"> Détails du rendez vous  </span>
                            <svg
                                class="h-6 w-6 sm:h-5 sm:w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                />
                            </svg>

                        </li>


                        <li class={`flex items-center justify-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'} sm:gap-1.5`}>
                            <span class="hidden sm:inline"> Choix de la personne </span>
                            <svg
                                class="h-6 w-6 sm:h-5 sm:w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                />
                            </svg>
                        </li>

                        <li class={`flex items-center justify-end ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'} sm:gap-1.5`}>
                            <span class="hidden sm:inline"> Confirmation du rendez-vous </span>
                            <svg
                                class="h-6 w-6 sm:h-5 sm:w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                            </svg>
                        </li>

                    </ol>
                </div>
            </div>


            <div className="m-auto flex flex-col space-y-5 justify-center items-center">
                <div className="mt-8">
                    <h1 className="font-bold text-xl" >Votre rendez-vous n'est pas encore confirmé.</h1>
                </div>
                {renderStepContent()}
            </div>

        </div>

    )

}