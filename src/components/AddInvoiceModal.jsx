import React, { useState, useEffect } from 'react';
import { calculateDueDate } from '../utils/invoiceUtils';

const AddInvoiceModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        amount: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        paymentTerms: '15',
    });

    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (formData.invoiceDate && formData.paymentTerms) {
            setDueDate(calculateDueDate(formData.invoiceDate, formData.paymentTerms));
        }
    }, [formData.invoiceDate, formData.paymentTerms]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.customerName || formData.amount <= 0) return;

        const newInvoice = {
            id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
            ...formData,
            amount: parseFloat(formData.amount),
            paymentTerms: parseInt(formData.paymentTerms),
            dueDate,
            paymentDate: null,
        };

        onAdd(newInvoice);
        setFormData({
            customerName: '',
            amount: '',
            invoiceDate: new Date().toISOString().split('T')[0],
            paymentTerms: '15',
        });
        onClose();
    };

    if (!isOpen) return null;

    const isFormValid = formData.customerName.trim() !== '' && formData.amount > 0 && formData.invoiceDate;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
            <div className="absolute inset-0 bg-slate-900/40" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800">New Invoice</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Customer Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            placeholder="e.g. Acme Corp"
                            value={formData.customerName}
                            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Amount (₹)</label>
                        <input
                            type="number"
                            required
                            min="1"
                            step="0.01"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Invoice Date</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                                value={formData.invoiceDate}
                                onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Payment Terms</label>
                            <select
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                                value={formData.paymentTerms}
                                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                            >
                                <option value="7">Net 7</option>
                                <option value="15">Net 15</option>
                                <option value="30">Net 30</option>
                                <option value="45">Net 45</option>
                                <option value="60">Net 60</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Calculated Due Date</p>
                        <p className="text-lg font-bold text-indigo-900">{dueDate || '---'}</p>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                        >
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInvoiceModal;
