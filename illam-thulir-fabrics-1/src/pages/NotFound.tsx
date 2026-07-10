import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '48px', color: '#4CAF50' }}>404 - Page Not Found</h1>
            <p style={{ fontSize: '24px', color: '#555' }}>
                Sorry, the page you are looking for does not exist.
            </p>
            <a href="/" style={{ fontSize: '18px', color: '#4CAF50', textDecoration: 'underline' }}>
                Go back to Home
            </a>
        </div>
    );
};

export default NotFound;