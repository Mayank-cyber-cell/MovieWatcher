import React, { useState } from 'react';
import { Heart, Star, Play, Calendar } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movieId: number) => void;
  onWatchTrailer: (movieId: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onWatchTrailer,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  
  const { id, title, poster_path, vote_average, overview, release_date } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-400 bg-green-400/20';
    if (rating >= 6) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="group relative bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-slate-700/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30">
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-700 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <button
          onClick={() => onToggleFavorite(id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 ${
            isFavorite 
              ? 'bg-red-500/90 border-red-400 text-white' 
              : 'bg-black/50 border-white/20 text-white hover:bg-red-500/90 hover:border-red-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => onWatchTrailer(id)}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white/90 hover:bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Play className="w-4 h-4" />
            Watch Trailer
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors duration-300">
            {title}
          </h3>
          
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getRatingColor(vote_average)}`}>
            <Star className="w-3 h-3 fill-current" />
            {vote_average.toFixed(1)}
          </div>
        </div>
        
        {release_date && (
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Calendar className="w-3 h-3" />
            {formatDate(release_date)}
          </div>
        )}
        
        <button
          onClick={() => setShowOverview(!showOverview)}
          className="text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-colors duration-300"
        >
          {showOverview ? 'Hide' : 'Show'} Overview
        </button>
        
        {showOverview && (
          <div className="text-slate-300 text-xs leading-relaxed animate-fade-in">
            {overview || 'No overview available.'}
          </div>
        )}
      </div>
    </div>
  );
};