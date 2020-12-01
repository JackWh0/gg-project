import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Tmdb from '../Tmdb';
import { Link } from "react-router-dom";

function Home() {
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [trendingList, setTrendingList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();

            let randomChosenFeatured = Math.floor(Math.random() * (list[0].items.results.length - 1));
            let chosenFeatured = list[0].items.results[randomChosenFeatured];

            let trending = list[1].items.results;
            let featuredInfo = await Tmdb.getMovieInfo(chosenFeatured.id);

            setTrendingList(trending);
            setFeaturedMovie(featuredInfo);

            setIsLoading(false);
        }

        loadAll();
    }, []);

    return isLoading ? (<h1>Carregando...</h1>) : (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">
                        <Link to={`/info/${featuredMovie.id}`}>
                            {featuredMovie.title}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="movieRow--body">
                <h1>Clique em um poster para saber mais</h1>
                <div className="movieRow--container">
                    {trendingList.length > 0 && trendingList.map((item, key) => (
                        <div key={key} className="movieRow--item img">
                            <Link to={`/info/${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Home;
