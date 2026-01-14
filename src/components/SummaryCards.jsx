import React, { useMemo } from 'react';
import { getInvoiceStatus, formatCurrency } from '../utils/invoiceUtils';

const SummaryCards = ({ invoices }) => {
    const stats = useMemo(() => {
        let totalOutstanding = 0;
        let totalOverdue = 0;
        let totalPaidCurrentMonth = 0;
        let totalDelay = 0;
        let paidWithDelayCount = 0;

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        invoices.forEach((inv) => {
            const status = getInvoiceStatus(inv);

            if (status === 'Pending' || status === 'Overdue') {
                totalOutstanding += inv.amount;
            }

            if (status === 'Overdue') {
                totalOverdue += inv.amount;
            }

            if (status === 'Paid' && inv.paymentDate) {
                const pDate = new Date(inv.paymentDate);
                if (pDate.getMonth() === currentMonth && pDate.getFullYear() === currentYear) {
                    totalPaidCurrentMonth += inv.amount;
                }

                // Calculate delay for avg payment delay (paid only)
                const dDate = new Date(inv.dueDate);
                const diffTime = pDate - dDate;
                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

                // Only count if it was actually delayed? Or all paid? 
                // "Average Payment Delay (paid invoices only)" usually means avg of (paymentDate - dueDate)
                totalDelay += diffDays;
                paidWithDelayCount++;
            }
        });

        const avgDelay = paidWithDelayCount > 0 ? (totalDelay / paidWithDelayCount).toFixed(1) : 0;

        return {
            totalOutstanding,
            totalOverdue,
            totalPaidCurrentMonth,
            avgDelay,
        };
    }, [invoices]);

    const cards = [
        {
            label: 'Total Outstanding',
            value: formatCurrency(stats.totalOutstanding),
            color: 'text-slate-900',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            label: 'Total Overdue',
            value: formatCurrency(stats.totalOverdue),
            color: 'text-slate-900',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            )
        },
        {
            label: 'Total Paid (This Month)',
            value: formatCurrency(stats.totalPaidCurrentMonth),
            color: 'text-slate-900',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            label: 'Avg. Payment Delay',
            value: `${stats.avgDelay} days`,
            color: 'text-slate-900',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((card) => (
                <div key={card.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                    <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-center">
                        {card.icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">{card.label}</p>
                        <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
