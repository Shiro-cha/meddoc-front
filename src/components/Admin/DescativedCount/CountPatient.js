import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { axiosPrivate } from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "../../Toast/Toast";
import { PaginationComponent } from "../../Pagination/Pagination";
import { SearchSimpleInput } from "../../SearchGeneralize/SearchInput";

export default function DisableCountPatient({ account_status }) {
    const URL = "/admin/"
    const URL_LIST_ACTIVATE_HEALTHCARE = "/admin/patientUsers"
    const URL_ACTIVATE_HEALTHCARE_ACCOUNT_STATUS = "/admin/activateUser"


    const [allPatient, setAllPatient] = useState([]);
    const [all, setAll] = useState([]);

    const [allcompany, setAllcompany] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);
    const [isChecked, setChecked] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState();
    const [pageSize, setPageSize] = useState(4);
    const [filtredaccountTypes, setfilteredaccountItems] = useState([1, 2])
    const [keyword, setkeyword] = useState("")
    const [filteredpercentage_missed, setfilteredpercentage_feedback] = useState(0)
    const [filteredpercentage_cancel, setfilteredpercentage_cancel] = useState(0)
    const [accountTypes, setaccountTypes] = useState([
        {
            name: "Non active",
            id: 2,
        },
        {
            name: "Active",
            id: 1,
        }

    ])

    const navigate = useNavigate()
    const URL_GOTO_HEALTHCARE_OF_COMPANY = URL + "view_profil"

    const toggleCheckbox = (id) => {
        setSelectedId(id);
        // setChecked(!isChecked);      
        if (selectedIds.includes(id)) {
            // If ID is already in the array, remove it
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
            // If ID is not in the array, add it
            setSelectedIds([...selectedIds, id]);
        }
    };

    const get_all_users_accounts = (search_key, filters, filter_cancel, filter_missed) => {

        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };
        const sum = filters.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        try {
            const parametres = {
                page: currentPage,
                size: pageSize,
                keyword: `${search_key}`,
                roleSum: sum,
                cancel: filter_cancel,
                missed: filter_missed,
            }

            axiosPrivate.get(URL_LIST_ACTIVATE_HEALTHCARE, { headers: headers, params: parametres }).then((response) => {
                setAllPatient(response.data.content)
                const totalpage = response.data.totalPages
                setTotalElements(totalpage)
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

    const updateRoleActivePatient = (identifier) => {
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
                get_all_users_accounts(keyword, filtredaccountTypes, filteredpercentage_cancel, filteredpercentage_missed)

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

    useEffect(() => {
        get_all_users_accounts(keyword, filtredaccountTypes, filteredpercentage_cancel, filteredpercentage_missed)
    }, [currentPage, keyword, filtredaccountTypes, filteredpercentage_cancel, filteredpercentage_missed])


    const Activehandleclik = (ID) => {
        console.log(ID)
        Swal.fire({
            title: "Voulez-vous vraiment modifier cette utilisateur ?",
            text: "Cette modification activera son compte.",
            showCancelButton: true,
            icon: 'warning',
            cancelButtonText: "Annuler",

            confirmButtonText: "Accepter",

        }).then((result) => {

            if (result.isConfirmed) {
                updateRoleActivePatient(ID)
            }
        });
    }


    const URL_DESACTIVATE_PATIENT_ACCOUNT_STATUS = "/admin/deactivateUser"

    const updateRoleDesactivePatient = (identifier) => {
        const accessToken = Cookies.get('jwtToken')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            axiosPrivate.put(`${URL_DESACTIVATE_PATIENT_ACCOUNT_STATUS}/${identifier}`, null, { headers: headers }).then((response) => {
                console.log(response);
                toast("success", "Modication effectuée!")
                setLoading(false);
                get_all_users_accounts(keyword, filtredaccountTypes, filteredpercentage_cancel, filteredpercentage_missed)

            })

                .catch((error) => {
                    console.error('Error fetching data:', error);
                    toast("error", "Une erreur est survenue !")
                    setLoading(false);

                });

        }
        catch (err) {
            console.log("Error", err)
            toast("error", "Une erreur est survenue !")
            setLoading(false);



        }

    }

    const Desactivatehandleclik = (ID) => {

        Swal.fire({
            title: "Voulez-vous vraiment modifier cette utilisateur ?",
            text: "Cette ajout désactivera son compte.",
            showCancelButton: true,
            icon: 'warning',
            cancelButtonText: "Annuler",

            confirmButtonText: "Accepter",

        }).then((result) => {

            if (result.isConfirmed) {
                updateRoleDesactivePatient(ID)
            }
        });
    }


    // ---------PAGINATION BASE------------



    const handleSearch = ({ searchKeyword, selectedItems, datesearch, percentageSearch_feedback, percentageSearch_cancel }) => {

        setkeyword(searchKeyword)
        setfilteredaccountItems(selectedItems)
        setfilteredpercentage_feedback(percentageSearch_feedback)
        setfilteredpercentage_cancel(percentageSearch_cancel)

    };
    const onPageChange = (page) => {

        setCurrentPage(page);
    };


    return (

        <div className="bg-white dark:bg-gray-900 h-96 p-4 sm:ml-64">
            <section class="container px-4 mx-auto">
                <div class="flex flex-col">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <h2 class="text-xl font-bold text-gray-400 mb-6 uppercase">LISTE DES COMPTES PATIENTS :</h2>
                            <SearchSimpleInput onSearch={handleSearch} filters={accountTypes} disableCalendarInput={false} otherfilters={true}>  </SearchSimpleInput>

                            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                ID
                                            </th>
                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Utilisateur
                                            </th>


                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Crée-le
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Statut
                                            </th>
                                            <th scope="col" class="p-1 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Total rendez-vous
                                            </th>
                                            <th scope="col" class="p-1 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Rendez-vous manqué (%)
                                            </th>
                                            <th scope="col" class="p-1 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Rendez-vous annulé (%)
                                            </th>


                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {loading ? (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap" colSpan="6">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <span>Chargement...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : allPatient.length > 0 ? (
                                            allPatient.map((data, index) => {
                                                const originalDate = new Date(data.created_at);
                                                const options = {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                };
                                                const created_at = originalDate.toLocaleDateString('fr-FR', options).replace(/\.$/, '');

                                                return (
                                                    <tr key={index}>
                                                        <td class="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                            <div class="inline-flex items-center gap-x-3">
                                                                <span>{data.identifiant}</span>
                                                            </div>
                                                        </td>

                                                        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap ">
                                                            <Link
                                                                to={{
                                                                    pathname: `${URL_GOTO_HEALTHCARE_OF_COMPANY}/${data.id}`,
                                                                }}

                                                                class="flex items-center gap-x-2 cursor-pointer">
                                                                {/* <img class="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="">
                                                                </img>  */}
                                                                <div>
                                                                    <h2 class="text-sm font-medium text-gray-800 dark:text-white ">{data.username} </h2>
                                                                    <p class="text-xs font-normal text-gray-600 dark:text-gray-400">{data.email}</p>
                                                                </div>
                                                            </Link>
                                                        </td>

                                                        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{created_at}</td>
                                                        <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            {data.role !== null ? (
                                                                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>

                                                                </div>
                                                            ) : (
                                                                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 dark:bg-gray-800">
                                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>

                                                                </div>
                                                            )}

                                                        </td>

                                                        <td class="p-1 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.total}</td>
                                                        <td class="p-1 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.feed_back} % </td>
                                                        <td class="p-1 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.cancelled_by_patient} % </td>


                                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                                            {data?.role !== "admin" && data?.role !== null && (<div>
                                                                <button onClick={() => Desactivatehandleclik(data.id)} className="bg-red-400 hover:bg-red-500 text-white text-center font-bold py-2 px-4 rounded w-24">
                                                                    Désactiver
                                                                </button>
                                                            </div>)}

                                                            {data?.role === null && (<div>
                                                                <button onClick={() => Activehandleclik(data.id)} className="bg-green-200 hover:bg-green-300 text-white font-bold py-2 px-4 rounded w-24">
                                                                    Activer
                                                                </button>
                                                            </div>)}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap" colSpan="6">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <span>Pas de données disponible</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>

                                </table>
                            </div>
                            <PaginationComponent currentPage={currentPage} totalPages={totalElements} onPageChange={onPageChange}></PaginationComponent>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
} 