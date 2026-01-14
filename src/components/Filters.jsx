import React from 'react';

const Filters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, sortBy, setSortBy }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by invoice # or customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-slate-600">Status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                    </select>
                </div>

                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-slate-600">Sort By:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    >
                        <option value="date-desc">Date (Newest)</option>
                        <option value="date-asc">Date (Oldest)</option>
                        <option value="amount-desc">Amount (High-Low)</option>
                        <option value="amount-asc">Amount (Low-High)</option>
                        <option value="due-date-asc">Due Date (Soonest)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filters;
