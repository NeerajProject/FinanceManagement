import React from 'react';
import Select from 'react-select';

export default function Many2One({
    options = [],
    value,
    onChange,
    placeholder = 'Select...',
    isClearable = true,
    isDisabled = false,
    name,
    error
}) {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '42px',
            backgroundColor: '#f9fafb', // bg-gray-50
            borderColor: error ? '#ef4444' : state.isFocused ? '#3b82f6' : '#e5e7eb',
            boxShadow: state.isFocused ? (error ? '0 0 0 1px #ef4444' : '0 0 0 1px #3b82f6') : 'none',
            '&:hover': {
                borderColor: error ? '#ef4444' : state.isFocused ? '#3b82f6' : '#d1d5db'
            },
            borderRadius: '0.5rem', // rounded-lg
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
                ? '#eff6ff' // bg-blue-50
                : state.isFocused 
                    ? '#f3f4f6' // bg-gray-100
                    : 'white',
            color: state.isSelected ? '#1d4ed8' : '#374151', // text-blue-700 / text-gray-700
            cursor: 'pointer',
            padding: '8px 12px',
            '&:active': {
                backgroundColor: '#dbeafe' // bg-blue-100
            }
        })
    };

    return (
        <Select
            name={name}
            value={options.find(opt => opt.value === value) || null}
            onChange={(selectedOption) => {
                onChange(selectedOption ? selectedOption.value : null);
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
