import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader.jsx';
import ImageDisplay from './components/ImageDisplay.jsx';
import ColorizeButton from './components/ColorizeButton.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

const App = () => {

    const [grayscaleImage, setGrayscaleImage] = useState(null);
    const [colorizedImage, setColorizedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (file) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file (e.g., .png, .jpg, .jpeg).');
                setGrayscaleImage(null);
                setColorizedImage(null);
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setGrayscaleImage(reader.result);
                setColorizedImage(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        } else {
            setGrayscaleImage(null);
            setColorizedImage(null);
            setSelectedFile(null);
            setError(null);
        }
    };

    const handleColorize = async () => {
        if (!selectedFile) {
            setError('Please upload an image first.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            // Make a POST request to the backend colorization endpoint
            const response = await fetch('http://localhost:5000/colorize', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to colorize image.');
            }

            const data = await response.json();
            if (data.colorized_image) {
                setColorizedImage(`data:image/png;base64,${data.colorized_image}`);
            } else {
                setError('No colorized image received from the server.');
            }
        } catch (err) {
            console.error('Error during colorization:', err);
            setError(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white font-inter flex flex-col items-center justify-center p-4">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center drop-shadow-lg">
                Image Colorization App
            </h1>

            <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 space-y-6">
                {/* Image Uploader Component */}
                <ImageUploader onFileChange={handleFileChange} selectedFileName={selectedFile?.name} />

                {/* Error Message Component */}
                <ErrorMessage message={error} />

                {/* Image Display Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Grayscale Image Preview Display */}
                    <ImageDisplay
                        title="Original Grayscale"
                        imageUrl={grayscaleImage}
                        placeholderText="No image uploaded"
                    />

                    {/* Colorized Image Output Display */}
                    <ImageDisplay
                        title="Colorized Output"
                        imageUrl={colorizedImage}
                        isLoading={isLoading}
                        placeholderText="Colorized image will appear here"
                    />
                </div>

                {/* Colorize Button Component */}
                <ColorizeButton
                    onClick={handleColorize}
                    isDisabled={!selectedFile || isLoading}
                    isLoading={isLoading}
                />
            </div>

            <footer className="mt-10 text-gray-400 text-sm text-center">
                <p>&copy; 2025 Image Colorization App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
