
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { axiosPrivate } from "../../../api/axios";


export default function HealthcareManager() {
    const GET_STAT_URL = "/stat/company"
    const [appointmentCounts, setAppointmentCounts] = useState({
        canceled: 0,
        made: 0,
        missed: 0,
        postponed: 0,
        total: 0,
        waiting: 0,
    });


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
            // setAppointmentCount(response.data.data)
            setAppointmentCounts({
                canceled: data.canceled || 0,
                made: data.made || 0,
                missed: data.missed || 0,
                postponed: data.postponed || 0,
                total: data.total || 0,
                waiting: data.waiting || 0,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        fetchData();

    }, []);

    const renderIcon = (key) => {
        switch (key) {
            case 'total':
                return (
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        {/* ... Total SVG path */}
                    </svg>
                );
            case 'canceled':
                return (
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        {/* ... Canceled SVG path */}
                    </svg>
                );
            case 'made':
                return (
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        {/* ... Made SVG path */}
                    </svg>
                );
            case 'missed':
                return (
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        {/* ... Missed SVG path */}
                    </svg>
                );
            case 'postponed':
                return (
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        {/* ... Postponed SVG path */}
                    </svg>
                );
            case 'waiting':
                return (
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                        {/* ... Waiting SVG path */}
                    </svg>
                );
            default:
                return null;
        }
    };
    const getAppointmentTypeText = (key) => {
        switch (key) {
            case 'total':
                return 'Rendez-vous'; // Or use your translation function here
            case 'canceled':
                return 'Rendez-vous annulé';
            case 'made':
                return 'Rendez-vous fait';
            case 'missed':
                return 'Rendez-vous manqué';
            case 'postponed':
                return 'Rendez-vous retardé';
            case 'waiting':
                return 'Rendez-vous en cours';
            default:
                return '';
        }
    };

    return (
        <>
            <div className=" bg-slate-200 sm:ml-64 h-screen">
                {/* DETAILS */}
                <section className="text-gray-700 body-font p-4">
                    <div className="container px-5 mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {Object.keys(appointmentCounts).map((key, index) => (
                                <div key={index} className="flex flex-col items-center justify-center border-2 border-gray-600 px-4 py-6 rounded-lg">
                                    {renderIcon(key)}
                                    <h2 className="title-font font-medium text-3xl text-gray-900">{appointmentCounts[key]}</h2>
                                    <p className="leading-relaxed">{getAppointmentTypeText(key)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* CHART  */}

                {/* <div class="flex mx-auto">
                    <div className=" flex items-center w-full bg-white rounded-lg  shadow dark:bg-gray-800 md:p-6 mx-auto  md:m-4 ">
                        <ApexChart seriesData={[appointmentCounts.canceled, appointmentCounts.made, appointmentCounts.missed, appointmentCounts.postponed, appointmentCounts.waiting]}></ApexChart>
                    </div>
                </div> */}

                {/* TABLE */}
                {/* <section class="bg-blue-100 dark:bg-gray-900 p-4 m-5 md:p-6">
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Rendez vous avec
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date Rendez-vous
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Description du rendez vous
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status du rendez vous
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td class="px-6 py-4">
                                        Silver
                                    </td>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        2023-24-10
                                    </th>
                                    <td class="px-6 py-4">
                                        Coucou
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Confirmer
                                        </div>

                                    </td>

                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        2023-24-10
                                    </th>
                                    <td class="px-6 py-4">
                                        White
                                    </td>
                                    <td class="px-6 py-4">
                                        Reparer dent molaire
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Confirmer
                                        </div>

                                    </td>

                                </tr>
                                <tr class="bg-white dark:bg-gray-800">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        2023-24-10
                                    </th>
                                    <td class="px-6 py-4">
                                        Black
                                    </td>
                                    <td class="px-6 py-4">
                                        Accessories
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Confirmer
                                        </div>

                                    </td>


                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                        <div class="flex justify-between items-center pt-5">

                            <button
                                id="dropdownDefaultButton"
                                data-dropdown-toggle="lastDaysdropdown"
                                data-dropdown-placement="bottom"
                                class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                                type="button">
                                7 derniers jours
                                <svg class="w-2.5 m-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            <div id="lastDaysdropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                                    </li>
                                    <li>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                                    </li>
                                </ul>
                            </div>
                            <a
                                href="#"
                                class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                                Rapport
                                <svg class="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </section> */}



            </div>

        </>

    )

}