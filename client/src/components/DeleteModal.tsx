// * Imports
import React from 'react';

// * Component Props Definition
interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, isLoading }) => {
    // * Conditional rendering check
    if (!isOpen) return null;

    return (
        // * Modal Overlay Container
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            {/* * Backdrop*/}
            <div 
                className="fixed inset-0 bg-black/50 transition-opacity" 
                onClick={onClose} // * Close modal on backdrop click
            ></div>

            {/* * Modal Content Window */}
            <div className="relative bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-hidden">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        {/* * Red Warning Icon Container */}
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            {/* * Warning SVG Icon */}
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        
                        {/* * Modal Text Content */}
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            {/* * Title  */}
                            <h3 className="text-lg font-semibold leading-6 text-gray-900">
                                Delete Post?
                            </h3>
                            {/* * Description */}
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this post? This action cannot be undone, and the data will be permanently lost.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* * Footer: Action Buttons Container */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {/* * Confirm Delete Button*/}
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-colors
                            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                    {/* * Cancel Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};