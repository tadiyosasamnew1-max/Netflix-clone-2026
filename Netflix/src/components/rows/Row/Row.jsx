import React, { useState, useEffect } from 'react';
import axios from '../../../services/tmdb/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
                return request;
            } catch (error) {
                console.log('Error fetching row data:', error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    // የ YouTube Player ስፋትና ቁመት ማስተካከያ
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    // ፊልም ሲነካ Trailer ፈልጎ የሚያጫውት Function
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl(''); // ክፍት ከሆነ ለመዝጋት
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log('Trailer not found:', error));
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies?.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                                    }`}
                                alt={movie.name || movie.title}
                            />
                        )
                )}
            </div>

            {/* Trailer ሲገኝ የ YouTube Player እዚህ ይከፈታል */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default Row;