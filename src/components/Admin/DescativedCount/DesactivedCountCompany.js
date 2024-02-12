import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { axiosPrivate } from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "../../Toast/Toast";
import { PaginationComponent } from "../../Pagination/Pagination";
import { SearchSimpleInput } from "../../SearchGeneralize/SearchInput";

export default function DisableCountCompany({ account_status }) {
    const URL = "/admin/"
    const URL_LIST_UNACTIVATE_HEALTHCARE = "/admin/unacUsers"
    const URL_ACTIVATE_HEALTHCARE_ACCOUNT_STATUS = "/admin/activateUser"

    const URL_LIST_ACTIVATE_HEALTHCARE = "/admin"

    const [allhealthcare, setAllhealthcare] = useState([]);
    const [all, setAll] = useState([]);

    const [allcompany, setAllcompany] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);
    const [isChecked, setChecked] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const navigate = useNavigate()

    const URL_GOTO_HEALTHCARE_OF_COMPANY = URL + "healthcare"

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

    const get_all_users_accounts = (search_key) => {

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

        try {

            axiosPrivate.get(URL_LIST_UNACTIVATE_HEALTHCARE, {
                params: parametres,
                headers: headers
            }).then((response) => {

                setAllcompany(response.data.companyUsers)



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



    // ---------PAGINATION BASE------------
    const [keyword, setkeyword] = useState("")

    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState();
    const [pageSize, setPageSize] = useState(5);
    const handleSearch = ({ searchKeyword, selectedItems, datesearch }) => {

        console.log("Search Keyword:", searchKeyword);
        console.log("Search date:", datesearch);
        setkeyword(searchKeyword)
        setCurrentPage(0)

    };
    const onPageChange = (page) => {

        setCurrentPage(page);
    };


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

    useEffect(() => {
        get_all_users_accounts(account_status)

    }, [account_status])


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


    return (

        <div className="bg-white dark:bg-gray-900 h-96 p-4 sm:ml-64">
            <section class="container px-4 mx-auto">
                <div class="flex flex-col">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <h2 class="text-xl font-bold text-gray-400 mb-6  uppercase">LISTE DES COMPTES DES MANAGERS d'entreprise DéSACTIVER:</h2>
                            <SearchSimpleInput onSearch={handleSearch} filters={[]} disableCalendarInput={false}>  </SearchSimpleInput>
                            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                ID de l'entreprise
                                            </th>
                                            <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div class="flex items-center gap-x-3">

                                                    <span class="flex items-center gap-x-2">
                                                        <span>Nom de l'etablissement/cabinet</span>
                                                    </span>
                                                </div>
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Utilisateur Gérant
                                            </th>
                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Nombre de compte
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Crée le
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* table body */}

                                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {loading ? (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap" colSpan="6">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <span>Chargement...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : allcompany.length > 0 ? (
                                            allcompany.map((data, index) => {
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
                                                                <span>{data.id}</span>
                                                            </div>
                                                        </td>
                                                        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">xxxxxxxxxxxx</td>

                                                        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap ">
                                                            <Link to={`${URL_GOTO_HEALTHCARE_OF_COMPANY}/${data.id}`} class="flex items-center gap-x-2 cursor-pointer">
                                                                <div>
                                                                    <h2 class="text-sm font-medium text-gray-800 dark:text-white ">{data.username} USERNAME</h2>
                                                                    <p class="text-xs font-normal text-gray-600 dark:text-gray-400">{data.email}</p>
                                                                </div>
                                                            </Link>

                                                        </td>



                                                        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{"xxxxxx"}</td>
                                                        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{created_at}</td>


                                                        <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            {data.role !== null ? (
                                                                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                    <h2 class="text-sm font-normal">Activé</h2>
                                                                </div>
                                                            ) : (
                                                                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 dark:bg-gray-800">
                                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                    <h2 class="text-sm font-normal">Desactivé</h2>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td class="px-4 py-4 text-sm whitespace-nowrap">

                                                            <div>
                                                                <button onClick={() => handleclik(data.id)} className="bg-green-200 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
                                                                    Activer
                                                                </button>
                                                            </div>
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