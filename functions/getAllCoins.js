const fetch = require('node-fetch');
require('dotenv').config();

const allDataKey = process.env.ALL_COINS_DATA_KEY;
const individualDataKey = process.env.INDIVIDUAL_COIN_DATA;
const newsData = `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_DATA}&q=cryptocurrency&country=us&language=en`;

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