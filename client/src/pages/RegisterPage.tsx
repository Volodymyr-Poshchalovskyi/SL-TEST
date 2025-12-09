import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export const RegisterPage = () => {
    // * State for form inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // * State for client-side validation errors
    const [fieldErrors, setFieldErrors] = useState<{ username?: string; email?: string; password?: string }>({});
    // * State for server-side errors (e.g., email already exists)
    const [serverError, setServerError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    // * Client-side input validation logic
    const validate = () => {
        const errors: { username?: string; email?: string; password?: string } = {};
        let isValid = true;

        // * Username validation
        if (username.trim().length < 3) {
            errors.username = 'Username must be at least 3 characters long';
            isValid = false;
        }

        // * Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email (e.g., user@mail.com)';
            isValid = false;
        }

        // * Password validation
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };

    // * Form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError('');

        if (!validate()) {
            toast.warn('Please check the fields for correct input');
            return;
        }

        try {
            // * API call to register user
            const res = await axios.post('/auth/register', { username, email, password });
            login(res.data.token);
            toast.success('Registration successful!');
            navigate('/posts');
        } catch (err: any) {
            // * Extract server error message or use a default
            const message = err.response?.data?.message || 'Registration failed';
            setServerError(message);
            toast.error(message);
        }
    };

    // * Input change handler: updates state and clears relevant errors
    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string, value: string) => {
        setter(value);
        if (fieldErrors[field as keyof typeof fieldErrors]) {
            setFieldErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        // * Main Layout Container
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-400 p-4">
            {/* * Registration Card */}
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                   
                    <h1 className="text-3xl font-bold text-gray-800">Register</h1>
                 
                    <p className="text-gray-500 mt-2">Create your account</p>
                </div>

                {/* * Server Error Display Box */}
                {serverError && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                        <p className="text-sm text-red-700 font-medium">{serverError}</p>
                    </div>
                )}
                
                {/* * Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* * Username Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input 
                            type="text" 
                            className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all ${
                                fieldErrors.username 
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                            }`}
                            value={username}
                            onChange={e => handleChange(setUsername, 'username', e.target.value)}
                        />
                        {fieldErrors.username && <p className="text-red-500 text-xs mt-1">{fieldErrors.username}</p>}
                    </div>

                    {/* * Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
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

                    {/* * Password Input  */}
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

                    {/* * Submit Button*/}
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 mt-4">
                        Sign Up
                    </button>
                </form>
                {/* * Login Link  */}
                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};