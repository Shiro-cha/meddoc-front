
import { useRef, useState, useEffect, useContext } from 'react';

import axios from "../../api/axios";
const LOGIN_URL = '/login';



export default function Forgot(){

    const [mail, setMail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(mail);
        const user_data ={
            "mail":mail,
        }
      
        // setSuccess(true);
    try {
        const response = await axios.post(LOGIN_URL,
            user_data,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        console.log(JSON.stringify(response?.data));
        console.log(JSON.stringify(response));

        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        // setAuth({ user, password, roles, accessToken });
        // setUser('');
        // setPassword('');
        // setSuccess(true);

    } catch (err) {
        // if (!err?.response) {
        //     setErrMsg('Pas de reponse du serveur');
        // } else if (err.response?.status === 400) {
        //     setErrMsg('Utilisateur ou mot de passe non validé');
        // } else if (err.response?.status === 401) {
        //     setErrMsg('Non autorisé');
        // } else {
        //     setErrMsg('Connexion échoué');
        // }
        // errRef.current.focus();
    }
}

    return(
        <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Vous avez oublié votre mot de passe ?
          </h2>
          <h2 class="mb-1 font-lignt text-sm text-gray-400 dark:text-white">
          Ne vous inquiétez pas! Il suffit de taper votre email et nous vous enverrons un code pour réinitialiser votre mot de passe!

          </h2>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5"  onSubmit={handleSubmit}>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre addresse mail</label>
                  <input type="email" name="email" id="email" value={mail} onChange={(e) => setMail(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              </input></div>
             
              <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                  </input></div>
                  <div class="ml-3 text-sm">
                    <label for="newsletter" class="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div>
              <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirmer </button>
          </form>
      </div>
  </div>
</section>
    )
}