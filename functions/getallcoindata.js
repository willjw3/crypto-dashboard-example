const fetch = require('node-fetch');
require('dotenv').config();

const allDataKey = process.env.ALL_COINS_DATA_KEY;
const newsData = `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_DATA}&q=cryptocurrency&country=us&language=en`;




exports.handler = async function(event, context) {
    async function addCommasToPrice(val) {
        let priceCharacterArray = [];
        const priceStringArray = await val.toString().split('.')[0].split('').reverse().join('');
    
        const priceLastStep = await priceStringArray.length % 3 === 0 ? (priceStringArray.length / 3) - 1 : Math.floor(priceStringArray.length / 3);
    
        for (let j = 0; j <= priceLastStep; j++) {
            priceCharacterArray.push(`${priceStringArray.slice(3*j, 3*j + 3).split('').reverse().join('')},`);
        }
    
        const currentPrice = await val.toString().split('.')[1] !== undefined ? priceCharacterArray.reverse().join('').slice(0, priceCharacterArray.reverse().join('').length - 1) + '.' + val.toString().split('.')[1] : priceCharacterArray.reverse().join('').slice(0, priceCharacterArray.reverse().join('').length - 1);
    
        return currentPrice;
    }
    
    async function addCommasToCap(val) {
        let capCharacterArray = [];
        const marketCapStringArray = await val.toString().split('').reverse().join('');
    
        const lastStep = await marketCapStringArray.length % 3 === 0 ? (marketCapStringArray.length / 3) - 1 : Math.floor(marketCapStringArray.length / 3);
    
        for (let i = 0; i <= lastStep; i++) {
            capCharacterArray.push(`${marketCapStringArray.slice(3*i, 3*i + 3).split('').reverse().join('')},`);
        } 
    
        const marketCap = await capCharacterArray.reverse().join('').slice(0, capCharacterArray.reverse().join('').length - 1);
    
        return marketCap;
    }
    
    
    let coinInfo = [];
    let coinNews = {};
    try {
        const result = await fetch(allDataKey);
        const coinData = await result.json();
        for (let coin of coinData) {
            
            const currentPrice = await addCommasToPrice(coin.current_price);
            const marketCap = await addCommasToCap(coin.market_cap);
           
            coinInfo.push({
                id: coin.id,
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
    try {
        const newsResult = await fetch(newsData);
        coinNews = await newsResult.json();
    } catch (error) {
        console.error(error)
    }

    const data = {coin_data: coinInfo, news: coinNews}
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    }
}