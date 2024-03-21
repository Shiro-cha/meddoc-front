import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

//custom style
import '../../assets/css/contact/form.css';

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
<section className="bg-white dark:bg-gray-900">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white color-meddoc-dark">Nous contacter</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl color-meddoc-dark">Vous avez un problème technique ? Vous souhaitez envoyer des commentaires sur une fonctionnalité ou autres   ? Faites le nous savoir.</p>
        <form ref={form} onSubmit={sendEmail} className="space-y-8" id="contact-form">
            <div className="grid grid-cols-2 gap-6 place-items-stretch">
                <div>
                    <label htmlFor="nom" className="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 w-40 weight-bold color-meddoc-dark">Nom </label>
                    <input type="text" name='nom' id="nom" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light w-full" required />
                </div>
                <div>
                    <label htmlFor="prenoms" className="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 w-40 color-meddoc-dark">Prénoms </label>
                    <input type="text" name='prenoms' id="prenoms" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light w-full" required />
                </div>
            </div>
            <div className="grid grid-cols-1 place-items-stretch">
                <div>
                    <label htmlFor="profession" className="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 w-40 color-meddoc-dark">Profession </label>
                    <input type="text" name='profession' id="profession" className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light w-full" required />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 place-items-stretch">
                <div>
                    <label htmlFor="email" className="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 w-40 color-meddoc-dark">Votre adresse email </label>
                    <input type="text" name='email' id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light w-full" required />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 w-40 color-meddoc-dark">Telephone </label>
                    <input type="text" name='phone' id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light w-full" required />
                </div>
            </div>
            <div className="grid grid-cols-1 place-items-stretch">
                <div>
                    <label htmlFor="subject" className="block mb-2 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 w-40 color-meddoc-dark">Objet </label>
                    <input type="text" name='subject' id="subject" className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light w-full" required />
                </div>
            </div>
            
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 color-meddoc-dark">Votre message</label>
                <textarea id="message" name='message' rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-full" ></textarea>
            </div>
            <button type="submit" value="send" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg  sm:w-fit  focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 meddoc-orange">Envoyer</button>
        </form>
    </div>
</section>


    )
}
