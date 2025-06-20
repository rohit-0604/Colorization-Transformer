import React from 'react';

const ImageUploader = ({ onFileChange, selectedFileName }) => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <label
                htmlFor="image-upload"
                className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 text-center"
            >
                Upload Grayscale Image
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files[0])}
                    className="hidden"
                />
            </label>
            {selectedFileName && (
                <p className="text-gray-400 text-sm">Selected: {selectedFileName}</p>
            )}
        </div>
    );
};

export default ImageUploader;
