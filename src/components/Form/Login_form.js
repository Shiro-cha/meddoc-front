import React from "react";
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../security/context/AuthProvider";
import { Link, Navigate, Use, useLocation } from "react-router-dom";
import { useNavigate, } from "react-router-dom";
import Cookies from 'js-cookie';
import { useUserType } from "../Context/UserTypeContext";
import jwt_decode from "jwt-decode";


import axios from "../../api/axios"
const LOGIN_URL = '/login';




export default function Login() {
    window.scrollTo(0, 0);

    let [loading, setLoading] = useState(false);



    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const { userType, setuserType } = useUserType();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const login_data = {
            "username": user,
            "password": password
        }

        // setSuccess(true);
        try {
            setLoading(true)
            setErrMsg("")
            const response = await axios.post(LOGIN_URL,
                login_data,

            );

            const accessToken = response?.data;
            Cookies.set('jwtToken', accessToken);
            var decoded = jwt_decode(accessToken);
            Cookies.set('role', decoded.role);
            setuserType(decoded.role);

            setAuth({ user: user, roles: [decoded.role], accessToken: accessToken });
            setUser('');
            setPassword('');
            setSuccess(true);
            if (decoded.role === 'patient') {
                navigate("/user");
            }
            else if (decoded.role === 'healthpro') {
                navigate("/healthcare");
            }
            else if (decoded.role === 'secretary') {
                navigate("/company");
            }
            else if (decoded.role === 'admin') {
                navigate("/admin");
            }
            else {
                setErrMsg("Il est possible que votre compte ne soit pas encore activé");
            }

        } catch (err) {
            if (errRef.current) {
                errRef.current.focus();
            }

            setLoading(false)
            setErrMsg('Une erreur est survenue ');

            if (!err?.response) {
                setErrMsg('Pas de reponse du serveur');
            } else if (err.response?.status === 400) {
                setErrMsg('Utilisateur ou mot de passe invalide');
            } else if (err.response?.status === 401) {
                setErrMsg('Non autorisé');
            } else {
                setErrMsg('Veuillez remplir les champs !');
            }
            // navigate("/user");


        }
    }

    return (
        <>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-2 md:space-y-6 sm:p-8">

                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Se connecter à votre compte :
                            </h1>
                            <p ref={errRef} className={errMsg ? "errmsg text-red-400 border border-red-300 block w-full p-2.5 rounded ring-red-300" : "offscreen"} aria-live="assertive">{errMsg}</p>

                            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email </label>

                                    <input type="email" autoComplete="" name="email" id="email" value={user} onChange={(e) => setUser(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="">
                                    </input>
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe </label>
                                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                    </input>
                                </div>
                                <div class="flex items-center justify-between">
                                    {/* <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                                            </input>
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="remember" class="text-gray-500 dark:text-gray-300">Se souvenir de moi</label>
                                        </div>
                                    </div> */}
                                    <Link to="/forgot_password_form" href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-white">Mot de passe oublié ?</Link>
                                </div>
                                {/* <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Connexion</button> */}
                                <button
                                    type="submit"
                                    class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Connexion
                                    {loading && (
                                        <svg aria-hidden="true" role="status" class="inline w-4 h-4 ml-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                        </svg>
                                    )}
                                </button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Vous n'avez pas encore de compte ? <Link class="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/sign-up"> S'inscrire </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}