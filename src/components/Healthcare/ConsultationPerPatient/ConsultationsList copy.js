import pdf from "../../../assets/svg/pdf.svg"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { PaginationComponent } from "../../Pagination/Pagination";

export default function ConsultationsListByPatient() {

  const URL_list_consultation = "/event/getEventMade"
  const { id_patient_enabled } = useParams();
  const [data, setData] = useState()


  // ---------PAGINATION BASE------------
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState();
  const [pageSize, setPageSize] = useState(1);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const get_list_consultations_of_patient = async (id_patient) => {

    const accessToken = Cookies.get('jwtToken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };
    const parametres = {
      page: currentPage,
      size: pageSize,
    }
    try {
      const response = await axiosPrivate.get(`${URL_list_consultation}/${id_patient}`, {
        headers: headers,
        params:
          parametres

      })

      const data = response.data.content;
      const totalpage = response.data.totalPages

      setData(data)
      setTotalElements(totalpage)
      console.log(response.data.totalPages)


    } catch (error) {
      console.error("Une erreur est survenue", error)
    }
  }


  useEffect(() => {
    get_list_consultations_of_patient(id_patient_enabled)
    console.log(id_patient_enabled)

  }, [id_patient_enabled, currentPage])


  const contentRef = useRef(null);

  const generatePDF = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('patient_visit_record.pdf');
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
        <div className="flex items-center justify-center ">
          {data?.map((data_item, index) => {
            const descriptionObject = JSON.parse(data_item?.consultation);
            return (
              <div key={index}>
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 mr-2">Registre du visite medical du patient :<br /></h1>

                <button onClick={generatePDF}>
                  <img src={pdf} alt="pdf" className="w-8 h-8"></img>
                </button>

                <div className="p-10 border text-black" ref={contentRef}>
                  <div className="grid grid-cols-1 gap-5">
                    {/* Rest of your code for displaying consultation details */}
                    <div>
                      <div className="flex space-x-4">
                        <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                          Nom du Patient :
                        </label>
                        <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 p">
                          {data_item?.patient.name} {data_item?.patient.firstname}
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
                          {formatDate(data_item?.start_dt)}
                        </div>
                      </div>
                      <div className="flex space-x-4 w-1/2 ">
                        <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                          Heure :
                        </label>
                        <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                          {formatTime(data_item?.start_dt)}
                        </div>
                      </div>
                    </div>

                    {/* Raison du visit */}
                    <div >
                      <label htmlFor="reason" className="block text-gray-800 font-semibold mb-2">
                        Raison du visite :
                      </label>
                      <div className="grid-cols-1 space-y-4">
                        {descriptionObject?.symptoms?.map((symptom, index) => (
                          <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                            {symptom}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prescription */}
                    <div >
                      <label htmlFor="prescription" className="block text-gray-800 font-semibold mb-2">
                        Prescriptions: 4jrs
                      </label>
                      <div className="grid-cols-1 space-y-4">
                        {descriptionObject?.prescriptions?.map((prescription, index) => (
                          <div key={index} className="max-w-32 border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                            {prescription.medicament} / {prescription.day}-{prescription.evening}-{prescription.night} / pendant {prescription.duration} jour(s)
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes additionnel  */}
                    <div >
                      <label htmlFor="additionnal_notes" className="block text-gray-800 font-semibold mb-2">
                        Notes additionnel:
                      </label>
                      <div className="grid-cols-1 space-y-4">
                        {descriptionObject?.additionnal_notes?.map((additionnal_note, index) => (
                          <div key={index} className="max-w-32 border-b-2 border-gray-400 bottom-0 left-0 right-0">
                            {additionnal_note}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          )}



        </div>
        <div>
          <PaginationComponent currentPage={currentPage} totalPages={totalElements} onPageChange={onPageChange}></PaginationComponent>

        </div>
      </div >






      {/* Pagination */}


    </>
  )

}