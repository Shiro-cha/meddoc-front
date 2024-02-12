export function PaginationComponent({ currentPage, totalPages, onPageChange }) {
    const pages = [...Array(totalPages).keys()].map((page) => page);
    return (
        <nav aria-label="pagination">
            <ul className="flex items-center -space-x-px h-8 text-sm my-4">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0 || currentPage === 1}
                        aria-label="Previous Page"
                        className={`flex items-center justify-center px-3 h-8 ${currentPage === 1
                            ? "text-gray-500 bg-white border border-gray-300 cursor-not-allowed"
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            }`}
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                {pages.map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            aria-label={`Page ${page}`}
                            className={`flex items-center justify-center px-3 h-8 ${currentPage === page
                                ? "text-white bg-blue-500"
                                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                        >
                            {page + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        aria-label="Next Page"
                        className={`flex items-center justify-center px-3 h-8 ${currentPage === totalPages
                            ? "text-gray-500 bg-white border border-gray-300 "
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            }`}
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
