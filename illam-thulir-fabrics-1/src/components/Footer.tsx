import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{ backgroundColor: '#f8f8f8', padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: '#4CAF50', fontSize: '24px', margin: '0' }}>ILLAM THULIR FABRICS</h1>
            <p style={{ color: '#888', margin: '5px 0' }}>Premium Fabrics for Every Occasion</p>
            <p style={{ margin: '5px 0' }}>Phone: +91 96292 26235</p>
            <p style={{ margin: '5px 0' }}>WhatsApp: +91 96292 26235</p>
            <p style={{ margin: '5px 0' }}>Email: thulirfabrics28@gmail.com</p>
            <address style={{ margin: '5px 0' }}>
                ILLAM THULIR FABRICS,<br />
                Jallipatti,<br />
                Sulur Taluk,<br />
                Coimbatore – 641671,<br />
                Tamil Nadu, India
            </address>
        </footer>
    );
};

export default Footer;