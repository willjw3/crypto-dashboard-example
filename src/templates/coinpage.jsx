import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/globalState';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
//import Chart from '../components/chart';
import Chart from '../components/LineChart';
import '../App.css';

export default function CoinPage() {

    const context = useContext(GlobalContext);

    const { id } = useParams();
    
    const [coinData, setCoinData] = useState({});
    const [percentageColor, setPercentageColor] = useState('');

    useEffect(() => {
        const getCoinData = async () => {
            const allCoins = await context;
            for (const coin of allCoins) {
                if (coin.id === id) {
                    setCoinData(coin)
                    setPercentageColor(coin.change.toString()[0] === '-' ? '#FF0000' : '#008000')
                }
            }
        }
        getCoinData()
    }, [context, id])

    console.log(coinData && coinData);

    return (
        <Layout>
            <div className="App">
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
                            <h2>${coinData.market_cap}</h2>
                        </div>  
                    </div>
                    <div className="coin-numbers">
                        <div className="numbers-data">
                            <small>24hr</small>
                            <h2><span style={{color: percentageColor}}>{coinData.change}%</span></h2>
                        </div>  
                    </div>
                </section>
                <hr />
                <section className="coinpage-stats-analysis">
                    <div className="chart">
                        <Chart id={id} />
                    </div>
                    <div dangerouslySetInnerHTML={{__html: `<iframe width="100%" scrolling="yes" allowtransparency="true" frameborder="0" src="https://cryptopanic.com/widgets/news/?bg_color=FFFFFF&amp;font_family=sans&amp;header_bg_color=30343B&amp;header_text_color=FFFFFF&amp;link_color=0091C2&amp;news_feed=recent&amp;text_color=333333&amp;title=Latest%20News" height="350px"></iframe>`}}/>
                </section>
            </div>
        </Layout>
        
    )
}
