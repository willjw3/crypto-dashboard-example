
import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/globalState';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import NewsStrip from '../components/NewsStrip';
import '../App.css';

export default function Home() {

    const context = useContext(GlobalContext);
    
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const getCryptoData = async () => {
            context.then(data => {
                console.log(data.news.results)
                setCryptoData(data.coin_data)
            })  
        }
        getCryptoData();
    }, [context])


    return (
        <Layout>
            <div className="App">
                {
                    !cryptoData.length && <><div className="loader"></div><p style={{textAlign: "center"}}>Loading...</p></>
                }
                {   cryptoData.length &&
                    <>
                    <h2 className="main-heading">Crypto News Headlines</h2>
                        <NewsStrip />
                        <h2 className="main-heading">Top 100 Cryptocurrencies</h2>
                        <section className="table-top">
                            <div className="header-row">
                                <h3 className="header-column-name">Rank</h3>
                                <h3 className="header-column-name">Name</h3>
                                <h3 className="header-column-name">Symbol</h3>
                                <h3 className="header-column-name">Price</h3>
                                <h3 className="header-column-name">Market Cap</h3>
                                <h3 className="header-column-name">24h</h3>
                            </div>
                            <div className="header-row-mobile">
                                <h3 className="header-column-name">Name</h3>
                                <h3 className="header-column-name">Price</h3>
                                <h3 className="header-column-name">24h</h3>
                            </div>
                            <hr />
                        </section>
                        
                        {
                            cryptoData.map((coin, i) => {
                                const changePercentageColor = coin.change.toString()[0] === '-' ? '#FF0000' : '#008000';
                                console.log(typeof coin.change)
                                return (
                                    <>
                                    <section key={i} className="table-main">
                                        <Link className="link" to={`/coin/${coin.id}`}>
                                            <div className="coin-row">
                                                <p className="coin-main-elements">{coin.rank}</p>
                                                <div className="coin-main">
                                                    <img className="coin-main-elements" src={coin.imageUrl} alt={coin.name} width="24"/>
                                                    <h4 className="coin-main-elements">{coin.name}</h4>
                                                </div>
                                                <p className="symbol">{coin.symbol}</p>
                                                <p>${coin.price}</p>
                                                <p>${coin.market_cap}</p>
                                                <p> <span style={{color: changePercentageColor}}>{coin.change}%</span></p>
                                            </div>
                                        </Link>
                                        <hr />  
                                    </section> 
                                    <section key={`${i}-mobile`} className="table-main-mobile">
                                    <Link className="link" to={`/coin/${coin.id}`}>
                                        <div className="coin-row-mobile">
                                            <div className="coin-main">
                                                <img className="coin-main-elements" src={coin.imageUrl} alt={coin.name} width="18"/>
                                                <h5 className="coin-main-elements">{coin.name}</h5>
                                                
                                            </div>
                                            <small>${coin.price}</small>
                                            <small> <span style={{color: changePercentageColor}}>{coin.change}%</span></small>
                                        </div>
                                    </Link>
                                    <hr />  
                                </section>
                                </>  
                                )
                            })
                        }
                    </>
                }
                
            </div>
        </Layout>
        
    )
}
