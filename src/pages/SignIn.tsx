import React, { useState } from 'react';
import { Film, Mail, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SignInProps {
  isDarkMode: boolean;
  onSignIn: (email: string, password: string) => Promise<void>;
  loading?: boolean;
}

export const SignIn: React.FC<SignInProps> = ({ isDarkMode, onSignIn, loading = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSignIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center px-4 ${
      isDarkMode
        ? 'bg-slate-900 text-white'
        : 'bg-slate-50 text-slate-900'
    }`}>
      <div className={`w-full max-w-md transition-all duration-300 ${
        isDarkMode
          ? 'bg-slate-800/50 border border-slate-700/50'
          : 'bg-white border border-slate-200'
      } rounded-2xl shadow-xl p-8 backdrop-blur-sm`}>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <Film className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            MovieWatcherX
          </h1>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-center">Welcome Back</h2>
        <p className={`text-center mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Sign in to your account to continue
        </p>

        {error && (
          <div className={`mb-4 p-4 rounded-lg flex gap-3 ${
            isDarkMode
              ? 'bg-red-500/10 border border-red-500/20'
              : 'bg-red-50 border border-red-200'
          }`}>
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 hover:bg-slate-700/70'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 hover:bg-white'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 hover:bg-slate-700/70'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 hover:bg-white'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-500/50'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/30'
            }`}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className={`mt-6 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
