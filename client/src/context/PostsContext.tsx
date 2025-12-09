import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

// * Interface for a single Post object
interface Post {
    id: number;
    title: string;
    text: string;
    createdAt: string;
}

// * Interface for the Posts Context value
interface PostsContextType {
    posts: Post[];
    loading: boolean;
    getPosts: (force?: boolean) => Promise<void>; 
    addPost: (data: { title: string; text: string }) => Promise<void>;
    updatePost: (id: number, data: { title: string; text: string }) => Promise<void>;
    removePost: (id: number) => Promise<void>;
    getSinglePost: (id: number) => Post | undefined;
}

// * Create the context object
const PostsContext = createContext<PostsContextType | null>(null);

// * Posts Provider component managing state and API interactions
export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    // * Flag to track if posts have been fetched at least once
    const [isFetched, setIsFetched] = useState(false);


    // * Fetch all posts for the authenticated user
    const getPosts = useCallback(async (force = false) => {
        // * Skip fetch if data is already present and not forced (caching mechanism)
        if (isFetched && !force) return;

        setLoading(true);
        try {
            const res = await axios.get('/posts');
            
            // * Handle two possible response formats (array directly or wrapped in data object)
            if (Array.isArray(res.data)) {
                setPosts(res.data);
            } else if (res.data.data && Array.isArray(res.data.data)) {
                // Assuming paginated response with a 'data' array
                setPosts(res.data.data);
            } else {
                // * Fallback if response format is unexpected
                console.error("Unknown response format:", res.data);
                setPosts([]);
            }
    
            setIsFetched(true);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load posts');
            setPosts([]); 
        } finally {
            setLoading(false);
        }
    }, [isFetched]);

    // * Create a new post and prepend it to the state
    const addPost = async (data: { title: string; text: string }) => {
        try {
            const res = await axios.post('/posts', data);
            
            // * Prepend new post to the list (optimistic update)
            setPosts(prev => [res.data, ...prev]);
            toast.success('Post created successfully!');
        } catch (err) {
            toast.error('Creation failed');
            throw err; // Allow component to handle errors if necessary
        }
    };

    // * Update an existing post by ID
    const updatePost = async (id: number, data: { title: string; text: string }) => {
        try {
            const res = await axios.put(`/posts/${id}`, data);
           
            // * Map over posts and replace the updated one
            setPosts(prev => prev.map(p => p.id === id ? res.data : p));
            toast.success('Post updated successfully!');
        } catch (err) {
            toast.error('Update failed');
            throw err;
        }
    };

    // * Remove a post by ID
    const removePost = async (id: number) => {
        try {
            await axios.delete(`/posts/${id}`);
          
            // * Filter out the deleted post
            setPosts(prev => prev.filter(p => p.id !== id));
            toast.success('Post deleted successfully');
        } catch (err) {
            toast.error('Deletion failed');
        }
    };

    // * Helper function to retrieve a single post from the local state (cache lookup)
    const getSinglePost = (id: number) => {
        return posts.find(p => p.id === id);
    };

    // * Context Value provision
    return (
        <PostsContext.Provider value={{ posts, loading, getPosts, addPost, updatePost, removePost, getSinglePost }}>
            {children}
        </PostsContext.Provider>
    );
};

// * Custom hook for consuming the Posts Context
export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) throw new Error('usePosts must be used within a PostsProvider');
    return context;
};