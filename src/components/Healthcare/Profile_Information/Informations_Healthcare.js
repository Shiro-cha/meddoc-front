// Tarifs.js
import React from "react";
import { FormProvider } from "react-hook-form";
import { Input } from "../../Input";

export const Tarifs = ({ tempItems, openFormAdd, openAdd, closeAdd, onsubmit, methods, description_validation, prix_validation, deleteTempItems }) => {
    return (
        <div className="my-5 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="25" height="25" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M403.29 32H280.36a14.46 14.46 0 0 0-10.2 4.2L24.4 281.9a28.85 28.85 0 0 0 0 40.7l117 117a28.86 28.86 0 0 0 40.71 0L427.8 194a14.46 14.46 0 0 0 4.2-10.2v-123A28.66 28.66 0 0 0 403.29 32Z" /><path fill="currentColor" d="M352 144a32 32 0 1 1 32-32a32 32 0 0 1-32 32Z" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m230 480l262-262a13.81 13.81 0 0 0 4-10V80" /></svg>
                <h4 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Tarifs :</h4>
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
                            autoComplete="off" className="flex flex-col space-y-2" >
                            <Input {...description_validation} />
                            <Input {...prix_validation} />

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
                    {tempItems?.length > 1 && <hr />}
                    {tempItems?.map((tarif, index) => (
                        <>
                            <li key={index} className="flex m-2 justify-between text-gray-700 dark:text-gray-400 ">
                                <div className="w-1/2">
                                    <p className="mr-10 font-semibold tracking-tight text-gray-900 dark:text-white self-center">
                                        {tarif.description}
                                    </p>
                                </div>
                                <div className="font-bold ">
                                    {tarif.prix}
                                </div>
                                <div className="items-center">
                                    <button className="mx-2" onClick={() => deleteTempItems(index)}>
                                        <svg class="w-6 h-6 text-red-400 hover:text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                        </svg>
                                    </button>

                                </div>
                            </li>
                            {tempItems?.length > 1 && <hr />}
                        </>
                    ))}
                </ul>
            )}
            {/* Add a button to open the tarifs form */}
        </div>
    );
};
export const Experiences = ({ tempItems, openFormAdd, openAdd, closeAdd, onsubmit, methods, description_validation, start_exp_date_validation, end_exp_date_validation, poste_validation, entreprise_validation, deleteTempItems }) => {
    return (
        <div className="my-5 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v11q0 .825-.587 1.413T20 21H4Zm0-2h16V8H4v11Zm6-13h4V4h-4v2ZM4 19V8v11Z" /></svg>
                <h4 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Experiences :</h4>
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
                            autoComplete="off" className="flex flex-col space-y-4 ">
                            <Input {...start_exp_date_validation} />
                            <Input {...end_exp_date_validation} />
                            <Input {...description_validation} />
                            <Input {...poste_validation} />
                            <Input {...entreprise_validation} />




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

                    {tempItems?.map((tarif, index) => (
                        <>
                            <li key={index} className="text-gray-700 dark:text-gray-400 my-2">
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <div className="mr-4 font-semibold tracking-tight text-gray-900 dark:text-white ">
                                            {tarif.dateDebut} - {tarif.dateFin}
                                        </div>

                                        <div >
                                            {tarif.entreprise}
                                        </div>

                                    </div>
                                    <div className="items-center">
                                        <button className="mx-2" onClick={() => deleteTempItems(index)}>
                                            <svg class="w-6 h-6 text-red-400 hover:text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                                <div className="my-2 ">
                                    {tarif.poste}.
                                </div>

                                <div className="my-4">
                                    <p>
                                        {tarif.description}
                                    </p>
                                </div>
                            </li>

                        </>
                    ))}
                </ul>
            )}
            {/* Add a button to open the tarifs form */}
        </div>
    );
};

export const Diplome = ({ tempItems, openFormAdd, openAdd, closeAdd, onsubmit, methods, diplome_validation, lieu_validation, annee_validation, deleteTempItems }) => {
    return (
        <div className="my-5 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="mr-2" viewBox="0 0 48 48"><defs><mask id="ipTDegreeHat0"><g fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"><path fill="#555" d="M2 17.4L23.022 9l21.022 8.4l-21.022 8.4L2 17.4Z" /><path stroke-linecap="round" d="M44.044 17.51v9.223m-32.488-4.908v12.442S16.366 39 23.022 39c6.657 0 11.467-4.733 11.467-4.733V21.825" /></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTDegreeHat0)" /></svg>
                <h4 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Diplome(s) :</h4>
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
                            autoComplete="off" className="flex flex-col space-y-2">
                            <Input {...annee_validation} />
                            <Input {...lieu_validation} />
                            <Input {...diplome_validation} />
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

                    {tempItems?.map((diplome, index) => (
                        <>
                            <li key={index} className="text-gray-700 dark:text-gray-400 m-2 flex  justify-between">
                                <div className="flex  justify-start">
                                    <div className="mr-10 font-semibold tracking-tight text-gray-900 dark:text-white ">
                                        {diplome.anne_diplome}
                                    </div>
                                    <div>
                                        {diplome.diplome},{diplome.lieu_diplome}
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
                    ))}
                </ul>
            )}
            {/* Add a button to open the tarifs form */}
        </div>
    );
};


export const Keywords = ({ tempItems, openFormAdd, openAdd, closeAdd, onsubmit, methods, keywordvalidation, deleteTempItems, error }) => {
    return (
        <div className="my-5 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center">
                <h4 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Mots-clé(s) :</h4>
                <button type="button" class="m-2 flex" onClick={openAdd}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
            {openFormAdd && (

                <div className="md:col-span-2 mt-4 border p-4 rounded-lg shadow-md">
                    {error && <p className="text-red-500 my-2">{error}</p>}

                    <FormProvider {...methods}>

                        <form onSubmit={e => e.preventDefault()}
                            noValidate
                            autoComplete="off" className="flex flex-col space-y-2">
                            <Input {...keywordvalidation} />
                            <div className="flex items-center">

                                <button className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={onsubmit}> Ajouter</button>
                                <button type="button" className='m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border-red-400 border'
                                    onClick={closeAdd}>
                                    Annuler
                                </button>
                            </div>
                            {/* Display error message if it exists */}
                            {/* {onsubmit && onsubmit instanceof Function && onsubmit() && (
                                <p className="text-red-500">{onsubmit()}</p>
                            )} */}
                        </form>

                    </FormProvider>

                </div>
            )}
            {!openFormAdd && (
                <ul>
                    {tempItems?.map((keyword, index) => (
                        <>
                            <li key={index} className="text-gray-700 dark:text-gray-400 m-2 flex  justify-between">
                                <div className="flex  justify-start">
                                    <div className="mr-10 font-semibold tracking-tight text-gray-900 dark:text-white ">
                                        {keyword}
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
                    ))}

                </ul>
            )}

        </div>
    );
}

export const Horaire = () => {
    const daysListWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

    return (
        <div className="my-5 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center">
                <h4 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Horaire(s) :</h4>
            </div>
            <ul>
                {daysListWeek.map((day) => (
                    <li>{day}:</li>
                ))}
            </ul>

        </div>
    )

}



