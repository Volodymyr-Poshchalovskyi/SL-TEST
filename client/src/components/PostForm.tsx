import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// * Component Props Definition
interface PostFormProps {
    initialTitle?: string;
    initialText?: string;
    onSubmit: (data: { title: string; text: string }) => Promise<void>;
    isLoading: boolean;
    pageTitle: string;
    buttonLabel: string;
}

export const PostForm: React.FC<PostFormProps> = ({ 
    initialTitle = '', 
    initialText = '', 
    onSubmit, 
    isLoading, 
    pageTitle, 
    buttonLabel 
}) => {
    const navigate = useNavigate();
    // * State for form inputs and validation errors
    const [title, setTitle] = useState(initialTitle);
    const [text, setText] = useState(initialText);
    const [errors, setErrors] = useState({ title: false, text: false });

    // * Effect to sync local state when initial props change (e.g., when editing data is fetched)
    useEffect(() => {
        if (initialTitle !== undefined) setTitle(initialTitle);
        if (initialText !== undefined) setText(initialText);
    }, [initialTitle, initialText]);

    // * Form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // * Input validation logic
        const newErrors = {
            title: !title.trim(),
            text: !text.trim()
        };

        if (newErrors.title || newErrors.text) {
            setErrors(newErrors);
            toast.warn('Please fill in all required fields'); // Warning message
            return;
        }

        // * Execute parent submission function (Create or Edit)
        await onSubmit({ title, text });
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* * Back Navigation Button */}
            <button 
                onClick={() => navigate('/posts')} 
                className="mb-6 text-sm text-gray-500 hover:text-blue-600 flex items-center transition-colors"
            >
                ← Back to list
            </button>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* * Header Section */}
                <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30">
                    <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>
                </div>
                
                {/* * Main Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* * Title Input Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title of your post" // Placeholder text
                            className={`w-full px-4 py-3 rounded-lg border transition-all outline-none bg-gray-50 focus:bg-white
                                ${errors.title 
                                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}`}
                            value={title}
                            onChange={e => {
                                setTitle(e.target.value);
                                setErrors(p => ({...p, title: false}));
                            }}
                            disabled={isLoading}
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">This field is required</p>} {/* Required field error */}
                    </div>
                    
                    {/* * Textarea Input Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Text <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={8}
                            placeholder="Write here..." // Placeholder text
                            className={`w-full px-4 py-3 rounded-lg border transition-all outline-none resize-none bg-gray-50 focus:bg-white
                                ${errors.text 
                                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}`}
                            value={text}
                            onChange={e => {
                                setText(e.target.value);
                                setErrors(p => ({...p, text: false}));
                            }}
                            disabled={isLoading}
                        />
                        {errors.text && <p className="text-red-500 text-xs mt-1">Post text cannot be empty</p>} {/* Required field error */}
                    </div>

                    {/* * Submit Button */}
                    <div className="flex items-center justify-end pt-4 border-t border-gray-50">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-8 py-2.5 rounded-lg bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20 hover:bg-blue-600 hover:shadow-xl transition-all active:scale-95
                                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Saving...' : buttonLabel} 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};