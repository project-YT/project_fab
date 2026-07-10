import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="ILLAM THULIR FABRICS" />
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/cotton-sarees">Cotton Sarees</Link></li>
                    <li><Link to="/silk-sarees">Silk Sarees</Link></li>
                    <li><Link to="/dress-materials">Dress Materials</Link></li>
                    <li><Link to="/chudithars">Chudithars</Link></li>
                    <li><Link to="/kurtis">Kurtis</Link></li>
                    <li><Link to="/mens-wear">Men's Wear</Link></li>
                    <li><Link to="/kids-wear">Kids Wear</Link></li>
                    <li><Link to="/blouse-materials">Blouse Materials</Link></li>
                    <li><Link to="/dhotis">Dhotis</Link></li>
                </ul>
            </nav>
            <div className="tagline">
                <h2>Premium Fabrics for Every Occasion</h2>
            </div>
        </header>
    );
};

export default Header;