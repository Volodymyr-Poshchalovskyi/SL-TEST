import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout = () => {
    const { logout } = useAuth();
    const location = useLocation();

    // * Function to determine active link styling based on current path
    const getLinkClass = (path:string) => {
        const baseClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
        return location.pathname === path 
            ? `${baseClass} text-blue-600 bg-blue-50` // * Active: Light blue background
            : `${baseClass} text-gray-500 hover:text-blue-500 hover:bg-gray-50`; // * Default
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* * Navbar */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            {/* * Logo Section */}
                            <Link to="/posts" className="text-2xl font-extrabold tracking-tight text-gray-800 flex items-center gap-1">
                                Mini<span className="text-blue-500">Blog</span>
                                <span className="w-2 h-2 rounded-full bg-red-500 mt-3 ml-0.5"></span>
                            </Link>
                            {/* * Navigation Links */}
                            <div className="hidden md:block ml-10 flex items-baseline space-x-2">
                                <Link to="/posts" className={getLinkClass('/posts')}>
                                    My Posts
                                </Link>
                                <Link to="/posts/create" className={getLinkClass('/posts/create')}>
                                    Create Post
                                </Link>
                            </div>
                        </div>
                        <div>
                            {/* * Logout Button  */}
                            <button 
                                onClick={logout}
                                className="text-gray-500 hover:text-red-500 font-medium text-sm transition-colors px-4 py-2"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* * Main Content Outlet */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};