import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Mailform(){
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_bfwxj55', 'template_fz3ilyg', form.current, 'uFI2eP2Ju5zGPtkah')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };


    return(
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Nous contacter</h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Vous avez un problème technique ? Vous souhaitez envoyer des commentaires sur une fonctionnalité ou autres   ? Faites le nous savoir.</p>
      <form ref={form} onSubmit={sendEmail} class="space-y-8">
      <div className="grid grid-cols-2 place-items-stretch">
          <div>
              <label for="nom" class="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 w-40 ">Nom </label>
              <input type="text" name='nom' id="nom" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
          </input>
          </div>
          <div>
              <label for="prenoms" class="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 w-40 ">Prénoms </label>
              <input type="text" name='prenoms' id="prenoms" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
          </input>
          </div>
          <div>
              <label for="profession" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Profession</label>
              <input type="text" id="profession" name='profession' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
          </input>
          </div>
          </div>
          <div className="grid grid-cols-2 place-items-stretch">
          <div>
              <label for="user_mail" class="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 w-40 ">Votre addresse mail</label>
              <input type="email" name='user_mail' id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
          </input>
          </div>
          <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Telephone</label>
              <input type="tel" id="phone" name='phone' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
          </input>
          </div>
          </div>
         
          <div>
              <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Objet</label>
              <input type="text" id="subject" name='objet' class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required>
        </input>
          </div>
          <div class="sm:col-span-2">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Votre message</label>
              <textarea id="message" name='message' rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" ></textarea>
          </div>
          <button type="submit" value="send" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Envoyer</button>
      </form>
  </div>
</section>

    )
}