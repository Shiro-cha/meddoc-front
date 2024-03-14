import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaBook, FaMobileAlt, FaUserCog } from "react-icons/fa";

const items = [
  {
    id: 2,
    link: "/e-learning",
    icon: <FaCalendarAlt />,
    description:
      "Trouvez la disponibilité de tous nos praticiens en un coup d'œil.",
  },
  {
    id: 3,
    link: "/conseil-soignant",
    icon: <FaBook />,
    description:
      "Réservez vos rendez-vous à tout moment, où que vous soyez, 24h/24 et 7j/7.",
  },
  {
    id: 4,
    link: "/conseil-soignant",
    icon: <FaMobileAlt />,
    description:
      "Rappelez-vous tous vos rendez-vous grâce aux rappels SMS envoyés à l'avance.",
  },
  {
    id: 5,
    link: "/conseil-soignant",
    icon: <FaUserCog />,
    description:
      "Gérez, déplacez ou annulez facilement vos rendez-vous.",
  },
];

export default function Whyus() {
  return (
    <section id="why-us" className="why-us bg-orange-100">
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
                <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
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

