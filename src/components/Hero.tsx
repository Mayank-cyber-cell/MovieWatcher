import React from 'react';
import { Play, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-sm font-medium">Featured Movie</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Discover Your Next
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Favorite Film
            </span>
          </h2>
          
          <p className="text-lg text-slate-300 leading-relaxed">
            Explore thousands of movies, from blockbuster hits to hidden gems. 
            Find ratings, watch trailers, and build your personal watchlist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/25">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Trailer
            </button>
            
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
};