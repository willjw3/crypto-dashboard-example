import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/coinspy_logo.png';
import './component-styles.css';

export default function Header() {
    return (
        <div className="header">
            <div className="logo-title">
                <img src={Logo} alt="CoinSpy Logo" width="100px" />
                <h1>CoinSpy</h1>
            </div>
            <ul className="header-links">
                <li>Cryptocurrencies</li>
            </ul>
        </div>
    )
}
