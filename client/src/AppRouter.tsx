import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MyPostsPage } from './pages/MyPostsPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { EditPostPage } from './pages/EditPostPage';
import { NotFoundPage } from './pages/NotFoundPage'; // * Import 404 Page
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';

export const AppRouter = () => {
    return (
        <Routes>
            {/* * Public Routes (Authentication) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* * Protected Routes Group: Requires authentication */}
            <Route element={<ProtectedRoute />}>
                {/* * Nested Layout Route: Applies navigation/header to children */}
                <Route element={<Layout />}>
                    {/* * Post Management Routes */}
                    <Route path="/posts" element={<MyPostsPage />} />
                    <Route path="/posts/create" element={<CreatePostPage />} />
                    <Route path="/posts/edit/:id" element={<EditPostPage />} />
                </Route>
            </Route>

            {/* * Root Redirect: Redirects the base path to the posts page */}
            <Route path="/" element={<Navigate to="/posts" replace />} />
            
            {/* * Catch-all Route: Renders the 404 page for any undefined path */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};