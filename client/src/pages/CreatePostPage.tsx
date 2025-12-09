import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostForm } from '../components/PostForm';
import { usePosts } from '../context/PostsContext';

export const CreatePostPage = () => {
    // * State for showing loading indicator during submission
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // * Get the post creation function from the context
    const { addPost } = usePosts(); 

    // * Handler for creating a new post
    const handleCreate = async (data: { title: string; text: string }) => {
        setIsLoading(true);
        try {
            // * Call the context action to add the post
            await addPost(data); 
            toast.success('Post created successfully!'); // Success message
            navigate('/posts'); // Redirect to the posts list
        } catch (err: any) {
             // * Handle server-side error during creation
             const message = err.response?.data?.message || 'Failed to create post';
             toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PostForm 
            // * Page title for the form component
            pageTitle="Create New Post"
            // * Submit button label
            buttonLabel="Create Post"
            onSubmit={handleCreate}
            isLoading={isLoading}
            // * No initial data needed for creation
        />
    );
};