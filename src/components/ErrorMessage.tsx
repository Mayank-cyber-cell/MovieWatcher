import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="fixed top-20 right-4 z-50 max-w-md animate-fade-in">
      <div className="bg-red-500/90 backdrop-blur-sm border border-red-400 rounded-lg shadow-2xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-1">Error</h4>
          <p className="text-red-100 text-sm">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-red-600 rounded transition-colors duration-300"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
