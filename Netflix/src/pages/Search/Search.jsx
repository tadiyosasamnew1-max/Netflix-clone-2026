import { useState, useEffect } from "react";
import axios from "../../services/tmdb/axios";
import Header from "../../components/common/Header/Header";
import MovieCard from "../../components/rows/MovieCard/MovieCard";
import "./Search.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setStatus("");
            return;
        }
        // wait 400ms after the last keystroke before calling the API
        const timer = setTimeout(async () => {
            try {
                setStatus("Searching...");
                const res = await axios.get(
                    `/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
                );
                const found = res.data.results.filter((m) => m.poster_path);
                setResults(found);
                setStatus(found.length ? "" : "No results found.");
            } catch (err) {
                setStatus("Search failed. Check your connection and API key.");
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="search">
            <Header />
            <div className="search__body">
                <input
                    className="search__input"
                    type="text"
                    placeholder="Search movies and TV shows"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                {status && <p className="search__status">{status}</p>}
                <div className="search__grid">
                    {results.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;