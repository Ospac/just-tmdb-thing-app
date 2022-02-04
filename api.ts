const API_KEY = "a548c32f19e09973a6a42aa0319f0e9e";
const BASE_URL = "https://api.themoviedb.org/3";

const nowPlaying = () => 
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((res) => res.json());

const upcoming = () => 
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((res) => res.json());

const trending = () => 
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    ).then((res) => res.json());

export const moviesApi = {nowPlaying, upcoming, trending};
