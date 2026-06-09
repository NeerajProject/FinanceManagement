import React from 'react';

export default function FormField({ label, required, error, children, className = '' }) {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            {children}
            {error && (
                <p className="mt-1.5 text-sm text-red-600 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
}
