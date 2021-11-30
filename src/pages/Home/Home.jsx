import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';

import SearchForm from '../../Components/SearchForm';
import SectionMain from '../../Components/SectionMain';
import SectionLateral from '../../Components/SectionLateral';

import './Home.scss'

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

            <div className="newsCont">
                {error && <p className="error">{error}</p>}
                {isPending && <p className="loading text-center">Loading...</p>}
                <div className="mainAndLateralCont">
                    {data?.response?.docs && <SectionMain articles={data?.response?.docs} />}
                    <SectionLateral />
                </div>
            </div>
        </div>
    )
}
