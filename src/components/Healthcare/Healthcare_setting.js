import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRef } from "react";
import { axiosPrivate } from "../../api/axios";

import default_image from "../../assets/image/default.png"


function Healthcare_setting() {
    const PASSWORD_URL = "/patient/changePassword"
    const methods_password = useForm()


    const old_password_validation = {
        name: 'old_password',
        label: "Ancien Mot de passe",
        type: "password",
        id: "old_password",
        placeholder: "Entrer votre mot de passe ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
        },
    };
    

    const new_password_validation = {
        name: 'new_password',
        label: "Nouveau Mot de passe",
        type: "password",
        id: "new_password",
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
    const confirm_new_password_validation = {
        name: 'new_confirm_password',
        label: "Confirmer nouveau Mot de passe",
        type: "password",
        id: "new_confirm_password",
        placeholder: "Confirmer votre mot de passe ...",
        validation: {
            required: {
                value: true,
                message: 'Requis !',
            },
            // validate: validatePasswordConfirmation_1,
        },
    };

    let [loading, setLoading] = useState(false);
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    // Change the passwords 
    const onSubmit_change_password = methods_password.handleSubmit(async password_data => {
        try {
            const accessToken = Cookies.get('jwtToken')

            console.log(accessToken)
            const data = {
                "oldPassword": password_data['old_password'],
                "newPassword": password_data['new_confirm_password']
            };
            console.log(password_data);

            setLoading(true)

            console.log(JSON.stringify(data));

            const response = await axiosPrivate.put(PASSWORD_URL, data,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'

                    },
                    // withCredentials: true
                })

            if (response?.status === 200) {


                console.log("Mot de passe ajouter avec success")

            }


            // console.log(JSON.stringify(response?.data));
            // const accessToken = response?.data?.accessToken;

        }

        catch (err) {
            setLoading(false)
            if (!err?.response) {

                setErrMsg('Pas de reponse du serveur');

            } else if (err.response?.status === 400) {

                setErrMsg('Erreur');

            } else if (err.response?.status === 403) {

                setErrMsg('Non autorisé');

            } else {

                setErrMsg('Connexion échoué');

            }

            // ===================TEST===================
            errRef.current.focus();
        }

    })

    return (
        <div className="h-screen bg-slate-200 sm:ml-64    ">
            <div >
                <h1 className="font-bold text-2xl ml-10">Parametres de l'utilisateur:</h1>
            </div>
            <div className="flex flex-col  ">

                <div class="max-w-full p-6 mt-10 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                    <div className=" relative mb-8">
                        {/* <img className="w-36 h-36 object-cover rounded-full mb-2" src={doctor_portrait} alt="John Doe">
            </img> */}
                        <img class="w-36 h-36 rounded-full object-cover" src={default_image} alt=""></img>

                    </div>

                    <a href="#">
                        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">USER NAME</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">GMAIL</p>




                </div>
                <div class="w-full p-6   bg-gray-200 rounded-lg shadow-lg dark:border my-10 dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Changer votre mot de passe
                    </h2>


                    {/* --------------------------- Changer le mot de passe ------------------------------ */}
                    <FormProvider {...methods_password} >

                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 " onSubmit={e => e.preventDefault()}
                            noValidate
                            autoComplete="off">

                            <Input {...old_password_validation}  ></Input>

                            <Input {...new_password_validation}></Input>

                            <Input {...confirm_new_password_validation}></Input>

                            <button onClick={onSubmit_change_password} class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
              focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
              dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Modifier
                            </button>


                        </form>

                    </FormProvider>

                </div>
            </div>
        </div>
    )

}

export default Healthcare_setting;