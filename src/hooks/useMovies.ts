import { useState, useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (searchTerm?: string, genreId?: number | null) => {
    setLoading(true);
    setError(null);

    try {
      if (!API_KEY || API_KEY === 'your_api_key_here') {
        throw new Error('TMDB API key is not configured. Please add your API key to the .env file.');
      }

      let url;

      if (searchTerm) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`;
      } else if (genreId) {
        url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1&with_genres=${genreId}`;
      } else {
        url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid TMDB API key. Please check your .env file.');
        }
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const getTrailerUrl = async (movieId: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch trailer');
      }
      
      const data = await response.json();
      const trailer = data.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      
      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    } catch (err) {
      console.error('Error fetching trailer:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    loading,
    error,
    fetchMovies,
    getTrailerUrl,
  };
};