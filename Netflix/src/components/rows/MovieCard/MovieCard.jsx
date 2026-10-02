import { useMovies } from "../../../context/MovieContext";
import "./MovieCard.css";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
    const { isInList, toggleList, openMovie } = useMovies();
    const saved = isInList(movie.id);

    return (
        <div className="card">
            <img
                className="card__img"
                src={`${IMG_URL}${movie.poster_path}`}
                alt={movie.title || movie.name}
                onClick={() => openMovie(movie)}
            />
            <button
                className={`card__btn ${saved ? "card__btn--on" : ""}`}
                onClick={() => toggleList(movie)}
                aria-label={saved ? "Remove from My List" : "Add to My List"}
            >
                {saved ? "✓" : "+"}
            </button>
        </div>
    );
};

export default MovieCard;