import { Link } from "react-router-dom"
import conseil from "../../assets/png//conseil-2.png"
import rendezVous from "../../assets/png/rendez-vous -2.png"
import eLearning from "../../assets/png/e-learning_2 (1).png"
const items = [
  {
    id: 1,
    title: 'Rendez-vous en ligne',
    link: '/rendez-vous',
    icon: rendezVous,
    desciption:"Plateforme intuitive offrant des rendez-vous médicaux en ligne, simplifiant l'accès aux soins efficacement et rapidement"
  },
  {
    id: 2,
    title: 'Hippocamp E-learning',
    link: '/e-learning',
    icon: eLearning,
    desciption:"Trouvez la disponibilité de tous nos praticiens en un coup d'œil."
  },
  {
    id: 3,
    title: 'Conseil santé',
    link: '/conseil-soignant',
    icon: conseil,
    desciption:"Réservez vos rendez-vous à tout moment, où que vous soyez, 24h/24 et 7j/7."
  },
  {
    id: 4,
    title: 'Conseil santé',
    link: '/conseil-soignant',
    icon: conseil,
    desciption:"Rappelez-vous tous vos rendez-vous grâce aux rappels SMS envoyés à l'avance."
  },
  {
    id: 5,
    title: 'Conseil santé',
    link: '/conseil-soignant',
    icon: conseil,
    desciption:"Gérez, déplacez ou annulez facilement vos rendez-vous."
  },
]



export default function Whyus() {
  return (
    <section id="why-us" class="why-us">
       <h2 className="title-meddoc meddoc-blue">Simple, rapide et gratuit</h2>
      <div className="grid lg:grid-cols-4 gap-4 mx-4 my-5 lg:p-16 justify-center align-items-center">

        {items.map((item) => (
          <div key={item.id} class="flex flex-col p-4 bg-white  border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 " >
            <img src={item.icon} className="w-16 m-auto mb-4" alt="doctor_profil"></img>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">{item.desciption}</p>
          </div>
        ))}



      </div>

    </section>

  )
}
