import React from 'react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-30 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 p-4 my-4 rounded-md shadow-md" role="alert">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold">Error</p>
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
           <button 
            onClick={onClose} 
            className="ml-4 text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-200 focus:outline-none"
            aria-label="Close error message"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};