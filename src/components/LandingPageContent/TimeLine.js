import React from 'react';
import { FaPhone, FaBuilding, FaCalendar, FaIndustry } from 'react-icons/fa';

export default function AboutUsPage() {
  const aboutUsContent = {
    companyName: "MEDDoC",
    mission: "Notre mission est de développer des solutions innovantes pour promouvoir la santé et améliorer l'accès aux soins.",
    expertise: "Nous sommes spécialisés dans le domaine de la santé digitale, de la télémédecine, de la formation médicale continue, du conseil et du développement de solutions digitales.",
    events: "Organisation d'événements, de congrès et de séminaires dans le domaine de la santé.",
    contact: {
      phone: "+261326503158",
      sector: "Administration publique",
      companySize: "2-10 employés",
      foundedIn: "Fondée en 2020",
      specializations: "E-learning, conseil, télémédecine, santé digitale, formation médicale continue, événementiels, Accompagnement et social média"
    },
    contactIcons: {
      phone: <FaPhone />,
      sector: <FaIndustry />,
      companySize: <FaBuilding />,
      foundedIn: <FaCalendar />,
    }
  };

  return (
    <section className="container mx-auto py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-4 color-meddoc-blue">{aboutUsContent.companyName}</h2>
        <p className="text-lg mb-6 color-meddoc-dark font-normal">{aboutUsContent.mission}</p>
        <p className="text-lg mb-6 color-meddoc-dark font-normal">{aboutUsContent.expertise}</p>
        <p className="text-lg mb-6 color-meddoc-dark font-normal">{aboutUsContent.events}</p>

        {/* Coordonnées de contact */}
        <div className="mt-6">
  <h3 className="text-xl font-semibold mb-2 text-meddoc-dark">Coordonnées de contact</h3>

  {/* Phone */}
  <div className="flex items-center mb-2 color-meddoc-dark font-normal">
    {aboutUsContent.contactIcons.phone}
    <span className="ml-2">Téléphone : {aboutUsContent.contact.phone}</span>
  </div>

  {/* Sector */}
  <div className="flex items-center mb-2 color-meddoc-dark font-normal">
    {aboutUsContent.contactIcons.sector}
    <span className="ml-2">Secteur : {aboutUsContent.contact.sector}</span>
  </div>

  {/* Company Size */}
  <div className="flex items-center mb-2 color-meddoc-dark font-normal">
    {aboutUsContent.contactIcons.companySize}
    <span className="ml-2">Taille de l'entreprise : {aboutUsContent.contact.companySize}</span>
  </div>

  {/* Founded In */}
  <div className="flex items-center mb-2 color-meddoc-dark font-normal">
    {aboutUsContent.contactIcons.foundedIn}
    <span className="ml-2">Fondée en : {aboutUsContent.contact.foundedIn}</span>
  </div>

  {/* Specializations */}
  <div className="flex items-center text-meddoc-dark">
    <span className="mr-2">Spécialisations :</span>
    {aboutUsContent.contact.specializations}
  </div>
</div>


      </div>
    </section>
  );
}
