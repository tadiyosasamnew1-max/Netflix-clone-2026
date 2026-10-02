import { useState, useEffect } from "react";
import axios from "../../services/tmdb/axios";
import requests from "../../services/tmdb/requests";
import { useMovies } from "../../context/MovieContext";
import "./Banner.css";

const IMG_URL = "https://image.tmdb.org/t/p/original";

const truncate = (text, n) =>
    text && text.length > n ? text.slice(0, n - 1) + "…" : text;

const Banner = () => {
    const [movie, setMovie] = useState(null);
    const { openMovie } = useMovies();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(requests.fetchNetflixOriginals);
                const list = res.data.results.filter((m) => m.backdrop_path);
                setMovie(list[Math.floor(Math.random() * list.length)]);
            } catch (err) {
                console.error("Banner fetch failed:", err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <header
            className="banner"
            style={{
                backgroundImage: movie ? `url(${IMG_URL}${movie.backdrop_path})` : "none",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button" onClick={() => movie && openMovie(movie)}>Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <p className="banner__description">{truncate(movie?.overview, 150)}</p>
            </div>
            <div className="banner__fadeBottom" />
        </header>
    );
};

export default Banner;