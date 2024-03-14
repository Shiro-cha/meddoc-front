import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const PrivacyPolicy = () => {
  const privacyPolicyText = (
    <>
      Vos données sont en sécurité avec OneDoc ! En plus des certifications ISO 27001 et DPCO, nos données sont également cryptées et stockées sur des serveurs en Suisse conformément à la nouvelle loi fédérale sur la protection des données (nFADP).
    </>
  );

  return (
    <section id="privacy-policy" className="privacy-policy >
      <div className="container flex flex-col lg:flex-row items-center justify-center lg:space-x-8 py-8 lg:p-16">
        <div className="flex items-center justify-center w-24 h-24 bg-orange-300 rounded-full">
          <FaLock className="w-12 h-12 text-white" />
        </div>
        <div className="text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Protection des données
          </h2>
          <p className="text-gray-700 dark:text-gray-400 text-justify mb-4">
            {privacyPolicyText}
          </p>
          <Link to="/cug" className="btn text-white py-2 px-4 rounded-md meddoc-dark">
            Lire le CUG
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;

