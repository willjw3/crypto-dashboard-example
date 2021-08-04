import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Chart from '../components/LineChart';
import NewsStrip from '../components/NewsStrip';
import '../App.css';

export default function CoinPage() {


    const { id } = useParams();
    
    const [coinData, setCoinData] = useState({});
    const [percentageColor, setPercentageColor] = useState('');
    console.log(id)
    useEffect(() => {
        const getCoinData = async () => {
            
            let url = `/.netlify/functions/getcoindata/?id=${id}`;
            const result = await fetch(url);
            const data = await result.json();
            await setPercentageColor(data.change.toString()[0] === '-' ? '#FF0000' : '#008000');
            await setCoinData(data);
        }
        getCoinData()
    }, [id])

    return (
        <Layout>
            <div className="App">
                <h2 className="main-heading">Crypto News Headlines</h2>
                <NewsStrip />
                <h2 className="main-heading">Coin Data & Info</h2>
                <section className="coinpage-ticker">
                    <div className="coin-general">
                        <div className="coinname">
                            <img className="px5-margin" src={coinData.imageUrl} width="40px" alt={coinData.name}/>
                            <h1 className="px5-margin">{coinData.name}</h1>
                            <button className="pill px5-margin"><span className="symbol">{coinData.symbol}</span></button>
                        </div>
                        <h4 className="centered-heading">Market Cap Rank # {coinData.rank}</h4>
                    </div>
                    <div className="coin-numbers">
                        <div className="numbers-data">
                            <small>{coinData.name} Price (<span className="symbol">{coinData.symbol}</span>)</small>
                            <h2>${coinData.price}</h2>
                        </div>  
                    </div>
                    <div className="coin-numbers">
                        <div className="numbers-data">
                            <small>Market Cap</small>
                            <h2>${coinData.cap}</h2>
                        </div>  
                    </div>
                    <div className="coin-numbers">
                        <div className="numbers-data">
                            <small>24hr</small>
                            <h2><span style={{color: percentageColor}}>{coinData.change}%</span></h2>
                        </div>  
                    </div>
                </section>
                <section className="coinpage-ticker-mobile">
                    <div className="coin-general">
                        <div className="coinname">
                            <img className="px5-margin" src={coinData.imageUrl} width="40px" alt={coinData.name}/>
                            <h1 className="px5-margin">{coinData.name}</h1>
                            <button className="pill px5-margin"><span className="symbol">{coinData.symbol}</span></button>
                        </div>
                        <h4 className="centered-heading">Market Cap Rank # {coinData.rank}</h4>
                    </div>
                    <div className="coin-numbers">
                        <div className="numbers-data">
                            <small>{coinData.name} Price (<span className="symbol">{coinData.symbol}</span>)</small>
                            <h2>${coinData.price}</h2>
                        </div>  
                    </div>
                </section>
                <hr />
                <section className="coinpage-stats-analysis">
                    <div className="chart">
                        <Chart id={id} />
                        <div className="coin-desc-desktop" dangerouslySetInnerHTML={{__html: coinData.desc}} />
                        <div className="under-display">
                            <div className="coinname">
                                <img className="px5-margin" src={coinData.imageUrl} width="40px" alt={coinData.name}/>
                                <h1 className="px5-margin">{coinData.name}</h1>
                                <button className="pill px5-margin"><span className="symbol">{coinData.symbol}</span></button>
                            </div>
                            <hr className="side-display-divider" />
                            <h2>Rank: {coinData.rank}</h2>
                            <h3>Inception: {coinData.inception}</h3>
                            <h3>Hash: {coinData.hash}</h3>
                            <h3>Currency: USD</h3>
                            <h3>{coinData.name} Price: ${coinData.price}</h3>
                            <h3>Price Change <button className="pill px5-margin" style={{backgroundColor: "lightsteelblue"}}><span className="symbol">24h</span></button> <span style={{color: percentageColor}}>{coinData.change}%</span></h3>
                            <h3>Low <button className="pill px5-margin" style={{backgroundColor: "lightsteelblue"}}><span className="symbol">24h</span></button> ${coinData.low}</h3>
                            <h3>High <button className="pill px5-margin" style={{backgroundColor: "lightsteelblue"}}><span className="symbol">24h</span></button> ${coinData.high}</h3>
                            <h3>Market Cap: ${coinData.cap}</h3>
                            <h3>Volume: ${coinData.volume}</h3>
                            <a href={coinData.homepage} target="_blank" rel="noreferrer noopener">{coinData.homepage}</a>
                        </div>
                    </div>
                    <div className="side-display">
                        <div className="coinname">
                            <img className="px5-margin" src={coinData.imageUrl} width="40px" alt={coinData.name}/>
                            <h1 className="px5-margin">{coinData.name}</h1>
                            <button className="pill px5-margin"><span className="symbol">{coinData.symbol}</span></button>
                        </div>
                        <hr className="side-display-divider" />
                        <h2>Rank: {coinData.rank}</h2>
                        <h3>Inception: {coinData.inception}</h3>
                        <h3>Hash: {coinData.hash}</h3>
                        <h3>Currency: USD</h3>
                        <h3>{coinData.name} Price: ${coinData.price}</h3>
                        <h3>Price Change <button className="pill px5-margin" style={{backgroundColor: "lightsteelblue"}}><span className="symbol">24h</span></button> <span style={{color: percentageColor}}>{coinData.change}%</span></h3>
                        <h3>Low <button className="pill px5-margin" style={{backgroundColor: "lightsteelblue"}}><span className="symbol">24h</span></button> ${coinData.low}</h3>
                        <h3>High <button className="pill px5-margin" style={{backgroundColor: "lightsteelblue"}}><span className="symbol">24h</span></button> ${coinData.high}</h3>
                        <h3>Market Cap: ${coinData.cap}</h3>
                        <h3>Volume: ${coinData.volume}</h3>
                        <a href={coinData.homepage} target="_blank" rel="noreferrer noopener">{coinData.homepage}</a>
                    </div>
                </section>
                <div className="coin-desc-mobile" dangerouslySetInnerHTML={{__html: coinData.desc}} />
            </div>
        </Layout>  
    )
}
