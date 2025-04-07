import React, {useState} from 'react';
import {FieldType, FormField, FormSection, ServiceForm} from "./types.ts";
import FormPreview from "./FormPreview.tsx";

const ServiceFormBuilder: React.FC = () => {
    const [form, setForm] = useState<ServiceForm>({
        name: '',
        serviceGroup: '',
        sections: []
    });
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [draggingItem, setDraggingItem] = useState<{
        type: 'section' | 'field',
        sectionId?: string,
        id: string
    } | null>(null);

    // Hardcoded service groups as requested
    const serviceGroups = ['Finance', 'HR', 'Operations', 'IT', 'Marketing'];

    // Save form to localStorage
    const saveForm = () => {
        const savedForms = localStorage.getItem('serviceForms') || '{}';
        const forms = JSON.parse(savedForms);

        localStorage.setItem('serviceForms', JSON.stringify({
            ...forms,
            [form.name]: form
        }));
        alert('Form saved successfully!');
    };

    // Section management
    const addSection = () => {
        const newSection: FormSection = {
            id: `section-${Date.now()}`,
            title: `Section ${form.sections.length + 1}`,
            fields: []
        };
        setForm(prev => ({
            ...prev,
            sections: [...prev.sections, newSection]
        }));
        setActiveSection(newSection.id);
    };

    // Field management
    const addField = (sectionId: string, type: FieldType) => {
        setForm(prev => ({
            ...prev,
            sections: prev.sections.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        fields: [
                            ...section.fields,
                            {
                                id: `field-${Date.now()}`,
                                label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
                                type,
                                required: false,
                                placeholder: type === 'checkbox' ? 'Check this box' : '',
                                colSpan: 1
                            }
                        ]
                    }
                    : section
            )
        }));
    };

    // Update field properties
    const updateField = (sectionId: string, fieldId: string, updates: Partial<FormField>) => {
        setForm(prev => ({
            ...prev,
            sections: prev.sections.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        fields: section.fields.map(field =>
                            field.id === fieldId ? {...field, ...updates} : field
                        )
                    }
                    : section
            )
        }));
    };

    // Section operations
    const updateSection = (sectionId: string, updates: Partial<FormSection>) => {
        setForm(prev => ({
            ...prev,
            sections: prev.sections.map(section =>
                section.id === sectionId ? {...section, ...updates} : section
            )
        }));
    };

    const removeSection = (sectionId: string) => {
        setForm(prev => ({
            ...prev,
            sections: prev.sections.filter(section => section.id !== sectionId)
        }));
    };

    const removeField = (sectionId: string, fieldId: string) => {
        setForm(prev => ({
            ...prev,
            sections: prev.sections.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        fields: section.fields.filter(field => field.id !== fieldId)
                    }
                    : section
            )
        }));
    };

    // Drag and drop functionality
    const handleDragStart = (type: 'section' | 'field', sectionId: string | undefined, id: string) => {
        setDraggingItem({type, sectionId, id});
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (targetSectionId: string, targetFieldId?: string) => {
        if (!draggingItem) return;

        if (draggingItem.type === 'section') {
            const draggedIndex = form.sections.findIndex(s => s.id === draggingItem.id);
            const targetIndex = form.sections.findIndex(s => s.id === targetSectionId);

            if (draggedIndex !== -1 && targetIndex !== -1) {
                const newSections = [...form.sections];
                const [removed] = newSections.splice(draggedIndex, 1);
                newSections.splice(targetIndex, 0, removed);
                setForm(prev => ({...prev, sections: newSections}));
            }
        } else if (draggingItem.type === 'field' && draggingItem.sectionId) {
            const section = form.sections.find(s => s.id === draggingItem.sectionId);
            const targetSection = form.sections.find(s => s.id === targetSectionId);

            if (section && targetSection && section.id === targetSection.id) {
                const draggedIndex = section.fields.findIndex(f => f.id === draggingItem.id);
                let targetIndex = targetSection.fields.findIndex(f => f.id === targetFieldId);

                // If dropping at the end
                if (targetIndex === -1) {
                    targetIndex = section.fields.length;
                }

                if (draggedIndex !== -1) {
                    const newFields = [...section.fields];
                    const [removed] = newFields.splice(draggedIndex, 1);
                    newFields.splice(targetIndex, 0, removed);

                    setForm(prev => ({
                        ...prev,
                        sections: prev.sections.map(s =>
                            s.id === section.id ? {...s, fields: newFields} : s
                        )
                    }));
                }
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            {/* Form Builder Panel */}
            <div className="w-full md:w-1/2 p-4 md:p-6 overflow-y-auto">
                <div
                    className="bg-white rounded-xl shadow-lg p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                    <h1 className="text-2xl font-bold mb-6 text-indigo-800">Service Form Builder</h1>

                    {/* Basic Information */}
                    <div className="bg-white p-4 rounded-lg shadow mb-6 border border-indigo-100">
                        <h2 className="text-lg font-semibold mb-4 text-indigo-700">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-indigo-700 mb-1">Service Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border focus:outline-none rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 border-gray-300"
                                    value={form.name}
                                    onChange={(e) => setForm(prev => ({...prev, name: e.target.value}))}
                                    placeholder="Enter service name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-indigo-700 mb-1">Service Group</label>
                                <select
                                    className="w-full p-2 border rounded focus:outline-none rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 border-gray-300"
                                    value={form.serviceGroup}
                                    onChange={(e) => setForm(prev => ({...prev, serviceGroup: e.target.value}))}
                                >
                                    <option value="">Select a group</option>
                                    {serviceGroups.map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-indigo-700">Form Sections</h2>
                            <button
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all"
                                onClick={addSection}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                          clipRule="evenodd"/>
                                </svg>
                                Add Section
                            </button>
                        </div>

                        {form.sections.length === 0 ? (
                            <div
                                className="bg-white p-8 rounded-lg shadow text-center border-2 border-dashed border-indigo-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-indigo-400"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                </svg>
                                <p className="text-gray-500 mt-2">No sections added yet. Click "Add Section" to get
                                    started.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {form.sections.map((section) => (
                                    <div
                                        key={section.id}
                                        className={`bg-white p-4 rounded-lg shadow-lg border ${activeSection === section.id ? 'border-2 border-indigo-500' : 'border-indigo-100'} transition-all`}
                                        draggable
                                        onDragStart={() => handleDragStart('section', undefined, section.id)}
                                        onDragOver={handleDragOver}
                                        onDrop={() => handleDrop(section.id)}
                                        onClick={() => setActiveSection(section.id)}
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <input
                                                type="text"
                                                className="text-lg font-semibold flex-1 p-1 border-b-2 border-indigo-200 focus:border-indigo-500 focus:outline-none"
                                                value={section.title}
                                                onChange={(e) => updateSection(section.id, {title: e.target.value})}
                                                placeholder="Section title"
                                            />
                                            <button
                                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeSection(section.id);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {section.fields.map((field) => (
                                                <div
                                                    key={field.id}
                                                    className={`p-3 border rounded-lg ${field.required ? 'border-l-4 border-l-indigo-500' : 'border-indigo-100'} bg-white`}
                                                    draggable
                                                    onDragStart={() => handleDragStart('field', section.id, field.id)}
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e) => {
                                                        e.stopPropagation();
                                                        handleDrop(section.id, field.id);
                                                    }}
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <input
                                                            type="text"
                                                            className="font-medium flex-1 p-1 border-b-2 border-indigo-100 focus:border-indigo-500 focus:outline-none"
                                                            value={field.label}
                                                            onChange={(e) => updateField(section.id, field.id, {label: e.target.value})}
                                                            placeholder="Field label"
                                                        />
                                                        <div className="flex items-center gap-2 ml-2">
                                                            <select
                                                                className="text-sm p-1 border rounded focus:ring-1 focus:ring-indigo-500 border-gray-300"
                                                                value={field.type}
                                                                onChange={(e) => updateField(section.id, field.id, {type: e.target.value as FieldType})}
                                                            >
                                                                <option value="text">Text</option>
                                                                <option value="number">Number</option>
                                                                <option value="date">Date</option>
                                                                <option value="textarea">Text Area</option>
                                                                <option value="select">Dropdown</option>
                                                                <option value="multiselect">Multi-select</option>
                                                                <option value="radio">Radio Buttons</option>
                                                                <option value="checkbox">Checkbox</option>
                                                                <option value="file">File Upload</option>
                                                            </select>
                                                            <button
                                                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeField(section.id, field.id);
                                                                }}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     className="h-4 w-4" viewBox="0 0 20 20"
                                                                     fill="currentColor">
                                                                    <path fillRule="evenodd"
                                                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                          clipRule="evenodd"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="flex flex-wrap items-center justify-between text-sm gap-2 mt-2">
                                                        <label className="flex items-center gap-1 text-indigo-700">
                                                            <input
                                                                type="checkbox"
                                                                className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                                                checked={field.required}
                                                                onChange={(e) => updateField(section.id, field.id, {required: e.target.checked})}
                                                            />
                                                            Required
                                                        </label>

                                                        <div className="flex items-center gap-2">
                                                            <span className="text-indigo-700">Width:</span>
                                                            <select
                                                                className="border rounded p-1 focus:ring-1 focus:ring-indigo-500 border-gray-300"
                                                                value={field.colSpan || 1}
                                                                onChange={(e) => updateField(section.id, field.id, {colSpan: Number(e.target.value)})}
                                                            >
                                                                <option value="1">1 column</option>
                                                                <option value="2">2 columns</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* Field-specific options */}
                                                    <div className="mt-3 space-y-2">
                                                        <div>
                                                            <label
                                                                className="block text-xs font-medium text-indigo-700 mb-1">Placeholder</label>
                                                            <input
                                                                type="text"
                                                                className="w-full p-1 text-xs border rounded border-gray-300"
                                                                value={field.placeholder || ''}
                                                                onChange={(e) => updateField(section.id, field.id, {placeholder: e.target.value})}
                                                                placeholder="Field placeholder text"
                                                            />
                                                        </div>

                                                        {(field.type === 'select' || field.type === 'multiselect' || field.type === 'radio') && (
                                                            <div>
                                                                <label
                                                                    className="block text-xs font-medium text-indigo-700 mb-1">Options
                                                                    (comma separated)</label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-1 text-xs border rounded border-gray-300"
                                                                    placeholder="Option 1, Option 2, Option 3"
                                                                    value={field.options?.join(', ') || ''}
                                                                    onChange={(e) => updateField(section.id, field.id, {options: e.target.value.split(',').map(opt => opt.trim())})}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <button
                                                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addField(section.id, 'text');
                                                }}
                                            >
                                                Text
                                            </button>
                                            <button
                                                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addField(section.id, 'number');
                                                }}
                                            >
                                                Number
                                            </button>
                                            <button
                                                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addField(section.id, 'date');
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                Date
                                            </button>
                                            <button
                                                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addField(section.id, 'textarea');
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                Text Area
                                            </button>
                                            <button
                                                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addField(section.id, 'select');
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                Dropdown
                                            </button>
                                            <button
                                                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addField(section.id, 'multiselect');
                                                }}
                                            >

                                                Multi-select
                                            </button>
                                            <button
                                                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addField(section.id, 'radio');
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                Radio
                                            </button>
                                            <button
                                                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addField(section.id, 'checkbox');
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                Checkbox
                                            </button>
                                            <button
                                                className="flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addField(section.id, 'file');
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                File
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                        onClick={saveForm}
                    >
                        Save Service Form
                    </button>
                </div>
            </div>

            {/* Preview Panel */}
            <FormPreview form={form}/>
        </div>
    );
};

export default ServiceFormBuilder;