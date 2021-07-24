import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/globalState';
import { useParams } from 'react-router-dom';

export default function CoinPage() {

    const context = useContext(GlobalContext);

    const { id } = useParams();
    console.log(id);
    const [coinData, setCoinData] = useState({});

    useEffect(() => {
        // const getCoinData = async () => {
        //     let url = `http://localhost:3570/coindata/${id}`;
        //     console.log(url)
        //     const result = await fetch(`http://localhost:3570/coindata/${id}`);
        //     const data = await result.json();
        //     console.log(data)
        //     setCoinData(data.message)
            
        // }
        // getCoinData();
        const getCoinData = async () => {
            const allCoins = await context;
            for (const coin of allCoins) {
                if (coin.id === id) {
                    setCoinData(coin)
                }
            }
        }
        getCoinData(coinData.id === id && coinData)
    }, [])

    console.log(coinData && coinData);

    return (
        <div>
            <h1>Template Page</h1>
            
        </div>
    )
}
