
import React from 'react';
import { ACCENT_COLOR_OPTIONS, AccentColor, ACCENT_PALETTES } from '../constants';
import type { Theme } from '../App'; // Import Theme type

interface ThemePageProps {
  currentAccent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  currentTheme: Theme;
  toggleTheme: () => void;
}

export const ThemePage: React.FC<ThemePageProps> = ({ currentAccent, setAccent, currentTheme, toggleTheme }) => {

  const ThemeToggleButton: React.FC = () => (
    <button
      onClick={toggleTheme}
      className="px-6 py-3 rounded-lg font-medium transition-all duration-150 ease-in-out
                 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600
                 text-slate-800 dark:text-slate-100
                 focus:outline-none focus:ring-2 focus:ring-[var(--accent-focus-ring)] focus:ring-offset-2 dark:focus:ring-offset-slate-800 shadow-sm"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );

  return (
    <div 
      className="p-6 sm:p-8 rounded-lg shadow-xl transition-colors duration-300"
      style={{ backgroundColor: 'var(--card-bg)'}}
    >
      <h1 className="text-3xl font-bold text-[var(--accent-text-primary)] mb-6">Theme Customization</h1>
      <p style={{ color: 'var(--text-secondary)'}} className="mb-8">
        Personalize your application experience. Your preferences for theme mode and accent color are saved automatically.
      </p>
      
      <div className="space-y-8">
        <div>
          <h2 
            className="text-xl font-semibold mb-3 pb-2"
            style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}
          >Theme Mode</h2>
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-3">
            Currently viewing in: <span className="font-semibold" style={{color: 'var(--text-primary)'}}>{currentTheme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>.
          </p>
          <ThemeToggleButton />
        </div>

        <div>
          <h2 
            className="text-xl font-semibold mb-3 pb-2"
            style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}
          >Accent Color</h2>
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-3">Select your preferred accent color.</p>
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLOR_OPTIONS.map(accent => {
              const buttonBgColor = ACCENT_PALETTES[accent.className][currentTheme]['500'];
              const buttonTextColor = ACCENT_PALETTES[accent.className][currentTheme]['50'];
              
              return (
                <button
                  key={accent.className}
                  onClick={() => setAccent(accent.className)}
                  className={`w-24 h-10 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-150 shadow-sm
                              ${currentAccent === accent.className 
                                ? 'ring-2 ring-[var(--accent-focus-ring)] ring-offset-1 dark:ring-offset-slate-700' 
                                : 'hover:opacity-80'
                              }`}
                  style={{ 
                    backgroundColor: buttonBgColor,
                    color: buttonTextColor,
                    border: currentAccent === accent.className 
                            ? `2px solid ${ACCENT_PALETTES[accent.className][currentTheme]['700']}`
                            : `2px solid transparent`
                  }}
                  aria-pressed={currentAccent === accent.className}
                >
                  {accent.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
       <p 
        className="mt-10 text-sm italic"
        style={{ color: 'var(--text-secondary)' }}
       >
        Changes to theme mode and accent color are applied instantly and saved for your next visit.
      </p>
    </div>
  );
};
