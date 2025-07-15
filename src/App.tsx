import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MovieGrid } from './components/MovieGrid';
import { GenreFilter } from './components/GenreFilter';
import { Footer } from './components/Footer';
import { useMovies } from './hooks/useMovies';
import { useFavorites } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';
import { useGenres } from './hooks/useGenres';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  
  const { movies, loading, fetchMovies, getTrailerUrl } = useMovies();
  const { favorites, toggleFavorite } = useFavorites();
  const { isDarkMode, toggleTheme } = useTheme();
  const { genres, loading: genresLoading } = useGenres();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCurrentSearchTerm(searchTerm.trim());
      setSelectedGenre(null); // Clear genre filter when searching
      fetchMovies(searchTerm.trim());
    } else {
      setCurrentSearchTerm('');
      setSelectedGenre(null);
      fetchMovies();
    }
  };

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setCurrentSearchTerm(''); // Clear search when filtering by genre
    setSearchTerm('');
    fetchMovies(undefined, genreId);
  };

  const handleWatchTrailer = async (movieId: number) => {
    const trailerUrl = await getTrailerUrl(movieId);
    if (trailerUrl) {
      window.open(trailerUrl, '_blank');
    } else {
      alert('Trailer not available for this movie.');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-white' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onSearch={handleSearch}
      />
      
      {!currentSearchTerm && !selectedGenre && <Hero />}
      
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreSelect={handleGenreSelect}
        loading={genresLoading}
      />
      
      <MovieGrid
        movies={movies}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onWatchTrailer={handleWatchTrailer}
        loading={loading}
        searchTerm={currentSearchTerm}
        selectedGenre={selectedGenre}
        genres={genres}
      />
      
      <Footer />
    </div>
  );
}

export default App;