import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/cs_logo.png';

export default function Footer() {
    return (
        <div className="footer">
           <div className="logo-title">
                <img className="main-logo" src={Logo} alt="CoinSpy Logo" width="50px" />
                <Link className="link" to="/"><h1>CoinSpy</h1></Link>
            </div>
            <div className="footer-info">
                <p>powered by <a href="https://www.coingecko.com/en">CoinGecko</a></p>
                <p>&copy; {new Date().getFullYear()}, <a href="https://github.com/willjw3">willjw3</a></p>
            </div>
        </div>
    )
}
