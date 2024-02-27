import React, { useState } from 'react';
import { FaGraduationCap, FaLightbulb, FaUserMd, FaHeartbeat, FaMedkit, FaChalkboardTeacher, FaCalendarAlt, FaHandsHelping } from 'react-icons/fa';

export default function NosService() {
    const services = [
        { icon: <FaChalkboardTeacher />, title: "E-learning", description: "Formation en ligne accessible à tout moment. Apprenez de manière interactive avec des modules de cours dynamiques et des exercices pratiques. Nos experts vous guideront tout au long de votre parcours d'apprentissage, vous permettant de développer de nouvelles compétences à votre propre rythme." },
        { icon: <FaLightbulb />, title: "Conseil", description: "Conseils personnalisés pour vos besoins en santé. Nos conseillers experts en santé sont là pour vous fournir des conseils adaptés à vos besoins spécifiques. Que ce soit pour des questions de bien-être, de nutrition ou de gestion du stress, nous sommes là pour vous aider à prendre des décisions éclairées pour votre santé." },
        { icon: <FaUserMd />, title: "Télémédecine", description: "Consultations médicales à distance avec des professionnels de la santé. Accédez à des consultations médicales en ligne avec nos médecins qualifiés. Obtenez des conseils médicaux, des ordonnances et un suivi personnalisé, le tout depuis le confort de votre domicile. La télémédecine rend les soins de santé accessibles et pratiques." },
        { icon: <FaHeartbeat />, title: "Santé Digitale", description: "Solutions numériques pour promouvoir la santé. Explorez notre gamme de solutions numériques axées sur la santé, des applications de suivi de la condition physique aux outils de gestion du stress. Utilisez la technologie pour améliorer votre bien-être global et adopter un mode de vie sain." },
        { icon: <FaMedkit />, title: "Formation Médicale Continue", description: "Cours et formations pour le personnel médical. Offrez à votre personnel médical des opportunités de formation continue. Nos programmes de formation médicale couvrent une variété de sujets, du perfectionnement professionnel aux dernières avancées médicales. Investissez dans l'éducation de votre équipe pour des soins de qualité." },
        { icon: <FaCalendarAlt />, title: "Événementiels", description: "Organisation d'événements, congrès et séminaires médicaux. Planifiez et organisez des événements médicaux mémorables. Des congrès internationaux aux séminaires spécialisés, nous facilitons la création d'expériences enrichissantes pour les professionnels de la santé et le grand public." },
        { icon: <FaHandsHelping />, title: "Accompagnement", description: "Soutien et accompagnement dans votre parcours de santé. Nous comprenons que chaque parcours de santé est unique. Nos experts en accompagnement vous guideront tout au long de votre parcours, vous fournissant un soutien personnalisé et des ressources adaptées à vos besoins spécifiques." },
        { icon: <FaUserMd />, title: "Social Media", description: "Gestion de la présence sur les réseaux sociaux pour une meilleure communication. Optimisez votre présence en ligne avec nos services de gestion des médias sociaux. Des campagnes engageantes aux analyses de données, nous vous aidons à construire une communauté en ligne et à renforcer la communication avec votre audience." },
      ];

  const [modalContent, setModalContent] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (title, description) => {
    setModalContent({ title, description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8 color-meddoc-blue title-meddoc">Nos Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4 color-meddoc-orange">
              {service.icon}
              <span className="ml-2 font-semibold color-meddoc-dark">{service.title}</span>
            </div>
            <p className="text-md text-gray-700 font-medium">{service.description.slice(0, 80)}...</p>
            <button
              className="mt-4 bg-meddoc-blue text-white px-4 py-2 rounded-md meddoc-blue"
              onClick={() => openModal(service.title, service.description)}
            >
              En savoir plus
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-md relative max-w-md w-full">
          <button className="absolute top-2 right-2 text-gray-700 meddoc-orange" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h3 className="text-lg font-semibold color-meddoc-dark mb-2">{modalContent.title}</h3>
          <p className="text-md text-gray-700 font-medium">{modalContent.description}</p>
        </div>
      </div>
    )}
    </section>
  );
}