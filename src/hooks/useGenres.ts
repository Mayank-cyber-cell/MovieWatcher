import { useState, useEffect } from 'react';

interface Genre {
  id: number;
  name: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGenres = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('endpoint', '/genre/movie/list');

      const url = `${SUPABASE_URL}/functions/v1/tmdb-proxy?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch genres: ${response.statusText}`);
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