import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
    const [myList, setMyList] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("myList")) || [];
        } catch {
            return [];
        }
    });
    const [selected, setSelected] = useState(null); // movie shown in the Modal

    useEffect(() => {
        localStorage.setItem("myList", JSON.stringify(myList));
    }, [myList]);

    const isInList = (id) => myList.some((m) => m.id === id);

    const toggleList = (movie) =>
        setMyList((prev) =>
            prev.some((m) => m.id === movie.id)
                ? prev.filter((m) => m.id !== movie.id)
                : [...prev, movie]
        );

    const openMovie = (movie) => setSelected(movie);
    const closeMovie = () => setSelected(null);

    return (
        <MovieContext.Provider
            value={{ myList, isInList, toggleList, selected, openMovie, closeMovie }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export const useMovies = () => useContext(MovieContext);