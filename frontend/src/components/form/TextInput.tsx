import {ChangeEvent, useEffect, useState} from 'react';

type ValidationRule = {
    condition: (value: string) => boolean;
    message: string;
};

type TextInputProps = {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (name: string, value: string) => void;
    validationRules?: ValidationRule[];
    className?: string;
    colSpan?: number;
    width?: string;
    error?: string;
    onValidityChange?: (isValid: boolean) => void; // New prop
};

export const TextInput = (
    {
        label,
        name,
        type = 'text',
        placeholder = '',
        value,
        onChange,
        validationRules = [],
        className = '',
        colSpan = 1,
        width = 'w-full',
        error = '',
        onValidityChange
    }: TextInputProps) => {
    const [touched, setTouched] = useState(false);
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        if (touched) {
            validateInput(value);
        }
    }, [value, touched]);

    const validateInput = (value: string) => {
        let isValid = true;
        let newError = '';

        for (const rule of validationRules) {
            if (!rule.condition(value)) {
                newError = rule.message;
                isValid = false;
                break; // Stop at first error
            }
        }

        setLocalError(newError);
        if (onValidityChange) {
            onValidityChange(isValid);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(name, e.target.value);
        if (!touched) setTouched(true);
    };

    const handleBlur = () => {
        setTouched(true);
        validateInput(value);
    };

    return (
        <div className={`col-span-${colSpan} ${width} ${className}`}>
            <label className="block text-gray-700 text-sm font-medium mb-1">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`w-full px-4 py-2 rounded-lg border-2 ${
                    (localError || error) ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />

            <div className={`transition-all duration-200 ${
                (localError || error) ? 'h-5 opacity-100' : 'h-0 opacity-0'
            }`}>
                <p className="text-red-500 text-sm pt-1">
                    {(localError || error) ? (localError || error) : '\u00A0'}
                </p>
            </div>
        </div>
    );
};