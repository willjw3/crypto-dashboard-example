const fetch = require('node-fetch');
require('dotenv').config();

const individualDataKey = process.env.INDIVIDUAL_COIN_DATA;
console.log(individualDataKey)

exports.handler = async function(event, context) {
    
    let chartUrl = `${individualDataKey}${event.queryStringParameters.id}/market_chart?vs_currency=usd&days=7`;
    let chartData = {};
    try {
        const result = await fetch(chartUrl);
        chartData = await result.json();
    } catch (error) {
        console.error(error);
    }
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(chartData.prices)
    }
}