import { useState } from "react"
import axiosPrivate from "../../api/axios"
import { useEffect } from "react"
import PdfIcon from "../../assets/svg/pdf.svg"
import { toast } from "../Toast/Toast"


const URL_INFOS_USER = "/"


const BloodGroupRadio = ({ options, selected, onChange }) => {
  return (
    <div className="col-span-1 flex flex-col px-6 py-3">
      <ul className="border-blue-500 bg-blue-500 group flex-1 -skew-x-[-30deg] transform border">
        <li className="skew-x-[-30deg] transform bg-transparent px-9 text-left first-letter:uppercase">
          <b className="block text-lg ">Groupe sanguin </b>
        </li>
      </ul>
      {options.map((option) => (
        <div key={option.id} className="flex items-center m-4">
          <input
            id={`blood-group-radio-${option.id}`}
            type="radio"
            value={option.id}
            name="blood-group-radio"
            checked={selected === option.id}
            onChange={() => onChange(option.id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`blood-group-radio-${option.id}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};


export const CheckboxList = ({ data, onChange }) => {
  return (
    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {data.map((item) => (
        <li key={item.id} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id={item.id}
              type="checkbox"
              checked={item.checked}
              onChange={(e) => onChange(item.id, e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor={item.id} className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {item.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};




export default function BookHealth() {
  const [data, setDataInfos] = useState([])
  const [checkbox, check] = useState(true)

  const fetch_infos = () => {

    const response = axiosPrivate.get(URL_INFOS_USER, data)
    setDataInfos(response.data)

  }


  useEffect(() => {
    // fetch_infos()
  }, [])

  const fullname = "ANDRIALAZANTSOA Narindra Hajaina"

  const phone = +261345524139
  const birthdate = Date.now()

  const [chronicDiseases, setChronicDiseases] = useState({
    diabetes: false,
    asthma: false,
    arthritis: false,
    hypertension: false,
    others: false,
  });

  const [familyHistory, setFamilyHistory] = useState({
    heartDisease: false,
    cancer: false,
    cholesterol: false,
    others: false,
  });

  const [allergies, setAllergies] = useState({
    nuts: false,
    insectBites: false,
    animals: false,
    gluten: false,
    others: false,
  });

  const [foodIntolerances, setFoodIntolerances] = useState({
    fruit: false,
    dairy: false,
    meat: false,
    glutenIntolerance: false,
    others: false,
  });

  const [vaccinations, setVaccinations] = useState({
    antiCovid: false,
    hepatitisA: false,
    typhoid: false,
  });


  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  const bloodGroupOptions = [
    { id: 'A', label: 'A' },
    { id: 'B+', label: 'B+' },
    { id: 'B-', label: 'B-' },
    // Add more blood group options as needed
  ];

  const handleBloodGroupChange = (selected) => {
    setSelectedBloodGroup(selected);
  };



  const handleCheckboxChange = (key, value) => {
    setChronicDiseases((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const diseaseData = [
    { id: 'diabetes', label: 'Diabete', checked: chronicDiseases.diabetes },
    { id: 'asthma', label: 'Asthme', checked: chronicDiseases.asthma },
    { id: 'arthritis', label: 'Arthrite', checked: chronicDiseases.arthritis },
    { id: 'hypertension', label: 'Hypertension', checked: chronicDiseases.hypertension },
    { id: 'others', label: 'Autres', checked: chronicDiseases.others },
  ];

  const handleFamilyHistoryChange = (key, value) => {
    setFamilyHistory((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const familyHistoryData = [
    { id: 'heartDisease', label: 'Maladie du cœur', checked: familyHistory.heartDisease },
    { id: 'cancer', label: 'Cancer', checked: familyHistory.cancer },
    { id: 'cholesterol', label: 'Cholestérol', checked: familyHistory.cholesterol },
    { id: 'others', label: 'Autres', checked: familyHistory.others },
  ];

  const handleAllergiesChange = (key, value) => {
    setAllergies((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const allergiesData = [
    { id: 'nuts', label: 'Noix', checked: allergies.nuts },
    { id: 'insectBites', label: "Piqure d'insect", checked: allergies.insectBites },
    { id: 'animals', label: 'Animaux', checked: allergies.animals },
    { id: 'gluten', label: 'Gluten', checked: allergies.gluten },
    { id: 'others', label: 'Autres', checked: allergies.others },
  ];

  const handleFoodItemsChange = (key, value) => {
    setFoodIntolerances((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const foodItemsData = [
    { id: 'fruit', label: 'Fruit', checked: foodIntolerances.fruit },
    { id: 'dairy', label: 'Produit laitiers', checked: foodIntolerances.dairy },
    { id: 'meat', label: 'Viande', checked: foodIntolerances.meat },
    { id: 'gluten', label: 'Gluten', checked: foodIntolerances.gluten },
    { id: 'others', label: 'Autres', checked: foodIntolerances.others },
  ];

  const handleVaccinationsChange = (key, value) => {
    setVaccinations((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const vaccinationsData = [
    { id: 'covid', label: 'Anti-Covid', checked: vaccinations.covid },
    { id: 'hepatitisA', label: 'Hépatite A', checked: vaccinations.hepatitisA },
    { id: 'typhoid', label: 'Typhoïde', checked: vaccinations.typhoid },
    // Add more vaccinations as needed
  ];


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add your logic here to handle the form submission
    // You can access the state variables to get the values
    const formData = {
      fullname,
      birthdate,
      phone,
      selectedBloodGroup,
      chronicDiseases,
      familyHistory,
      allergies,
      foodIntolerances,
      vaccinations,
    };

    try {

      const response = await axiosPrivate.post('your_api_endpoint', formData);

      console.log('Form submitted successfully:', response.data);
      if(response.status === 200){
        toast('success', "Vous avez modifier son profile avec succes !")
      }
      else{
        toast('error', "Une erreur s'est produite !")

      }


    } catch (error) {

        toast('error', "Une erreur s'est produite !")
        console.error('Form submission error:', error);


    }



  };

  return (

    <>
      <div className="flex bg-white dark:bg-gray-900  sm:ml-64 border flex-col text-slate-200">
        <div className="flex items-center justify-between w-full ">
          <div className="mx-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Historique medicale :</h1>
          </div>

          <div className="flex">
            <button className="inline-flex items-center text-gray-400">
              Télecharger
              <img className="ml-2 w-6 h-6" src={PdfIcon} alt="Cardiogram" />
            </button>
          </div>

        </div>

        <div>
        </div>
        <form className="" onSubmit={handleSubmit}>
          {/* 3 colonnes */}
          <div className="grid grid-cols-2 gap-0 m-4">

            {/* <div className="col-span-1" >
              <div className=" font-bold text-white uppercase  bg-blue-500 dark:bg-gray-700 dark:text-gray-400 px-6 py-3" >
                Nom et prenoms
              </div>

              <input type="text" name="Nom" id="Nom" defaultValue={fullname} className="w-full text-sm text-gray-900 bg-transparent border-0  border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0" placeholder=" " required />
            </div> */}
            <div class=" col-span-1 flex flex-col px-6 py-3">
              <ul class="border-blue-500 bg-blue-500 group flex-1 -skew-x-[-30deg] transform border">
                <li class=" skew-x-[-30deg] transform bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Nom et prenoms</b>
                </li>
              </ul>
              <input type="text" name="Nom" id="Nom" defaultValue={fullname}
                className="w-full text-sm text-gray-900 bg-transparent border-0  border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0"
                placeholder=" " required />

            </div>

            <div className="col-span-1 flex flex-col px-6 py-3">
              <ul class="border-blue-500 bg-blue-500 group flex-1 -skew-x-[-30deg] transform border">
                <li class=" skew-x-[-30deg] transform bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Date de naissance </b>
                </li>
              </ul>

              <input type="date" name="Nom" id="Nom" defaultValue={phone}
                className="w-full text-sm text-gray-900 bg-transparent border-0  border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0"
                placeholder=" " required />

            </div>




          </div>
          {/* 2 colonnes grp sanguine et num d'urgence */}
          <div className="grid grid-cols-2 gap-0 m-4">

            <div className="col-span-1 flex flex-col px-6 py-3 ">
              <ul class="border-blue-500 bg-blue-500 group flex-1 -skew-x-[-30deg] transform border">
                <li class=" skew-x-[-30deg] transform bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Contact </b>
                </li>
              </ul>
              <input type="phone" name="Nom" id="Nom" defaultValue={phone}
                className=" text-sm text-gray-900 bg-transparent border-0  border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0"
                placeholder=" " required />
                
            </div>

            <div className="col-span-1 flex flex-col px-6 py-3 ">
              <ul class="border-blue-500 bg-blue-500 group flex-1 -skew-x-[-30deg] transform border">
                <li class=" skew-x-[-30deg] transform bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Contact d'urgence </b>
                </li>
              </ul>
              <input type="phone" name="Nom" id="Nom" defaultValue={phone} className=" text-sm text-gray-900 bg-transparent border-0  border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0" placeholder=" " required />


            </div>



          </div>

          {/* 2 colonnes grp sanguine et num d'urgence */}
          <div className="grid grid-cols-1 gap-0 m-4">
            {/* SEX */}
            <div className="col-span-1 flex flex-col px-6 py-3 ">
              <ul class="border-blue-500 bg-blue-500 group flex-1 -skew-x-[-30deg] transform border">
                <li class=" skew-x-[-30deg] transform bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Sex </b>
                </li>
              </ul>
              <div class="flex items-center m-4">
                <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </input> <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Homme</label>
              </div>
              <div class="flex items-center m-4">
                <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </input> <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Femme</label>
              </div>

            </div>


            {/* BLOOD */}
            <div className="col-span-1 flex flex-col px-6 py-3 ">
              <BloodGroupRadio options={bloodGroupOptions} selected={selectedBloodGroup} onChange={handleBloodGroupChange} />

            </div>



          </div>

          {/* 1 colonnes maladie chroniques */}
          <div className="grid grid-cols-1 gap-0 m-4">
            {/* MALADIE CHRONIQUE */}
            <div className="col-span-1 flex flex-col px-6 py-3 ">
              <ul class="border-blue-500 bg-blue-500 group flex-1  border text-left">
                <li class="bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Maladie chronique </b>
                </li>
              </ul>


              <CheckboxList data={diseaseData} onChange={handleCheckboxChange} />

            </div>



          </div>


          {/* 1 colonnes antecedent */}
          <div className="grid grid-cols-1 gap-0 m-4">

            <div className="col-span-1 flex flex-col px-6 py-3 ">
              <ul class="border-blue-500 bg-blue-500 group flex-1  border">
                <li class="bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Antécedants familiaux </b>
                </li>
              </ul>


              <CheckboxList data={familyHistoryData} onChange={handleFamilyHistoryChange} />


            </div>



          </div>

          {/* 1 colonnes alergies  */}
          <div className="grid grid-cols-1 gap-0 m-4">

            <div className="col-span-1 flex flex-col px-6 py-3 ">
              <ul class="border-blue-500 bg-blue-500 group flex-1  border">
                <li class="bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Alérgies </b>
                </li>
              </ul>

              <CheckboxList data={allergiesData} onChange={handleAllergiesChange} />

            </div>



          </div>

          {/* 1 colonnes intolerance alimentaires  */}
          <div className="grid grid-cols-1 gap-0 m-4">

            <div className="col-span-1 flex flex-col px-6 py-3 ">
              <ul class="border-blue-500 bg-blue-500 group flex-1  border">
                <li class="bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Intolérance alimentaires </b>
                </li>
              </ul>


              <CheckboxList data={foodItemsData} onChange={handleFoodItemsChange} />

            </div>



          </div>
          <div className="grid grid-cols-1 gap-0 m-4">
            <div className="col-span-1 flex flex-col px-6 py-3 ">
              <ul class="border-blue-500 bg-blue-500 group flex-1  border">
                <li class="bg-transparent px-9 text-left first-letter:uppercase">
                  <b class="block text-lg ">Vacinations </b>
                </li>
              </ul>
              <CheckboxList data={vaccinationsData} onChange={handleVaccinationsChange} />



            </div>



          </div>

          <div className="flex items-center justify-between w-full mx-10">
            <div className="">
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">TERMINER</button>
            </div>
          </div>


        </form>
      </div>


    </>
  )

}