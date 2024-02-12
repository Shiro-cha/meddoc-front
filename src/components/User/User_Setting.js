import { useForm, FormProvider } from "react-hook-form";
import { Input } from "../Input";
import axios, { axiosPrivate } from "../../api/axios";
import { useState, useRef, useEffect, } from "react";
import image_add from "../../assets/svg/add-image-svgrepo-com.svg";

import Cookies from 'js-cookie';
import Swal from "sweetalert2";


import doctor_portrait from "../../assets/image/doctor_portrait.jpg"
import jwtDecode from "jwt-decode";
import { SearchSimpleInput } from "../SearchGeneralize/SearchInput";
import ChangePasswordForm from "../Form/ChangePassword";
import { PaginationComponent } from "../Pagination/Pagination";
import { toast } from "../Toast/Toast";


const url = "/user/";

const OPTIONS_URL = "relationship/read"
const MODIFY_PROFIL = "/patient/updateProfil"

const PROCHE_ADD_URL = url + "createRelative"
const PROCHE_LIST_URL = "/patient/findRelative"
const PROCHE_DELETE_URL = url + "deletebyidentifier"
const PROCHE_UPDATE_URL = url + "updateRelative"
const IMAGE_UPLOAD = "/user/uploadImage"
const IMAGE_GET = "/user/getImage"
const URL_INFORMATION = "/patient/getPatientInfo"




