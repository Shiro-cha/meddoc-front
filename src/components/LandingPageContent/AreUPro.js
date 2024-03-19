import React from 'react';
import { FaUserMd } from 'react-icons/fa';

const AreUPro = () => {
  const cards = [
    {
      id: 1,
      description:
        "Réduisez le nombre de rendez-vous manqués grâce aux rappels SMS envoyés à vos patients avant leurs rendez-vous.",
    },
    {
      id: 2,
      description:
        "Améliorez votre visibilité en ligne avec une présence sur la première plateforme en Suisse pour la prise de rendez-vous en ligne.",
    },
    {
      id: 3,
      description:
        "Gagnez du temps administratif et simplifiez la gestion de votre pratique.",
    },
    {
      id: 4,
      description:
        "Gagnez du temps administratif et simplifiez la gestion de votre pratique.",
    },
  ];

  return (
    <section className="are-u-pro mx-auto flex flex-col justify-center" style={{width:"90%",height:"80vh"}}>
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-10  title-meddoc color-meddoc-dark">
        Êtes-vous un professionnel de santé ? 
      </h2>
      <div className="grid grid-cols-2 gap-16 mt-10 mx-auto">
        {cards.map((card) => (
          <div key={card.id} className="timeline-item">
            <div className="flex items-center gap-4 shadow p-4 rounded" style={{height:150,width:420}}>
              <div className="icon p-10 rounded-full bg-orange-400">
                <FaUserMd className="text-4xl text-white" />
              </div>
              <div className="content p-4">
                <p className="color-meddoc-dark mb-3 p-4 font-normal text-gray-700 dark:text-gray-400 text-left flex items-center">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AreUPro;

