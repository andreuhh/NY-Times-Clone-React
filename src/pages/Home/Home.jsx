import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';

import SearchForm from '../../Components/SearchForm';

export default function Home() {
    const [term, setTerm] = useState('everything')

    const { data, isPending, error } = useFetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`)

    console.log(data?.response?.docs);


    return (
        <div>
            <div className="showcase">
                <div className="overlay">
                    <h1>Viewing articles about...{term}</h1>
                    <SearchForm searchText={(text) => setTerm(text)} />
                </div>
            </div>

            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading text-center">Loading...</p>}

            {data?.response?.docs && <section>
                {data?.response?.docs.map((article) => {
                    const {
                        abstract,
                        headline: { main },
                        byline: { original },
                        lead_paragraph,
                        news_desk,
                        section_name,
                        web_url,
                        _id,
                        word_count
                    } = article

                    return (
                        <article key={_id} className="bg-white">
                            <h2 className="font-bold">{main}</h2>
                            <h4>{abstract}</h4>
                            <p>{lead_paragraph}</p>
                            <ul className="my-4">
                                <li>{original}</li>
                                <li><span className="font-bold">News Desk:</span> {news_desk}</li>
                                <li><span className="font-bold">Section Name:</span> {section_name}</li>
                                <li><span className="font-bold">Word count:</span> {word_count}</li>
                            </ul>
                            <a href={web_url} target="_blank">Web Reasourse</a>
                        </article>
                    )
                })}
            </section>

            }
        </div>
    )
}
