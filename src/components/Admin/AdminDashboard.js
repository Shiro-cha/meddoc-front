import { useEffect } from "react";
import { useState } from "react"
import { axiosPrivate } from "../../api/axios";
import Cookies from "js-cookie";
import Loaderpulse from "../loader/loader_pulse";
import { Link } from "react-router-dom";
import TableBodyCount from "./DescativedCount/DesactivedCountHealthCare";


export function AdminDashboard() {
    const URL = "/admin/"
    const URL_LIST_UNACTIVATE_HEALTHCARE = "/admin/unacUsers"
    const URL_LIST_ACTIVATE_HEALTHCARE = "/admin"
    const URL_ACTIVATE_HEALTHCARE_ACCOUNT_STATUS = "/admin/activateUser"
    const URL_DESACTIVATE_HEALTHCARE_ACCOUNT_STATUS = "/admin/deactivateUser"

    const URL_GOTO_HEALTHCARE_OF_COMPANY = URL + "healthcare"



    const [allhealthcare, setAllhealthcare] = useState([]);
    const [allcompany, setAllcompany] = useState([]);

    const [loading, setLoading] = useState([]);

    const [status, setStatus] = useState("activate");

    const [activeTab, setActiveTab] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const toggleCheckbox = (id) => {
        setSelectedId(id);
        setIsChecked(!isChecked);
    };


    useEffect(() => {
        // // Use this effect to update the role when the selected ID and isChecked change
        if (selectedId && isChecked) {
            updateRoleActiveHealthPro(selectedId);
        } else if (selectedId) {
            updateRoleDesactiveHealthPro(selectedId);
        }
        get_all_uncativate_users()

    }, [selectedId, isChecked]);


    useEffect(() => {
        get_all_uncativate_users()
    }, [])


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

    const updateRoleDesactiveHealthPro = (identifier) => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            axiosPrivate.put(`${URL_DESACTIVATE_HEALTHCARE_ACCOUNT_STATUS}/${identifier}`, { headers: headers }).then((response) => {
                console.log(response);
                setLoading(false);
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

    const get_all_uncativate_users = (tab_status) => {

        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        const url = tab_status === "uncativate"
            ? URL_LIST_UNACTIVATE_HEALTHCARE
            : URL_LIST_ACTIVATE_HEALTHCARE;

        try {

            axiosPrivate.get(url, { headers: headers }).then((response) => {
                console.log(response)
                setAllhealthcare(response.data.healthProUsers)
                setAllcompany(response.data.companyUsers)
                setLoading(false);
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


    const handleUncativateTab = () => {

        setActiveTab(true);
        setStatus('unactive');
        // get_all_uncativate_users("uncativate");
    };


    const handleActivateTab = () => {
        setActiveTab(false);
        setStatus('active');

        // get_all_uncativate_users("activate");
    };



    return (
        <div className="bg-white dark:bg-gray-900 h-96 p-4 sm:ml-64">
            <section class="container px-4 mx-auto">
                <div class="flex flex-col">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="my-5 ">
                                <ul class="flex flex-wrap text-sm font-medium text-center justify-center text-gray-500 dark:text-gray-400">

                                    <li class="mr-2">
                                        <button
                                            class={`inline-block px-4 py-3 rounded-lg ${activeTab === false
                                                ? "text-white bg-blue-600"
                                                : "text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                                                }`}
                                            onClick={handleActivateTab}
                                        >
                                            Compte activer
                                        </button>
                                    </li>

                                    <li class="mr-2">
                                        <button

                                            class={`inline-block px-4 py-3 rounded-lg ${activeTab
                                                ? "text-white bg-blue-600"
                                                : "text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                                                }`}
                                            onClick={handleUncativateTab}
                                        >
                                            Compte désactiver
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                ID
                                            </th>
                                            {/* <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div class="flex items-center gap-x-3">

                                                    <span class="flex items-center gap-x-2">
                                                        <span>Nom de l'etablissement/cabinet</span>
                                                    </span>
                                                </div>
                                            </th> */}



                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Utilisateur
                                            </th>
                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Role
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Crée le
                                            </th>


                                            {/* <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Souscription
                                            </th> */}

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* table body */}
                                    <TableBodyCount account_status={status}></TableBodyCount>


                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}




export default AdminDashboard