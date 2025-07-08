import React from 'react';

const ColorizeButton = ({ onClick, isDisabled, isLoading }) => {
    return (
        <div className="flex justify-center">
            <button
                onClick={onClick}
                disabled={isDisabled}
                className={`px-8 py-4 text-xl font-bold rounded-lg transition duration-300 ease-in-out transform ${
                    isDisabled
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:scale-105'
                }`}
            >
                {isLoading ? 'Colorizing...' : 'Colorize Image'}
            </button>
        </div>
    );
};

export default ColorizeButton;
