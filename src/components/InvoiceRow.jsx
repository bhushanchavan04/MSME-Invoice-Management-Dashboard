import React from 'react';
import { getInvoiceStatus, getDaysInfo, formatCurrency } from '../utils/invoiceUtils';

const InvoiceRow = ({ invoice, onMarkAsPaid }) => {
    const status = getInvoiceStatus(invoice);
    const daysInfo = getDaysInfo(invoice);

    const statusColors = {
        Paid: 'bg-green-100 text-green-700',
        Pending: 'bg-yellow-100 text-yellow-700',
        Overdue: 'bg-red-100 text-red-700',
    };

    return (
        <tr className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 text-sm">
            <td className="px-6 py-4 font-medium text-slate-900">{invoice.id}</td>
            <td className="px-6 py-4 text-slate-600 font-medium">{invoice.customerName}</td>
            <td className="px-6 py-4 text-slate-500">{invoice.invoiceDate}</td>
            <td className="px-6 py-4 text-slate-500">{invoice.dueDate}</td>
            <td className="px-6 py-4 font-bold text-slate-800">{formatCurrency(invoice.amount)}</td>
            <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 text-slate-500 font-medium">{daysInfo}</td>
            <td className="px-6 py-4 text-right">
                {status !== 'Paid' && (
                    <button
                        onClick={() => onMarkAsPaid(invoice.id)}
                        className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md text-xs font-medium transition-colors shadow-sm"
                    >
                        Mark Paid
                    </button>
                )}
            </td>
        </tr>
    );
};

export default InvoiceRow;
