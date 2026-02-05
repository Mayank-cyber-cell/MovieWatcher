import { useState, useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

const getSupabaseUrl = (): string => {
  // Fallback to window object if env var is not available
  const url = import.meta.env.VITE_SUPABASE_URL || (window as any).__VITE_SUPABASE_URL;
  return typeof url === 'string' ? url : '';
};

const getSupabaseAnonKey = (): string => {
  // Fallback to window object if env var is not available
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || (window as any).__VITE_SUPABASE_ANON_KEY;
  return typeof key === 'string' ? key : '';
};

const validateConfig = (): boolean => {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

  if (!url || !key) {
    console.error('Missing Supabase configuration', {
      hasUrl: !!url,
      hasKey: !!key,
      url: url ? 'present' : 'missing',
      key: key ? 'present' : 'missing',
    });
    return false;
  }
  return true;
};

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (searchTerm?: string, genreId?: number | null) => {
    setLoading(true);
    setError(null);

    try {
      if (!validateConfig()) {
        throw new Error('Application configuration error. Please refresh the page.');
      }

      const SUPABASE_URL = getSupabaseUrl();
      const SUPABASE_ANON_KEY = getSupabaseAnonKey();

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
        const errorText = await response.text().catch(() => response.statusText);
        console.error(`API Error - Status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Failed to fetch movies (${response.status})`);
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching movies';
      console.error('Movie fetch error:', errorMessage);
      setError(errorMessage);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const getTrailerUrl = async (movieId: number): Promise<string | null> => {
    try {
      if (!validateConfig()) {
        console.error('Application configuration error');
        return null;
      }

      const SUPABASE_URL = getSupabaseUrl();
      const SUPABASE_ANON_KEY = getSupabaseAnonKey();

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
        console.error(`Trailer fetch failed - Status: ${response.status}`);
        return null;
      }

      const data = await response.json();
      const trailer = data.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );

      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    } catch (err) {
      console.error('Error fetching trailer:', err instanceof Error ? err.message : err);
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