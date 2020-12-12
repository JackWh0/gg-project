import React, { useState, useEffect } from 'react';
import Tmdb from '../Tmdb';
import '../styles/navStyle.css';
import '../styles/Info.css';
import Logo from '../assets/ggLogo.png'
import { Link } from "react-router-dom";

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

    return isLoading ? (<img src={Logo} alt="logo" className="logo" id="loading"/>) : (
        <div id="about">
            <section className="navBar">
                <div>
                    <Link to={`/`}>
                        <img src={Logo} alt="logo" className="logo"/>
                    </Link>
                </div>
                    <ul>
                        <li><a href="#">Perfil</a></li>
                        <li><a href="#">Minhas Avaliações</a></li>
                        <li><a href="#">Configurações</a></li>
                    </ul>
            </section>
            <div className="movie--info">
                <div className="movie--info-poster">
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="movie--info-data">
                    <h1>{movie.title}</h1>
                    <h3>Titulo Original: <i>{movie.original_title}</i></h3>
                    <p className="avaliation">★ {movie.vote_average}</p>
                    <div className="overview">
                        <p><strong>Sinopse: </strong>{movie.overview}</p>
                        <small>Gêneros:  {movieGenres} </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;
