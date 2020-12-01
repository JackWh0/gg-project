import React, { useState, useEffect } from 'react';
import Tmdb from '../Tmdb';
import '../styles/Info.css';

function Info({ match: { params: { id } } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const [movieGenres, setMovieGenres] = useState("");

    useEffect(() => {
        const loadAll = async () => {
            let movieInfo = await Tmdb.getMovieInfo(id);
            console.log(movieInfo);
            setMovie(movieInfo);
            let genreList = [];

            for (let i in movieInfo.genres) {
                genreList.push(movieInfo.genres[i].name);
            }

            setMovieGenres(genreList.join(", "));

            setIsLoading(false);
        }

        loadAll();
    }, [id]);

    return isLoading ? (<h1>Carregando...</h1>) : (
        <div id="about">
            <h1>{movie.title}</h1>
            <div className="movie--info">
                <div className="movie--info-poster">
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="movie--info-data">
                    <h3>Titulo Original: {movie.original_title}</h3>
                    <p>★ {movie.vote_average}</p>
                    <div className="overview">
                        <h3>Sinopse</h3>
                        <p>{movie.overview}</p>
                        <small>Gêneros:  {movieGenres} </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;
