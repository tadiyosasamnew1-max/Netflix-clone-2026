import { useEffect, useState } from "react";
import axios from "../../../services/tmdb/axios";
import VideoPlayer from "../../player/VideoPlayer";
import { useMovies } from "../../../context/MovieContext";
import "./Modal.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Modal = () => {
    const { selected, closeMovie, isInList, toggleList } = useMovies();
    const [videoKey, setVideoKey] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selected) return;
        const type = selected.media_type || (selected.title ? "movie" : "tv");
        let cancelled = false;

        async function loadTrailer() {
            setLoading(true);
            setVideoKey(null);
            try {
                const res = await axios.get(`/${type}/${selected.id}/videos?api_key=${API_KEY}`);
                const vids = res.data.results.filter((v) => v.site === "YouTube");
                const pick = vids.find((v) => v.type === "Trailer") || vids[0];
                if (!cancelled) setVideoKey(pick ? pick.key : null);
            } catch (err) {
                console.error("Trailer fetch failed:", err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        loadTrailer();

        const onKey = (e) => e.key === "Escape" && closeMovie();
        window.addEventListener("keydown", onKey);
        return () => {
            cancelled = true;
            window.removeEventListener("keydown", onKey);
        };
    }, [selected, closeMovie]);

    if (!selected) return null;

    const name = selected.title || selected.name || selected.original_name;
    const year = (selected.release_date || selected.first_air_date || "").slice(0, 4);
    const saved = isInList(selected.id);

    return (
        <div className="modal" onClick={closeMovie}>
            <div className="modal__box" onClick={(e) => e.stopPropagation()}>
                <button className="modal__close" onClick={closeMovie} aria-label="Close">×</button>
                {loading ? (
                    <p className="modal__loading">Loading trailer...</p>
                ) : (
                    <VideoPlayer videoKey={videoKey} title={name} />
                )}
                <div className="modal__info">
                    <h2>{name}</h2>
                    <p className="modal__meta">
                        {year && <span>{year}</span>}
                        {selected.vote_average ? <span>★ {selected.vote_average.toFixed(1)}</span> : null}
                    </p>
                    <p className="modal__overview">{selected.overview || "No description available."}</p>
                    <button className="modal__list" onClick={() => toggleList(selected)}>
                        {saved ? "✓ In My List" : "+ My List"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;