import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useRef, useState, useEffect, useContext } from 'react';
import { Input } from '../Input';
import { useForm, FormProvider, } from "react-hook-form";

import Cookies from "js-cookie";

import axios from "../../api/axios";

import ClipLoader from "react-spinners/ClipLoader";
import AuthContext from "../../security/context/AuthProvider";
import Swal from "sweetalert2";

const FORM_URL = '/signup/patient';

function Signup_form() {

  const { setAuth } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(true);

  const [AcceptConditionCheck, setTermChecked] = useState(false);
  const [checkboxDisabled, setCheckboxDisabled] = useState(false);

  // GENDER CHECK BOX
  const [isMaleSelected, setMaleSelected] = useState(true);

  const handleGenderChange = (isMale) => {
    setMaleSelected(isMale);
  };

  // 
  const handleTermOfUse = () => {
    setTermChecked(!AcceptConditionCheck);
    setCheckboxDisabled(!AcceptConditionCheck)
  };


  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  const methods = useForm()

  const validatePasswordConfirmation = (value) => {
    const passwordValue = methods.watch("password");
    return value === passwordValue || "Veuillez vérifié";
  };

      const birthdate_validation = {
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
  const firstname_validation = {
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
  const name_validation = {
    name: 'name',
    label: 'Nom',
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
  const address_validation = {
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
  const mail_validation = {
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
  const phone_validation = {
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
  const password_validation = {
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

  const confirm_password_validation = {
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


  const [currentStep, setCurrentStep] = useState(1);


  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");


  const onSubmitNext = methods.handleSubmit(patient_data => {
    setCurrentStep(currentStep + 1);
  })


  const handleNext = () => {
    onSubmitNext()

    if (currentStep === 1) {
      if (methods.formState.isValid) {
        setErrMsg('')
        onSubmitNext()

      }
    } else if (currentStep === 2) {
      if (methods.formState.isValid) {
        setErrMsg('')
        setCurrentStep(currentStep + 1);
      }
    }

  };


  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrMsg('')
  };

  const sweet_alert = (mail) => {
    let timerInterval
    Swal.fire({
      title: "Page de redirection",
      html: `Une code de validation a été envoyé à l'addresse mail : ${mail}.`,
      timer: 5000,
      showConfirmButton: false,
      timerProgressBar: true,
      allowOutsideClick: false,
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        navigate("/OTP_digit");
      }
    })
  }


  const [isCheckedMale, setIsCheckedMale] = useState(true); // Set the initial state based on your condition
  const [isCheckedFemale, setIsCheckedFemale] = useState(false); // Set the initial state based on your condition



  const onSubmit = methods.handleSubmit(async patient_data => {
    setErrMsg('')
    try {
      const birthdate_value = patient_data[birthdate_validation.name];
      const data = {
        profile: {
          "name": patient_data["name"],
          "firstname": patient_data["firstname"],
          "gender": isChecked,
          "birthdate": birthdate_value,
          "address": patient_data["address"],
        },
        user: {
          "email": patient_data["mail"],
          "password": patient_data["password"],
          "contact": patient_data["phone"],

        },
        "confirmPassword": patient_data["confirm-password"],
      };
      console.log(data);

      setLoading(true)
      setCheckboxDisabled(true)

      console.log(JSON.stringify(data));

      const response = await axios.post(FORM_URL, data)

      if (response?.status === 200) {

        console.log(response)
        const roles = "non-actived"
        const OTPToken = response?.data

        Cookies.remove("jwtTokenOTP")

        Cookies.set('jwtTokenOTP', OTPToken);

        setAuth({ roles: [roles], accessToken: [OTPToken] });
        const email = patient_data["mail"]
        sweet_alert(email);
        setSuccess(true);
        navigate("/OTP_digit");

      } else {
        setCheckboxDisabled(false)
        setTermChecked(false)
      }


      // console.log(JSON.stringify(response?.data));
      // const accessToken = response?.data?.accessToken;

    }

    catch (err) {
      setCheckboxDisabled(false)
      setTermChecked(false)
      setLoading(false)
      if (!err?.response) {

        setErrMsg('Pas de reponse du serveur');

      } else if (err.response?.status === 400) {

        setErrMsg('Il y a une erreur');

      } else if (err.response?.status === 403) {


        setErrMsg('Non autorisé');

      } else {

        setErrMsg('Connexion échoué');

      }
      errRef.current.focus();



      // ===================TEST===========================================

      // const roles = "non-actived"
      // const OTPToken = "TOKEN"
      // Cookies.set('jwtTokenOTP', OTPToken);
      // setAuth({ roles: [roles], accessToken: [OTPToken] });
      // const email = patient_data["mail"]
      // sweet_alert(email);
      // ==============================TEST SWEET ALERT====================




    }



  })


  return (
    <section class="bg-gray-50 dark:bg-gray-900 w-full">
      <div class="flex flex-col items-center justify-center px-40 py-8 mx-auto  lg:py-0">
        <div class="min-w-80  bg-white rounded-lg shadow dark:border  sm:max-w-xl xl:p-0 m-5 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Nouveau sur MeDdoc ?
            </h1>
            <div className="w-full " >
              <ol class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 flex justify-center">
                <li className={`flex items-center space-x-2.5 ${currentStep >= 2 ? 'text-blue-500' : 'text-blue-600 dark:text-blue-500'}`}>
                  <span class={`flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500 ${currentStep >= 2 ? ' bg-blue-600 text-white ' : ''} `}>
                    1
                  </span>
                  <span>
                    <h3 class="font-medium leading-tight">Profil </h3>
                    <p class="text-xs">Entrer votre profil</p>
                  </span>
                </li>
                <li className={`flex items-center space-x-2.5 ${currentStep >= 2 ? 'text-blue-500' : 'text-gray-500 dark:text-blue-500'}`}>
                  <span class={`flex items-center justify-center w-8 h-8 border border-blue-500 rounded-full shrink-0 dark:border-blue-500 ${currentStep > 2 ? ' bg-blue-600  border-blue-500 text-white ' : ' border-gray-500'} `}>
                    2
                  </span>
                  <span>
                    <h3 class="font-medium leading-tight">Compte</h3>
                    <p class="text-xs">Votre compte</p>
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
            <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block w-full p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <FormProvider {...methods}>
              <form className="space-y-4 md:space-y-6" onSubmit={e => e.preventDefault()}
                noValidate
                autoComplete="off">

                {currentStep === 1 && (
                  <>
                    <Input {...name_validation} />
                    <Input {...firstname_validation} />
                    <Input {...birthdate_validation} />
                    <Input {...address_validation} />
                    {/* <Input {...gender_validation} /> */}
                    <div className="flex">
                      <p className="mr-10">Sexe : </p>

                      <div className="flex items-center">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-blue-500"
                            value="male"
                            checked={isMaleSelected}
                            onChange={() => handleGenderChange(true)}
                          />
                          <span className="ml-2 text-gray-700">Homme</span>
                        </label>

                        <label className="inline-flex items-center ml-6">
                          <input
                            type="radio"
                            className="form-radio text-pink-400"
                            value="female"
                            checked={!isMaleSelected}
                            onChange={() => handleGenderChange(false)}
                          />
                          <span className="ml-2 text-gray-700">Femme</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>

                    <Input {...mail_validation} />
                    <Input {...phone_validation} />
                    <Input {...password_validation} />
                    <Input {...confirm_password_validation} />

                  </>
                )}
                {/* TERMS AND CONDITIONS */}
                {currentStep === 3 && (
                  <>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" onChange={handleTermOfUse} checked={checkboxDisabled} aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                        </input>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">J'acccepte  <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#"> les conditions d'utilisations de MeDdoc.</a></label>
                      </div>
                    </div>


                  </>
                )}

                <div className="flex justify-between">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevious}
                      className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Precedent
                    </button>
                  )}

                  {currentStep < 3 && (
                    <button
                      onClick={handleNext}
                      className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Suivant
                    </button>
                  )}

                  {currentStep === 3 && (
                    <>
                      {AcceptConditionCheck && (
                        <button
                          onClick={onSubmit}
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
                      )}

                    </>
                  )}

                </div>

                {/* <p className="font-small ">Votre mot de passe vous permettra de gérer vos rendez-vous médicaux.</p> */}

                {/* <button onClick={onSubmit} class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">S'inscrire</button> */}

                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Vous avez deja un compte? <Link to='/login' class="font-medium text-primary-600 hover:underline dark:text-primary-500">Se connecter </Link>
                </p>

              </form>
            </FormProvider>

          </div>
        </div>
      </div>
    </section>
  )
}
export default Signup_form;