
import React,{ useState } from 'react';
import { FaPhone, FaClock, FaEye, FaThumbsUp ,FaArrowCircleRight} from 'react-icons/fa';

const PromoCard = () => {
    const [showPromo, setShowPromo] = useState(false);


  return (
    <>
    {showPromo && <div className={"od-profile-content-inactive sticky left-10 top-32 bottom-32 "}>
      <div className="od-profile-content-inactive-sticky">
        <div className="od-profile-content-inactive-container relative">
          <div className="od-profile-content-inactive-header">
          <button className="od-profile-content-inactive-close text-right w-full rounded font-bold" onClick={() => setShowPromo(false)}>x </button>
            <h3 className="text-xl font-semibold">Vous êtes professionnel de santé?</h3>
            <p>Prenez la main sur votre profil Meddoc!</p>
          </div>
          <div className="od-profile-content-inactive-body">
            <div className="od-profile-content-inactive-description">
              <p>Découvrez la prise de rendez-vous en ligne avec Meddoc!</p>
              <div className="od-profile-content-inactive-features">
                <div className="od-profile-content-inactive-feature flex items-center">
                  <FaPhone className="text-2xl mr-2" />
                  <span >Réduisez le nombre de rendez-vous non-honorés grâce aux rappels SMS envoyés à vos patients avant leurs rendez-vous.</span>
                </div>
                <div className="od-profile-content-inactive-feature flex items-center">
                  <FaClock className="text-2xl mr-2" />
                  <span>Gagnez du temps administratif et simplifiez la gestion de votre cabinet.</span>
                </div>
                <div className="od-profile-content-inactive-feature flex items-center">
                  <FaEye className="text-2xl mr-2" />
                  <span>Améliorez votre visibilité sur internet grâce au premier site de prise de rendez-vous médicaux en Suisse.</span>
                </div>
                <div className="od-profile-content-inactive-feature flex items-center">
                  <FaThumbsUp className="text-2xl mr-2"/>
                  <span>Proposez la prise de rendez-vous en ligne: un service essentiel que vos patients apprécient.</span>
                </div>
              </div>
            </div>
            <div className="od-profile-content-inactive-action mt-4">
              <a className=" text-white px-4 py-2 rounded meddoc-orange " href="https://info.onedoc.ch/fr/">En savoir plus</a>
            </div>
          </div>
          {/* Remaining HTML for resize-sensor */}
        </div>
      </div>
    </div>}

    <button onClick={() => setShowPromo(!showPromo)} className='sticky  left-10 top-32 bottom-32  rounded font-bold shadow-3xl shadow-shadow-500 meddoc-blue opacity-50 text-center' style={{width:40,height:40}} ><FaArrowCircleRight className="mr-2" size={40}/></button>
    </>

     
  );
};

export  {PromoCard};
