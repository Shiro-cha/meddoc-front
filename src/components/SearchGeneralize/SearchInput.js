import { useState } from "react"

export function SearchSimpleInput({ onSearch, filters, disableCalendarInput, otherfilters }) {

    const [searchKeyword, setSearchKeyword] = useState("");
    const [datesearch, setDateSearch] = useState("");
    const [percentageSearch_feedback, setpercentageSearch_feedback] = useState(0);
    const [percentageSearch_cancel, setpercentageSearch_cancel] = useState(0);


    const [selectedItems, setSelectedItems] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault()
        onSearch({ searchKeyword, selectedItems, datesearch, percentageSearch_feedback, percentageSearch_cancel });
    };


    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        const eventId = parseInt(e.target.value, 10);

        if (e.target.checked) {
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, eventId]);
        } else {
            setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== eventId));
        }
    };

    const getColorBasedOnFilter = (filterName) => {
        switch (filterName) {
            case 'postponed':
                return 'bg-yellow-200'; // Change this class based on your styling
            case 'made':
                return 'bg-green-400'; // Change this class based on your styling
            case 'missed':
                return 'bg-red-400'; // Change this class based on your styling
            case 'Cancelled_by_patient':
                return 'bg-black'; // Change this class based on your styling
            case 'Cancelled_by_healthpro':
                return 'bg-gray-400'; // Change this class based on your styling
            case 'appointment':
                return 'bg-blue-500';
            case 'Active':
                return 'bg-green-500';
            case 'Non active':
                return 'bg-red-500';
            default:
                return 'bg-gray-200'; // Default color if the filter name doesn't match
        }
    };

    const translateFilterName = (filterName) => {
        switch (filterName) {
            case 'postponed':
                return 'Reporté'; // Translate to French
            case 'made':
                return 'Réalisé'; // Translate to French
            case 'missed':
                return 'Manqué'; // Translate to French
            case 'Cancelled_by_patient':
                return 'Annulé par vous'; // Translate to French
            case 'Cancelled_by_healthpro':
                return 'Annulé par le médecin';
            case 'appointment':
                return 'À venir';
            case 'Need_feedback':
                return 'En attente de réponse'; // 
            default:
                return filterName; // Return the original name if translation is not available
        }
    };

    return (
        <div class="max-w-screen-xl px-4 mx-auto lg:px-12 w-full p-4">
            <div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <div class="w-full">
                        {/* RECHERCHE */}

                        <form class="flex items-center space-x-5" onSubmit={handleSearch}>
                            <label for="simple-search" class="sr-only">Recherche</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    value={searchKeyword}
                                    onChange={handleInputChange}
                                    type="text"
                                    id="simple-search"
                                    class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Recherche" required="">
                                </input>
                            </div>
                            {disableCalendarInput === true && (<div>
                                <input
                                    value={datesearch}
                                    onChange={(e) => setDateSearch(e.target.value)}
                                    type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block block w-full p-2 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Recherche par Date">
                                </input>

                            </div>)}
                            {otherfilters === true && (
                                <div className="flex space-x-5">
                                    <div className="flex items-center">
                                        <label htmlFor="percentageSearch_cancel" className="block text-sm mr-2 font-medium text-gray-700">
                                            En attente de reponse (%)
                                        </label>
                                        <input
                                            id="percentageSearch_feedback"
                                            value={percentageSearch_feedback}
                                            onChange={(e) => setpercentageSearch_feedback(e.target.value)}
                                            type="number" step="0.5"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <label htmlFor="percentageSearch_cancel" className="block text-sm mr-2 font-medium text-gray-700">
                                            Annulé (%)
                                        </label>
                                        <input
                                            id="percentageSearch_cancel"
                                            value={percentageSearch_cancel}
                                            onChange={(e) => setpercentageSearch_cancel(e.target.value)}
                                            type="number" step="0.5"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            )}

                        </form>

                    </div>
                    <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                        <button
                            onClick={handleSearch}
                            type="button" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            <svg class="w-4 h-4 mx-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            Rechercher
                        </button>

                    </div>


                </div>
                {disableCalendarInput === true && (
                    <div className="md:flex p-2 ">
                        {filters.map((filter) => {
                            getColorBasedOnFilter(filter)
                            return (
                                <li key={filter.id} className="flex items-center p-2">
                                    <input
                                        id={filter.name}
                                        type="checkbox"
                                        value={filter.id}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor={filter.name}
                                        className="flex ml-2 text-sm font-medium items-center text-gray-900 dark:text-gray-100"
                                    >
                                        {translateFilterName(filter.name)}
                                        <div
                                            className={`h-2.5 w-2.5 ml-2 rounded-full ${getColorBasedOnFilter(filter.name)
                                                }`}
                                        ></div>
                                    </label>
                                </li>
                            )
                        })}
                    </div>

                )}
                {otherfilters === true && (
                    <div className="md:flex p-2 ">
                        {filters.map((filter) => {
                            getColorBasedOnFilter(filter)
                            return (
                                <li key={filter.id} className="flex items-center p-2">
                                    <input
                                        id={filter.name}
                                        type="checkbox"
                                        value={filter.id}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor={filter.name}
                                        className="flex ml-2 text-sm font-medium items-center text-gray-900 dark:text-gray-100"
                                    >
                                        {translateFilterName(filter.name)}
                                        <div
                                            className={`h-2.5 w-2.5 ml-2 rounded-full ${getColorBasedOnFilter(filter.name)
                                                }`}
                                        ></div>
                                    </label>
                                </li>
                            )
                        })}
                    </div>

                )}

            </div>
        </div>
    )
}