import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../Input";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import axios from "../../../api/axios";
import { toast } from "../../Toast/Toast";
import Cookies from "js-cookie";


const ADD_HEALTHPRO_USER_FORM_URL = '/company/addHealthPro';
const SPECIALITY_OPTIONS_URL = "/speciality/read"
const ACTIVITY_OPTIONS_URL = "/activity/read"

export default function AddHealthcareForm() {
    const navigate = useNavigate()
    const add_healthcare_methods = useForm()
    const validatePasswordConfirmation = (value) => {
        const passwordValue = add_healthcare_methods.watch("password");
        return value === passwordValue || "Veuillez vérifié";
    };


    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#000000");



    const [selectedActivity, setSelectedActivity] = useState("");
    const [optionsSpeciality, setOptionsSpeciality] = useState([])




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

        }

        catch (err) {
            console.error('Error fetching data:', err);
        }
    }, [])

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
            min: {
                value: '2005-01-01',
                message: "Vous n'avez pas l'âge minimum requis",
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


    // AJOUT HEALTHCARE FUNCTIONS ----------------------------------------------------------------
    const add_healthcare_onSubmit = add_healthcare_methods.handleSubmit(async healthcare_data => {
        console.log(selectedActivity)
        const specialityValue = parseInt(selectedActivity || optionsSpeciality[0].id);
        try {
            setErrMsg('')

            const accessToken = Cookies.get('jwtToken')
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };

            const birthdate_value = healthcare_data[healthcare_birthdate_validation.name];
            const data = {
                profile: {
                    "speciality": specialityValue,
                    "orderNum": healthcare_data["ordernum"],
                    "name": healthcare_data["name"],
                    "firstName": healthcare_data["firstname"],
                    "birthdate": birthdate_value,
                    // "address": cabinet_data["address"],
                },
                user: {
                    "email": healthcare_data["mail"],
                    "password": healthcare_data["password"],
                    "contact": healthcare_data["phone"],
                },
                "confirmPassword": healthcare_data["confirm-password"],
            };
            console.log(data);


            console.log(JSON.stringify(data));
            setLoading(true)


            const response = await axios.post(ADD_HEALTHPRO_USER_FORM_URL, data, { headers: headers })
            if (response?.status === 200) {
                toast("success", "Utilisateur ajouter avec succés !")
            }
            else {
                toast("error", "Une erreur est survenue !")
            }

            setLoading(false)

        }

        catch (err) {
            toast("error", "Une erreur est survenue !")

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

    return (
        <section class="bg-gray-50 dark:bg-gray-900 w-full">

            <div class="flex flex-col items-center justify-center  py-8 lg:py-0">

                <div class="min-w-80  bg-white rounded-lg shadow dark:border  sm:max-w-xl xl:p-0 m-5 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Ajouter un compte à gerer :
                        </h1>

                        <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block w-full p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>

                        <FormProvider {...add_healthcare_methods}>
                            <form className=" md:space-y-6" onSubmit={e => e.preventDefault()}
                                noValidate
                                autoComplete="off">
                                <label for="default" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialité </label>

                                <select id="speciality"
                                    name="speciality"
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



                                <button
                                    onClick={add_healthcare_onSubmit}
                                    type="submit"
                                    className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Enregister
                                    {loading && (
                                        <svg aria-hidden="true" role="status" class="inline w-4 h-4 ml-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                        </svg>
                                    )}
                                </button>


                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </section>
    )

}