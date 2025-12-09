import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostItem } from '../components/PostItem';
import { PostSkeleton } from '../components/PostSkeleton';
import { DeleteModal } from '../components/DeleteModal';
import { usePosts } from '../context/PostsContext'; // * Import from Posts Context

export const MyPostsPage = () => {
    // * Destructure state and actions from the context
    const { posts, loading, getPosts, removePost } = usePosts();

    // * State for modal control
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // * Fetch posts on mount using context provider logic
    useEffect(() => {
        getPosts(); 
    }, [getPosts]); // * Dependency array includes getPosts

    // * 1. Open confirmation modal
    const handleInitialDeleteClick = (id: number) => {
        setPostToDelete(id);
        setIsModalOpen(true);
    };

    // * 2. Close modal and reset state
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPostToDelete(null);
    };

    // * 3. Confirm deletion
    const handleConfirmDelete = async () => {
        if (!postToDelete) return;
        setIsDeleting(true);
        // * Perform deletion using context action
        await removePost(postToDelete);
        setIsDeleting(false);
        handleCloseModal();
    };

    return (
        <div>
            {/* * Delete Confirmation Modal Component */}
            <DeleteModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
            />

            {/* * Header and Create Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    {/* Title and Subtitle */}
                    <h1 className="text-3xl font-bold text-gray-800">My Posts</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage your entries</p>
                </div>
                
                {/* * New Post Link */}
                <Link 
                    to="/posts/create" 
                    className="bg-blue-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                    + New Post
                </Link>
            </div>

            {/* * Conditional Rendering */}
            {loading && posts.length === 0 ? ( // * Show skeleton only if initial data is loading and cache is empty
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map(i => <PostSkeleton key={i} />)}
                </div>
            ) : posts.length === 0 ? (
                // * Empty State: No Posts Found
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">You don't have any posts yet</h3>
                    <p className="mt-2 text-gray-500 max-w-sm mx-auto">Start your blog today.</p>
                    <Link to="/posts/create" className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                        Create now &rarr;
                    </Link>
                </div>
            ) : (
                // * Success State: Display Posts
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => (
                        <PostItem 
                            key={post.id} 
                            post={post} 
                            onDelete={handleInitialDeleteClick} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};