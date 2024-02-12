import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "../Toast/Toast";

export function ViewProfil() {
    const match = useMatch('admin/view_profil/:id');
    const id = match.params.id;

    const DESCRIPTION_HEALTHCARE = "/healthPro/getDescription"
    const URL_ACTIVATE_HEALTHCARE_ACCOUNT_STATUS = "/admin/activateUser"


    const [healthcareProfil, sethealthcareProfil] = useState()
    const [healthcareDescription, sethealthcareDescription] = useState()


    useEffect(() => {
        window.scrollTo(0, 0);
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            axiosPrivate.get(`${DESCRIPTION_HEALTHCARE}/${id}`, { headers: headers }).then((response) => {
                sethealthcareProfil(response.data)
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

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);


    const updateRoleActiveHealthPro = (identifier) => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            axiosPrivate.put(`${URL_ACTIVATE_HEALTHCARE_ACCOUNT_STATUS}/${identifier}`, {}, { headers: headers }).then((response) => {
                console.log(response);
                setLoading(false);
                toast("success", "Modication effectuée!")
                setLoading(false);
                navigate("/admin/actived_count")
            })

                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false);

                });

        }
        catch (err) {
            console.log("Error", err)
            setLoading(false);

        }

    }

    const handleclik = (ID) => {
        console.log(ID)
        Swal.fire({
            title: "Voulez-vous vraiment modifier cette utilisateur ?",
            text: "Cette modification active son compte.",
            showCancelButton: true,
            icon: 'warning',
            cancelButtonText: "Annuler",

            confirmButtonText: "Accepter",

        }).then((result) => {

            if (result.isConfirmed) {
                updateRoleActiveHealthPro(ID)
            }
        });
    }
    const birthdate = healthcareProfil?.birthdate instanceof Date
        ? healthcareProfil?.birthdate.toISOString().split('T')[0]
        : healthcareProfil?.birthdate.split('T')[0];

    return (


        <div class="flex flex-col h-screen bg-slate-200 sm:ml-64">
            <div class="relative  mt-6 flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                <div class="mt-2 mb-8 w-full">
                    <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-white flex justify-between">
                        Infromation géneral :
                        {healthcareProfil?.role === null ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-red-400" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6L8.4 17Zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-green-400" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z" />
                            </svg>
                        )}
                    </h4>

                </div>
                <div class="grid grid-cols-2 gap-4 px-2 w-full">

                    <InfoCard title="Nom" value={healthcareProfil?.name} />
                    <InfoCard title="Prénoms" value={healthcareProfil?.firstname} />
                    <InfoCard title="Date de naissance" value={birthdate} />
                    <InfoCard title="Email" value={healthcareProfil?.email} />
                    <InfoCard title="Contact" value={healthcareProfil?.contact} />
                    <InfoCard title="Addresse" value={healthcareProfil?.address} />
                    <InfoCard title="Numero d'ordre" value={healthcareProfil?.orderNum} />
                    {/* <InfoCard title="Ordre d'affiliation" value={healthcareProfil?.affiliationOrder} /> */}
                    <InfoCard title="Spécialité" value={healthcareProfil?.speciality_name} />


                </div>
                {healthcareProfil?.role === null ? (
                    <button
                        className="my-4 mx-auto px-8 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg"
                        onClick={() => handleclik(healthcareProfil?.id)}
                    >
                        Activer
                    </button>
                ) : (
                    <button
                        className="my-4 mx-auto px-8 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg"
                        onClick={() => handleclik(healthcareProfil?.id)}
                    >
                        Desactiver
                    </button>
                )}
            </div>
        </div>


    )
}

function InfoCard({ title, value }) {
    return (
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">{value}</p>
        </div>
    );
}

export default ViewProfil