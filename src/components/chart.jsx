import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import './chart-styles.css';

export default function Chart({id}) {

    const [prices, setPrices] = useState([]);
    const [xvals, setXvals] = useState([]);

    useEffect(() => {
        const getChartData = async () => {
            const xLabels = [];
            const yLabels = [];
            const result = await fetch(`http://localhost:3570/coindata/${id}`);
            const data = await result.json();
            console.log(data);
            for (let price of data) {
                yLabels.push(price[1])
                xLabels.push(new Date(price[0]).toLocaleDateString())
            }
            setXvals(xLabels);
            setPrices(yLabels);


        }
        const getXAxisLabels = async () => {
            const today = new Date();
            const xLabels = [];
            const chartPeriod = 7;
            let count = chartPeriod;
            for (let i = 0; i < chartPeriod; i++) {
                xLabels.push(new Date(today).getDate() - count);
                count = count - 1;
            }
            setXvals(xLabels);
        }
      
        getChartData();
        //getXAxisLabels();
    }, [id])

    console.log(prices.length && Math.min(...prices))

    const data = {
        labels: xvals,
        datasets: [
            {
                label: 'Sales for 2020 (M)',
                data: prices,
                borderColor: ['rgba(42, 187, 155, 1)'],
                backgroundColor: ['rgba(255, 255, 255, 0)']
                
            }
        ]
    }

    const options = {
        title: {
            display: true,
            text: 'Line Chart'
        },
        scales: {
            yAxes: [
                {
                  display: true,
                  ticks: {
                      min: Math.min(...prices) - .02 * Math.min(...prices),
                      max: Math.max(...prices),
                      autoSkip: true,
                      maxTicksLimit: 10
                  }  
                }
            ],
            xAxes: [
                {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 7
                    }
                }
            ]
        }
    }

    return (
        <Line data={data} options={options}/>
    )
}
