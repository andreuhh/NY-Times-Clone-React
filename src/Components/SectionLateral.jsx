import './SectionLateral.scss'

import { useFetch } from '../hooks/useFetch';

export default function SectionLateral() {

    const { data, isPending, error } = useFetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`)
    console.log('MOST POPULAR', data);

    return (

        <div>
            {data?.results && <section className="sectionLateral">
                {data?.results.map((article) => {
                    const {
                        abstract,
                        title,
                        url,
                        id,
                    } = article

                    return (
                        <article key={id}>
                            <h2 className="font-bold">{title}</h2>
                            <h4>{abstract}</h4>
                            <a href={url} target="_blank">Web Reasourse</a>
                        </article>
                    )
                })
                }
            </section>

            }
        </div>




    )
}
