import axios from 'axios';

// TMDB API Request ለማድረግ የሚያገለግል Base URL
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

export default instance;