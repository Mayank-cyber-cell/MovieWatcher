import { useState, useEffect } from 'react';

interface Genre {
  id: number;
  name: string;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGenres = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setGenres([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return {
    genres,
    loading,
    error,
  };
};