# LedgerFlow — Frontend Structure

> **Stack**: Laravel 11 · Inertia.js · React 18 · Tailwind CSS v3 · Vite 8 · lucide-react · react-select

This document describes the frontend architecture living inside `resources/js/`.

---

## Directory Overview

```
resources/js/
│
├── app.jsx                     # Inertia entrypoint — bootstraps React
├── bootstrap.js                # Axios defaults (X-Requested-With header)
│
├── Data/                       # ★ Shared dummy data & pure utility functions
│   ├── transactions.js         # TRANSACTIONS[] — source of truth for txn pages
│   ├── journalEntries.js       # JOURNAL_ENTRIES[] — source of truth for JE pages
│   └── helpers.js              # formatAmount(), amountColor(), statusStyles()
│
├── Layouts/
│   ├── LedgerFlowLayout.jsx    # ★ Main app shell (Sidebar + Topbar + main slot)
│   ├── AuthenticatedLayout.jsx # Legacy Breeze layout (kept for reference)
│   └── GuestLayout.jsx         # Auth pages (Login / Register)
│
├── Components/
│   ├── Sidebar.jsx             # Fixed left navigation
│   ├── Topbar.jsx              # Top search/action bar
│   │
│   ├── Form/                   # ★ Relational form widgets (ready-to-use)
│   │   ├── FormField.jsx       # Label + error wrapper for any input
│   │   ├── Many2One.jsx        # Single-record select (react-select)
│   │   ├── Many2Many.jsx       # Multi-record tag select (react-select)
│   │   └── One2Many.jsx        # Inline editable child-record table
│   │
│   └── [Breeze defaults]       # TextInput, PrimaryButton, Modal, etc.
│
└── Pages/
    ├── Dashboard.jsx           # /dashboard — overview (auth required)
    ├── FormTest.jsx            # /form-test — UI demo of all form widgets
    │
    ├── Transactions/
    │   ├── Index.jsx           # /transactions — list view
    │   └── Show.jsx            # /transactions/{id} — detail view (read-only)
    │
    ├── JournalEntries/
    │   ├── Index.jsx           # /journal-entries — list view
    │   └── Show.jsx            # /journal-entries/{id} — detail view
    │
    ├── Profile/
    │   └── Edit.jsx            # /profile — user profile settings
    │
    └── Auth/                   # Login, Register, ForgotPassword, etc.
```

---

## Key Conventions

### 1. Layout

All authenticated pages use `LedgerFlowLayout`:

```jsx
import LedgerFlowLayout from '@/Layouts/LedgerFlowLayout';

export default function MyPage() {
    return (
        <LedgerFlowLayout activePath="/my-path">
            {/* page content */}
        </LedgerFlowLayout>
    );
}
```

`activePath` must match one of the paths in `Sidebar.jsx → navItems` to highlight
the correct nav link.

---

### 2. Data Layer (Dummy → Inertia)

All dummy data lives in `resources/js/Data/`. Each file exports a typed array.

**Swapping to real data** is a one-line change per page — replace the import
with the Inertia `usePage` prop:

```js
// Before (dummy)
import { TRANSACTIONS } from '@/Data/transactions';

// After (real backend)
import { usePage } from '@inertiajs/react';
const { transactions } = usePage().props;
```

---

### 3. Form Widgets

All relational widgets live in `Components/Form/`. They are **controlled** —
always pass `value` and `onChange`:

#### Many2One (single record select)
```jsx
import Many2One from '@/Components/Form/Many2One';

<Many2One
    options={[{ value: 1, label: 'Chase Operating' }]}
    value={formData.account_id}          // number | null
    onChange={val => setFormData(p => ({ ...p, account_id: val }))}
    placeholder="Select an account..."
/>
```

#### Many2Many (multi-record tag select)
```jsx
import Many2Many from '@/Components/Form/Many2Many';

<Many2Many
    options={[{ value: 1, label: 'Software' }, { value: 2, label: 'SaaS' }]}
    value={formData.tag_ids}             // number[]
    onChange={vals => setFormData(p => ({ ...p, tag_ids: vals }))}
/>
```

#### One2Many (inline editable child table)
```jsx
import One2Many from '@/Components/Form/One2Many';

const columns = [
    { label: 'Description', field: 'description' },
    { label: 'Amount', field: 'amount' }
];

<One2Many
    columns={columns}
    data={formData.lines}                // object[]
    onAdd={() => { /* append empty row */ }}
    onRemove={(i) => { /* remove row at index i */ }}
    onChange={(i, field, val) => { /* update row i, field */ }}
/>
```

#### FormField (label + error wrapper)
```jsx
import FormField from '@/Components/Form/FormField';

<FormField label="Reference Number" required error={errors.ref}>
    <TextInput name="ref" value={...} onChange={...} className="w-full" />
</FormField>
```

---

### 4. Utility Helpers (`Data/helpers.js`)

| Function | Purpose | Example output |
|---|---|---|
| `formatAmount(n)` | Signed currency string | `-$1,240.00` / `+$15,000.00` |
| `amountColor(n)`  | Tailwind text class | `text-red-600` / `text-green-600` |
| `statusStyles(s)` | `{ text, dot, badge }` classes | based on CLEARED/PENDING/etc. |

---

## Routes (`routes/web.php`)

| Method | URI | Page | Auth |
|---|---|---|---|
| GET | `/` | `Welcome` | No |
| GET | `/dashboard` | `Dashboard` | ✅ Yes |
| GET | `/transactions` | `Transactions/Index` | No |
| GET | `/transactions/{id}` | `Transactions/Show` | No |
| GET | `/journal-entries` | `JournalEntries/Index` | No |
| GET | `/journal-entries/{id}` | `JournalEntries/Show` | No |
| GET | `/profile` | `Profile/Edit` | ✅ Yes |
| GET | `/form-test` | `FormTest` | No (dev only) |

---

## Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start Vite dev server (hot reload)
npm run dev

# Production build
npm run build

# Start Laravel backend
php artisan serve
```

> ℹ️ Always use `--legacy-peer-deps` when installing npm packages in this project
> due to a peer dependency conflict between `@vitejs/plugin-react` and Vite 8.
