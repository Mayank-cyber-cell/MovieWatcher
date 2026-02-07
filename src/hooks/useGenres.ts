import { useState, useEffect } from 'react';

interface Genre {
  id: number;
  name: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const validateConfig = (): boolean => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase configuration', {
      hasUrl: !!SUPABASE_URL,
      hasKey: !!SUPABASE_ANON_KEY,
    });
    return false;
  }
  return true;
};

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGenres = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!validateConfig()) {
        throw new Error('Application configuration error. Please refresh the page.');
      }

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
        const errorText = await response.text().catch(() => response.statusText);
        console.error(`Genres API Error - Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch genres (${response.status})`);
      }

      const data = await response.json();
      setGenres(data.genres || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching genres';
      console.error('Genre fetch error:', errorMessage);
      setError(errorMessage);
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