export default function UserSetting() {
  const accessToken = Cookies.get('jwtToken')

  const methods_add = useForm()
  const methods_edit = useForm()

  const [proche_data, setProcheData] = useState([])
  const [keyword, setkeyword] = useState("")


  let [loading, setLoading] = useState(false);

  const [isChecked, setIsChecked] = useState(true);

  const [identifier, setIdentifier] = useState("");


  //Modal state
  const [modalEdit, setModalEdit] = useState(false)

  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState();
  const [pageSize, setPageSize] = useState(2);

  const [modalAdd, setModalAdd] = useState(false)

  const [optionsRelationship, setoptionsData] = useState([])

  const [information, setInformation] = useState({})

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  const [procheToEdit, setProcheToEdit] = useState("");

  const [selectedRelationship, setSelectedRelationship] = useState("");

  // Ajouter proche ----------------------------------------------------------------
  const onSubmit_add_relative = methods_add.handleSubmit(async proche_data => {
    try {

      console.log(selectedRelationship)
      const birthdate_value = proche_data[birthdate_validation.name];
      const data = {

        "name": proche_data["name"],
        "firstname": proche_data["firstname"],
        "gender": isChecked,
        "birthdate": birthdate_value,
        "relationship": {
          "id": selectedRelationship || optionsRelationship[0].id,
        },
      };

      console.log(data);

      setLoading(true)

      console.log(JSON.stringify(data));

      const response = await axios.post(PROCHE_ADD_URL, data,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          // withCredentials: true
        })

      if (response?.status === 200) {

        Swal.fire({
          showCancelButton: false,
          showCloseButton: false,
          showConfirmButton: false,
          icon: 'success',
          timer: 1500
        }

        )
        console.log("Votre proche a été ajouter avec success !")
        setModalAdd(false)
        methods_add.reset();
        setSelectedRelationship("");

        refresh(keyword)

      } else {
        Swal.fire({
          showCancelButton: false,
          showCloseButton: false,
          showConfirmButton: false,
          icon: 'error',
          timer: 1500
        }

        )



      }


    }

    catch (err) {
      setLoading(false)
      if (!err?.response) {

        setErrMsg('Pas de reponse du serveur');

      } else if (err.response?.status === 400) {

        setErrMsg('Erreur');

      } else if (err.response?.status === 403) {

        setErrMsg('Non autorisé');

      } else {

        setErrMsg('Connexion échoué');

      }

      // ===================TEST===================
      // errRef.current.focus();
    }

  })


  // Modifier mon proche ----------------------------------------------------------------
  const onSubmit_edit_relative = methods_edit.handleSubmit(async proche_data => {
    try {

      console.log(selectedRelationship)
      const birthdate_value = proche_data[birthdate_validation.name];
      const data = {

        "name": proche_data["name"],
        "firstname": proche_data["firstname"],
        "gender": isChecked,
        "birthdate": birthdate_value,
        "relationship": {
          "id": selectedRelationship || optionsRelationship[0].id,
        },
      };

      console.log(data, identifier);

      setLoading(true)

      console.log(JSON.stringify(data));


      const response = await axios.put(`${PROCHE_UPDATE_URL}/${identifier}`, data,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          // withCredentials: true
        })

      if (response?.status === 200) {

        Swal.fire({
          showCancelButton: false,
          showCloseButton: false,
          showConfirmButton: false,
          icon: 'success',
          titleText: "Modifier avec success",
          timer: 1500
        }

        )

        refresh(keyword)

        console.log("PROCHE MODIFIER")
        setModalEdit(false)
        methods_edit.reset();
        setSelectedRelationship("");

      }
    }

    catch (err) {
      setLoading(false)
      if (!err?.response) {

        setErrMsg('Pas de reponse du serveur');

      } else if (err.response?.status === 400) {

        setErrMsg('Erreur');

      } else if (err.response?.status === 403) {

        setErrMsg('Non autorisé');

      } else {

        setErrMsg('Connexion échoué');

      }
      // errRef.current.focus();
    }

  })

  // Refresh and fecth list of proches
  const refresh = async (search_key) => {
    const accessToken = Cookies.get('jwtToken')
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };
    const parametres = {
      page: currentPage,
      size: pageSize,
      keyword: `${search_key}`,
    }
    await axiosPrivate.get(PROCHE_LIST_URL, { headers: headers, params: parametres }).then((response) => {
      const data = response.data.content;
      const totalpage = response.data.totalPages
      setProcheData(data);
      setTotalElements(totalpage)

      console.log(response.data)


    }, [])

      .catch((error) => {
        setProcheData([])
        console.error('Error fetching data:', error);
      });

  }
  const [URL_image, setURL_image] = useState()

  const fetchImage = async () => {
    try {
      const accessToken = Cookies.get('jwtToken')
      const headers = {
        'Content-Type': 'application/json',
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


  const get_information = async () => {
    const accessToken = Cookies.get('jwtToken')
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };
    try {
      const response = await axiosPrivate.get(URL_INFORMATION, { headers: headers })
      setInformation(response.data)

    } catch (error) {
      console.log(error)
    }

  }



  //On mounted List of proches
  useEffect(() => {
    get_information()
    refresh(keyword)
    fetchImage()

  }, [keyword, currentPage,]);

  const name_validation = {
    name: 'name',
    label: 'Nom ',
    type: 'text',
    id: 'name',
    placeholder: 'Entrer votre nom ...',
    validation: {
      required: {
        value: true,
        message: 'Requis !',
      },
    },

  }

  const firstname_validation = {
    name: 'firstname',
    label: 'Prénom(s)',
    type: 'text',
    id: 'firstname',
    placeholder: 'Entrer votre prénom(s) ...',
    validation: {
      required: {
        value: true,
        message: 'Requis !',
      },

    },
  }
  const birthdate_validation = {
    name: 'birthdate_validation',
    label: 'Date de naissance',
    type: 'date',
    id: 'birthdate',
    placeholder: "Date d'anniversaire",
    validation: {
      required: {
        value: true,
        message: 'Requis !',
      },
    }
  }


  // Supprimer proche ----------------------------------------------------------------
  // const delete_proche = async (id_proche) => {
  //   try {
  //     Swal.fire({
  //       title: 'Vous êtes sure?',
  //       text: "Cette action est irreversible!",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Supprimer!',
  //       cancelButtonText: 'Annuler'
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         await axios.delete(`${PROCHE_DELETE_URL}/${id_proche}`, {
  //           headers: {
  //             'Authorization': `Bearer ${accessToken}`,
  //             'Content-Type': 'application/json'

  //           },
  //           // withCredentials: true
  //         })

  //         Swal.fire(
  //           'Deleted!',
  //           'Your file has been deleted.',
  //           'success'
  //         )
  //         refresh()

  //       }
  //     })

  //   }
  //   catch (err) {
  //     console.log(err)
  //   }


  // }


  // Close modal add proches
  const close_modal_add = async () => {
    methods_add.reset();

    setProcheToEdit("")
    setModalAdd(false)

  }

  // Open Close modal edit proches
  const close_modal_edit = () => {
    methods_edit.reset();

    console.log(procheToEdit)
    setProcheToEdit([])
    setModalEdit(false)

  }


  //Open Editer modal un proche 
  const edit_proche = async (data) => {
    try {
      const response = await axios.get(OPTIONS_URL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(response);
      setoptionsData(response.data);
      setProcheToEdit(data)

      const defaultOption = optionsRelationship.find(option => option.id === data.relationship.id);

      const selectedDefaultValue = defaultOption ? defaultOption.id : '';

      setSelectedRelationship(defaultOption ? defaultOption.id : '')

      setIsChecked(data.gender)

      console.log(data)
      setIdentifier(data.identifier)

      setModalEdit(true)

    } catch (error) {
      console.error("An error occurred:", error);
      setoptionsData([])
    }
    finally {
      setModalEdit(true)

      refresh()
    }
    // console.log(procheToEdit)




  }


  // Modal ajout proche----------------------------
  document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('defaultModalButton').click(() => {

    });
  });

  // Modal ajout proche open----------------------------
  const add_proche_modal = async () => {
    try {
      const response = await axios.get(OPTIONS_URL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(response);
      setoptionsData(response.data);
      setModalAdd(true);
    } catch (error) {
      console.error("An error occurred:", error);
      setoptionsData([])
    }
    finally {
      setModalAdd(true);

    }
  };



  const onPageChange = (page) => {
    console.log("PAGE", page)
    setCurrentPage(page);
  };

  const handleSearch = ({ searchKeyword }) => {
    console.log("Search Keyword:", searchKeyword);
    setkeyword(searchKeyword)
  };
  // IMAGE UPLOAD
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {

    if (selectedImage != null) {
      uploadImage(selectedImage);
    }
  }, [selectedImage]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

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



  const ProfilForm = ({ information }) => {
    const [formData, setFormData] = useState({
      name: information?.name || '',
      firstname: information?.firstname || '',
      contact: information?.contact || '',
      birthdate: information?.birthdate || "",
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await axios.put(MODIFY_PROFIL, formData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        toast("success", "Modification terminée")

      } catch (error) {
        toast("error", "Une erreur est survenue")
      }
    };

    return (
      <form class="max-w-md py-4" onSubmit={handleSubmit}>
        <div>
          <div class="relative z-0 w-10 mb-5 group">
            <p class="block py-2.5 px-0 w-10 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">{information?.identifier}</p>
            <label for="id" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Identifiant</label>
          </div>
        </div>
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
            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Prénom(s)</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              name="birthdate"
              type='date'
              value={formData?.birthdate}
              onChange={handleChange}
              defaultValue={information?.birthdate} id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date de naissance</label>
          </div>

        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              name="contact"
              value={formData?.contact}
              minlength="10"
              maxlength="10"
              onChange={handleChange}
              defaultValue={information?.contact} type="text" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact</label>
          </div>
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

    <main className="p-4 sm:ml-64">
      <div >
        <h1 className="font-bold text-2xl ml-5">Paramètres de l'utilisateur:</h1>
      </div>
      <div className="flex flex-col  ">

        <div class="max-w-full px-4 mt-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

          <div className="relative mb-8">

            <h5 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white p-8">Mon profil </h5>
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

          <div className="mx-4">
            <ProfilForm information={information}></ProfilForm>
          </div>
        </div>

        <ChangePasswordForm></ChangePasswordForm>


        {/* -------------------------------Ajouter proche ----------------------------- */}


        <div class="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Liste de mes proches</h5>
          <button id="defaultModalButton" onClick={add_proche_modal} class="inline-flex items-center my-4 mx-12 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Ajouter un proche
          </button>
          {/* -------------------------------Ajouter proche modal ----------------------------- */}
          <div class="max-w-screen-xl mx-auto  w-full">

            <SearchSimpleInput onSearch={handleSearch} filters={[]} disableCalendarInput={false}>  </SearchSimpleInput>

          </div>

          {/* MODAL FOR ADD   */}
          {modalAdd && <div class=" overflow-y-auto overflow-x-hidden fixed  z-[100] justify-center items-center w-full md:inset-0 inset-0 md:h-full bg-opacity-25 backdrop-blur-sm">
            <div class="relative  w-full max-w-3xl h-full md:h-auto m-auto ">
              <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 md:top-20">
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Ajout d'un proche
                  </h3>
                  <button type="button" onClick={close_modal_add} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal add body --> */}
                <FormProvider {...methods_add}>

                  <form className=" md:space-y-5 " onSubmit={e => e.preventDefault()}
                    noValidate
                    autoComplete="off">
                    <div class="flex flex-col space-y-4">

                      <Input {...name_validation} />
                      <Input {...firstname_validation} />
                      <Input {...birthdate_validation} />
                      <div className="relative md:flex justify-between">
                        <div className=" mr-5">
                          <label for="relationship" className="text-justify mr-10">Lien:</label>
                        </div>
                        <div className="my-1 md:my-0">

                          <select id="relationship"
                            name="relationship"
                            defaultValue={optionsRelationship[0]?.id || ""}
                            value={selectedRelationship} // Set the selected value
                            onChange={(e) => setSelectedRelationship(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm w-80 rounded-lg min-w-full focus:ring-primary-600 focus:border-primary-600 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                            {optionsRelationship && optionsRelationship.length > 0 ? (
                              optionsRelationship.map((option, index) => (
                                <option key={index} value={option.id} className="min-w-full">
                                  {option.name}
                                </option>
                              ))
                            ) : (
                              <option>Autres</option>
                            )}
                          </select>

                        </div>
                      </div>
                      <div className="relative md:flex justify-between">
                        <div className=" mr-5">
                          <label for="relationship" className="text-justify mr-10">Genre:</label>
                        </div>
                        <div className="flex space-x-20">
                          <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              checked={isChecked === true}
                              onChange={() => setIsChecked(true)}
                              id="bordered-radio-1" type="radio" value="Masculin" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            </input> <label for="bordered-radio-1" class="w-full p-4 text-sm font-medium text-gray-900 dark:text-gray-300">Masculin</label>
                          </div>
                          <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              checked={isChecked === false}
                              onChange={() => setIsChecked(false)}
                              id="bordered-radio-2" type="radio" value="Feminin" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            </input> <label for="bordered-radio-2" class="w-full p-4 text-sm font-medium text-gray-900 dark:text-gray-300">Féminin</label>
                          </div>
                        </div>

                      </div>


                    </div>
                    <button type="submit" onClick={onSubmit_add_relative} class="text-white inline-flex items-center bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                      Ajouter un proche
                    </button>
                  </form>
                </FormProvider>

              </div>
            </div>
          </div>}




          {/* EDIT modal ------------------------- */}
          {modalEdit &&
            <div class=" overflow-y-auto overflow-x-hidden  fixed  right-0 left-0 z-[100] justify-center items-center w-full md:inset-0 h-modal md:h-full bg-opacity-25 backdrop-blur-sm">
              <div class="relative  w-full max-w-3xl h-full md:h-auto m-auto ">
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Modifier ce proche
                    </h3>
                    <button type="button" onClick={close_modal_edit} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* <!-- Modal edit body --> */}
                  <FormProvider {...methods_edit}>

                    <form className=" md:space-y-5 " onSubmit={e => e.preventDefault()}
                      noValidate
                      autoComplete="off">
                      <div class="flex flex-col space-y-4">

                        <Input {...name_validation} defaultvalue={procheToEdit.name} />
                        <Input {...firstname_validation} defaultvalue={procheToEdit.firstname} />
                        <Input {...birthdate_validation} defaultvalue={procheToEdit.birthdate} />

                        <div className="relative md:flex justify-between">
                          <div className=" mr-5">
                            <label for="category" className="text-justify mr-10">Lien de parenté avec le proche:</label>
                          </div>
                          <div className="my-1 md:my-0">

                            <select id="relationship"
                              name="relationship"
                              value={selectedRelationship} // Set the selected value
                              onChange={(e) => setSelectedRelationship(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm w-80 rounded-lg min-w-full focus:ring-primary-600 focus:border-primary-600 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                              {optionsRelationship && optionsRelationship.length > 0 ? (
                                optionsRelationship.map((option, index) => (
                                  <option key={index} value={option.id} className="min-w-full">
                                    {option.name}
                                  </option>
                                ))
                              ) : (
                                <option disabled>Autres</option>
                              )}
                            </select>

                          </div>
                        </div>
                        <div className="relative md:flex justify-between">
                          <div className=" mr-5">
                            <label for="category" className="text-justify mr-10">Genre:</label>
                          </div>
                          <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              checked={isChecked === true}
                              onChange={() => setIsChecked(true)}
                              id="bordered-radio-1" type="radio" value="Masculin" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            </input> <label for="bordered-radio-1" class="w-full p-4 text-sm font-medium text-gray-900 dark:text-gray-300">Masculin</label>
                          </div>
                          <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              checked={isChecked === false}
                              onChange={() => setIsChecked(false)}
                              id="bordered-radio-2" type="radio" value="Feminin" name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            </input> <label for="bordered-radio-2" class="w-full p-4 text-sm font-medium text-gray-900 dark:text-gray-300">Feminin</label>
                          </div>

                        </div>


                      </div>
                      <button type="submit" onClick={onSubmit_edit_relative} class="text-white inline-flex items-center bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        Modifier un proche
                      </button>
                    </form>
                  </FormProvider>

                </div>
              </div>
            </div>}


          <div class="relative overflow-x-auto my-10">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>

                  <th scope="col" class="px-6 py-3">
                    Nom
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Prénoms
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date de naissance
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Genre
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Liaison
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Option
                  </th>

                </tr>
              </thead>
              <tbody>
                {proche_data.length > 0 ? (
                  proche_data.map((proche, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >

                      <td className="px-6 py-4">{proche.name}</td>
                      <td className="px-6 py-4">{proche.firstname}</td>
                      <td className="px-6 py-4">{proche.birthdate}</td>
                      <td className="px-6 py-4">{proche.gender ? (
                        <span>masculin</span>
                      ) : (
                        <span>féminin</span>
                      )}</td>
                      <td className="px-6 py-4">{proche.relationship.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-between">
                          <div>
                            <button
                              className="bg-gray-200 px-5"
                              onClick={() => edit_proche(proche)}
                            >
                              Editer
                            </button>
                          </div>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 h-10" colSpan="3">Pas de donnée disponible !</td>
                  </tr>
                )}

                <PaginationComponent currentPage={currentPage} totalPages={totalElements} onPageChange={onPageChange}></PaginationComponent>


              </tbody>
            </table>
          </div>

        </div>

      </div>
    </main>

  )
}