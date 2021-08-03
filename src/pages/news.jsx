import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/globalState';
import Layout from '../components/Layout';
import HeadlineBlock from '../components/HeadlineBlock';
import '../App.css'

export default function News() {

    const context = useContext(GlobalContext);

    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        const getNewsData = async () => {
            let headlines = [];
            context.then(data => {
                for (let i = 1; i < data.news.results.length; i++) {
                    headlines.push({title: data.news.results[i].title, author: data.news.results[i].creator, date: data.news.results[i].pubDate, url: data.news.results[i].link })
                }
                setNewsData(headlines.slice(1));
            })  
        }
        getNewsData();
    }, [context])

    return (
        <Layout>
            <div className="App">
                <h2 className="main-heading">Crypto News Headlines</h2>
                {
                    newsData.length && newsData.map((headline, i) => {
                        return (
                            <div key={i} className="headline">
                                <HeadlineBlock title={headline.title} author={headline.author} date={headline.date} url={headline.url} />
                                <hr />
                            </div>
                            
                        )
                    })
                }
            </div>
        </Layout>
    )
}
