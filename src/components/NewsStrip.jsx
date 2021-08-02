import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/globalState';
import { Link } from 'react-router-dom';
import HeadlineBlock from './HeadlineBlock';
import './component-styles.css';

export default function NewsStrip() {

    const context = useContext(GlobalContext);

    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        const getNewsData = async () => {
            let headlines = [];
            context.then(data => {
                for (let i = 1; i < 4; i++) {
                    headlines.push({title: data.news.results[i].title, author: data.news.results[i].creator, date: data.news.results[i].pubDate, url: data.news.results[i].link })
                }
                setNewsData(headlines.slice(1));
            })  
        }
        getNewsData();
    }, [])

    console.log(newsData.length && newsData)


    return (
        <div className="news-strip">
            <section className="headlines desktop">
                {
                    newsData.length && newsData.map((headline, i) => {
                        return (
                            <HeadlineBlock key={i} title={headline.title} author={headline.author} date={headline.date} url={headline.url} />
                        )
                    })
                }
            </section>
            <section className="headlines mobile">
                {
                    newsData.length && newsData.map((headline, i) => {
                        return (
                            <HeadlineBlock key={i} title={headline.title} author={headline.author} date={headline.date} url={headline.url} />
                        )
                    })
                }
            </section>
            <a href="#" className="all-headlines-link"><small>More Headlines...</small></a>
        </div>
    )
}
