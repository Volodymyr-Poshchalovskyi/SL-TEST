import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { PostForm } from '../components/PostForm';
import { usePosts } from '../context/PostsContext';

export const EditPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updatePost, getSinglePost } = usePosts();
    
    // * State for form initial data
    const [initialData, setInitialData] = useState({ title: '', text: '' });
    // * Loading state for fetching data
    const [isFetching, setIsFetching] = useState(true);
    // * Loading state for submission
    const [isSaving, setIsSaving] = useState(false);

    // * Effect to load post data by ID
    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            
            // * Attempt to load post from context cache first
            const cachedPost = getSinglePost(Number(id));
            if (cachedPost) {
                setInitialData({ title: cachedPost.title, text: cachedPost.text });
                setIsFetching(false);
                return;
            }

            // * Fetch data from API if not found in cache
            try {
                const res = await axios.get(`/posts/${id}`);
                setInitialData({ title: res.data.title, text: res.data.text });
            } catch (err) {
                // * Error handling for failed fetch (e.g., post not found)
                toast.error('Failed to find post');
                navigate('/posts');
            } finally {
                setIsFetching(false);
            }
        };
        
        loadData();
    }, [id, navigate, getSinglePost]);

    // * Submission handler for updating the post
    const handleUpdate = async (data: { title: string; text: string }) => {
        if (!id) return;
        setIsSaving(true);
        try {
            await updatePost(Number(id), data);
            toast.success('Post updated successfully!'); // * Success notification
            navigate('/posts');
        } catch (err: any) {
             // * Display server error on update failure
             const message = err.response?.data?.message || 'Failed to update post';
             toast.error(message);
        } finally {
            setIsSaving(false);
        }
    };

    // * Show spinner while fetching initial data
    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // * Render the form with initial data
    return (
        <PostForm 
            pageTitle={`Editing Post #${id}`} 
            buttonLabel="Save Changes" 
            initialTitle={initialData.title}
            initialText={initialData.text}
            onSubmit={handleUpdate}
            isLoading={isSaving}
        />
    );
};