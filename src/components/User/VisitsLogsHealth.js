import { PaginationComponent } from "../Pagination/Pagination";

export default function VisitsBookHealth() {
  return (

    <>
      <div className="flex items-center justify-center h-full sm:m-68 border flex-col text-slate-200">
        <PaginationComponent currentPage={1}></PaginationComponent>

        <h1 class="text-2xl font-semibold text-gray-800 mb-4">Registres des visites medicals :</h1>
        <div className="p-10 border text-black">
          <div className="grid grid-cols-1 gap-9">
            {/* Docteur */}
            <div >
              <div className="flex space-x-4">
                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                  +Nom du docteur :
                </label>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 pr-32 p">
                  Dr. Morris Spannuth
                </div>
              </div>
            </div>


            {/* Date */}
            <div className="flex space-x-4" >
              <div className="flex space-x-4 w-1/2">
                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                  +Date:
                </label>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                  2023-10-6
                </div>
              </div>
              <div className="flex space-x-4 w-1/2 ">
                <label htmlFor="doctorName" className="block text-gray-800 font-semibold mb-2">
                  +Heure :
                </label>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                  16:20
                </div>
              </div>
            </div>

            {/* Raison du visit */}
            <div >
              <label htmlFor="reason" className="block text-gray-800 font-semibold mb-2">
                +Raison du visite :
              </label>
              <div className="grid-cols-1 space-y-4">
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                  Voan'ny tazo
                </div>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                  Marary Andoha
                </div>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0">
                  Manavy kely
                </div>

              </div>
            </div>

            {/* Prescription */}
            <div >
              <label htmlFor="prescription" className="block text-gray-800 font-semibold mb-2">
                +Prescriptions: 4jrs
              </label>
              <div className="grid-cols-1 space-y-4">
                <div className="max-w-32 border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                  Paracetamol / 50mg / 1-1-1
                </div>
                <div className="max-w-32 border-b-2 border-gray-400 bottom-0 left-0 right-0  ">
                  Flacon Ubuprofen / 10ml / 1-1-0
                </div>
                {/* <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 pr-32 p">

                </div>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 pr-32 p">

                </div>
                <div className="border-b-2 border-gray-400 bottom-0 left-0 right-0 pr-32 p">

                </div> */}

              </div>
            </div>

            {/* Notes additionnel  */}
            <div >
              <label htmlFor="additionnal_notes" className="block text-gray-800 font-semibold mb-2">
                +Notes additionnel:
              </label>
              <div className="grid-cols-1 space-y-4">
                <div className="max-w-32 border-b-2 border-gray-400 bottom-0 left-0 right-0 ">
                  Temperature corporel ~ 37°
                </div>
                <div className="max-w-32 border-b-2 border-gray-400 bottom-0 left-0 right-0  ">
                  Poids ~ 65 kg
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </>
  )

}