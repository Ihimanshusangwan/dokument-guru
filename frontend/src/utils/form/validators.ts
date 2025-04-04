export const requiredRule = {
    condition: (value: string) => value.trim().length > 0,
    message: 'This field is required'
};

export const emailRule = {
    condition: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Invalid email address'
};

export const minLengthRule = (length: number) => ({
    condition: (value: string) => value.length >= length,
    message: `Must be at least ${length} characters`
});

export const passwordMatchRule = (compareValue: string) => ({
    condition: (value: string) => value === compareValue,
    message: 'Passwords do not match'
});