import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MovieGrid } from './components/MovieGrid';
import { GenreFilter } from './components/GenreFilter';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { useMovies } from './hooks/useMovies';
import { useFavorites } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';
import { useGenres } from './hooks/useGenres';
import { useAuth } from './context/AuthContext';

const MovieBrowser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  const { movies, loading, error, fetchMovies, getTrailerUrl } = useMovies();
  const { favorites, toggleFavorite } = useFavorites();
  const { isDarkMode, toggleTheme } = useTheme();
  const { genres, loading: genresLoading } = useGenres();
  const { signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCurrentSearchTerm(searchTerm.trim());
      setSelectedGenre(null);
      fetchMovies(searchTerm.trim());
    } else {
      setCurrentSearchTerm('');
      setSelectedGenre(null);
      fetchMovies();
    }
  };

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setCurrentSearchTerm('');
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

  const handleSearchSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setCurrentSearchTerm(suggestion);
    setSelectedGenre(null);
    fetchMovies(suggestion);
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-slate-900 text-white'
        : 'bg-slate-50 text-slate-900'
    }`}>
      {showError && error && (
        <ErrorMessage
          message={error}
          onDismiss={() => setShowError(false)}
        />
      )}

      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onSearch={handleSearch}
        onSignOut={signOut}
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
        onSearchSuggestion={handleSearchSuggestion}
        loading={loading}
        searchTerm={currentSearchTerm}
        selectedGenre={selectedGenre}
        genres={genres}
      />

      <Footer />
    </div>
  );
};

function App() {
  const { user, loading, signUp, signIn } = useAuth();
  const { isDarkMode } = useTheme();

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      }`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          isDarkMode ? 'border-blue-400' : 'border-blue-500'
        }`}></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn isDarkMode={isDarkMode} onSignIn={signIn} />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp isDarkMode={isDarkMode} onSignUp={signUp} />} />
        <Route path="/" element={user ? <MovieBrowser /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;