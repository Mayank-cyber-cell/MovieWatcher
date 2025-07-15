import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('moviemagic-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (movieId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId];
      
      localStorage.setItem('moviemagic-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return {
    favorites,
    toggleFavorite,
  };
};