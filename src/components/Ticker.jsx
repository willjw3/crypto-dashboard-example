import React, {useEffect, useState, useContext} from 'react';
import { GlobalContext } from '../context/globalState'
import './component-styles.css';

export default function Ticker() {

    const context = useContext(GlobalContext);
    
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const getCryptoData = async () => {
            context.then(data => {
                console.log(data.news.results)
                setCryptoData(data.coin_data.slice(0, 10))
            })  
        }
        getCryptoData();
    }, [context]);

    return (
        <div className="ticker-wrap">
            <div className="ticker">
                {
                    cryptoData.length && cryptoData.map((coinData, i) => {
                        return (
                            <div key={i} className="ticker__item">
                                {coinData.name} <small style={{fontSize: ".75rem"}}> ({coinData.symbol.toUpperCase()})</small> ${coinData.price}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
