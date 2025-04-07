import React from "react";
import {ServiceForm} from "./types.ts";
import Field from "./Field.tsx";

type PreviewFormProps = {
    form: ServiceForm;
};

const FormPreview: React.FC<PreviewFormProps> = ({form}) => {
    return (
        <div className="w-full md:w-1/2 p-4 md:p-6 bg-gradient-to-b from-indigo-50 to-purple-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                <h2 className="text-2xl font-bold mb-6 text-indigo-800">Form Preview</h2>

                {form.name ? (
                    <div className="space-y-6">
                        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                            <h3 className="text-xl font-semibold text-indigo-700">{form.name}</h3>
                            {form.serviceGroup && (
                                <p className="text-indigo-600">Service Group: {form.serviceGroup}</p>
                            )}
                        </div>

                        {form.sections.length === 0 ? (
                            <EmptyState/>
                        ) : (
                            <div className="space-y-6">
                                {form.sections.map((section) => (
                                    <div key={section.id}
                                         className="border rounded-lg p-4 border-indigo-100 bg-white">
                                        <h4 className="text-lg font-medium mb-4 text-indigo-700">{section.title}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {section.fields.map((field) => (
                                                <Field key={field.id} field={field}/>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {form.sections.length > 0 && (
                            <button
                                className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                Submit
                            </button>
                        )}
                    </div>
                ) : (
                    <EmptyState/>
                )}
            </div>
        </div>
    );
};

const EmptyState = () => (
    <div className="bg-white p-8 rounded-lg shadow text-center border-2 border-dashed border-indigo-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-indigo-400" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        </svg>
        <p className="text-gray-500 mt-2">Enter Service Name to Start Previewing</p>
    </div>
);

export default FormPreview;
