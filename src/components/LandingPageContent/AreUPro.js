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
    <section className="are-u-pro mx-auto flex flex-col items-center" style={{width:"90%",height:"90vh"}}>
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4  title-meddoc color-meddoc-dark">
        Êtes-vous un professionnel de santé ? 
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="timeline-item shadow">
            <div className="flex items-center gap-4" style={{height:100,width:400}}>
              <div className="icon">
                <FaUserMd className="text-4xl text-orange-500" />
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

