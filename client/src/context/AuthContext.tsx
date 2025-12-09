import React, { createContext, useContext, useState, useEffect } from 'react';

// * Define the shape of the authentication context data
interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

// * Create the Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// * Auth Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // * Initialize token state from local storage
    const [token, setToken] = useState<string | null>(window.localStorage.getItem('token'));

    // * Login function: stores token in state and local storage
    const login = (newToken: string) => {
        setToken(newToken);
        window.localStorage.setItem('token', newToken);
    };

    // * Logout function: clears token from state and local storage
    const logout = () => {
        setToken(null);
        window.localStorage.removeItem('token');
    };

    // * Derived state: checks if a token is present
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// * Custom hook for consuming the Auth Context
export const useAuth = () => {
    const context = useContext(AuthContext);
    // * Ensure the hook is used within the Provider
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};