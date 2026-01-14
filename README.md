 MSME Invoice Management Dashboard

A production-ready React.js + Tailwind CSS dashboard built as part of the QistonPe Front-End Developer Intern Assignment. 
The application helps MSME business owners track invoices, payments, overdue amounts, and cash flow efficiently.


🔗 Deployed URL:  
[https://effortless-pie-fee076.netlify.app/](https://effortless-pie-fee076.netlify.app/)

---------------------------------------------------------------------------------------------------------

Tech Stack

   React.js (Vite)
   Tailwind CSS 4.0
   JavaScript (ES6+)
   LocalStorage for persistence
   Netlify for deployment (Recommended)

---------------------------------------------------------------------------------------------------------

Setup & Run Locally

 1️ Clone the Repository
    bash
    git clone https://github.com/bhushanchavan13/msme-invoice-dashboard.git
    cd msme-invoice-dashboard


 2️ Install Dependencies
    bash
    npm install


 3️ Run the Development Server
    bash
    npm run dev
    The app will be available at: `http://localhost:5173`

 4️ Build for Production
    bash
    npm run build

---------------------------------------------------------------------------------------------------------
Features Implemented

 1️ Invoice List View
   Displays invoices with:
       Invoice Number
       Customer Name
       Invoice Date
       Due Date
       Amount
       Status (Paid / Pending / Overdue)
       Days Info (Due in / Overdue by / Paid early-late)
   Search by invoice number or customer name
   Filter by status (All, Paid, Pending, Overdue)
   Sort by amount, invoice date, due date
   Pagination (10 items per page) for performance


---------------------------------------------------------------------------------------------------------
 2️ Summary Cards (Real-time)
   Total Outstanding (Pending + Overdue)
   Total Overdue
   Total Paid (Current Month)
   Average Payment Delay (for paid invoices)

✔ All summary cards update instantly when data changes.  
✔ Calculations respect active filters and search.

---------------------------------------------------------------------------------------------------------

 3️ Add New Invoice
   Modern Modal-based form.
   Required fields: Customer Name, Amount (>0), Invoice Date, Payment Terms.
   Auto-calculates Due Date based on selected terms (7, 15, 30, 45, 60 days).

---------------------------------------------------------------------------------------------------------

 4️ Payment Lifecycle
   Mark pending or overdue invoices as Paid with a single click.
   Captures payment date (defaults to today).
   Summaries and status update instantly without page reload.

---------------------------------------------------------------------------------------------------------

Business Logic & Approach

 🔹 Dynamic Status Calculation
Invoice status is derived, not stored:
   Paid → `paymentDate` exists.
   Overdue → No `paymentDate` AND `dueDate < today`.
   Pending → No `paymentDate` AND `dueDate >= today`.

This ensures the UI always reflects the current point in time.

 🔹 Intelligent Days Logic
   Pending: "Due in X days"
   Overdue: "Overdue by X days"
   Paid: "Paid X days early/late"

---------------------------------------------------------------------------------------------------------

Performance Optimizations
   `useMemo`: Used for complex sorting, filtering, and summary calculations to prevent expensive re-computations on every render.
   `useCallback`: Optimized event handlers passed to child components (`InvoiceRow`, `Filters`).
   Pagination: Smoothly handles 500+ invoices by slicing data in memory.
   Clean Architecture: Separation of concerns between utilities (`invoiceUtils.js`), data (`mockData.js`), and UI components.

---------------------------------------------------------------------------------------------------------

Data Persistence
   Utilizes a custom `useLocalStorage` hook.
   Automatically seeds 10 professional mock invoices on first load.
   Data is preserved across browser restarts and refreshes.

---------------------------------------------------------------------------------------------------------

UI / UX Considerations
   Premium Design: Clean white/slate theme with indigo accents.
   Responsive: Mobile-first grid layouts.
   Color Feedback:
       🟢 Green for Paid
       🟡 Yellow for Pending
       🔴 Red for Overdue
   Empty States: Graceful handling for "No results found" scenarios.

---------------------------------------------------------------------------------------------------------

Trade-offs & Decisions
   Pagination vs Virtualization: Chose pagination as it's more standard for business dashboards and provides better UX for small-to-medium datasets.
   Vanilla State: Used React's built-in state management for maximum performance and minimal bundle size.

---------------------------------------------------------------------------------------------------------

Assignment Requirements Checklist
✔ Correct business logic (Status & Days)
✔ Real-time summary updates
✔ Performance optimizations (`useMemo`, `useCallback`)
✔ Clean folder structure & reusable components
✔ Persistent data storage (`localStorage`)
✔ Form validation & auto-due date
✔ Responsive & Professional UI
