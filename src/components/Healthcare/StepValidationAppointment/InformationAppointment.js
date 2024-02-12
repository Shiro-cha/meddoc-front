import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Input } from "../../Input";
import { Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField, Typography, createFilterOptions } from "@mui/material";
import { Button } from "flowbite-react";
import { axiosPrivate } from "../../../api/axios";
import Cookies from "js-cookie";
import { useRef } from "react";
import medecine from "../../../assets/svg/medicine.svg"
import symptoms from "../../../assets/svg/symptom.svg"
import { toast } from "../../Toast/Toast";

const URL_CONSULTATION_MEDICAMENT = "/consultation/medicament"
const URL_CONSULTATION_SYMPTOME = "/consultation/symptom"


export const Prescriptons = ({ tempItems, openFormAdd, openAdd, closeAdd, onsubmit, methods, medicament_validation, dosage_validation, traitement_journalier_validation, deleteTempItems }) => {

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setErrMsg('')
        setMedicament("")
        setOpen(false)
    };


    const fetchMedicament = async (inputValue) => {
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        return await axiosPrivate.get(URL_CONSULTATION_MEDICAMENT, {
            params: {
                query: `name<CT>${inputValue}`,
            },
            headers: headers
        });
    };

    // ADD 
    const addMedicament = async (name) => {
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        const nmap = {
            "name": name
        };

        return await axiosPrivate.post(URL_CONSULTATION_MEDICAMENT, nmap, {
            headers: headers
        });
    };

    useEffect(() => {
        // Define your API call function
        const fetchData = async () => {
            try {
                const response = await fetchMedicament(inputValue);
                // Extract relevant data from the response and update options
                const data = response.data; // Replace with actual data extraction
                console.log(data)
                setOptions(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the API when inputValue changes (excluding empty string)
        if (inputValue.trim() !== '') {
            fetchData();
        }
    }, [inputValue]);




    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [medicament_name, setMedicament] = useState();



    // AJOUTER MEDICAMENT
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await addMedicament(medicament_name);
            // Extract relevant data from the response and update options
            const data = response.data;
            console.log(data)
            toast("success")
            handleClose(true)
            setErrMsg('')

        } catch (error) {
            setErrMsg("Une erreur s'est produite !")
            console.error('Error fetching data:', error);
            setErrMsg('')
        }
    };

    const timeSlots = [
        { label: 'Matin', name: 'matin' },
        { label: 'Midi', name: 'midi' },
        { label: 'Soir', name: 'soir' },
    ];

    return (
        <div className="bg-white  rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center">
                <h4 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Prescription(s) :</h4>
                <button type="button" class="m-2 flex" onClick={openAdd}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
            {openFormAdd && (
                <div className="md:col-span-2 mt-4 border p-4 rounded-lg shadow-md">
                    <FormProvider {...methods}>
                        <form onSubmit={e => e.preventDefault()}
                            noValidate
                            autoComplete="off">
                            <div className="space-y-5">
                                <div>
                                    <div className="relative md:flex justify-between">
                                        <div className=" flex items-center">
                                            <label for={"medicament"} className="text-justify ">Medicament:</label>
                                            <button className=' text-white font-bold m-2 rounded'
                                                onClick={handleOpen}>
                                                <img src={medecine} alt='medecine'></img>
                                            </button>
                                        </div>

                                        <div className="my-1 md:my-0">
                                            <Autocomplete
                                                // inputValue={inputValue}

                                                freeSolo
                                                sx={{
                                                    display: 'flex',
                                                    '& input': {
                                                        bgcolor: 'background.paper',
                                                        color: (theme) =>
                                                            theme.palette.getContrastText(theme.palette.background.paper),
                                                    },
                                                }}

                                                id="medicament"
                                                name='medicament'
                                                label='medicament'
                                                {...methods.register('medicament')}
                                                required
                                                options={options}
                                                renderInput={(params) => (
                                                    <div ref={params.InputProps.ref}>
                                                        <input type="text"
                                                            name='medicament'
                                                            label='medicament'
                                                            id='medicament'
                                                            defaultValue=''
                                                            {...params.inputProps}
                                                            className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-80 min-w-full focus:ring-primary-600 focus:border-primary-600 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>
                                                )}

                                                value={inputValue}
                                                onInputChange={(event, newInputValue) => {
                                                    setInputValue(newInputValue);
                                                }}


                                                getOptionLabel={(option) => {
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    return option.name;
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                            />

                                        </div>
                                    </div>
                                </div>
                                {/* <Input {...medicament_validation} className={"m-2"} /> */}
                                {/* <Input {...dosage_validation} /> */}
                                {/* <Input {...traitement_journalier_validation} /> */}

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
                                        <h2 className="text-2xl font-bold mb-4" >Ajouter un medicament :</h2>

                                        <form onSubmit={handleSubmit}>

                                            <div className="flex flex-col space-y-4">
                                                <div className="flex flex-col">

                                                    <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block w-full p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                                    <label className="text-gray-700 font-bold mb-2" htmlFor="start_date">
                                                        Nom du medicament:
                                                    </label>

                                                    <input

                                                        type="text"
                                                        id="start_date"
                                                        name="start_date"
                                                        className="border border-gray-300 p-2 rounded-lg"
                                                        value={medicament_name}
                                                        onChange={(e) => setMedicament(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="flex justify-center">
                                                    <button
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        type='submit'
                                                    >
                                                        Ajouter
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    </Box>
                                </Modal>

                                <div className=" flex-col justify-between">
                                    <div className=" mr-5">
                                        <label for={"traitement"} className="text-justify mr-10">Durée(Jours):</label>
                                    </div>
                                    <div className="dark:border-gray-600 flex  items-center w-full">
                                        <div className="flex items-center m-2">
                                            <input

                                                type="number"
                                                id="duration"
                                                name="duration"
                                                className="border border-gray-300 p-2 rounded-lg"
                                                {...methods.register('duration')}
                                                required
                                            />
                                        </div>

                                    </div >
                                    <div className=" mr-5">
                                        <label for={"traitement"} className="text-justify mr-10">Traitement journalier:</label>
                                    </div>
                                    {timeSlots.map((timeSlot, index) => (
                                        <div key={index} className="dark:border-gray-600 flex  items-center w-full">
                                            <div className="flex items-center m-2">
                                                <label className="p-2" >{timeSlot.label} :</label>
                                                <input className="border ml-2" type="number" name={timeSlot.name} min={0} defaultValue={1}  {...methods.register(`${timeSlot.name}`)} />
                                            </div>
                                        </div>
                                    ))}


                                </div>


                            </div>
                            <div className="flex items-center">
                                <button className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={onsubmit}> Ajouter</button>
                                <button type="button" className='m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border-red-400 border'
                                    onClick={closeAdd}>
                                    Annuler
                                </button>
                            </div>
                        </form>

                    </FormProvider>

                </div>
            )}
            {!openFormAdd && (
                <ul>
                    {tempItems.length > 0 && tempItems !== null &&
                        (tempItems.map((prescriptions, index) => (
                            <>
                                <li key={index} className="text-gray-700 min-w-32  border-b-2 dark:text-gray-400 m-2 flex  justify-between">
                                    <div className="flex  justify-start">
                                        <div className="mr-10 tracking-tight text-gray-900 dark:text-white ">
                                            {prescriptions.medicament} /  {prescriptions.day}-{prescriptions.evening}-{prescriptions.night} /{prescriptions.duration} jours
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div className="items-center">
                                        <button className="mx-2" onClick={() => deleteTempItems(index)}>
                                            <svg class="w-6 h-6 text-red-400 hover:text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                            </svg>
                                        </button>

                                    </div>
                                </li>
                            </>
                        )))}
                </ul>
            )}
            {/* Add a button to open the tarifs form */}
        </div>
    );
};
export const NotesAdditionnels = ({ tempItems, openFormAdd, openAdd, closeAdd, onsubmit, methods, notes_validation, deleteTempItems }) => {
    return (
        <div className="bg-white  rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center">
                <h4 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Notes additionnel(s) :</h4>
                <button type="button" class="m-2 flex" onClick={openAdd}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
            {openFormAdd && (
                <div className="md:col-span-2 mt-4 border p-4 rounded-lg shadow-md">
                    <FormProvider {...methods}>
                        <form onSubmit={e => e.preventDefault()}
                            noValidate
                            autoComplete="off">
                            <Input {...notes_validation} />
                            <div className="flex items-center">
                                <button className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={onsubmit}> Ajouter</button>
                                <button type="button" className='m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border-red-400 border'
                                    onClick={closeAdd}>
                                    Annuler
                                </button>
                            </div>
                        </form>

                    </FormProvider>

                </div>
            )}
            {!openFormAdd && (
                <ul>
                    {tempItems.length > 0 && tempItems !== null &&
                        (tempItems.map((note, index) => (
                            <>
                                <li key={index} className="text-gray-700 min-w-32  border-b-2 dark:text-gray-400 m-2 flex  justify-between">
                                    <div className="flex  justify-start ">
                                        <div className=" mr-10  tracking-tight text-gray-900 dark:text-white ">
                                            {note}
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div className="items-center">
                                        <button className="mx-2" onClick={() => deleteTempItems(index)}>
                                            <svg class="w-6 h-6 text-red-400 hover:text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                            </svg>
                                        </button>

                                    </div>
                                </li>
                            </>
                        )))}
                </ul>
            )}
            {/* Add a button to open the tarifs form */}
        </div>
    );
};
export const RaisonduVisite = ({ tempItems, openFormAdd, openAdd, closeAdd, onsubmit, methods, raisons_validation, deleteTempItems }) => {

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const fetchSymptome = async (inputValue) => {
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        return await axiosPrivate.get(URL_CONSULTATION_SYMPTOME, {
            params: {
                query: `name<CT>${inputValue}`,
            },
            headers: headers
        });
    };

    // ADD
    const addSymptome = async (name) => {
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        const nmap = {
            "name": name
        };
        return await axiosPrivate.post(URL_CONSULTATION_SYMPTOME, nmap, {
            headers: headers
        });
    };

    useEffect(() => {
        // Define your API call function
        const fetchData = async () => {
            try {
                const response = await fetchSymptome(inputValue);
                // Extract relevant data from the response and update options
                const data = response.data; // Replace with actual data extraction
                console.log(data)
                setOptions(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the API when inputValue changes (excluding empty string)
        if (inputValue.trim() !== '') {
            fetchData();
        }
    }, [inputValue]);




    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [symptome_name, setsymptome] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await addSymptome(symptome_name);
            // Extract relevant data from the response and update options
            const data = response.data;
            console.log(data)
            toast("success")
            handleClose(true)

            setErrMsg('')

        } catch (error) {
            setErrMsg("Une erreur s'est produite !")
            console.error('Error fetching data:', error);
            setErrMsg('')
        }
    };



    return (
        <div className="bg-white  rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center">
                <h4 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Motif(s) ou symptôme(s) :</h4>
                <button type="button" class="m-2 flex" onClick={openAdd}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
            {openFormAdd && (
                <div className="md:col-span-2 mt-4 border p-4 rounded-lg shadow-md">
                    <FormProvider {...methods}>
                        <form onSubmit={e => e.preventDefault()}
                            noValidate
                            autoComplete="off">
                            {/* <Input {...raisons_validation} /> */}

                            <div>
                                <div className="relative md:flex justify-between">
                                    <div className=" flex items-center">
                                        <label for={"medicament"} className="text-justify ">Raison ou symptome :</label>
                                        <button className=' text-white font-bold m-2 rounded'
                                            onClick={handleOpen}>
                                            <img src={symptoms} className="w-7 h-7" alt='symptoms'></img>
                                        </button>
                                    </div>

                                    <div className="my-1 md:my-0">
                                        <Autocomplete
                                            // inputValue={inputValue}

                                            freeSolo
                                            sx={{
                                                display: 'flex',
                                                '& input': {
                                                    bgcolor: 'background.paper',
                                                    color: (theme) =>
                                                        theme.palette.getContrastText(theme.palette.background.paper),
                                                },
                                            }}

                                            id="reason"
                                            name='reason'
                                            label='reason'
                                            {...methods.register('reason')}
                                            required
                                            options={options}
                                            renderInput={(params) => (
                                                <div ref={params.InputProps.ref}>
                                                    <input type="text"
                                                        name='reason'
                                                        label='reason'
                                                        id='reason'
                                                        defaultValue=''
                                                        {...params.inputProps}
                                                        className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-80 min-w-full focus:ring-primary-600 focus:border-primary-600 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required
                                                    />
                                                </div>
                                            )}

                                            value={inputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setInputValue(newInputValue);
                                            }}


                                            getOptionLabel={(option) => {
                                                if (typeof option === 'string') {
                                                    return option;
                                                }
                                                if (option.inputValue) {
                                                    return option.inputValue;
                                                }
                                                return option.name;
                                            }}
                                            selectOnFocus
                                            clearOnBlur
                                            handleHomeEndKeys
                                            renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                        />


                                    </div>
                                </div>
                            </div>
                            {/* <Input {...medicament_validation} className={"m-2"} /> */}
                            {/* <Input {...dosage_validation} /> */}
                            {/* <Input {...traitement_journalier_validation} /> */}

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
                                    <h2 className="text-2xl font-bold mb-4" >Ajouter un symptome :</h2>
                                    <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block w-full p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>

                                    <form onSubmit={handleSubmit}>

                                        <div className="flex flex-col space-y-4">
                                            <div className="flex flex-col">
                                                <label className="text-gray-700 font-bold mb-2" htmlFor="start_date">
                                                    Descriptions du symptome:
                                                </label>
                                                <input

                                                    type="text"
                                                    id="start_date"
                                                    name="start_date"
                                                    className="border border-gray-300 p-2 rounded-lg"
                                                    value={symptome_name}
                                                    onChange={(e) => setsymptome(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    type='submit'
                                                >
                                                    Ajouter
                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                </Box>
                            </Modal>

                            <div className="flex items-center">
                                <button className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={onsubmit}> Ajouter</button>
                                <button type="button" className='m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border-red-400 border'
                                    onClick={closeAdd}>
                                    Annuler
                                </button>
                            </div>
                        </form>

                    </FormProvider>

                </div>
            )}
            {!openFormAdd && (
                <ul>
                    {tempItems.length > 0 && tempItems !== null &&
                        (tempItems.map((raison, index) => (
                            <>
                                <li key={index} className="text-gray-700 min-w-32  border-b-2 dark:text-gray-400 m-2 flex  justify-between">
                                    <div className="flex  justify-start ">
                                        <div className=" mr-10  tracking-tight text-gray-900 dark:text-white ">
                                            {raison}
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div className="items-center">
                                        <button className="mx-2" onClick={() => deleteTempItems(index)}>
                                            <svg class="w-6 h-6 text-red-400 hover:text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                            </svg>
                                        </button>

                                    </div>
                                </li>
                            </>
                        )))}
                </ul>
            )}
            {/* Add a button to open the tarifs form */}
        </div>
    );
};