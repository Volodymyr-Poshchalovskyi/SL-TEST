// * Imports
import axios from 'axios';

// * Axios Instance Configuration
const instance = axios.create({
    baseURL: 'http://localhost:5000', // * Backend API base URL
});

// * Request Interceptor Setup
instance.interceptors.request.use((config) => {
    // * 1. Retrieve JWT token from local storage
    const token = window.localStorage.getItem('token');
    
    // * 2. Attach Authorization header if token exists
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // * Return updated configuration
    return config;
});

// * Export the configured instance
export default instance;