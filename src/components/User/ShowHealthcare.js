
import { useState } from "react";
import { SummaryHealthcare, PresentationHealthcare, HoraireHealthcare, TarifsHealthcare, ContactHealthcare } from "./Healthcare/InformationHealthcare";
import { Element, animateScroll as scroll, scroller } from "react-scroll";
import { useMatch } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { axiosPrivate } from "../../api/axios";

const URL_LIST_PROFIL_OF_HEALTHCARE = "/admin/healthPro"
const URL_LIST_PROFIL_OF_SEARCH_HEALTHCARE = "/healthPro"

export default function ShowHealthcare() {
    const match1 = useMatch('admin/healthcare/:id');
    const match2 = useMatch('user/search_healthcare/:id');
    const match3 = useMatch('search_healthcare/:id');

    const id = match1?.params.id || match2?.params.id || match3?.params.id;

    console.log(id)
    const [healthcare_profil, sethealthcare_profil] = useState([]);
    const [healthcare_description, sethealthcareDescription] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        let url;


        if (match1) {
            url = URL_LIST_PROFIL_OF_SEARCH_HEALTHCARE;
        } else if (match2) {
            url = URL_LIST_PROFIL_OF_SEARCH_HEALTHCARE;
        }
        else {
            url = URL_LIST_PROFIL_OF_SEARCH_HEALTHCARE;
        }
        try {
            axiosPrivate.get(`${url}/${id}`, null, { headers: headers }).then((response) => {
                sethealthcare_profil(response.data)
                const data = response.data.description
                const parsedData = JSON.parse(data);
                sethealthcareDescription(parsedData)
                console.log(response.data)
            })

                .catch((error) => {

                    console.error('Error fetching data:', error);

                });

        }
        catch (err) {
            console.log("Error", err)
        }



    }, [id])


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
            <div className="flex flex-col  bg-slate-200 sm:ml-64">
                <div className="flex w-full justify-start bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                    {/* <div className="group relative">
                        <div className="group-hover:opacity-50">
                            <img className="min-w-32 min-h-32 m-4 rounded-full transition-opacity" src={''} alt="doctor_photo" />
                        </div>
                        <div className="hidden group-hover:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg className="w-12 h-12 text-gray-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 5h-1.382l-.171-.342A2.985 2.985 0 0 0 14.764 3H9.236a2.984 2.984 0 0 0-2.683 1.658L6.382 5H5a3 3 0 0 0-3 3v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a3 3 0 0 0-3-3Zm-3.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
                            </svg>
                        </div>
                    </div> */}
                    <div className="flex flex-col items-start justify-start  my-auto p-10">
                        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
                            {healthcare_profil.name} {healthcare_profil.firstname}
                        </h1>
                        <span className="text-xl text-gray-500 dark:text-gray-400">
                            {healthcare_profil?.speciality_name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {healthcare_profil?.contact}
                        </span>
                        <span className="text-md text-gray-500 dark:text-gray-400">
                            {healthcare_profil?.email}
                        </span>
                        {/* <span className="text-md text-gray-500 dark:text-gray-400">
                            {healthcare_profil?.description}
                        </span> */}
                    </div>
                </div>

                <div className="sticky top-[68px] bg-slate-100 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 z-[3]">
                    <ul className="flex md:flex-wrap -mb-px">
                        {sections.map((section) => (
                            <li className="mr-2" key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    onClick={() => handleScroll(section.id)}
                                    // className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                                    className={`inline-block p-4 border-b-2  ${activeSection === section.id
                                        ? "text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 "
                                        }`}
                                >
                                    {section.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {sections.map((section) => (
                    <Element name={section.id} key={section.id}>
                        {/* Include the corresponding component based on the section */}
                        {section.id === "summary" && <SummaryHealthcare healthcare_profil={healthcare_profil} />}
                        {section.id === "presentation" && <PresentationHealthcare healthcare_profil={healthcare_profil} />}
                        {section.id === "horaire" && <HoraireHealthcare healthcare_profil={healthcare_profil} />}
                        {section.id === "tarifs" && <TarifsHealthcare healthcare_profil={healthcare_profil} />}

                    </Element>
                ))}
            </div>
        </>
    );
}
