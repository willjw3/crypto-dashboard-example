import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/cs_logo.png';
import Ticker from './Ticker';
import './component-styles.css';

export default function Header() {
    return (
        <div className="header">
            <Ticker />
            <div className="logo-title">
                <img className="main-logo" src={Logo} alt="CoinSpy Logo" width="50px" />
                <Link className="link" to="/"><h1><span style={{color: "#F9C50E"}}>Coin</span><span style={{color: "steelblue"}}>Spy</span></h1></Link>
            </div>
        </div>
    )
}
