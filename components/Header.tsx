
import React from 'react';
import { COMPANY_NAME, COMPANY_IMAGE_URL, COMPANY_LOGO_URL } from '../constants';

export const Header: React.FC = () => {
  return (
    <header 
      className="shadow-md fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-colors duration-300"
      style={{
        backgroundImage: `linear-gradient(to right, var(--header-bg-gradient-start), var(--header-bg-gradient-end))`
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <img 
            src={COMPANY_LOGO_URL} 
            alt={`${COMPANY_NAME} Logo`} 
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2"
            style={{ borderColor: 'var(--header-logo-border)' }}
          />
          <img 
            src={COMPANY_IMAGE_URL} 
            alt={`${COMPANY_NAME} Title`} 
            className="h-8 sm:h-10 hidden md:block" 
            // If the image itself has text that needs to adapt, it might need different image versions.
            // For now, assuming the image is versatile enough or its colors work with most header backgrounds.
          />
           <span 
            className="text-xl sm:text-2xl font-semibold tracking-tight md:hidden" 
            style={{ color: 'var(--header-text-primary)' }}
           >
            {COMPANY_NAME}
           </span>
        </div>
        <div 
          className="text-sm font-medium pr-2 header-app-name-font" /* Removed glitter-text */
          style={{ 
            fontSize: '1.2rem' 
          }}
        >
          Lead Scoring
        </div>
      </div>
    </header>
  );
};