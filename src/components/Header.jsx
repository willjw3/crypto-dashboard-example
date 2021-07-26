import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/coinspy_logo.png';
import './component-styles.css';

export default function Header() {
    return (
        <div className="header">
            <div className="logo-title">
                <img src={Logo} alt="CoinSpy Logo" width="100px" />
                <Link className="link" to="/"><h1>CoinSpy</h1></Link>
            </div>
            <ul className="header-links">
                <li><Link className="link">Cryptocurrencies</Link></li>
            </ul>
        </div>
    )
}
