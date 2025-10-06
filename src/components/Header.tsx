import React from 'react';
import { Search, Moon, Sun, Film } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onSearch: (e: React.FormEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  isDarkMode,
  toggleTheme,
  onSearch,
}) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/95 border-slate-700/50' 
        : 'bg-white/95 border-slate-200/50'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="relative">
              <Film className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent`}>
              MovieWatcherX
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
            
            <form onSubmit={onSearch} className="relative group">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 group-focus-within:text-indigo-400 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies..."
                className={`w-full md:w-80 pl-10 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-600 text-slate-200 placeholder-slate-400 hover:bg-slate-800/70'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 hover:bg-white'
                }`}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};