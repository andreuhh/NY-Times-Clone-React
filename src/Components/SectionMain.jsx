import './SectionMain.scss'

export default function SectionMain({ articles }) {
    return (
        <section>
            {articles.map((article) => {
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
                    <article key={_id}>
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
            })
            }
        </section>
    )
}
