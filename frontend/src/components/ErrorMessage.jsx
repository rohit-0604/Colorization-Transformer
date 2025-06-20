import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message) return null; // Don't render if no message

    return (
        <div className="bg-red-500 text-white p-3 rounded-lg text-center shadow-md">
            {message}
        </div>
    );
};

export default ErrorMessage;
