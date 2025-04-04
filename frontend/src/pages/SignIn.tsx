import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {TextInput} from "../components/form/TextInput.tsx";
import {emailRule, minLengthRule, requiredRule} from "../utils/form/validators.ts";

export const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [fieldValidity, setFieldValidity] = useState({
        email: false,
        password: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = Object.values(fieldValidity).every(Boolean);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: formData.email,
                password: formData.password
            });

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                // Optional: Redirect user or update app state
                console.log('Login successful!');
            }
        } catch (error) {
            //do nothing
            console.log(error)
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(name, value) => setFormData(prev => ({...prev, [name]: value}))}
                        validationRules={[requiredRule, emailRule]}
                        onValidityChange={(isValid) => handleValidityChange('email', isValid)}
                    />

                    <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={(name, value) => setFormData(prev => ({...prev, [name]: value}))}
                        validationRules={[requiredRule, minLengthRule(6)]}
                        onValidityChange={(isValid) => handleValidityChange('password', isValid)}
                    />

                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                            hover:bg-blue-700 transition-colors mt-4
                            ${(!isFormValid || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};