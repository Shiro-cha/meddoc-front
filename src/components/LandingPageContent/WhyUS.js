import React from "react";
import { Link } from "react-router-dom";
import conseil from "../../assets/png//conseil-2.png";
import rendezVous from "../../assets/png/rendez-vous -2.png";
import eLearning from "../../assets/png/e-learning_2 (1).png";

const items = [
  {
    id: 2,
    link: "/e-learning",
    icon: eLearning,
    description:
      "Trouvez la disponibilité de tous nos praticiens en un coup d'œil.",
  },
  {
    id: 3,
    link: "/conseil-soignant",
    icon: conseil,
    description:
      "Réservez vos rendez-vous à tout moment, où que vous soyez, 24h/24 et 7j/7.",
  },
  {
    id: 4,
    link: "/conseil-soignant",
    icon: conseil,
    description:
      "Rappelez-vous tous vos rendez-vous grâce aux rappels SMS envoyés à l'avance.",
  },
  {
    id: 5,
    link: "/conseil-soignant",
    icon: conseil,
    description:
      "Gérez, déplacez ou annulez facilement vos rendez-vous.",
  },
];

export default function Whyus() {
  return (
    <section id="why-us" className="why-us">
        <h2 className="color-meddoc-blue title-meddoc">C'est simple, rapide et gratuit</h2>
      <div className="container grid grid-cols-2 gap-4 lg:grid-cols-4 lg:p-16 justify-center items-center">
        {items.map((item, index) => (
          index !== 1 && (
            <div
              key={item.id}
              className={`flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                index > 1 ? "lg:mt-16" : ""
              }`}
            >
              <Link to={item.link}>
                <img
                  src={item.icon}
                  className="w-16 m-auto mb-4 bg-orange-300 rounded-full"
                  alt="doctor_profil"
                />
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
                {item.description}
              </p>
            </div>
          )
        ))}
      </div>
    </section>
  );
}

