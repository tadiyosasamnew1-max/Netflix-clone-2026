import { useState, useEffect } from "react";
import axios from "../../../services/tmdb/axios";
import MovieCard from "../MovieCard/MovieCard";
import "./Row.css";

const Row = ({ title, fetchUrl }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(fetchUrl);
                setMovies(res.data.results);
            } catch (err) {
                console.error("Row fetch failed:", title, err.message);
            }
        }
        if (fetchUrl) fetchData();
    }, [fetchUrl, title]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies
                    .filter((m) => m.poster_path)
                    .map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
            </div>
        </div>
    );
};

export default Row;