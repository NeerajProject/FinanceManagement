import { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronDown, Check, Filter } from 'lucide-react';

export default function SearchFilter({
    onSearch,
    initialSearch = '',
    initialStatus = '',
    initialTypes = [],
    initialGroupBy = '',
}) {
    const [search, setSearch] = useState(initialSearch);
    const [status, setStatus] = useState(initialStatus || '');
    const [types, setTypes] = useState(
        Array.isArray(initialTypes) 
            ? initialTypes 
            : (initialTypes ? [initialTypes] : [])
    );
    const [groupBy, setGroupBy] = useState(initialGroupBy || '');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Sync state with props when page changes / reloads
    useEffect(() => {
        setSearch(initialSearch);
        setStatus(initialStatus || '');
        setTypes(Array.isArray(initialTypes) ? initialTypes : (initialTypes ? [initialTypes] : []));
        setGroupBy(initialGroupBy || '');
    }, [initialSearch, initialStatus, initialTypes, initialGroupBy]);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchSubmit = (newSearch, newStatus, newTypes, newGroupBy) => {
        onSearch({
            search: newSearch,
            status: newStatus,
            types: newTypes,
            group_by: newGroupBy,
        });
    };

    const toggleType = (typeVal) => {
        let updatedTypes;
        if (types.includes(typeVal)) {
            updatedTypes = types.filter(t => t !== typeVal);
        } else {
            updatedTypes = [...types, typeVal];
        }
        setTypes(updatedTypes);
        handleSearchSubmit(search, status, updatedTypes, groupBy);
    };

    const toggleStatus = (statusVal) => {
        const updatedStatus = status === statusVal ? '' : statusVal;
        setStatus(updatedStatus);
        handleSearchSubmit(search, updatedStatus, types, groupBy);
    };

    const toggleGroupBy = (groupVal) => {
        const updatedGroupBy = groupBy === groupVal ? '' : groupVal;
        setGroupBy(updatedGroupBy);
        handleSearchSubmit(search, status, types, updatedGroupBy);
    };

    const handleClearAll = () => {
        setSearch('');
        setStatus('');
        setTypes([]);
        setGroupBy('');
        onSearch({
            search: '',
            status: '',
            types: [],
            group_by: '',
        });
    };

    const removeTypeBadge = (typeVal) => {
        const updatedTypes = types.filter(t => t !== typeVal);
        setTypes(updatedTypes);
        handleSearchSubmit(search, status, updatedTypes, groupBy);
    };

    const removeStatusBadge = () => {
        setStatus('');
        handleSearchSubmit(search, '', types, groupBy);
    };

    const removeGroupByBadge = () => {
        setGroupBy('');
        handleSearchSubmit(search, status, types, '');
    };

    const typeLabels = {
        asset_cash: 'Cash & Bank',
        asset_receivable: 'Receivable',
        liability_payable: 'Payable',
        asset_current: 'Current Asset',
        expense: 'Expense',
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto mb-6" ref={dropdownRef}>
            {/* Odoo Style Search bar */}
            <div className="flex items-center w-full border border-gray-300 rounded-md bg-white shadow-sm hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition duration-150">
                
                {/* Search Icon */}
                <div className="pl-3 text-gray-400">
                    <Search size={18} />
                </div>

                {/* Filter Pills / Badges inside the Search Bar */}
                <div className="flex flex-wrap gap-1.5 p-1.5 max-w-[70%] items-center">
                    
                    {/* Status Pill */}
                    {status && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                            Status: {status === 'active' ? 'Active' : 'Inactive'}
                            <button onClick={removeStatusBadge} className="hover:text-green-900 focus:outline-none">
                                <X size={12} />
                            </button>
                        </span>
                    )}

                    {/* Type Pills */}
                    {types.map(typeVal => (
                        <span key={typeVal} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            {typeLabels[typeVal] || typeVal}
                            <button onClick={() => removeTypeBadge(typeVal)} className="hover:text-blue-900 focus:outline-none">
                                <X size={12} />
                            </button>
                        </span>
                    ))}

                    {/* Group By Pill */}
                    {groupBy && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                            Group By: {groupBy === 'account_type' ? 'Type' : 'Status'}
                            <button onClick={removeGroupByBadge} className="hover:text-purple-900 focus:outline-none">
                                <X size={12} />
                            </button>
                        </span>
                    )}
                </div>

                {/* Input Text field */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(search, status, types, groupBy)}
                    placeholder={(status || types.length > 0 || groupBy) ? "" : "Search by code or name..."}
                    className="flex-1 min-w-[150px] border-0 focus:ring-0 py-2.5 text-sm bg-transparent outline-none px-2"
                />

                {/* Clear All button */}
                {(search || status || types.length > 0 || groupBy) && (
                    <button 
                        type="button" 
                        onClick={handleClearAll}
                        className="p-1 mr-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                        title="Clear all filters"
                    >
                        <X size={16} />
                    </button>
                )}

                {/* Dropdown Toggle Arrow */}
                <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="p-2.5 border-l border-gray-200 text-gray-500 hover:text-gray-700 focus:outline-none flex items-center gap-1 text-sm font-medium"
                >
                    <Filter size={15} />
                    <ChevronDown size={14} className={`transform transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Floating Dropdown Options Panel */}
            {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-1 duration-150">
                    
                    {/* FILTERS COLUMN */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Filter size={12} /> Filters
                        </h3>
                        <div className="space-y-1">
                            {/* Active */}
                            <button
                                type="button"
                                onClick={() => toggleStatus('active')}
                                className="w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md hover:bg-gray-50 text-left text-gray-700 font-medium"
                            >
                                <span>Active</span>
                                {status === 'active' && <Check size={16} className="text-blue-600" />}
                            </button>
                            {/* Inactive */}
                            <button
                                type="button"
                                onClick={() => toggleStatus('inactive')}
                                className="w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md hover:bg-gray-50 text-left text-gray-700 font-medium"
                            >
                                <span>Inactive</span>
                                {status === 'inactive' && <Check size={16} className="text-blue-600" />}
                            </button>

                            <div className="border-t border-gray-100 my-2 pt-2"></div>

                            {/* Types */}
                            {Object.entries(typeLabels).map(([val, label]) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => toggleType(val)}
                                    className="w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md hover:bg-gray-50 text-left text-gray-700 font-medium"
                                >
                                    <span>{label}</span>
                                    {types.includes(val) && <Check size={16} className="text-blue-600" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* GROUP BY COLUMN */}
                    <div className="border-l border-gray-100 pl-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Group By
                        </h3>
                        <div className="space-y-1">
                            {/* Group by Type */}
                            <button
                                type="button"
                                onClick={() => toggleGroupBy('account_type')}
                                className="w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md hover:bg-gray-50 text-left text-gray-700 font-medium"
                            >
                                <span>Account Type</span>
                                {groupBy === 'account_type' && <Check size={16} className="text-purple-600" />}
                            </button>
                            {/* Group by Status */}
                            <button
                                type="button"
                                onClick={() => toggleGroupBy('is_active')}
                                className="w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md hover:bg-gray-50 text-left text-gray-700 font-medium"
                            >
                                <span>Status</span>
                                {groupBy === 'is_active' && <Check size={16} className="text-purple-600" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}