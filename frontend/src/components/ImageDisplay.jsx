import React from 'react';

const ImageDisplay = ({ title, imageUrl, isLoading, placeholderText }) => {
    return (
        <div className="flex flex-col items-center bg-gray-700 rounded-lg p-4 shadow-inner">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <div className="w-full h-64 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-500">
                {isLoading ? (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-3 text-blue-400">Colorizing...</p>
                    </div>
                ) : imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="max-w-full max-h-full object-contain rounded-md"
                    />
                ) : (
                    <span className="text-gray-400">{placeholderText}</span>
                )}
            </div>
        </div>
    );
};

export default ImageDisplay;
