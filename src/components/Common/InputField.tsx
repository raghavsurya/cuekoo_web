// src/components/InputField.tsx
import React from "react";

interface InputFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string | null;
}

export default function (inputFieldProps: InputFieldProps) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {inputFieldProps.label}
            </label>
            <input
                type={inputFieldProps.type}
                value={inputFieldProps.value}
                onChange={inputFieldProps.onChange}
                onBlur={inputFieldProps.onBlur}
                placeholder={inputFieldProps.placeholder}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    inputFieldProps.error ? "border-red-500 focus:ring-red-400" : ""
                }`}
            />
            {inputFieldProps.error && (
                <p className="text-sm text-red-600 mt-1">{inputFieldProps.error}</p>
            )}
        </div>
    );
};

