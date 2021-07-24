
import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/globalState';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import '../App.css';

export default function Home() {

    const context = useContext(GlobalContext);
    
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const getCryptoData = async () => {
            context.then(data => {
                setCryptoData(data)
            })  
        }
        getCryptoData();
    }, [context])

    //console.log(cryptoData.length && cryptoData)

    return (
        <Layout>
            <div className="App">
                <section className="table-top">
                    <div className="header-row">
                        <h3 className="header-column-name">Rank</h3>
                        <h3 className="header-column-name">Name</h3>
                        <h3 className="header-column-name">Symbol</h3>
                        <h3 className="header-column-name">Price</h3>
                        <h3 className="header-column-name">Market Cap</h3>
                        <h3 className="header-column-name">24h</h3>
                    </div>
                    <hr />
                </section>
                
                {
                    cryptoData.length && cryptoData.map((coin, i) => {
                        const changePercentageColor = coin.change.toString()[0] === '-' ? '#FF0000' : '#008000';
                        console.log(typeof coin.change)
                        return (
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
                        )
                    })
                }
            </div>
        </Layout>
        
    )
}
