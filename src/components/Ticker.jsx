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

    console.log(cryptoData.length && cryptoData)

    return (
        <div className="ticker-wrap">
            <div className="ticker">
                {
                    cryptoData.length && cryptoData.map((coinData, i) => {
                        return (
                            <div className="ticker__item">
                                {coinData.name} ({coinData.symbol.toUpperCase()}) ${coinData.price}
                            </div>
                        )
                    })
                }
            {/* <div className="ticker__item">Letterpress chambray brunch.</div>
            <div className="ticker__item">Vice mlkshk crucifix beard chillwave meditation hoodie asymmetrical Helvetica.</div>
            <div className="ticker__item">Ugh PBR&B kale chips Echo Park.</div>
            <div className="ticker__item">Gluten-free mumblecore chambray mixtape food truck. </div> */}
            </div>
        </div>
    )
}
