
import { Link } from "react-router-dom";


export default function Subscribe(){
    return(
        <section className="flex flex-col justify-center " style={{width:"90%",height:"80vh"}}>
        <div className="flex justify-center my-5 mx-5" style={{width:"100%",height:"100%"}}>
<div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contacter Meddoc dès maintenant!</h5>
    </a>
    <p class="mb-5 font-normal text-gray-700 dark:text-gray-400">Veuillez fournir vos informations, et notre équipe vous contactera afin de vous proposer une solution personnalisée adaptée à votre demande.</p>
    <Link to="contact_us" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg  meddoc-blue">
        Nous contacter 
        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
</div>
    </div>
        </section>

    )


}
