import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaBook, FaMobileAlt, FaUserCog } from "react-icons/fa";

const items = [
  {
    id: 2,
    link: "/e-learning",
    icon: <FaCalendarAlt size={40}/>,
    description:
      "Trouvez la disponibilité de tous nos praticiens en un coup d'œil.",
  },
  {
    id: 3,
    link: "/conseil-soignant",
    icon: <FaBook size={40}/>,
    description:
      "Réservez vos rendez-vous à tout moment, où que vous soyez, 24h/24 et 7j/7.",
  },
  {
    id: 4,
    link: "/conseil-soignant",
    icon: <FaMobileAlt size={40}/>,
    description:
      "Rappelez-vous tous vos rendez-vous grâce aux rappels SMS envoyés à l'avance.",
  },
  {
    id: 5,
    link: "/conseil-soignant",
    icon: <FaUserCog size={40}/>,
    description:
      "Gérez, déplacez ou annulez facilement vos rendez-vous.",
  },
];

export default function Whyus() {
  return (
    <section id="why-us" className="why-us">
    <h1 className="title-meddoc color-meddoc-dark mt-5">C'est simple, rapide et gratuit</h1>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:p-16 justify-center items-center">
        {items.map((item, index) => (
          (
            <div
              key={item.id}
              className={`flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                item.id % 2 === 0 ? "lg:mt-16" : ""
              }`}
            >
              <Link to={item.link} className="w-full meddoc-orange flex items-center justify-center opacity-80" style={{height:"150px"}}>
                <div className="w-16 h-16  rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
              </Link>
              <p className="mb-3 p-4 font-normal text-gray-700 dark:text-gray-400 text-left flex items-center" style={{height:"200px",fontSize:20}}>
                {item.description}
              </p>
            </div>
          )
        ))}
      </div>
    </section>
  );
}

