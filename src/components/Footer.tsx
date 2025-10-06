import React from 'react';
import { Film, Heart, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/95 border-t border-slate-700/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Film className="w-8 h-8 text-indigo-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                MovieWatcherX
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your ultimate destination for discovering amazing movies, exploring genres, and building your personal watchlist.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">Popular Movies</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">Top Rated</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">Upcoming</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">Trending</a></li>
            </ul>
          </div>

          {/* Genres */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Popular Genres</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">Action</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">Comedy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">Drama</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">Sci-Fi</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Connect</h4>
            <div className="flex gap-3">
              <a href="https://github.com/Mayank-cyber-cell" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-indigo-600 rounded-full transition-all duration-300 hover:scale-110">
                <Github className="w-4 h-4 text-slate-400 hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/in/mayankkshah" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110">
                <Linkedin className="w-4 h-4 text-slate-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-red-600 rounded-full transition-all duration-300 hover:scale-110">
                <Mail className="w-4 h-4 text-slate-400 hover:text-white" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Made with passion</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm">
            © 2025 <span className="text-indigo-400 font-semibold">Mayank Shah</span>. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};