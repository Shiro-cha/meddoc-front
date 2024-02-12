import pdf from "../../../assets/svg/pdf.svg"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function OneConsultationsList() {

  const contentRef = useRef(null);
  const location = useLocation();

  const [data, setData] = useState(location.state.data)

  const descriptionObject = JSON.parse(data?.consultation);
  const [consultation, setConsultation] = useState(descriptionObject)


  useEffect(() => {
    console.log(data)
    console.log(consultation)
  }, [])


  const generatePDF = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(`${data.id + "-" + data.patient_name + "-" + data.patient_first_name}.pdf`);
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    const formattedTime = new Date(dateString).toLocaleTimeString(undefined, options);
    return formattedTime;
  };

  return (

    <>
      <div className="flex items-center justify-center h-full sm:m-68 border flex-col text-slate-200">
        <div className="flex items-center justify-center mt-2 ">
          <h1 class="text-2xl font-semibold text-gray-800 mr-2">Rapport médical :<br></br></h1>

          <button onClick={generatePDF}>
            <img src={pdf} alt="pdf" className="w-8 h-8"></img>
          </button>
        </div>
        <div className="p-10 mb-10 mt-5 border text-black " ref={contentRef} >

          <div className="grid grid-cols-1 gap-5" >
            {/* Docteur */}
            <div className="flex flex-col space-y-4" >
              <div className="flex space-x-4">
                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                  Nom du docteur :
                </label>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 p">
                  {data.healthpro_name} {data.healthpro_firstname}
                </div>
              </div>

              <div className="flex space-x-4">
                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                  Nom du patient :
                </label>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 p">
                  {data.patient_name} {data.patient_first_name}
                </div>
              </div>
            </div>


            {/* Date */}
            <div className="flex space-x-4" >
              <div className="flex space-x-4 w-1/2">
                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                  Date:
                </label>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                  {formatDate(data.rdv_date)}
                </div>
              </div>
              <div className="flex space-x-4 w-1/2 ">
                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                  Heure :
                </label>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                  {formatTime(data.rdv_date)}
                </div>
              </div>
            </div>

            {/* Raison du visit */}
            <div >
              <label htmlFor="reason" className="block text-gray-800 font-semibold mb-2">
                Raison(s) de la visite :
              </label>
              <div className="grid-cols-1 space-y-4">
                {consultation?.symptoms.map((symptom, index) => (
                  <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                    {symptom}
                  </div>
                ))}

              </div>
            </div>

            {/* Prescription */}
            <div >
              <label htmlFor="prescription" className="block text-gray-800 font-semibold mb-2">
                Prescriptions:
              </label>
              <div className="grid-cols-1 space-y-4">
                {consultation?.prescriptions.map((prescription, index) => (
                  <div key={index} className="max-w-32 border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                    {prescription.medicament} / {prescription.day}-{prescription.evening}-{prescription.night}   / pendant {prescription.duration} jour(s)
                  </div>
                ))}

              </div>
            </div>

            {/* Notes additionnel  */}
            {/* <div >
              <label htmlFor="additionnal_notes" className="block text-gray-800 font-semibold mb-2">
                Notes additionnel:
              </label>
              <div className="grid-cols-1 space-y-4">
                <div className="max-w-32 border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                  Temperature corporel ~ 37°
                </div>
                <div className="max-w-32 border-b-2 border-gray-400 bottom-0 left-0 right-0  ">
                  Poids ~ 65 kg
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </>
  )

}