import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import SmartButton from "@/Components/SmartButton";
import {
    Receipt,
    FileText,
    CreditCard,
    Users
} from "lucide-react";

// Odoo-style Form Field
function FormField({ label, children, error }) {
    return (
        <div className="py-2 border-b border-gray-100 flex items-start gap-2 last:border-0">
            <label className="w-40 shrink-0 pt-1.5 text-sm font-semibold text-gray-600">
                {label}
            </label>
            <div className="flex-1">
                {children}
                {error && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Create({
    account = null,
    parentAccounts = [],
}) {
    const [activeTab, setActiveTab] = useState("general");
    const isEditMode = !!account;

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
    } = useForm({
        code: account?.code || "",
        name: account?.name || "",
        account_type: account?.account_type || "",
        parent_id: account?.parent_id || "",
        currency_code: account?.currency_code || "INR",
        reconcile: account?.reconcile || false,
        is_active: account?.is_active ?? true,
        notes: account?.notes || "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            put(route("accounts.update", account.id));
        } else {
            post(route("accounts.store"));
        }
    };

    const odooInputClass = "w-full border border-gray-300 rounded-sm px-2 py-1 text-sm bg-white focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600";
    const odooCheckboxClass = "h-4 w-4 rounded-sm border-gray-300 text-cyan-600 focus:ring-cyan-500 mt-1.5 cursor-pointer";

    return (
        <AuthenticatedLayout>
            <Head title={isEditMode ? "Edit Account" : "Create Account"} />

            {/* Odoo Top Control Panel */}
            <div className="bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <button
                        onClick={submit}
                        disabled={processing}
                        className="px-3 py-1.5 text-sm font-medium rounded bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50 shadow-sm"
                    >
                        {processing ? "Saving..." : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-3 py-1.5 text-sm font-medium rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                    >
                        Discard
                    </button>
                </div>
                
                <div className="text-sm text-gray-500 font-medium">
                    Accounts / <span className="text-gray-800 font-semibold">{data.code || "New"}</span>
                </div>
            </div>

            {/* Odoo Form View Container */}
            <div className="bg-gray-100 min-h-[calc(100vh-60px)] p-4 md:p-6">
                <div className="max-w-6xl mx-auto">
                    
                    <form onSubmit={submit}>
                        {/* Odoo Form Sheet Target */}
                        <div className="bg-white border border-gray-300 rounded-sm shadow-sm min-h-[500px] relative">
                            
                            {/* 1. Odoo Stat Buttons Area (oe_button_box) - Only show in edit mode */}
                            {isEditMode && (
                                <div className="flex justify-end border-b border-gray-200 divide-x divide-gray-200 bg-gray-50/50 rounded-t-sm overflow-hidden">
                                    <SmartButton
                                        title="Journal Items"
                                        count={152}
                                        icon={<Receipt size={18} className="text-gray-500" />}
                                        onClick={() => console.log("Journal")}
                                    />
                                    <SmartButton
                                        title="Invoices"
                                        count={12}
                                        icon={<FileText size={18} className="text-gray-500" />}
                                        onClick={() => console.log("Invoices")}
                                    />
                                    <SmartButton
                                        title="Payments"
                                        count={8}
                                        icon={<CreditCard size={18} className="text-gray-500" />}
                                        onClick={() => console.log("Payments")}
                                    />
                                    <SmartButton
                                        title="Partners"
                                        count={4}
                                        icon={<Users size={18} className="text-gray-500" />}
                                        onClick={() => console.log("Partners")}
                                    />
                                </div>
                            )}

                            {/* Form Content Wrapper (Padding diberikan di sini agar memisahkan box_button) */}
                            <div className="p-6 md:p-8">

                                {/* 2. Odoo Header Title Group */}
                                <div className="mb-6 pb-4 border-b border-gray-100">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                                        Account Title
                                    </label>
                                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        <span className="text-purple-700">{data.code || "New"}</span>
                                        {data.name && <span className="text-gray-400 font-light">/</span>}
                                        <span className="text-gray-700">{data.name}</span>
                                    </h1>
                                </div>

                                {/* 3. Odoo Grid System */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                                    
                                    {/* LEFT COLUMN */}
                                    <div className="space-y-1">
                                        <FormField label="Account Code" error={errors.code}>
                                            <input
                                                type="text"
                                                value={data.code}
                                                onChange={(e) => setData("code", e.target.value)}
                                                className={odooInputClass}
                                                placeholder="e.g. 101000"
                                            />
                                        </FormField>

                                        <FormField label="Account Name" error={errors.name}>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData("name", e.target.value)}
                                                className={odooInputClass}
                                                placeholder="e.g. Current Assets"
                                            />
                                        </FormField>

                                        <FormField label="Account Type" error={errors.account_type}>
                                            <select
                                                value={data.account_type}
                                                onChange={(e) => setData("account_type", e.target.value)}
                                                className={odooInputClass}
                                            >
                                                <option value="">Select Account Type...</option>
                                                <option value="asset_cash">Cash</option>
                                                <option value="asset_receivable">Receivable</option>
                                                <option value="asset_current">Current Asset</option>
                                                <option value="asset_non_current">Non Current Asset</option>
                                                <option value="liability_payable">Payable</option>
                                                <option value="liability_credit_card">Credit Card</option>
                                                <option value="equity">Equity</option>
                                                <option value="income">Income</option>
                                                <option value="expense">Expense</option>
                                                <option value="off_balance">Off Balance</option>
                                            </select>
                                        </FormField>
                                    </div>

                                    {/* RIGHT COLUMN */}
                                    <div className="space-y-1">
                                        <FormField label="Parent Account">
                                            <select
                                                value={data.parent_id}
                                                onChange={(e) => setData("parent_id", e.target.value)}
                                                className={odooInputClass}
                                            >
                                                <option value="">None</option>
                                                {parentAccounts.map((acc) => (
                                                    <option key={acc.id} value={acc.id}>
                                                        {acc.code} - {acc.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormField>

                                        <FormField label="Currency">
                                            <input
                                                type="text"
                                                value={data.currency_code}
                                                onChange={(e) => setData("currency_code", e.target.value)}
                                                className={odooInputClass}
                                            />
                                        </FormField>

                                        <FormField label="Allow Reconcile">
                                            <input
                                                type="checkbox"
                                                checked={data.reconcile}
                                                onChange={(e) => setData("reconcile", e.target.checked)}
                                                className={odooCheckboxClass}
                                            />
                                        </FormField>

                                        <FormField label="Active">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={(e) => setData("is_active", e.target.checked)}
                                                className={odooCheckboxClass}
                                            />
                                        </FormField>
                                    </div>

                                </div>

                                {/* 4. Odoo Notebook / Tabbed Section */}
                                <div className="mt-8">
                                    <div className="border-b border-gray-200 flex gap-4">
                                        {[
                                            { key: "general", label: "General Settings" },
                                            { key: "accounting", label: "Accounting" },
                                            { key: "notes", label: "Internal Notes" },
                                        ].map((tab) => (
                                            <button
                                                key={tab.key}
                                                type="button"
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`px-3 py-2 -mb-px text-sm font-semibold transition border-b-2 ${
                                                    activeTab === tab.key
                                                        ? "border-purple-700 text-purple-700 font-bold"
                                                        : "border-transparent text-gray-500 hover:text-gray-800"
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* TAB CONTENT */}
                                    <div className="bg-white py-4 text-sm text-gray-700">
                                        {activeTab === "general" && (
                                            <div className="text-gray-500 italic">
                                                Configure basic parameters for this account ledger.
                                            </div>
                                        )}

                                        {activeTab === "accounting" && (
                                            <div className="text-gray-500 italic">
                                                Define localized accounting settings and tax mappings.
                                            </div>
                                        )}

                                        {activeTab === "notes" && (
                                            <div>
                                                <textarea
                                                    rows={4}
                                                    value={data.notes}
                                                    onChange={(e) => setData("notes", e.target.value)}
                                                    placeholder="Write internal notes here..."
                                                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-purple-700"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div> {/* End of Form Content Wrapper */}
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}