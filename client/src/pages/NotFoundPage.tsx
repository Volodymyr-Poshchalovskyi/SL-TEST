import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        // * Main Layout Container: Centered on the screen
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            {/* * Large 404 Code */}
            <h1 className="text-9xl font-extrabold text-blue-100">404</h1>
            
          
            <div className="absolute">
             
                <p className="text-2xl font-bold text-gray-800">Page Not Found</p>
               
                <p className="text-gray-500 mt-2">The page you were looking for doesn't exist.</p>
            </div>
            
            {/* * Home Button Link  */}
            <Link 
                to="/posts" 
                className="mt-20 px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-1"
            >
                Go to Home
            </Link>
        </div>
    );
};