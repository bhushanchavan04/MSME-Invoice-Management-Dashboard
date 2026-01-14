import React from 'react';
import InvoiceRow from './InvoiceRow';

const InvoiceTable = ({ invoices, onMarkAsPaid }) => {
    if (invoices.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-slate-800">No invoices found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice #</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Days Info</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <InvoiceRow
                                key={invoice.id}
                                invoice={invoice}
                                onMarkAsPaid={onMarkAsPaid}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceTable;
