import React from "react";
import {FormField} from "./types.ts";

type Props = {
    field: FormField;
};

const baseInputClass =
    "w-full p-2 border rounded focus:ring-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

const Field: React.FC<Props> = ({field}) => {
    const {type, label, placeholder, required, options, id, colSpan} = field;

    return (
        <div className={colSpan === 2 ? "col-span-2" : ""}>
            <label className="block text-sm font-medium text-indigo-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {type === "text" && (
                <input type="text" className={baseInputClass} required={required} placeholder={placeholder}/>
            )}

            {type === "number" && (
                <input type="number" className={baseInputClass} required={required} placeholder={placeholder}/>
            )}

            {type === "date" && (
                <input type="date" className={baseInputClass} required={required}/>
            )}

            {type === "textarea" && (
                <textarea className={baseInputClass} required={required} placeholder={placeholder} rows={3}/>
            )}

            {type === "select" && (
                <select className={baseInputClass} required={required}>
                    <option value="">{placeholder || "Select an option"}</option>
                    {options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            )}

            {type === "multiselect" && (
                <select multiple className={baseInputClass} required={required}>
                    {options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            )}

            {type === "radio" && options && (
                <div className="space-y-2">
                    {options.map((option) => (
                        <label key={option} className="flex items-center">
                            <input
                                type="radio"
                                name={`radio-${id}`}
                                className="mr-2 text-indigo-600 focus:outline-none focus:ring-indigo-500"
                                required={required}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}

            {type === "checkbox" && (
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2 rounded text-indigo-600 focus:outline-none focus:ring-indigo-500"
                        required={required}
                    />
                    {placeholder || "Check this box"}
                </label>
            )}

            {type === "file" && (
                <div className="border-2 border-dashed border-indigo-200 rounded-lg p-4 text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-auto text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <p className="text-sm text-indigo-600 mt-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPG up to 5MB</p>
                    <input type="file" className="hidden" required={required}/>
                </div>
            )}
        </div>
    );
};

export default Field;
