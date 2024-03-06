import { useState, useEffect } from "react";
import { SummaryHealthcare, PresentationHealthcare, HoraireHealthcare, TarifsHealthcare, ContactHealthcare } from "./Healthcare/InformationHealthcare";
import { Element, animateScroll as scroll, scroller } from "react-scroll";
import { PromoCard } from "../Healthcare/PromoCard";
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { useMatch } from "react-router-dom";
import Cookies from "js-cookie";
import { axiosPrivate } from "../../api/axios";

const URL_LIST_PROFIL_OF_HEALTHCARE = "/admin/healthPro";
const URL_LIST_PROFIL_OF_SEARCH_HEALTHCARE = "/healthPro";

export default function ShowHealthcare() {
    const match1 = useMatch('admin/healthcare/:id');
    const match2 = useMatch('user/search_healthcare/:id');
    const match3 = useMatch('search_healthcare/:id');

    const id = match1?.params.id || match2?.params.id || match3?.params.id;

    console.log(id);
    const [healthcare_profil, sethealthcare_profil] = useState([]);
    const [healthcare_description, sethealthcareDescription] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        let url;

        if (match1) {
            url = URL_LIST_PROFIL_OF_SEARCH_HEALTHCARE;
        } else if (match2) {
            url = URL_LIST_PROFIL_OF_SEARCH_HEALTHCARE;
        } else {
            url = URL_LIST_PROFIL_OF_SEARCH_HEALTHCARE;
        }
        try {
            axiosPrivate.get(`${url}/${id}`, null, { headers: headers })
                .then((response) => {
                    sethealthcare_profil(response.data);
                    const data = response.data.description;
                    const parsedData = JSON.parse(data);
                    console.log("parsedData",healthcare_profil?.image)
                    sethealthcareDescription(parsedData);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
        catch (err) {
            console.log("Error", err);
        }
    }, [id]);

    const [activeSection, setActiveSection] = useState("summary");
    const sections = [
        { id: "summary", label: "Résumé" },
        { id: "presentation", label: "Présentation" },
        { id: "tarifs", label: "Tarifs" },
    ];

    // SCROLL
    const handleScroll = (target) => {
        scroller.scrollTo(target, {
            duration: 400,
            offset: -100,
            smooth: "easeInOutQuad",
        });
        setActiveSection(target);
    };

    return (
        <>
       
        <div className="flex flex-col justify-center  bg-slate-200 relative">
                <div className="bg-white p-5 border border-gray-200 shadow-md transform hover:scale-105 transition duration-300 ease-in-out animated">
                <div className="flex w-full justify-start container" style={{margin:"0 auto"}}>
                {/* <img src={healthcare_profil?.image ? healthcare_profil?.image : }  alt="Photo de profil" className="w-36 h-36 object-cover rounded-full border border-gray-200 shadow dark:border-gray-700" /> */}
                <img
                                    className="w-36 h-36 object-cover rounded-full mb-2 transition duration-300 ease-in-out hover:scale-105"
                                    src={healthcare_profil?.image ? URL.createObjectURL(healthcare_profil?.image) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                    alt={healthcare_profil?.image ? 'Selected' : 'Default'}
                                />
                   <div className="flex flex-col items-start justify-start my-auto p-10">
                       <h1 className="text-2xl font-bold color-meddoc-blue title-meddoc-medium cursor-pointer">
                           {healthcare_profil.name} {healthcare_profil.firstname}
                       </h1>
                       <h2 class="font-medium od-profile-header-description-specialty transform hover:scale-105 transition duration-300 ease-in-out">{healthcare_profil?.speciality_name}</h2>
                       {/* <span className="text-sm text-gray-500 dark:text-gray-400">
                           {healthcare_profil?.contact}
                       </span>
                       <a href={`mailto:${healthcare_profil?.email}`} className="text-md text-gray-500 dark:text-gray-400 hover:underline">
                           {healthcare_profil?.email}
                       </a>
                        */}
                   </div>
                   
                </div>
                </div>
                <div className="sticky top-[68px] bg-white "  id="contact">
                <div className="flex justify-start items-center p-2 container" style={{margin:"0 auto"}}>
                <div className="flex items-center space-x-2 transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
                    {/* Phone icon */}
                    <FaPhone className="text-gray-500 dark:text-gray-400" />
                    <a href={`tel:${healthcare_profil?.contact}`} className="text-sm text-gray-500 dark:text-gray-400">
                        {healthcare_profil?.contact}
                    </a>
                </div>
                {/* Email icon */}
                <div className="flex items-center space-x-2 ml-4">
                    <FaEnvelope className="text-gray-500 dark:text-gray-400" />
                    <a href={`mailto:${healthcare_profil?.email}`} className="text-sm text-gray-500 dark:text-gray-400 hover:underline" target="_blank">
                        {healthcare_profil?.email}
                    </a>
                </div>
                </div>
            </div>

                <div className="sticky top-[68px] bg-slate-100 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 z-[3] margin-top-10" >
                    <ul className="flex md:flex-wrap -mb-px container" style={{margin:"0 auto"}}>
                        {sections.map((section) => (
                            <li className="mr-2  transition duration-300 ease-in-out" key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    onClick={() => handleScroll(section.id)}
                                    className={`inline-block p-4 border-b-2 ${activeSection === section.id
                                        ? "text-blue-600  active meddoc-blue"
                                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    }`}
                                >
                                    {section.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="container" style={{ margin: "20px auto" }}>
                {sections.map((section) => (
                    <Element name={section.id} key={section.id} className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
                        {/* Include the corresponding component based on the section */}
                        {section.id === "summary" && <SummaryHealthcare healthcare_profil={healthcare_profil} />}
                        {section.id === "presentation" && <PresentationHealthcare healthcare_profil={healthcare_profil} />}
                        {section.id === "horaire" && <HoraireHealthcare healthcare_profil={healthcare_profil} />}
                        {section.id === "tarifs" && <TarifsHealthcare healthcare_profil={healthcare_profil} />}
                    </Element>
                ))}
                </div>
                <PromoCard/>
        </div>
       
        
           
        </>
    );
}
