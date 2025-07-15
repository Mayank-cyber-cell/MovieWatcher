import React from 'react';
import { Filter } from 'lucide-react';

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  onGenreSelect: (genreId: number | null) => void;
  loading: boolean;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenre,
  onGenreSelect,
  loading,
}) => {
  if (loading || genres.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-24 bg-slate-700 rounded-full animate-pulse flex-shrink-0"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">Filter by Genre</h3>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onGenreSelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${
            selectedGenre === null
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          All Movies
        </button>
        
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreSelect(genre.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${
              selectedGenre === genre.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};