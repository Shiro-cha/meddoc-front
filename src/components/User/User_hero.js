import { useEffect, useState, useMemo, useRef } from "react";
import axios, { axiosPrivate } from "../../api/axios";



import Searchhealthcare from "./SearchHealthcare";
import Errormessage from "../Toast/Toast";
// const READ_ALL_DOCTOR_URL = "/healthpro/read"


const GET_LOCALISATIONS_URL = "healthpro/_search"

export default function UserHero(styles) {

    const [search, setSearchWhere] = useState("");
    const [open, setOpen] = useState(false);
    const [filteredLocalisations, setFilteredLocalisations] = useState(["Antananarivo", "Majunga", "Tamatave", "Fianarantsoa", "Toliara", "Antsiranana"]);
    const inputRef = useRef(null);


    const handleInputChange = async (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchWhere(searchTerm);
        const parametres = {
            locatilsation_name: searchTerm,
        }

        try {
            const response = await axiosPrivate.get(GET_LOCALISATIONS_URL, { params: parametres })
            setFilteredLocalisations(response.data)

        }
        catch (err) {
            <Errormessage icon="success" />
            setFilteredLocalisations([])
        }

    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const [searchQuery, setSearchQuery] = useState("");
    const [searchWhere, setSearchQueryWhere] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [defaultSearchQuery, setDefaultSearchQuery] = useState("");


    const handleSearch = (e) => {
        e.preventDefault();
        // console.log(searchQuery)
        // console.log(searchWhere)

        const formData = new FormData(e.target);

        console.log(formData.get("search"))

        setSearchQuery(formData.get("search"));
        setSearchQueryWhere(formData.get("searchWhere"));


        // setSearchQuery(newSearchQuery);
        // setSearchQueryWhere(newSearchWhere);

        setShowSearch(true);
    };

    return (
        <>
            <section class="bg-white dark:bg-gray-900 p-4 sm:ml-64">
                <div class="py-8 px-4 mx-auto  text-center lg:py-10 lg:px-12 flex flex-col justify-center">

                    <h1 class="mb-4 text-2xl font-extrabold tracking-tight leading-none text-[#2d7d86] md:text-2xl lg:text-4xl dark:text-white">BIENVENUE SUR MEDDOC</h1>
                    <div className=" mx-auto my-5">
                        <form className="relative flex flex-col space-between" onSubmit={handleSearch}>
                            <div class="flex divide-x-[3px] min-w-full">
                                <div class="relative w-full lg:w-[400px]">
                                    <input type="search" id="search" name="search"

                                        className="lg:w-[400px] block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-l-lg
                                        border-r-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500
                                        focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Medecin,Infirmier,Specialiste..."
                                    >
                                    </input>

                                </div>
                                <div class="relative w-full  ">

                                    <div className="relative">
                                        <input
                                            defaultValue={" "}
                                            id="searchWhere" name="searchWhere"
                                            type="text"
                                            ref={inputRef}
                                            onClick={() => {
                                                if (filteredLocalisations.length > 0) {
                                                    setOpen(!open);
                                                }
                                            }}
                                            onChange={handleInputChange}
                                            value={search}
                                            placeholder="Où..."
                                            className="block p-2.5 w-full z-20 text-sm
                                            text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border 
                                            
                                            border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                                            dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:border-blue-500"
                                        />


                                    </div>

                                    <button type="submit" class="absolute top-0 right-0 p-2.5
                                        text-sm font-medium h-full text-white bg-[#2d7d86] rounded-r-lg 
                                        border border-[#06aec2] hover:bg-cyan-800 focus:ring-4 focus:outline-none
                                        focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </button>

                                </div>


                            </div>
                            {open && (

                                <ul className=" absolute right-0 p-2.5 w-full mt-10  bg-white shadow-lg z-50 rounded-md ">
                                    {filteredLocalisations.map((item) => (
                                        <li
                                            key={item}
                                            className="w-full text-gray-700bg-red-400 cursor-pointer"
                                            onClick={() => {
                                                setSearchWhere(item);
                                                setOpen(false);
                                            }}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                            )}
                        </form>
                    </div>
                    <p class=" text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Rechercher ici rapidement et en toute simplicité vos médecins à Madagascar  .</p>

                </div>

            </section>

            {showSearch && <Searchhealthcare searchQuery={searchQuery} searchQueryWhere={searchWhere} />}

        </>

    )
}