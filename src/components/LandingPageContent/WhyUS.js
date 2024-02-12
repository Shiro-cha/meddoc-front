import { Link } from "react-router-dom"
import doctor from "../../assets/image/doctor.svg"
const items = [
  {
    id: 1,
    title: 'Rendez-vous en ligne',
    link: '/rendez-vous'
  },
  {
    id: 2,
    title: 'Hippocamp E-learning',
  },
  {
    id: 3,
    title: 'Conseil santé',
  },
]



export default function Whyus() {
  return (
    <section id="why-us" class="why-us">
      <div className="grid lg:grid-cols-4 gap-4 mx-4 my-5 lg:p-16 justify-center ">

        <div className="flex flex-col p-4 items-center bg-cyan-400 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-96 dark:border-gray-700 dark:bg-gray-800">
          <div class="content">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Adoptons MEDDoC !</h3>
            <p className="m-auto text-white">
              Nous sommes convaincus que la télémédecine est un outil au service de l’amélioration de notre
              système de santé au bénéfice de tous. C’est la simplicité, l’immédiateté et modifié la relation
              soignant/soigné.
            </p>
            <button type="button" class="py-2.5 px-10 m-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">En savoir plus</button>

          </div>


        </div>

        {items.map((item) => (
          <div key={item.id} class="flex flex-col p-4 bg-white  border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
            <img src={doctor} className="w-16 m-auto mb-4" alt="doctor_profil"></img>
            <Link to={item.link} class="mb-4 text-xl m-auto font-bold tracking-tight text-gray-900 dark:text-white">
              <h5>{item.title}</h5>
            </Link>
          </div>
        ))}



      </div>

    </section>

  )
}