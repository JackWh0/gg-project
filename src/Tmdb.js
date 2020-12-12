const API_KEY = 'YOU_API_KEY_HERE';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();

    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                title: 'movies by popularity',
                items: await basicFetch(`/discover/movie?sort_by=popularity.desc&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                title: 'trending movies',
                items: await basicFetch(`/trending/movie/day?language=pt-BR&api_key=${API_KEY}`)
            }
        ];
    },
    getMovieInfo: async (movieId) => {
        let info = {};

        if (movieId) {
            info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        } else {
            info = null;
        }
        return info;
    }
}