
const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

const port = 3570 || process.env.PORT; 

const dataKey = process.env.DATA_KEY;

app.get('/', async (req, res) => {
    let cryptoData = [];
    try {
        const result = await fetch(dataKey);
        const coinData = await result.json();
        for (let coin of coinData) {
            let priceCharacterArray = [];
            let capCharacterArray = [];
            const priceStringArray = coin.current_price.toString().split('.')[0].split('').reverse().join('');
            const marketCapStringArray = coin.market_cap.toString().split('').reverse().join('');
            const priceLastStep = priceStringArray.length % 3 === 0 ? (priceStringArray.length / 3) - 1 : Math.floor(priceStringArray.length / 3);
            const lastStep = marketCapStringArray.length % 3 === 0 ? (marketCapStringArray.length / 3) - 1 : Math.floor(marketCapStringArray.length / 3);
            for (let j = 0; j <= priceLastStep; j++) {
                priceCharacterArray.push(`${priceStringArray.slice(3*j, 3*j + 3).split('').reverse().join('')},`)
            }
            for (let i = 0; i <= lastStep; i++) {
                capCharacterArray.push(`${marketCapStringArray.slice(3*i, 3*i + 3).split('').reverse().join('')},`);
            } 
            const currentPrice = coin.current_price.toString().split('.')[1] !== undefined ? priceCharacterArray.reverse().join('').slice(0, priceCharacterArray.reverse().join('').length - 1) + '.' + coin.current_price.toString().split('.')[1] : priceCharacterArray.reverse().join('').slice(0, priceCharacterArray.reverse().join('').length - 1);
            //const currentPrice = priceCharacterArray.reverse().join('').slice(0, priceCharacterArray.reverse().join('').length - 1) + '.' + coin.current_price.toString().split('.')[1];
            const marketCap = capCharacterArray.reverse().join('').slice(0, capCharacterArray.reverse().join('').length - 1);
            console.log({original: coin.current_price, final: currentPrice})
            cryptoData.push({
                symbol: coin.symbol,
                name: coin.name,
                imageUrl: coin.image,
                price: currentPrice,
                market_cap: marketCap,
                rank: coin.market_cap_rank,
                volume: coin.total_volume,
                high: coin.high_24h,
                low: coin.low_24,
                change: coin.price_change_percentage_24h
            })
        }
    } catch (error) {
        console.error(error);
    }
    res.header('Access-Control-Allow-Origin', "*")
    res.json(cryptoData);
    
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})



