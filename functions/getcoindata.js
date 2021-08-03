const fetch = require('node-fetch');
require('dotenv').config();

const individualDataKey = process.env.INDIVIDUAL_COIN_DATA;


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

    async function addCommasToLow_high_volume(val) {

        let characterArray = [];
      
        const reverseStringArray = await val.toString().split('.')[0].split('').reverse().join('');
    
        const lastStep = await reverseStringArray.length % 3 === 0 ? (reverseStringArray.length / 3) - 1 : Math.floor(reverseStringArray.length / 3);
    
        for (let i = 0; i <= lastStep; i++) {
            characterArray.push(`${reverseStringArray.slice(3*i, 3*i + 3).split('').reverse().join('')},`);
        } 
    
    
        const coinDataVal = await val.toString().split('.')[1] !== undefined ? characterArray.reverse().join('').slice(0, characterArray.reverse().join('').length - 1) + '.' + val.toString().split('.')[1] : characterArray.reverse().join('').slice(0, characterArray.reverse().join('').length - 1);
    
        return coinDataVal;
    
    }
    
    let urlCoin = `${individualDataKey}${event.queryStringParameters.id}`;
    let coinData = {};
    try {
        const result1 = await fetch(urlCoin);
        let data = await result1.json();
        const currentPrice = await addCommasToPrice(data.market_data.current_price.usd);

        const marketCap = await addCommasToCap(data.market_data.market_cap.usd);

        const low = await addCommasToLow_high_volume(data.market_data.low_24h.usd);

        const high = await addCommasToLow_high_volume(data.market_data.high_24h.usd);

        const volume = await addCommasToLow_high_volume(data.market_data.total_volume.usd);

        coinData = {
            id: data.id,
            symbol: data.symbol,
            name: data.name,
            hash: data.hashing_algorithm,
            name_Eng: data.localization.en,
            name_Jpn: data.localization.ja,
            name_Rus: data.localization.ru,
            name_Chn: data.localization.zh,
            name_Kor: data.localization.ko,
            desc: data.description.en,
            homepage: data.links.homepage,
            twitter: data.links.twitter_screen_name,
            imageUrl: data.image.large,
            inception: new Date(data.genesis_date).toLocaleDateString(),
            rank: data.market_cap_rank,
            price: currentPrice,
            change: data.market_data.price_change_percentage_24h,
            cap: marketCap,
            low: low,
            high: high,
            volume: volume
        }

    } catch (error) {
        console.error(error)
    }
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(coinData)
    }
}