import React from 'react';
import { Link } from 'react-router-dom';

// * Component Props Definition
interface PostItemProps {
    post: {
        id: number;
        title: string;
        text: string;
        createdAt: string;
    };
    onDelete: (id: number) => void;
}

export const PostItem: React.FC<PostItemProps> = ({ post, onDelete }) => {
    return (
        // * Card Container: Hover effect styles
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
            <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                    {/* * ID Badge */}
                    <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-md font-semibold">
                        #{post.id}
                    </span>
                    {/* * Creation Date */}
                    <span className="text-gray-400 text-xs font-medium">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                            day: 'numeric', month: 'long', year: 'numeric'
                        })}
                    </span>
                </div>
                
                {/* * Post Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h3>
                {/* * Post Content Preview */}
                <p className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap line-clamp-4">
                    {post.text}
                </p>
            </div>
            
            {/* * Footer: Action Buttons */}
            <div className="px-6 py-4 border-t border-gray-50 flex justify-end items-center gap-4 bg-gray-50/50">
                {/* * Edit Link  */}
                <Link 
                    to={`/posts/edit/${post.id}`}
                    className="flex items-center text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                </Link>

                {/* * Delete Button */}
                <button 
                    onClick={() => onDelete(post.id)}
                    className="flex items-center text-gray-400 hover:text-red-500 text-sm font-medium transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    );
};