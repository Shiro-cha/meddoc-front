
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import Cookies from "js-cookie";
import { useState } from "react";


function AdministratorDashboard() {
    const GET_STAT_URL = "/view/accountStatus"
    const [account_status, setAccountStatus] = useState([])

    //     chart: {
    //         height: "100%",
    //         maxWidth: "100%",
    //         type: "area",
    //         fontFamily: "Inter, sans-serif",
    //         dropShadow: {
    //             enabled: false,
    //         },
    //         toolbar: {
    //             show: false,
    //         },
    //     },
    //     tooltip: {
    //         enabled: true,
    //         x: {
    //             show: false,
    //         },
    //     },
    //     fill: {
    //         type: "gradient",
    //         gradient: {
    //             opacityFrom: 0.55,
    //             opacityTo: 0,
    //             shade: "#1C64F2",
    //             gradientToColors: ["#1C64F2"],
    //         },
    //     },
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     stroke: {
    //         width: 6,
    //     },
    //     grid: {
    //         show: false,
    //         strokeDashArray: 4,
    //         padding: {
    //             left: 2,
    //             right: 2,
    //             top: 0
    //         },
    //     },
    //     series: [
    //         {
    //             name: "New users",
    //             data: [6500, 6418, 6456, 6526, 6356, 6456],
    //             color: "#1A56DB",
    //         },
    //     ],
    //     xaxis: {
    //         categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
    //         labels: {
    //             show: false,
    //         },
    //         axisBorder: {
    //             show: false,
    //         },
    //         axisTicks: {
    //             show: false,
    //         },
    //     },
    //     yaxis: {
    //         show: false,
    //     },
    // };

    const options = {
        chart: {
            height: "100%",
            maxWidth: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        series: [
            {
                name: "New users",
                data: [6500, 6418, 6456, 6526, 6356, 6456],
                color: "#1A56DB",
            },
        ],

        xaxis: {
            categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
    };

    const fetchData = async () => {
        const accessToken = Cookies.get('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            const response = await axiosPrivate.get(GET_STAT_URL, { headers: headers });
            console.log(response.data.data);
            const data = response.data
            setAccountStatus(data)
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        fetchData();

    }, []);



    return (
        <>
            <div class="sm:ml-64 flex items-center bg-gray-100 dark:bg-gray-900 h-screen">
                <div class="container max-w-6xl px-5 m-auto my-28">
                    <div class="grid gap-7 sm:grid-cols-2 lg:grid-cols-2">
                        <div class="flex items-center justify-between p-5 bg-white rounded shadow-sm">
                            <div>
                                <div class="text-sm text-gray-400 ">Comptes professionnels de santé</div>
                                <div class="flex items-center pt-1">
                                    <div class="text-xl font-medium text-indigo-400 ">{account_status?.total_hpro}</div>
                                </div>
                            </div>
                            <div class="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z" /></svg>
                            </div>
                        </div>
                        <div class="flex items-center justify-between p-5 bg-white rounded shadow-sm">
                            <div>
                                <div class="text-sm text-gray-400 ">Comptes professionnels de santé activés</div>
                                <div class="flex items-center pt-1">
                                    <div class="text-xl font-medium text-indigo-400 ">{account_status?.hpro_active}</div>
                                </div>
                            </div>
                            <div class="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z" /></svg>
                            </div>
                        </div>
                        <div class="flex items-center justify-between p-5 bg-white rounded shadow-sm">
                            <div>
                                <div class="text-sm text-gray-400 ">Comptes de patients</div>
                                <div class="flex items-center pt-1">
                                    <div class="text-xl font-medium text-indigo-400">{account_status?.total_patient}</div>
                                </div>
                            </div>
                            <div class="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 47 46">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M39.167 40.25v-3.833a7.585 7.585 0 00-2.295-5.422 7.92 7.92 0 00-5.539-2.245H15.667a7.92 7.92 0 00-5.54 2.245 7.585 7.585 0 00-2.294 5.422v3.833M23.5 21.083c4.326 0 7.833-3.432 7.833-7.666 0-4.235-3.507-7.667-7.833-7.667-4.326 0-7.833 3.432-7.833 7.667 0 4.234 3.507 7.666 7.833 7.666z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="flex items-center justify-between p-5 bg-white rounded shadow-sm">
                            <div>
                                <div class="text-sm text-gray-400 ">Comptes de patients activés</div>
                                <div class="flex items-center pt-1">
                                    <div class="text-xl font-medium text-indigo-400 ">{account_status?.patient_active}</div>
                                </div>
                            </div>
                            <div class="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 47 46">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M39.167 40.25v-3.833a7.585 7.585 0 00-2.295-5.422 7.92 7.92 0 00-5.539-2.245H15.667a7.92 7.92 0 00-5.54 2.245 7.585 7.585 0 00-2.294 5.422v3.833M23.5 21.083c4.326 0 7.833-3.432 7.833-7.666 0-4.235-3.507-7.667-7.833-7.667-4.326 0-7.833 3.432-7.833 7.667 0 4.234 3.507 7.666 7.833 7.666z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default AdministratorDashboard;