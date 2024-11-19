import React from 'react';

const ForbiddenPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <div className="text-9xl font-extrabold text-red-500 drop-shadow-lg">403</div>
                <h1 className="mt-4 text-4xl font-bold text-gray-800">
                    Access Forbidden
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    You don’t have permission to access this page.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 px-6 py-3 bg-red-500 text-white text-lg rounded-lg shadow-lg hover:bg-red-600 transition duration-200"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ForbiddenPage;
