import { useEffect } from "react";
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import editsvg from '../../../assets/svg/edit.svg';
import { NotesAdditionnels, Prescriptons, RaisonduVisite } from "./InformationAppointment";
import { useForm } from "react-hook-form";
import { axiosPrivate } from "../../../api/axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";


export function ValidateAppointment() {
    const SET_CONSULTATION_URL = "event/consultation"
    const navigate = useNavigate()

    const location = useLocation();
    const [appointmentData, setAppointmentData] = useState(location.state);

    const { id } = useParams();


    const [selectedImage, setSelectedImages] = useState(null);

    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;


        // Update the state with the array of selected files
        setSelectedImages(selectedFiles);
    };

    //INPUT raisons------------------------------------------
    const methodsRaisons = useForm()
    const raisons_validation = {
        name: 'raison',
        label: 'Raison ou symptôme',
        type: 'text',
        id: 'raison',
        defaultValue: ''

    }
    const [tempRaisons, setTempRaisons] = useState([]);
    const [openAddFormRaisons, setopenFormAddRaisons] = useState(false);

    const onsubmitRaison = methodsRaisons.handleSubmit(async raisons_data => {
        const newRaison =
            raisons_data["reason"]
        // traitement: prescriptions_data["traitement_journalier"],

        console.log(newRaison);
        setTempRaisons([...tempRaisons, newRaison]);
        methodsRaisons.reset()
        closeAddRaisons()
    })

    const deleteRaisons = (index) => {
        const newTempRaisons = [...tempRaisons];
        newTempRaisons.splice(index, 1);
        setTempRaisons(newTempRaisons);
    };

    const openAddRaisons = () => {
        setopenFormAddRaisons(true)
    }
    const closeAddRaisons = () => {
        setopenFormAddRaisons(false)
        methodsRaisons.reset()

    }



    //INPUT prescriptions------------------------------------
    const methodsPrescriptions = useForm()

    const medicament_validation = {
        name: 'medicament',
        label: 'medicament',
        type: 'text',
        id: 'medicament',
        defaultValue: ''

    }
    const dosage_validation = {
        name: 'dosage',
        label: 'Dosage',
        type: 'text',
        id: 'dosage',
        defaultValue: ''

    }
    const traitement_journalier_validation = {
        name: 'traitement_journalier',
        label: 'Traitement journalier',
        type: 'text',
        id: 'traitement_journalier',
        defaultValue: ''

    }

    const [tempPrescription, setTempPrescription] = useState([]);
    const [openFormAddPrescriptions, setopenFormAddPrescriptions] = useState(false);

    const onsubmitPrescription = methodsPrescriptions.handleSubmit(async prescriptions_data => {
        const newPrescription = {
            medicament: prescriptions_data["medicament"],
            // traitement: prescriptions_data["traitement_journalier"],
            medicamentType: "",
            duration: prescriptions_data["duration"],
            day: prescriptions_data["matin"],
            evening: prescriptions_data["midi"],
            night: prescriptions_data["soir"],


        };
        console.log(newPrescription);
        setTempPrescription([...tempPrescription, newPrescription]);
        methodsPrescriptions.reset()
        closeAddPrescriptions()
    })

    const deletePrescription = (index) => {
        const newTempPrescriptions = [...tempPrescription];
        newTempPrescriptions.splice(index, 1);
        setTempPrescription(newTempPrescriptions);
    };

    const openAddPrescriptions = () => {
        setopenFormAddPrescriptions(true)
    }
    const closeAddPrescriptions = () => {
        setopenFormAddPrescriptions(false)
        methodsPrescriptions.reset()

    }

    //INPUT notes------------------------------------
    const methodsNotesadditionals = useForm()

    const notes_validation = {
        name: 'notes',
        label: 'Notes',
        type: 'text',
        id: 'notes',
        defaultValue: ''

    }
    const [tempNotes, setTempNotes] = useState([]);
    const [openAddFormNotes, setopenFormAddNotes] = useState(false);

    const onsubmitNotes = methodsNotesadditionals.handleSubmit(async notes_data => {
        const newNote = notes_data["notes"]

        console.log(newNote);
        setTempNotes([...tempNotes, newNote]);
        methodsNotesadditionals.reset()
        closeAddNotes()
    })

    const deleteNotes = (index) => {
        const newTempNotes = [...tempNotes];
        newTempNotes.splice(index, 1);
        setTempNotes(newTempNotes);
    };

    const openAddNotes = () => {
        setopenFormAddNotes(true)
    }
    const closeAddNotes = () => {
        setopenFormAddNotes(false)
        methodsNotesadditionals.reset()
    }


    useEffect(() => {
        console.log('Component mounted with data:', appointmentData);


    }, [appointmentData])

    if (!appointmentData) {
        return <div>Loading...</div>; // or any other loading indicator
    }
    // DATE-----------------------
    const dateObject = new Date(appointmentData.startDate);
    // Get date components
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(dateObject.getDate()).padStart(2, '0');

    // Formatted strings
    const formattedDate = `${year}-${month}-${day}`;
    const options = { hour12: false, hour: '2-digit', minute: '2-digit' };
    const formattedTime = dateObject.toLocaleTimeString('fr-FR', options);

    const files = selectedImage ? [...selectedImage] : [];

    // SAVE ALL
    const saveAllModification = async () => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {

            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            const data = new FormData();

            files.forEach((file, i) => {
                data.append(`file-${i}`, file, file.name);
            });
            console.log(files);

            // Prepare the data for the consultation
            const csltmap = {
                event_id: appointmentData.id,
                prescriptions: tempPrescription,
                additionnal_notes: tempNotes,
                symptoms: tempRaisons,
            };

            // Combine consultationData and formData into a single object
            const allInformation = {
                csltMap: csltmap,
                images: data,
            };

            Swal.fire({
                title: `Confirmer la consultation pour ${appointmentData.patient.name} ${appointmentData.patient.firstname} ?`,
                text: "Veuillez noter que cette action est irreversible !",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: "Annuler",
                buttonsStyling: false,
                confirmButtonText: "Valider",
                customClass: {
                    cancelButton: 'mx-4 text-white inline-flex items-center bg-red-500 hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
                    confirmButton: 'mx-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
                },

            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    try {

                        const response = await axiosPrivate.post(SET_CONSULTATION_URL, csltmap, { headers: headers })

                        if (response?.status === 200) {
                            Swal.fire("Vous avez ajouté une consultation à ce patient!", "", "success");
                            navigate("/healthcare/calendar");
                        } else {
                            // Check if there's an error message in the response data
                            const errorMessage = response.data && response.data.message ? response.data.message : "Erreur !";
                            Swal.fire(errorMessage, "", "error");
                        }
                    }
                    catch (error) {
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



        }
        catch (err) {
            console.log(err)
        }

    }


    return (
        <>
            <div className="flex items-center justify-center h-full sm:m-68 border flex-col text-slate-200">
                <h1 class="text-2xl font-bold text-gray-800 m-2">Registres des visites medicals pour : </h1>
                <p className="text-lg text-black font-semibold m-2">Rendez vous N°: {appointmentData.id}</p>
                <div className="p-10 border text-black">
                    <div className="grid grid-cols-1 gap-9">

                        {/* Patient */}
                        <div >
                            <div className="flex space-x-4">
                                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                                    +Nom du patient :
                                </label>
                                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 pr-32 p">
                                    {appointmentData.patient.name}  {appointmentData.patient.firstname}
                                </div>
                            </div>

                        </div>

                        {/* Date */}
                        <div className="flex space-x-4" >
                            <div className="flex space-x-4 w-1/2">
                                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                                    +Date:
                                </label>
                                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                                    {formattedDate}
                                </div>
                            </div>
                            <div className="flex space-x-4 w-1/2 ">
                                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                                    +Heure :
                                </label>
                                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                                    {formattedTime}
                                </div>
                            </div>
                        </div>

                        {/* Raison du visit */}
                        <div >
                            <RaisonduVisite


                                tempItems={tempRaisons}
                                openFormAdd={openAddFormRaisons}
                                openAdd={openAddRaisons}
                                closeAdd={closeAddRaisons}
                                onsubmit={onsubmitRaison}
                                methods={methodsRaisons}
                                deleteTempItems={deleteRaisons}
                                raisons_validation={raisons_validation}


                            >

                            </RaisonduVisite>
                        </div>

                        {/* Prescription */}
                        <div >

                            <Prescriptons

                                tempItems={tempPrescription}
                                openFormAdd={openFormAddPrescriptions}
                                openAdd={openAddPrescriptions}
                                closeAdd={closeAddPrescriptions}
                                onsubmit={onsubmitPrescription}
                                methods={methodsPrescriptions}
                                deleteTempItems={deletePrescription}
                                medicament_validation={medicament_validation}
                                dosage_validation={dosage_validation}
                                traitement_journalier_validation={traitement_journalier_validation}


                            >

                            </Prescriptons>


                        </div>

                        {/* Notes additionnel  */}
                        <div >
                            <NotesAdditionnels


                                tempItems={tempNotes}
                                openFormAdd={openAddFormNotes}
                                openAdd={openAddNotes}
                                closeAdd={closeAddNotes}
                                onsubmit={onsubmitNotes}
                                methods={methodsNotesadditionals}
                                deleteTempItems={deleteNotes}
                                notes_validation={notes_validation}


                            >

                            </NotesAdditionnels>


                        </div>
                        {/* <div>
                                <input
                                    type="file"
                                    id="upload-image"
                                    className=""
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleImageChange}
                                    multiple
                                />
                            </div> */}

                        <button onClick={saveAllModification} class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Valider</button>

                    </div>
                </div>
            </div>


        </>
    )
}