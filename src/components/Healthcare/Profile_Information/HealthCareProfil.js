import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css';


import editsvg from '../../../assets/svg/edit.svg';
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../Input";
import FormAddition, { Diplome, Horaire, Keywords } from "./Informations_Healthcare";
import { Tarifs, Experiences } from "./Informations_Healthcare";
import { format } from 'date-fns';
import { fr } from "date-fns/locale";
import axios, { axiosPrivate } from "../../../api/axios";
import Cookies from "js-cookie";
import { useMatch, useParams } from "react-router-dom";

import default_image from "../../../assets/image/default.png"
import jwtDecode from "jwt-decode";
import { toast } from "../../Toast/Toast";
import image_add from "../../../assets/svg/add-image-svgrepo-com.svg";

export default function HealthCareProfile() {

    const MODIFY_PROFILE_FORM_URL = "/healthPro/addDescription"
    const URL_LIST_PROFILE_OF_HEALTHCARE = "/healthPro/myprofile"

    const IMAGE_UPLOAD = "/user/uploadImage"
    const IMAGE_GET = "/user/getImage"

    const token = Cookies.get("jwtToken")
    jwtDecode(token)
    const [healthcare_profil, sethealthcare_profil] = useState();

    useEffect(() => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            const decodedToken = jwtDecode(accessToken);
            const userId = decodedToken.id;


            axiosPrivate.get(URL_LIST_PROFILE_OF_HEALTHCARE, { headers: headers }).then((response) => {
                const data = response.data.description
                const parsedData = JSON.parse(data);
                console.log(data)
                setTempDiplome(parsedData?.diplome || [])
                setTempExperiences(parsedData?.Experiences || [])
                setTempTarifs(parsedData?.tarifs || [])
                setTempKeyword(parsedData?.keyword || []);
                const serverProfile = response?.data;
                setTempProfile(serverProfile);

            })

                .catch((error) => {

                    console.error('Error fetching data:', error);

                });

        }
        catch (err) {
            console.log("Error", err)
        }
        fetchImage()
    }, [])


    const [presentation, setPrestation] = useState("")

    const [openFormAddTarifs, setopenFormAddTarifs] = useState(false);
    const [openFormAddExperience, setopenFormAddExperience] = useState(false);
    const [openFormAddDiplome, setopenFormAddDiplome] = useState(false);
    const [openFormAddKeyword, setopenFormAddKeyword] = useState(false);




    const methodsTarifs = useForm()
    const methodsExperiences = useForm()
    const methodsDiplome = useForm()
    const methodsKeyword = useForm()



    const [tarifs, setTarifs] = useState([])

    const [keywords, setKeywords] = useState([]);


    const experiences = [
        // EXEMPLE //

        // {
        //     poste: "Médecin généraliste",
        //     entreprise: "Clinique Médicale HJRA",
        //     dateDebut: "Janvier 2018",
        //     dateFin: "Mars 2022",
        //     description: "En tant que médecin généraliste à la Clinique Médicale HJRA, j'ai fourni des soins médicaux complets à un large éventail de patients. Mes responsabilités comprenaient le diagnostic et le traitement des patients, la gestion des dossiers médicaux, et la collaboration avec d'autres professionnels de la santé pour garantir la meilleure prise en charge des patients. J'ai également participé à des programmes de médecine préventive et de sensibilisation à la santé dans la communauté locale.",
        // },


    ];

    const diplomes = [
        // EXEMPLE //
        // {
        //     anne_diplome: "2016",
        //     lieu_diplome: "Ankatso antananarivo",
        //     diplome: "Doctorat en Medecine",
        // },

    ]

    const profileComplet = {
        name: "",
        firstname: "",
        status: "",
        mail: '',
        phone: ''

    }

    const [tempTarifs, setTempTarifs] = useState([]);
    const [tempExperiences, setTempExperiences] = useState([]);
    const [tempDiplomes, setTempDiplome] = useState([]);
    const [tempProfile, setTempProfile] = useState({})
    const [tempKeywords, setTempKeyword] = useState([]);

    const [EnablePresentationEdit, setEnablePresentationEdit] = useState(false)

    // DIPLOME
    const anne_diplome = {
        name: 'anne_diplome',
        label: "Annee de l'obtention",
        type: 'date',
        id: 'anne_diplome',

    }

    const lieu = {
        name: 'lieu',
        label: 'Lieu',
        type: 'text',
        id: 'lieu',

    }
    const diplome = {
        name: 'diplome',
        label: 'Diplome',
        type: 'text',
        id: 'diplome',
    }

    const onsubmitDiplome = methodsDiplome.handleSubmit(async diplome_data => {
        const anne_diplome_value = diplome_data[anne_diplome.name];

        const parsedDiplomeAnnee = new Date(anne_diplome_value);


        const formatted_parseDiplomeAnnee = format(parsedDiplomeAnnee, "yyyy", { locale: fr });


        const newdiplome = {
            anne_diplome: formatted_parseDiplomeAnnee,
            lieu_diplome: diplome_data["lieu"],
            diplome: diplome_data["diplome"],
        };
        console.log(newdiplome);
        setTempDiplome([...tempDiplomes, newdiplome]);
        methodsDiplome.reset()
        closeAddDiplomes()
    })

    const deleteDiplome = (index) => {
        const newTempDiplome = [...tempDiplomes];
        newTempDiplome.splice(index, 1);
        setTempDiplome(newTempDiplome);
    };

    const openAddDiplomes = () => {
        setopenFormAddDiplome(true)
    }
    const closeAddDiplomes = () => {
        setopenFormAddDiplome(false)
        methodsDiplome.reset()
    }

    // EXP
    const start_date_exp = {
        name: 'start_date_exp',
        label: 'De',
        type: 'date',
        id: 'start_date_exp',

    }
    const end_date_exp = {
        name: 'end_date_exp',
        label: 'A',
        type: 'date',
        id: 'end_date_exp',
    }
    const poste = {
        name: 'poste',
        label: 'Poste',
        type: 'text',
        id: 'poste',

    }
    const entreprise = {
        name: 'entreprise',
        label: 'Entreprise',
        type: 'text',
        id: 'entreprise',

    }

    const onsubmitExperiences = methodsExperiences.handleSubmit(async experiences_data => {
        const start_exp_value = experiences_data[start_date_exp.name];
        const end_date_value = experiences_data[end_date_exp.name];

        const parsedStartDate = new Date(start_exp_value);
        const parsedEndDate = new Date(end_date_value);

        const formatted_start_exp_date = format(parsedStartDate, "MMMM yyyy", { locale: fr });
        const formatted_end_exp_date = format(parsedEndDate, "MMMM yyyy", { locale: fr });

        const capitalized_start_exp_date = formatted_start_exp_date.charAt(0).toUpperCase() + formatted_start_exp_date.slice(1);
        const capitalized_end_exp_date = formatted_end_exp_date.charAt(0).toUpperCase() + formatted_end_exp_date.slice(1);

        const newExp = {
            poste: experiences_data["poste"],
            entreprise: experiences_data["entreprise"],
            dateDebut: capitalized_start_exp_date,
            dateFin: capitalized_end_exp_date,
            description: experiences_data["description"],
        };
        console.log(newExp);
        setTempExperiences([...tempExperiences, newExp]);
        methodsExperiences.reset()
        closeAddExperiences()
    })

    const deleteTempExp = (index) => {
        const newTempExp = [...tempExperiences];
        newTempExp.splice(index, 1);
        setTempExperiences(newTempExp);
    };

    const openAddExperiences = () => {
        setopenFormAddExperience(true)
    }
    const closeAddExperiences = () => {
        setopenFormAddExperience(false)
        methodsExperiences.reset()
    }

    // TARIFS

    const description_validation = {
        name: 'description',
        label: 'Description',
        type: 'text',
        id: 'description',
        placeholder: 'Entrer la description ...',
        defaultValue: ''

    }

    const prix_validation = {
        name: 'prix',
        label: 'Prix',
        type: 'number',
        id: 'prix',
        placeholder: 'Entrer le prix ...',

    }

    const onsubmitTarif = methodsTarifs.handleSubmit(async tarifs_data => {
        const newTarif = {
            description: tarifs_data["description"],
            prix: tarifs_data["prix"] + " ar"
        };
        console.log(newTarif);
        setTempTarifs([...tempTarifs, newTarif]);
        methodsTarifs.reset()
        closeAddTarifs()
    })

    const deleteTarif = (index) => {
        const newTempTarifs = [...tempTarifs];
        newTempTarifs.splice(index, 1);
        setTempTarifs(newTempTarifs);
    };

    const openAddTarifs = () => {
        setopenFormAddTarifs(true)
    }
    const closeAddTarifs = () => {
        setopenFormAddTarifs(false)
        methodsTarifs.reset()

    }


    // KEYWORDS --------------------------------

    const keyword_validation = {
        name: 'keyword',
        label: 'Mot-clé',
        type: 'text',
        id: 'keyword',
        placeholder: 'Entrer la mot-clé pour votre profile ...',
        defaultValue: ''
    }
    const [keywordError, setKeywordError] = useState('');

    const onsubmitKeyword = methodsKeyword.handleSubmit(async keyword_data => {
        // if (tempKeywords?.length < 4 ) {
        const newKeyword = keyword_data["keyword"]
        console.log(newKeyword)

        setTempKeyword([...tempKeywords, newKeyword]);
        methodsKeyword.reset();
        closeAddKeyword();
        setKeywordError('');
        // }
        // else {
        //     setKeywordError("Vous avez atteint le nombre limite du mots-clé");
        // }
    })

    const deleteKeyword = (index) => {
        const newTempKeyword = [...tempKeywords];
        newTempKeyword.splice(index, 1);
        setTempKeyword(newTempKeyword);
    };

    const openAddKeyword = () => {
        setopenFormAddKeyword(true)
    }
    const closeAddKeyword = () => {
        setopenFormAddKeyword(false)
        methodsKeyword.reset()
        setKeywordError('')
    }

    // SAVE ALL
    const saveAllModification = async () => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            const AllInformations = {
                tarifs: tempTarifs,
                Experiences: tempExperiences,
                diplome: tempDiplomes,
                images: image,
                keywords: tempKeywords,
            }


            console.log(AllInformations)

            const description = JSON.stringify(AllInformations);


            const response = await axiosPrivate.post(MODIFY_PROFILE_FORM_URL, description, { headers: headers })
            if (response?.status === 200) {
                toast("success", "Modification du profil réussie !")
            }

        }
        catch (err) {
            console.log(err)
        }

    }

    const enableEdit = () => {
        setEnablePresentationEdit(!EnablePresentationEdit)
    }

    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)

        if (selectedFile) {
            // Create a URL for the selected file
            const imageUrl = URL.createObjectURL(selectedFile);

            // Update the state with the selected file and its URL
            setImage({
                file: selectedFile,
                url: imageUrl,
            });
        }
    };

    const inputRef = useRef()


    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const [information, setInformation] = useState({})

    useEffect(() => {
        const jwtToken = Cookies.get("jwtToken");

        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            setInformation(decodedToken)
            console.log(decodedToken)


        } else {
            console.error("jwtToken cookie not found");
        }

        if (selectedImage != null) {
            uploadImage(selectedImage);
        }


    }, [selectedImage]);

    const uploadImage = async (file) => {
        try {
            console.log(file)
            const formData = new FormData();
            formData.append('image', file);

            const accessToken = Cookies.get('jwtToken');
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const response = await axiosPrivate.post(IMAGE_UPLOAD, formData, { headers: headers })


            if (response.status === 200) {
                console.log('Image uploaded successfully');
                toast("success", "Changement de l'image réussie !")

            } else {
                console.error('Failed to upload image');
                toast("error", "Changement de l'image réussie !")

            }
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };
    const [URL_image, setURL_image] = useState()

    const fetchImage = async () => {
        try {
            const accessToken = Cookies.get('jwtToken')

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const response = await axiosPrivate.get(IMAGE_GET, { headers: headers })

            console.log(response.data)
            setURL_image(response.data)
        }

        catch (error) {
            console.log(error)
        }
    }

    const MODIFY_URL = "/healthPro/updateProfil"

    const ProfilForm = ({ information }) => {

        console.log(information)
        const [formData, setFormData] = useState({
            name: information?.name || '',
            firstname: information?.firstname || '',
        });

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            const accessToken = Cookies.get('jwtToken')
            try {
                await axios.put(MODIFY_URL, formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                toast("success", "Modification terminer")

            } catch (error) {
                toast("error", "Une erreur est survenue")
            }
        };

        return (
            <form class="max-w-md py-4" onSubmit={handleSubmit}>
                <div class="grid md:grid-cols-3 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <input defaultValue={information?.name}
                            value={formData?.name}
                            name="name"
                            onChange={handleChange}
                            type="text" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input
                            name="firstname"
                            value={formData?.firstname}
                            onChange={handleChange}
                            defaultValue={information?.firstname} type="text" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Prenoms</label>
                    </div>
                    {/* <div class="relative z-0 w-full mb-5 group">
                        <input
                            name="contact"
                            value={formData?.contact}
                            onChange={handleChange}
                            defaultValue={information?.contact} type="text" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact</label>
                    </div> */}
                    <div class="relative z-0 w-full mb-5 group">
                        <p class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">{information?.contact}</p>
                        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telephone</label>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-5 group">
                        <p class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">{information?.orderNum}</p>
                        <label for="matricul_number" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Numero matricule</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <p class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">{information?.speciality_name}</p>
                        <label for="speciality" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Specialité</label>
                    </div>
                </div>

                <div class="grid md:grid-cols-1 md:gap-6">

                    <div class="relative z-0 w-full mb-5 group">
                        <p class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">{information?.email}</p>
                        <label for="floating_mail" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifier</button>
            </form>
        );
    };


    return (
        <>
            <div className="flex flex-col p-4 bg-slate-200 sm:ml-64">
                {/* Profil */}
                <div className=" w-full justify-start bg-white border rounded-lg border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 class="m-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Mon profil </h5>

                    <div className="flex space-x-10">
                        <div>

                            <div className="relative mb-8">

                                <img
                                    className="w-36 h-36 object-cover rounded-full mb-2"
                                    src={selectedImage ? URL.createObjectURL(selectedImage) : URL_image}
                                    alt={selectedImage ? 'Selected' : 'Default'}
                                />

                                <label htmlFor="upload-image" className="cursor-pointer absolute bottom-0 left-24 transform translate-y-1/4 h-12 w-12">
                                    <img className="" src={image_add} alt="AddImage" />
                                    <input
                                        type="file"
                                        id="upload-image"
                                        className="hidden"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="mx-4">

                            <ProfilForm information={tempProfile}></ProfilForm>
                        </div>
                    </div>

                </div>
                {/* DIPLOME */}

                <Diplome
                    tempItems={tempDiplomes}
                    openFormAdd={openFormAddDiplome}
                    onsubmit={onsubmitDiplome}
                    methods={methodsDiplome}
                    openAdd={openAddDiplomes}
                    closeAdd={closeAddDiplomes}
                    diplome_validation={diplome}
                    lieu_validation={lieu}
                    annee_validation={anne_diplome}
                    deleteTempItems={deleteDiplome}
                >

                </Diplome>


                {/* Expériences  */}

                <Experiences
                    tempItems={tempExperiences}
                    openFormAdd={openFormAddExperience}
                    openAdd={openAddExperiences}
                    closeAdd={closeAddExperiences}
                    onsubmit={onsubmitExperiences}
                    methods={methodsExperiences}
                    description_validation={description_validation}
                    start_exp_date_validation={start_date_exp}
                    end_exp_date_validation={end_date_exp}
                    poste_validation={poste}
                    entreprise_validation={entreprise}
                    deleteTempItems={deleteTempExp}
                >

                </Experiences>

                {/* Tarifs  */}
                <Tarifs
                    tempItems={tempTarifs}
                    openFormAdd={openFormAddTarifs}
                    openAdd={openAddTarifs}
                    closeAdd={closeAddTarifs}
                    onsubmit={onsubmitTarif}
                    methods={methodsTarifs}
                    description_validation={description_validation}
                    prix_validation={prix_validation}
                    deleteTempItems={deleteTarif}
                >

                </Tarifs>
                <Keywords
                    tempItems={tempKeywords}
                    openFormAdd={openFormAddKeyword}
                    openAdd={openAddKeyword}
                    closeAdd={closeAddKeyword}
                    onsubmit={onsubmitKeyword}
                    methods={methodsKeyword}
                    deleteTempItems={deleteKeyword}
                    keywordvalidation={keyword_validation}
                    error={keywordError}
                >

                </Keywords>
                <button onClick={saveAllModification} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enregistrer</button>


            </div >
        </>
    )


}