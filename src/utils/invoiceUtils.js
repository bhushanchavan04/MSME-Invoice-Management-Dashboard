/**
 * Derives the status of an invoice based on its properties.
 * Paid -> paymentDate exists
 * Overdue -> no paymentDate AND dueDate < today
 * Pending -> no paymentDate AND dueDate >= today
 */
export const getInvoiceStatus = (invoice) => {
    if (invoice.paymentDate) return 'Paid';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(invoice.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) return 'Overdue';
    return 'Pending';
};

/**
 * Calculates human-readable days information based on status.
 */
export const getDaysInfo = (invoice) => {
    const status = getInvoiceStatus(invoice);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(invoice.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today - dueDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (status === 'Pending') {
        return `Due in ${diffDays} days`;
    }

    if (status === 'Overdue') {
        return `Overdue by ${diffDays} days`;
    }

    if (status === 'Paid') {
        const paymentDate = new Date(invoice.paymentDate);
        paymentDate.setHours(0, 0, 0, 0);
        const payDiffTime = paymentDate - dueDate;
        const payDiffDays = Math.round(payDiffTime / (1000 * 60 * 60 * 24));

        if (payDiffDays === 0) return 'Paid on time';
        if (payDiffDays < 0) return `Paid ${Math.abs(payDiffDays)} days early`;
        return `Paid ${payDiffDays} days late`;
    }

    return '';
};

/**
 * Calculates due date based on invoice date and payment terms.
 */
export const calculateDueDate = (invoiceDate, terms) => {
    const date = new Date(invoiceDate);
    date.setDate(date.getDate() + parseInt(terms));
    return date.toISOString().split('T')[0];
};

/**
 * Formats currency amount.
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
};
