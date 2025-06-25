
import React from 'react';
import { COMPANY_NAME, COMPANY_IMAGE_URL, PageKey } from '../constants';

interface HomePageProps {
  setActivePage: (page: PageKey) => void;
}

const HowItWorksStep: React.FC<{ title: string; description: string; icon: string; stepNumber: number }> = 
  ({ title, description, icon, stepNumber }) => (
  <div 
    className="p-6 rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-slate-600/50 transition-shadow duration-300 border flex flex-col items-center text-center h-full"
    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
  >
    <div className="relative mb-4">
      <svg 
          className="h-16 w-16 text-[var(--accent-primary)]"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
      >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon}></path>
      </svg>
      <span 
        className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full border-2"
        style={{
          backgroundColor: 'var(--accent-primary)', 
          color: 'var(--accent-text-on-primary)',
          borderColor: 'var(--card-bg)'
        }}
      >
        {stepNumber}
      </span>
    </div>
    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{description}</p>
  </div>
);

export const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-16 md:py-20 w-full">
        <img 
            src={COMPANY_IMAGE_URL} 
            alt={`${COMPANY_NAME} illustrative banner`} 
            className="max-h-20 sm:max-h-24 mx-auto mb-6" 
        />
        <h1 className="glitter-text homepage-hero-title-font text-5xl sm:text-6xl md:text-7xl mb-6"> {/* Changed to homepage-hero-title-font */}
          Lead Scoring
        </h1>
        <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Leverage Google's Gemini models to accurately score, prioritize, and convert sales leads. Understand lead potential at a glance and empower your sales team.
        </p>
        <button
          onClick={() => setActivePage('dashboard')}
          className="font-semibold py-3.5 px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent-focus-ring)] focus:ring-opacity-75 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-lg"
          style={{ 
            backgroundColor: 'var(--accent-primary)', 
            color: 'var(--accent-text-on-primary)'
          }}
        >
          Score Leads Now
        </button>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 md:py-20 w-full max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{ color: 'var(--text-primary)'}}>
          Simple Steps to Smarter Lead Scoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HowItWorksStep 
            stepNumber={1}
            title="Input Lead Data" 
            description="Easily enter lead details like company info, engagement history, and recent activities through our intuitive form."
            icon="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" // Form/Pencil icon
          />
          <HowItWorksStep 
            stepNumber={2}
            title="AI Analyzes & Scores" 
            description="Our Gemini-powered AI meticulously evaluates the data against key scoring criteria: fit, engagement, and activity."
            icon="M9.663 17h4.673M21 12a9 9 0 11-18 0 9 9 0 0118 0z" // Lightbulb/AI icon
          />
          <HowItWorksStep 
            stepNumber={3}
            title="Get Actionable Insights" 
            description="Receive a comprehensive score, detailed breakdown, and clear recommendations to focus your efforts effectively."
            icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" // Trending up/Chart icon
          />
        </div>
      </section>
      
       <p className="text-sm italic text-center mt-10 mb-6" style={{ color: 'var(--text-secondary)'}}>
        Powered by {COMPANY_NAME}
      </p>
    </div>
  );
};
