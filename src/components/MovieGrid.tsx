import React from 'react';
import { MovieCard } from './MovieCard';
import { Search, Film } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

interface MovieGridProps {
  movies: Movie[];
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
  onWatchTrailer: (movieId: number) => void;
  loading: boolean;
  searchTerm: string;
  selectedGenre: number | null;
  genres: { id: number; name: string; }[];
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  favorites,
  onToggleFavorite,
  onWatchTrailer,
  loading,
  searchTerm,
  selectedGenre,
  genres,
}) => {
  const getGenreName = (genreId: number) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : '';
  };

  const getDisplayTitle = () => {
    if (searchTerm) {
      return `Search Results for "${searchTerm}"`;
    } else if (selectedGenre) {
      return `${getGenreName(selectedGenre)} Movies`;
    } else {
      return 'Popular Movies';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="aspect-[2/3] bg-slate-700"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-3 bg-slate-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0 && (searchTerm || selectedGenre)) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">0</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">No movies found</h3>
            <p className="text-slate-400">
              {searchTerm 
                ? `No results for "${searchTerm}". Try searching for something else.`
                : `No movies found in ${getGenreName(selectedGenre!)} genre.`
              }
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <span className="text-slate-500">Try:</span>
            {['Avengers', 'Batman', 'Spider-Man', 'Star Wars'].map((suggestion) => (
              <button
                key={suggestion}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Film className="w-6 h-6 text-indigo-400" />
        <h2 className="text-2xl font-bold text-white">
          {getDisplayTitle()}
        </h2>
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium">
          {movies.length} movies
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MovieCard
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              onToggleFavorite={onToggleFavorite}
              onWatchTrailer={onWatchTrailer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};