import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

const PrivacyPolicy = () => {
  const privacyPolicyText = (
    <>
      Vos données sont en sécurité avec Meddoc ! En plus des certifications ISO 27001 et DPCO, nos données sont également cryptées et stockées sur des serveurs en Suisse conformément à la nouvelle loi fédérale sur la protection des données (nFADP).
    </>
  );

  return (
    <section id="privacy-policy" className="privacy-policy flex flex-row justify-center" style={{height:"80vh"}}>
      <div className="container shadow-lg flex bg-gray-100 flex-col lg:flex-row items-center justify-center lg:space-x-8 py-8 lg:p-16">
       <div className="protection-image">

        <FaShieldAlt size={64} color="#082A4D" />
      </div>
        <div className="text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 color-meddoc-dark">
            Protection des données
          </h2>
          <p className="mb-3 p-4 font-normal text-gray-700 dark:text-gray-400 text-justify">
            {privacyPolicyText}
          </p>
          <Link to="/cug" className="btn text-white py-2 px-4 rounded-md meddoc-blue">
            Lire le CUG
          </Link>
        </div>
      </div> 
     
    </section>
  );
};

export default PrivacyPolicy;

