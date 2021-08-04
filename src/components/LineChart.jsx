import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './chart-styles.css';

const margin = { top: 80, right: 80, bottom: 80, left: 80},
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

export default function LineChart({id}) {

    const canvas = useRef(null);

    useEffect(() => {
        
        let svg = d3.select(canvas.current);

        const getChartData = async () => {
            const totalData = [];
            const prices = [];
            const result = await fetch(`/.netlify/functions/getchartdata/?id=${id}`);
            const data = await result.json();
            for (let price of data) {
                prices.push(price[1]);
                totalData.push({time: new Date(price[0]), price: price[1]})
            }
            const xScale = d3.scaleTime()
                .domain(d3.extent(totalData, (d) => d.time))
                .range([0, width]);
    
            const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%-m/%d")).ticks(7);    
            
            svg.append("g")
                .call(xAxis)
                .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
                .selectAll("text")
                .style("font-size", "18px")
                .attr("transform", `rotate(-45)`)
                .attr("dx", "-30px")
                .attr("dy", "20px");
                

            const yMin = Math.min(...prices) - .02 * Math.min(...prices),
            yMax = Math.max(...prices) + .02 * Math.max(...prices);

            const yScale = d3.scaleLinear()
                            .domain([yMin, yMax])
                            .range([height, 0]);
    
            const yAxis = d3.axisLeft(yScale).tickFormat(d => '$' + d);
            

            svg.append('g')
                .call(yAxis)
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .selectAll("text")
                .style("font-size", "18px")
            
            svg.append('path')
                .datum(totalData)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x((d) => xScale(d.time) + margin.left)
                    .y((d) => yScale(d.price) + margin.top)
                )
        }

        getChartData();  
    
    }, [id]);

    return (
        <div className="line-chart">
             <svg className="canvas"
                viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`}
                preserveAspectRatio="xMinYMin"
                ref={canvas}
            >
            </svg>
        </div>
    )

    
}
