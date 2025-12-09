

export const PostSkeleton = () => {
    return (
        // * Main Card Container: Styles for animation and layout
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col h-full animate-pulse">
            <div className="flex justify-between items-start mb-4">
                {/* * ID badge placeholder */}
                <div className="h-5 bg-gray-200 rounded w-16"></div>
                {/* * Date placeholder */}
                <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            
            {/* * Title placeholder */}
            <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
            
            {/* * Text lines placeholders */}
            <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            
            {/* * Actions footer placeholders */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                {/* * Edit button placeholder */}
                <div className="h-5 bg-gray-200 rounded w-20"></div>
                {/* * Delete button placeholder */}
                <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>
        </div>
    );
};