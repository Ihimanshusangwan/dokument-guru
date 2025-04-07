export type FieldType =
    'text'
    | 'number'
    | 'date'
    | 'select'
    | 'multiselect'
    | 'radio'
    | 'file'
    | 'checkbox'
    | 'textarea';

export interface FormField {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    placeholder?: string;
    options?: string[];
    colSpan?: number;
}

export interface FormSection {
    id: string;
    title: string;
    fields: FormField[];
}

export interface ServiceForm {
    name: string;
    serviceGroup: string;
    sections: FormSection[];
}