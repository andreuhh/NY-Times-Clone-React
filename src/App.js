import React, {useState, useEffect} from 'react';
import SearchForm from './Components/SearchForm';

import './App.scss'

const App = () => {
  const [articles, setArticles] = useState([])
  const [term, setTerm] = useState('everything')
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
    try {
        const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`)
        const articles = await res.json()
        console.log(articles.response.docs);
        setArticles(articles.response.docs);
        setLoading(false);
    } catch(error) {
      console.error(error);
    } 

     try {
      // LATEST NEWS
      const resPprova = await fetch(` https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`)

    // MOST POPULAR
    //   const resPprova = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`)

    // TOP STORIES FROM WORLD
    const resProva = await fetch (`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`)
         const resProvaArray = await resPprova.json()
         console.log('resProva', resProvaArray);
     } catch(error) {
       console.error(error);
     } 
  }
    fetchArticles()
  }, [term])

  return (
    <>

      <div className="showcase">
        <div className="overlay">
          <h1>Viewing articles about...{term}</h1>
          <SearchForm searchText={(text) => setTerm(text)}/>
        </div>
      </div>

      {
        isLoading ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <section>
        {articles.map((article) =>{
          const {
            abstract, 
            headline: {main}, 
            byline:{original}, 
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
        )
      }
    </>
  );
}

export default App;
