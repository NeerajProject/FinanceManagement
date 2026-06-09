import React from 'react';
import Select from 'react-select';

export default function Many2Many({
    options = [],
    value = [], // Array of selected values
    onChange,
    placeholder = 'Select multiple...',
    isClearable = true,
    isDisabled = false,
    name,
    error
}) {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '42px',
            backgroundColor: '#f9fafb',
            borderColor: error ? '#ef4444' : state.isFocused ? '#3b82f6' : '#e5e7eb',
            boxShadow: state.isFocused ? (error ? '0 0 0 1px #ef4444' : '0 0 0 1px #3b82f6') : 'none',
            '&:hover': {
                borderColor: error ? '#ef4444' : state.isFocused ? '#3b82f6' : '#d1d5db'
            },
            borderRadius: '0.5rem',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
            zIndex: 50
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected 
                ? '#eff6ff'
                : state.isFocused 
                    ? '#f3f4f6'
                    : 'white',
            color: state.isSelected ? '#1d4ed8' : '#374151',
            cursor: 'pointer',
            padding: '8px 12px',
            '&:active': {
                backgroundColor: '#dbeafe'
            }
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#eef2fc', // bg-blue-50
            borderRadius: '0.375rem', // rounded-md
            margin: '2px',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#1d4ed8', // text-blue-700
            fontWeight: '500',
            fontSize: '0.875rem',
            padding: '2px 6px',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#1d4ed8',
            ':hover': {
                backgroundColor: '#dbeafe', // bg-blue-100
                color: '#1e3a8a', // text-blue-900
                borderRadius: '0 0.375rem 0.375rem 0',
            },
        }),
    };

    // React-select expects an array of objects [{value, label}]
    const selectedOptions = options.filter(opt => value.includes(opt.value));

    return (
        <Select
            isMulti
            name={name}
            value={selectedOptions}
            onChange={(selected) => {
                onChange(selected ? selected.map(item => item.value) : []);
            }}
            options={options}
            styles={customStyles}
            placeholder={placeholder}
            isClearable={isClearable}
            isDisabled={isDisabled}
            classNamePrefix="react-select"
        />
    );
}
