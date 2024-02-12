import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { useState } from "react";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useRef } from "react";
import { toast } from "../Toast/Toast";

export default function ChangePasswordForm() {
    const PASSWORD_URL = "/user/changePassword"
    const errRef = useRef();


    const methods_password = useForm()
    let [loading, setLoading] = useState(false);

    const accessToken = Cookies.get('jwtToken')

    const [errMsg, setErrMsg] = useState('');


    // Change the passwords 
    const onSubmit_change_password = methods_password.handleSubmit(async password_data => {
        try {
            setErrMsg('')
            const data =
            {
                "confirmPassword": password_data['new_confirm_password'],
                "newPassword": password_data['new_confirm_password']
            }
            console.log(password_data);

            setLoading(true)

            console.log(JSON.stringify(data));

            const response = await axios.put(PASSWORD_URL, data,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                })

            if (response?.status === 200) {
                console.log("Mot de passe ajouter avec success")
                toast("success", response?.data)

            }

        }

        catch (err) {
            setLoading(false)
            setErrMsg(`${err.response?.data}`);


        }



    })
    const validatePasswordConfirmation_1 = (value) => {
        const passwordValue = methods_password.watch("new_password");
        return value === passwordValue || "Les champs ne se correspondent pas !";
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
            validate: validatePasswordConfirmation_1,
        },
    };

    return (
        <div class="w-full p-6   bg-gray-100 rounded-lg shadow-lg dark:border my-10 dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Changer votre mot de passe
            </h2>
            <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block w-full p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>


            {/* --------------------------- Changer le mot de passe ------------------------------ */}
            <FormProvider {...methods_password} >

                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 " onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off">

                    {/* <Input {...old_password_validation}  ></Input> */}

                    <Input {...new_password_validation}></Input>

                    <Input {...confirm_new_password_validation}></Input>

                    <button onClick={onSubmit_change_password} class="w-full mx-auto text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
        focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
        dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Modifier
                    </button>


                </form>

            </FormProvider>

        </div>
    )

}