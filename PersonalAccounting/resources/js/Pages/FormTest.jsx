import React, { useState } from 'react';
import LedgerFlowLayout from '@/Layouts/LedgerFlowLayout';
import FormField from '@/Components/Form/FormField';
import Many2One from '@/Components/Form/Many2One';
import Many2Many from '@/Components/Form/Many2Many';
import One2Many from '@/Components/Form/One2Many';
import TextInput from '@/Components/TextInput';

export default function FormTest() {
    // Dummy Data for dropdowns
    const accounts = [
        { value: 1, label: 'Chase Operating' },
        { value: 2, label: 'SVB Deposit' },
        { value: 3, label: 'Petty Cash' },
    ];

    const tags = [
        { value: 1, label: 'Software' },
        { value: 2, label: 'SaaS' },
        { value: 3, label: 'Office Supplies' },
        { value: 4, label: 'Travel' },
        { value: 5, label: 'Utilities' },
    ];

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        account_id: null,
        tag_ids: [],
        lines: [
            { id: 1, description: 'Initial Service Fee', amount: 500 },
        ]
    });

    // Handlers
    const handleOne2ManyAdd = () => {
        setFormData(prev => ({
            ...prev,
            lines: [...prev.lines, { id: Date.now(), description: '', amount: 0 }]
        }));
    };

    const handleOne2ManyRemove = (index) => {
        setFormData(prev => ({
            ...prev,
            lines: prev.lines.filter((_, i) => i !== index)
        }));
    };

    const handleOne2ManyChange = (index, field, value) => {
        setFormData(prev => {
            const newLines = [...prev.lines];
            newLines[index] = { ...newLines[index], [field]: value };
            return { ...prev, lines: newLines };
        });
    };

    // Columns config for One2Many
    const lineColumns = [
        { label: 'Description', field: 'description' },
        { 
            label: 'Amount', 
            field: 'amount',
            render: (row, onChange) => (
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                        type="number"
                        value={row.amount}
                        onChange={(e) => onChange('amount', parseFloat(e.target.value) || 0)}
                        className="w-full text-sm pl-7 pr-3 py-1.5 border-transparent bg-transparent hover:bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md transition-colors"
                    />
                </div>
            )
        }
    ];

    return (
        <LedgerFlowLayout activePath="/form-test">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">New Entry</h1>
                        <p className="text-gray-500 text-sm mt-1">Create a new ledger entry with related records.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                            Discard
                        </button>
                        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                            Save Entry
                        </button>
                    </div>
                </div>

                <div className="bg-white p-8 shadow-sm border border-gray-200 sm:rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        
                        {/* Standard Text Input wrapper */}
                        <FormField label="Entry Title" required className="col-span-full">
                            <TextInput 
                                className="w-full" 
                                placeholder="e.g. Monthly Software Subscriptions"
                                value={formData.title}
                                onChange={e => setFormData(p => ({...p, title: e.target.value}))}
                            />
                        </FormField>

                        {/* Many2One Component */}
                        <FormField label="Operating Account" required>
                            <Many2One 
                                options={accounts}
                                value={formData.account_id}
                                onChange={val => setFormData(p => ({...p, account_id: val}))}
                                placeholder="Select an account..."
                            />
                        </FormField>

                        {/* Many2Many Component */}
                        <FormField label="Tags & Categories">
                            <Many2Many 
                                options={tags}
                                value={formData.tag_ids}
                                onChange={val => setFormData(p => ({...p, tag_ids: val}))}
                                placeholder="Select tags..."
                            />
                        </FormField>

                        {/* One2Many Component */}
                        <div className="col-span-full mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Line Items</h3>
                            <One2Many 
                                columns={lineColumns}
                                data={formData.lines}
                                onAdd={handleOne2ManyAdd}
                                onRemove={handleOne2ManyRemove}
                                onChange={handleOne2ManyChange}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </LedgerFlowLayout>
    );
}
