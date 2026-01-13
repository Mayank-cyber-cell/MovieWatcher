import { useState, useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (searchTerm?: string, genreId?: number | null) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (searchTerm) {
        params.append('endpoint', '/search/movie');
        params.append('query', searchTerm);
      } else if (genreId) {
        params.append('endpoint', '/discover/movie');
        params.append('genreId', genreId.toString());
      } else {
        params.append('endpoint', '/discover/movie');
      }

      const url = `${SUPABASE_URL}/functions/v1/tmdb-proxy?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
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
      const params = new URLSearchParams();
      params.append('endpoint', `/movie/${movieId}/videos`);

      const url = `${SUPABASE_URL}/functions/v1/tmdb-proxy?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

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