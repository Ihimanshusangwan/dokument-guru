import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {TextInput} from "../components/form/TextInput.tsx";
import {emailRule, minLengthRule, passwordMatchRule, requiredRule} from "../utils/form/validators.ts";
import {PasswordStrength} from "../components/form/singup/PasswordStrength.tsx";

export const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [fieldValidity, setFieldValidity] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = Object.values(fieldValidity).every(Boolean);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            // Append all form fields to the FormData object
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const response = await axios.post(
                'http://127.0.0.1:8000/api/signup',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                console.log('Signup successful!');
                // Consider redirecting here: window.location.href = '/dashboard';
            }
        } catch (error) {
            //no handling
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleValidityChange = (fieldName: string, isValid: boolean) => {
        setFieldValidity(prev => ({
            ...prev,
            [fieldName]: isValid
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all hover:shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Join Dokument Guru
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={(name, value) => setFormData(prev => ({...prev, [name]: value}))}
                        validationRules={[requiredRule, minLengthRule(2)]}
                        onValidityChange={(isValid) => handleValidityChange('name', isValid)}
                        placeholder="John Doe"
                    />

                    <TextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(name, value) => setFormData(prev => ({...prev, [name]: value}))}
                        validationRules={[requiredRule, emailRule]}
                        onValidityChange={(isValid) => handleValidityChange('email', isValid)}
                        placeholder="john@example.com"
                    />

                    <div>
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={(name, value) => setFormData(prev => ({...prev, [name]: value}))}
                            validationRules={[requiredRule, minLengthRule(6)]}
                            onValidityChange={(isValid) => handleValidityChange('password', isValid)}
                            placeholder="••••••••"
                        />
                        <PasswordStrength password={formData.password}/>
                    </div>

                    <TextInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(name, value) => setFormData(prev => ({...prev, [name]: value}))}
                        validationRules={[
                            requiredRule,
                            passwordMatchRule(formData.password)
                        ]}
                        onValidityChange={(isValid) => handleValidityChange('confirmPassword', isValid)}
                        placeholder="••••••••"
                    />

                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold
                            hover:bg-blue-700 transition-colors transform hover:scale-[1.01]
                            active:scale-95 shadow-md ${
                            (!isFormValid || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/signin"
                        className="text-blue-600 hover:underline font-medium hover:text-blue-700"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};