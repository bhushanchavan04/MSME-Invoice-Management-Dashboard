import React, { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialInvoices } from '../data/mockData';
import { getInvoiceStatus } from '../utils/invoiceUtils';
import SummaryCards from './SummaryCards';
import Filters from './Filters';
import InvoiceTable from './InvoiceTable';
import AddInvoiceModal from './AddInvoiceModal';
import Pagination from './Pagination';

const Dashboard = () => {
    // State
    const [invoices, setInvoices] = useLocalStorage('msme_invoices', initialInvoices);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('date-desc');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Handlers
    const handleMarkAsPaid = useCallback((id) => {
        setInvoices((prev) =>
            prev.map((inv) =>
                inv.id === id ? { ...inv, paymentDate: new Date().toISOString().split('T')[0] } : inv
            )
        );
    }, [setInvoices]);

    const handleAddInvoice = useCallback((newInvoice) => {
        setInvoices((prev) => [newInvoice, ...prev]);
    }, [setInvoices]);

    // Derived state (useMemo for optimization)
    const filteredAndSortedInvoices = useMemo(() => {
        let result = [...invoices];

        // Search
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(
                (inv) =>
                    inv.id.toLowerCase().includes(lowerSearch) ||
                    inv.customerName.toLowerCase().includes(lowerSearch)
            );
        }

        // Filter by Status
        if (statusFilter !== 'All') {
            result = result.filter((inv) => getInvoiceStatus(inv) === statusFilter);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'date-desc') return new Date(b.invoiceDate) - new Date(a.invoiceDate);
            if (sortBy === 'date-asc') return new Date(a.invoiceDate) - new Date(b.invoiceDate);
            if (sortBy === 'amount-desc') return b.amount - a.amount;
            if (sortBy === 'amount-asc') return a.amount - b.amount;
            if (sortBy === 'due-date-asc') return new Date(a.dueDate) - new Date(b.dueDate);
            return 0;
        });

        return result;
    }, [invoices, searchTerm, statusFilter, sortBy]);

    // Pagination logic
    const totalItems = filteredAndSortedInvoices.length;
    const paginatedInvoices = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedInvoices.slice(start, start + itemsPerPage);
    }, [filteredAndSortedInvoices, currentPage]);

    // Reset to first page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, sortBy]);

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans transition-all">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Invoice Dashboard</h1>
                        <p className="text-slate-500 mt-1">Manage your business invoices and cash flow effortlessly.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                    >
                        + New Invoice
                    </button>
                </header>

                {/* Summary */}
                <SummaryCards invoices={filteredAndSortedInvoices} />

                {/* Content Area */}
                <div className="space-y-4">
                    <Filters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />

                    <InvoiceTable
                        invoices={paginatedInvoices}
                        onMarkAsPaid={handleMarkAsPaid}
                    />

                    <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-slate-400 text-sm pb-8">
                    &copy; 2026 MSME Invoice Manager. Built with React & Tailwind CSS.
                </footer>
            </div>

            <AddInvoiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddInvoice}
            />
        </div>
    );
};

export default Dashboard;
