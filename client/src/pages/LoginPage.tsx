import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export const LoginPage = () => {
    // * State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // * State for field validation errors (e.g., empty field)
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    // * State for general authentication error (e.g., incorrect credentials)
    const [authError, setAuthError] = useState(''); 
    
    const { login } = useAuth();
    const navigate = useNavigate();

    // * Client-side input validation logic
    const validate = () => {
        const errors: { email?: string; password?: string } = {};
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.email = "Email is required"; 
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errors.email = "Invalid email format"; 
            isValid = false;
        }

        if (!password) {
            errors.password = "Password is required"; 
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };

    // * Form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');

        if (!validate()) return;

        try {
            // * API call to log in
            const res = await axios.post('/auth/login', { email, password });
            login(res.data.token);
            toast.success('Welcome back!'); 
            navigate('/posts');
        } catch (err: any) {
            // * Extract specific error message or use a default
            const message = err.response?.data?.message || 'Invalid email or password'; 
            setAuthError(message);
            toast.error(message);
        }
    };

    // * Input change handler: updates state and clears relevant errors
    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string, value: string) => {
        setter(value);
        if (fieldErrors[field as keyof typeof fieldErrors]) {
            setFieldErrors(prev => ({ ...prev, [field]: undefined }));
        }
        if (authError) setAuthError('');
    };

    return (
        // * Main Layout Container
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-4">
            {/* * Login Card */}
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    {/* * Title */}
                    <h1 className="text-3xl font-bold text-gray-800">Log In</h1>
                    {/* * Subtitle */}
                    <p className="text-gray-500 mt-2">Welcome to MiniBlog</p>
                </div>

                {/* * Auth Error Display Box */}
                {authError && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700 font-medium">{authError}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* * Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* * Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="text" 
                            className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${
                                fieldErrors.email 
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                            }`}
                            value={email}
                            onChange={e => handleChange(setEmail, 'email', e.target.value)}
                        />
                        {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                    </div>
                    {/* * Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${
                                fieldErrors.password 
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                            }`}
                            value={password}
                            onChange={e => handleChange(setPassword, 'password', e.target.value)}
                        />
                        {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
                    </div>
                    {/* * Submit Button */}
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 mt-2">
                        Log In
                    </button>
                </form>
                {/* * Registration Link */}
                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};