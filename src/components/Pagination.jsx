import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-between bg-white px-6 py-4 border-t border-slate-100 rounded-b-xl shadow-sm">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-slate-700">
                        Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-semibold">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
                        <span className="font-semibold">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Previous</span>
                            <span>&lsaquo;</span>
                        </button>
                        {pages.map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                        : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Next</span>
                            <span>&rsaquo;</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
