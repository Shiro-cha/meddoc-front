import { useRef, useState, useEffect } from "react";
import Signup_form from "./Sign_up_form";
import { FormProvider, useForm } from "react-hook-form";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Input } from "../Input";
import { ClipLoader } from "react-spinners";
import axios, { axiosPrivate } from "../../api/axios";

import Swal from "sweetalert2";
import Errormessage from "../Toast/Toast";



const ADD_CABINET_FORM_URL = '/signup/healthPro';
const ADD_COMPANY_FORM_URL = '/signup/company';

const SPECIALITY_OPTIONS_URL = "/speciality/read"
const ACTIVITY_OPTIONS_URL = "/typeOfActivity/read"


export default function SignUpHealthCare() {




    const [isChecked, setIsChecked] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState("option_cabinet");
    const [optionsSpeciality, setOptionsSpeciality] = useState([])
    const [optionsActivity, setOptionsActivity] = useState([])

    const [selectedSpeciality, setSelectedSpeciality] = useState("");
    const [selectedActivity, setSelectedActivity] = useState("");


    useEffect(() => {
        try {

            // SPECIALITY responses
            axios.get(SPECIALITY_OPTIONS_URL).then((response) => {
                console.log(response)
                setOptionsSpeciality(response.data)

            })

                .catch((error) => {

                    console.error('Error fetching data:', error);

                });


            // ACTIVITY responses
            axios.get(ACTIVITY_OPTIONS_URL).then((response) => {
                console.log(response)
                setOptionsActivity(response.data)

            })

                .catch((error) => {

                    console.error('Error fetching data:', error);

                });



        }

        catch (err) {
            console.error('Error fetching data:', err);
        }
    }, [])


    // useEffect(() => {

    //     try {
    //         const response = axios.get(SPECIALITY_OPTIONS_URL)
    //         setSpeciality(response)


    //     }
    //     catch (err) {

    //     }
    // }, [])



    const validatePasswordConfirmation = (value) => {
        const passwordValue = cabinet_methods.watch("password");
        return value === passwordValue || "Veuillez vérifié";
    };

    const validatePasswordConfirmationOthers = (value) => {
        const passwordValue = other_methods.watch("manager_password");
        return value === passwordValue || "Veuillez vérifié";
    };

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#000000");


    //  -----------------------------CABINET MEDICAL INDIVIDUEL INPUT-----------------------------------

    const healthcare_name_validation = {
        name: 'name',
        label: "Nom de l'utilisateur",
        type: 'text',
        id: 'name',
        placeholder: 'Entrer votre noms ...',
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }

    const healthcare_firstname_validation = {
        name: 'firstname',
        label: 'Prenoms',
        type: 'text',
        id: 'firstname',
        placeholder: 'Entrer votre Prénoms ...',
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }
    const healthcare_birthdate_validation = {
        name: 'birthdate_validation',
        label: 'Date de naissance',
        type: 'date',
        id: 'birthdate',
        placeholder: "Date d'anniversaire",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }
    const healthcare_ordernum_validation = {
        name: 'ordernum',
        label: 'Numero matricule',
        type: 'text',
        id: 'ordernum',
        placeholder: 'Entrer votre n° matricule ...',
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }
    const healthcare_address_validation = {
        name: 'address',
        label: 'Adresse',
        type: 'adress',
        id: 'address',
        placeholder: 'Entrer votre Adresse ...',
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }
    const healthcare_mail_validation = {
        name: 'mail',
        label: 'Adresse mail',
        type: 'mail',
        id: 'mail',
        placeholder: 'Entrer votre email ...',
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Regular expression for email validation
                message: 'Adresse mail invalide',
            },

        },
    }
    const healthcare_phone_validation = {
        name: 'phone',
        label: "Numéro telephone",
        type: "phone",
        id: "phone",
        placeholder: "Entrer votre numéro de telephone ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
            pattern: {
                value: /^[0-9]{10}$/, // Regular expression for a 10-digit phone number
                message: 'Numéro de téléphone invalide',
            },
        },
    }
    const healthcare_password_validation = {
        name: 'password',
        label: "Mot de passe",
        type: "password",
        id: "password",
        placeholder: "Entrer votre mot de passe ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
            minLength: {
                value: 4,
                message: 'Au moins 4 caractères.',
            },
        },
    };

    const healthcare_confirm_password_validation = {
        name: 'confirm-password',
        label: "Confirmer Mot de passe",
        type: "password",
        id: "confirm-password",
        placeholder: "Confirmer votre mot de passe ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
            validate: validatePasswordConfirmation,
        },
    };

    //  -----------------------------OTHERS INPUT-----------------------------------

    const company_name_validation = {
        name: 'company_name',
        label: "Nom de la societé ou de l'etablissement",
        type: 'text',
        id: 'company_name',
        placeholder: "Entrer nom de la societé ou de l'etablissement...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }

    const company_creation_date_validation = {
        name: 'company_creation_date',
        label: 'Date de creation',
        type: 'date',
        id: 'company_creation_date',
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }
    const company_manager_name_validation = {
        name: 'company_manager_name',
        label: 'Nom de la manager',
        type: 'text',
        id: 'firstname',
        placeholder: 'Entrer le nom de la manager...',
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }

    const company_address_validation = {
        name: 'company_address',
        label: "Adresse de la societé ou de l'etablissement",
        type: 'text',
        id: 'company_address',
        placeholder: "Entrer l'adresse de la societe ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }
    const company_socialreason_validation = {
        name: 'social_reason',
        label: "Raison social",
        type: 'text',
        id: 'social_reason',
        placeholder: "Entrer la raison sociale de votre etablissement ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }

    const company_nif_validation = {
        name: 'company_nif',
        label: "NIF",
        type: 'text',
        id: 'company_nif',
        placeholder: "Entrer le NIF...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }
    const company_stat_validation = {
        name: 'company_stat',
        label: "STAT",
        type: 'text',
        id: 'company_stat',
        placeholder: "Entrer le STAT...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },

        },
    }


    const company_mail_validation = {
        name: 'mail',
        label: 'Adresse mail de la societe',
        type: 'mail',
        id: 'mail',
        placeholder: 'Entrer votre email ...',
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Regular expression for email validation
                message: 'Adresse mail invalide',
            },

        },
    }
    const company_phone_validation = {
        name: 'company_phone',
        label: "Contact",
        type: "phone",
        id: "company_phone",
        placeholder: "Entrer votre numéro de telephone ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
            pattern: {
                value: /^[0-9]{10}$/, // Regular expression for a 10-digit phone number
                message: 'Numéro de téléphone invalide',
            },
        },
    }
    const company_manager_password_validation = {
        name: 'manager_password',
        label: "Mot de passe",
        type: "password",
        id: "manager_password",
        placeholder: "Entrer votre mot de passe ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
            minLength: {
                value: 4,
                message: 'Au moins 4 caractères.',
            },
        },
    };

    const company_manager_confirm_password_validation = {
        name: 'manager_confirm_password',
        label: "Confirmer Mot de passe",
        type: "password",
        id: "manager_confirm_password",
        placeholder: "Confirmer votre mot de passe ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
            validate: validatePasswordConfirmationOthers,
        },
    };

    const cabinet_methods = useForm()
    const other_methods = useForm()

    const resetForm_cabinet = () => {
        cabinet_methods.reset();
        other_methods.reset();

    };

    const resetForm_others = () => {
        cabinet_methods.reset();
        other_methods.reset();
    };

    const [currentStep, setCurrentStep] = useState(1);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const onSubmitNext = cabinet_methods.handleSubmit(patient_data => {
        setCurrentStep(currentStep + 1);
    })


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the checkbox state when it's clicked
    };
    const navigate = useNavigate()

    const handleNext = () => {


        onSubmitNext()

        if (currentStep === 1) {
            if (cabinet_methods.formState.isValid) {
                setErrMsg('')
                onSubmitNext()

            }
        } else if (currentStep === 2) {
            if (cabinet_methods.formState.isValid) {
                setErrMsg('')
                setCurrentStep(currentStep + 1);
            }
        }

    };

    const sweet_alert = (mail) => {
        let timerInterval
        Swal.fire({
            title: "Votre demande a bien été pris en compte",
            html: `Un message de validation vous serait envoyé d'ici peu à : ${mail}.`,
            icon: 'success',
            showConfirmButton: false,
            allowOutsideClick: true,
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                navigate("/login")
            }
        })
    }

    const cabinet_onSubmit = cabinet_methods.handleSubmit(async cabinet_data => {
        console.log(selectedSpeciality)
        const specialityValue = parseInt(selectedSpeciality || optionsSpeciality[0].id);
        try {
            setErrMsg('')
            const birthdate_value = cabinet_data[healthcare_birthdate_validation.name];
            const data = {
                profile: {
                    "speciality": specialityValue,
                    "orderNum": cabinet_data["ordernum"],
                    "name": cabinet_data["name"],
                    "firstName": cabinet_data["firstname"],
                    "birthdate": birthdate_value,
                },
                user: {
                    "address": cabinet_data["address"],
                    "email": cabinet_data["mail"],
                    "password": cabinet_data["password"],
                    "contact": cabinet_data["phone"],
                },
                "confirmPassword": cabinet_data["confirm-password"],
            };
            console.log(data);


            console.log(JSON.stringify(data));
            setLoading(true)


            const response = await axios.post(ADD_CABINET_FORM_URL, data)
            if (response?.status === 200) {
                sweet_alert(cabinet_data["mail"])
                setLoading(false)

            }


        }

        catch (err) {

            setLoading(false)
            if (!err?.response) {
                setErrMsg('Pas de reponse du serveur');
            } else if (err.response?.status === 400) {
                setErrMsg('Erreur');
            } else if (err.response?.status === 403) {
                setErrMsg('Connexion perdue');
            } else {
                setErrMsg('Connexion échouée');
            }

            errRef.current.focus();

        }



    })


    // OTHERS
    const other_onSubmit = other_methods.handleSubmit(async other_data => {
        console.log(selectedSpeciality)
        console.log(selectedActivity)

        const activityValue = parseInt(selectedActivity);
        try {
            setErrMsg('')

            const data = {
                profile: {
                    "name": other_data["company_name"],
                    "nif": other_data["company_nif"],
                    "stat": other_data["company_stat"],
                    "creationdate": other_data["company_creation_date"],
                    "typeOfActivity": {
                        "id": activityValue
                    },

                    "socialreason": other_data['social_reason'],

                    "picture": "ok.jpg"

                },
                user: {
                    "commune_id": {
                        "id": 1
                    },
                    "address": other_data['company_address'],
                    "email": other_data["mail"],
                    "password": other_data["manager_password"],
                    "contact": other_data["company_phone"],
                },
                "confirmPassword": other_data["manager_confirm_password"],
            };
            console.log(data);


            console.log(JSON.stringify(data));
            setLoading(true)


            const response = await axios.post(ADD_COMPANY_FORM_URL, data)
            if (response?.status === 200) {
                sweet_alert(other_data["mail"])
                setLoading(false)

            }


        }

        catch (err) {

            setLoading(false)
            if (!err?.response) {
                setErrMsg('Pas de reponse du serveur');
            } else if (err.response?.status === 400) {
                setErrMsg('Erreur');
            } else if (err.response?.status === 403) {
                setErrMsg('Connexion perdue');
            } else {
                setErrMsg('Connexion échouée');
            }

            errRef.current.focus();

        }


    }

    )

    function caterogie_radio_select_component() {
        return (
            <>
                <div class="flex">
                    <div class="flex items-center h-5">
                        <input id="cabinet-radio" name="category" type="radio"
                            value="option_cabinet"
                            checked={selectedCategory === "option_cabinet"}
                            onChange={() => {
                                resetForm_cabinet()
                                setSelectedCategory("option_cabinet")
                            }}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div class="ml-2 text-sm">
                        <label for="cabinet-radio" class="font-medium text-gray-900 dark:text-gray-300">Cabinet medical individuel</label>
                        <p id="cabinet-radio-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">1 seul utilisateur </p>
                    </div>
                </div>
                {/* <div class="flex">
                    <div class="flex items-center h-5">
                        <input id="other-radio" name="category" type="radio"
                            value="option_other"
                            checked={selectedCategory === "option_other"}
                            onChange={() => {
                                resetForm_others()
                                setSelectedCategory("option_other")
                            }
                            }
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div class="ml-2 text-sm">
                        <label for="other-radio" class="font-medium text-gray-900 dark:text-gray-300">Autres</label>
                        <p id="other-radio-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">Maximum 4 utilisteurs</p>
                    </div>
                </div> */}
            </>
        )
    }




    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
        setErrMsg('')
    };




    const stepper = () => {
        return (
            <div className="w-full " >
                <ol class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 flex justify-center">
                    <li className={`flex items-center space-x-2.5 ${currentStep >= 2 ? 'text-blue-500' : 'text-blue-600 dark:text-blue-500'}`}>
                        <span class={`flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500 ${currentStep >= 2 ? ' bg-blue-600 text-white ' : ''} `}>
                            1
                        </span>
                        <span>
                            <h3 class="font-medium leading-tight">Catégories  </h3>
                            <p class="text-xs">Choisir son catégorie</p>
                        </span>
                    </li>
                    <li className={`flex items-center space-x-2.5 ${currentStep >= 2 ? 'text-blue-500' : 'text-gray-500 dark:text-blue-500'}`}>
                        <span class={`flex items-center justify-center w-8 h-8 border border-blue-500 rounded-full shrink-0 dark:border-blue-500 ${currentStep > 2 ? ' bg-blue-600  border-blue-500 text-white ' : ' border-gray-500'} `}>
                            2
                        </span>
                        <span>
                            <h3 class="font-medium leading-tight">Compte</h3>
                            <p class="text-xs">Créer Votre compte</p>
                        </span>
                    </li>
                    <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
                        <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                            3
                        </span>
                        <span>
                            <h3 class="font-medium leading-tight">Confirmation</h3>
                            <p class="text-xs">Confrimer votre compte</p>
                        </span>
                    </li>
                </ol>
            </div>
        )
    }

    return (
        <div className="">

            <section class="bg-gray-50 dark:bg-gray-900 w-full">

                <div class="flex flex-col items-center justify-center px-40 py-8 mx-auto  lg:py-0">


                    <div class="min-w-80  bg-white rounded-lg shadow dark:border  sm:max-w-xl xl:p-0 m-5 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Vous êtes praticien ?
                            </h1>

                            <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block w-full p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>


                            {currentStep === 1 && (
                                <>

                                    {caterogie_radio_select_component()}
                                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                                    </hr>
                                </>
                            )}


                            {/* CABINET  */}
                            {selectedCategory === "option_cabinet" && (
                                <FormProvider {...cabinet_methods}>
                                    <form className=" md:space-y-6" onSubmit={e => e.preventDefault()}
                                        noValidate
                                        autoComplete="off">
                                        <label for="default" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialité </label>
                                        {/* <select id="default" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option className="block w-full p-2.5" selected>Medecin géneraliste</option>
                                            </select> */}

                                        <select id="activity"
                                            name="activity"
                                            value={selectedActivity} // Set the selected value
                                            onChange={(e) => setSelectedActivity(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm w-80 rounded-lg min-w-full focus:ring-primary-600 focus:border-primary-600 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                            {optionsSpeciality && optionsSpeciality.length > 0 ? (
                                                optionsSpeciality.map((option, index) => (
                                                    <option key={index} value={option.id} className="min-w-full">
                                                        {option.description}
                                                    </option>
                                                ))
                                            ) : (
                                                <option>Autres</option>
                                            )}
                                        </select>
                                        <Input {...healthcare_ordernum_validation} />
                                        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                                        </hr>

                                        <Input {...healthcare_name_validation} />
                                        <Input {...healthcare_firstname_validation} />

                                        <Input {...healthcare_birthdate_validation} />
                                        <Input {...healthcare_address_validation} />

                                        <Input {...healthcare_mail_validation} />
                                        <Input {...healthcare_phone_validation} />

                                        <Input {...healthcare_password_validation} />
                                        <Input {...healthcare_confirm_password_validation} />


                                        {/* <p className="font-small ">Votre mot de passe vous permettra de gérer vos rendez-vous médicaux.</p> */}
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                                                </input>
                                            </div>

                                            <div class="ml-3 text-sm">
                                                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">J'accepte les <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#"> les conditions d'utilisations de MeDdoc.</a></label>
                                            </div>
                                        </div>
                                        <button
                                            onClick={cabinet_onSubmit}
                                            type="submit"
                                            className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            Envoyer
                                            {loading && (
                                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 ml-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                                </svg>
                                            )}
                                        </button>
                                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Vous avez deja un compte? <Link to='/login' class="font-medium text-primary-600 hover:underline dark:text-primary-500">Se connecter </Link>
                                        </p>

                                    </form>
                                </FormProvider>
                            )}

                            {/* OTHER */}
                            {selectedCategory === "option_other" && (

                                <FormProvider {...other_methods}>


                                    <form className=" md:space-y-6" onSubmit={e => e.preventDefault()}
                                        noValidate
                                        autoComplete="off">


                                        {/* COMPANY */}
                                        <Input {...company_name_validation} />
                                        <Input {...company_creation_date_validation} />
                                        <Input {...company_address_validation} />
                                        <Input {...company_socialreason_validation} />
                                        <label for="activity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type d'activité </label>
                                        {/* <select id="default" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option className="block w-full p-2.5" selected>Medecin géneraliste</option>
                                            </select> */}

                                        <select id="activity"
                                            name="activity"
                                            value={selectedActivity} // Set the selected value
                                            onChange={(e) => setSelectedActivity(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm w-80 rounded-lg min-w-full focus:ring-primary-600 focus:border-primary-600 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                            {optionsActivity && optionsActivity.length > 0 ? (
                                                optionsActivity.map((option, index) => (
                                                    <option key={index} value={option.id} className="min-w-full">
                                                        {option.description}
                                                    </option>
                                                ))
                                            ) : (
                                                <option>Autres</option>
                                            )}
                                        </select>

                                        <Input {...company_nif_validation} />
                                        <Input {...company_stat_validation} />
                                        <Input {...company_address_validation} />

                                        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                                        </hr>
                                        {/* MANAGER */}
                                        <Input {...company_manager_name_validation} />
                                        <Input {...company_mail_validation} />
                                        <Input {...company_phone_validation} />

                                        <Input {...company_manager_password_validation} />
                                        <Input {...company_manager_confirm_password_validation} />

                                        {/* <p className="font-small ">Votre mot de passe vous permettra de gérer vos rendez-vous médicaux.</p> */}
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                                                </input>
                                            </div>

                                            <div class="ml-3 text-sm">
                                                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">J'accepte les <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#"> les conditions d'utilisations de MeDdoc.</a></label>
                                            </div>
                                        </div>



                                        <button
                                            onClick={other_onSubmit}
                                            className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            S'inscrire
                                            {loading && (
                                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 ml-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                                </svg>
                                            )}
                                        </button>

                                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Vous avez deja un compte?
                                            <Link
                                                to="/login"
                                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                                Se connecter
                                            </Link>
                                        </p>

                                    </form>
                                </FormProvider>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}