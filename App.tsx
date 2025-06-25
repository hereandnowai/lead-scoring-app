
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { ThemePage } from './pages/ThemePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AboutPage } from './pages/AboutPage';
import { COMPANY_NAME, PAGES, PageKey, ACCENT_COLOR_OPTIONS, AccentColor, ACCENT_PALETTES } from './constants';

export type Theme = 'light' | 'dark';
export type ContentBaseFontSize = 'small' | 'medium' | 'large';

// Utility to convert hex to RGB string
const hexToRgbString = (hex: string): string | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageKey>('home');
  
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('appTheme') as Theme | null;
    return storedTheme || 'dark'; // Default to dark theme
  });

  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const storedAccent = localStorage.getItem('appAccentColor') as AccentColor | null;
    const isValidStoredAccent = storedAccent && ACCENT_COLOR_OPTIONS.some(opt => opt.className === storedAccent);
    return isValidStoredAccent ? storedAccent : 'customGreen';
  });

  // Demo Settings (not persisted for animations/font size)
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [contentBaseFontSize, setContentBaseFontSize] = useState<ContentBaseFontSize>('medium');

  // User Profile Settings (persisted)
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || '');
  const [userEmail, setUserEmail] = useState<string>(() => localStorage.getItem('userEmail') || '');

  // Notification Preferences (persisted)
  const [highScoreAlertsEnabled, setHighScoreAlertsEnabled] = useState<boolean>(() => 
    localStorage.getItem('highScoreAlertsEnabled') === 'true'
  );
  const [weeklySummaryEnabled, setWeeklySummaryEnabled] = useState<boolean>(() => 
    localStorage.getItem('weeklySummaryEnabled') === 'true'
  );

  const handleSetUserName = useCallback((name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
  }, []);

  const handleSetUserEmail = useCallback((email: string) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  }, []);

  const toggleHighScoreAlerts = useCallback(() => {
    setHighScoreAlertsEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('highScoreAlertsEnabled', String(newState));
      return newState;
    });
  }, []);

  const toggleWeeklySummary = useCallback(() => {
    setWeeklySummaryEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('weeklySummaryEnabled', String(newState));
      return newState;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('appTheme', newTheme);
      return newTheme;
    });
  }, []);

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled(prev => !prev);
  }, []);

  const handleSetContentBaseFontSize = useCallback((size: ContentBaseFontSize) => {
    setContentBaseFontSize(size);
  }, []);


  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const currentAccentPalette = ACCENT_PALETTES[accentColor][theme];
    for (const [shade, colorValue] of Object.entries(currentAccentPalette)) {
      root.style.setProperty(`--accent-${shade}`, colorValue);
      const rgbColor = hexToRgbString(colorValue);
      if (rgbColor) {
        root.style.setProperty(`--accent-rgb-${shade}`, rgbColor);
      }
    }
    
    // Set semantic accent colors
    const primaryShade = theme === 'dark' ? currentAccentPalette[400] : currentAccentPalette[600]; // Lighter for dark, darker for light
    const secondaryShade = theme === 'dark' ? currentAccentPalette[600] : currentAccentPalette[500];
    const hoverShade = theme === 'dark' ? currentAccentPalette[300] : currentAccentPalette[700];
    const textOnPrimaryShade = theme === 'dark' ? currentAccentPalette[950] : currentAccentPalette[50]; // Ensure high contrast
    const textPrimaryShade = theme === 'dark' ? currentAccentPalette[300] : currentAccentPalette[700];
    const borderShade = theme === 'dark' ? currentAccentPalette[600] : currentAccentPalette[300];
    const focusRingShade = theme === 'dark' ? currentAccentPalette[400] : currentAccentPalette[500];
    const bgLightShade = theme === 'dark' ? currentAccentPalette[800] : currentAccentPalette[100]; // Darker subtle bg for dark, lighter for light

    root.style.setProperty('--accent-primary', primaryShade);
    root.style.setProperty('--accent-secondary', secondaryShade);
    root.style.setProperty('--accent-hover', hoverShade);
    root.style.setProperty('--accent-text-on-primary', textOnPrimaryShade);
    root.style.setProperty('--accent-text-primary', textPrimaryShade);
    root.style.setProperty('--accent-border', borderShade);
    root.style.setProperty('--accent-focus-ring', focusRingShade);
    root.style.setProperty('--accent-bg-light', bgLightShade);
    
    // Header specific colors
    root.style.setProperty('--header-bg-gradient-start', theme === 'dark' ? currentAccentPalette[700] : currentAccentPalette[600]); 
    root.style.setProperty('--header-bg-gradient-end', theme === 'dark' ? currentAccentPalette[800] : currentAccentPalette[700]);   
    root.style.setProperty('--header-text-primary', theme === 'dark' ? currentAccentPalette[100] : currentAccentPalette[50]);      
    root.style.setProperty('--header-text-secondary', theme === 'dark' ? currentAccentPalette[300] : currentAccentPalette[200]);   
    root.style.setProperty('--header-logo-border', theme === 'dark' ? currentAccentPalette[500] : currentAccentPalette[400]);

    // Base theme colors
    if (theme === 'dark') {
      root.style.setProperty('--app-bg', '#020617'); 
      root.style.setProperty('--main-content-bg', '#0f172a'); 
      root.style.setProperty('--card-bg', '#1e293b'); 
      root.style.setProperty('--sidebar-bg', '#0f172a'); 
      root.style.setProperty('--text-primary', '#e2e8f0'); 
      root.style.setProperty('--text-secondary', '#94a3b8'); 
      root.style.setProperty('--border-color', '#334155'); 
      root.style.setProperty('--footer-bg', '#0f172a'); 
      root.style.setProperty('--footer-text', '#94a3b8'); 
      root.style.setProperty('--footer-border', '#334155'); 
      root.style.setProperty('--lead-card-bg-dark', '#334155');

      root.style.setProperty('--input-bg', '#334155');
      root.style.setProperty('--input-border', '#475569');
      root.style.setProperty('--input-text', '#e2e8f0');
      root.style.setProperty('--input-placeholder-text', '#94a3b8');
      root.style.setProperty('--input-disabled-bg', '#0f172a');
      root.style.setProperty('--input-disabled-text', '#475569');
      root.style.setProperty('--input-disabled-border', '#1e293b');

      root.style.setProperty('--secondary-button-bg', '#334155');
      root.style.setProperty('--secondary-button-text', '#e2e8f0');
      root.style.setProperty('--secondary-button-border', '#475569');
      root.style.setProperty('--secondary-button-hover-bg', '#475569');

      root.style.setProperty('--glitter-highlight-color', currentAccentPalette[200]); // Lighter for dark theme
      root.style.setProperty('--glitter-shadow-color', currentAccentPalette[700]); // Darker for dark theme

    } else { // Light Theme
      root.style.setProperty('--app-bg', '#F1EFF0'); 
      root.style.setProperty('--main-content-bg', '#F1EFF0'); 
      root.style.setProperty('--card-bg', '#F1EFF0'); 
      root.style.setProperty('--sidebar-bg', '#F1EFF0'); 
      root.style.setProperty('--text-primary', '#1e293b'); 
      root.style.setProperty('--text-secondary', '#64748b'); 
      root.style.setProperty('--border-color', '#d1d5db'); 
      root.style.setProperty('--footer-bg', '#F1EFF0'); 
      root.style.setProperty('--footer-text', '#64748b');
      root.style.setProperty('--footer-border', '#d1d5db'); 
      root.style.setProperty('--lead-card-bg-dark', '#F1EFF0'); // This var name is misleading in light theme, used for consistency.

      root.style.setProperty('--input-bg', '#ffffff');
      root.style.setProperty('--input-border', '#cbd5e1');
      root.style.setProperty('--input-text', '#1e293b'); 
      root.style.setProperty('--input-placeholder-text', '#94a3b8'); 
      root.style.setProperty('--input-disabled-bg', '#f8fafc');
      root.style.setProperty('--input-disabled-text', '#cbd5e1'); 
      root.style.setProperty('--input-disabled-border', '#e2e8f0'); 
      
      root.style.setProperty('--secondary-button-bg', '#e2e8f0'); 
      root.style.setProperty('--secondary-button-text', '#1e293b'); 
      root.style.setProperty('--secondary-button-border', '#cbd5e1'); 
      root.style.setProperty('--secondary-button-hover-bg', '#cbd5e1'); 

      root.style.setProperty('--glitter-highlight-color', currentAccentPalette[100]); // Lighter for light theme
      root.style.setProperty('--glitter-shadow-color', currentAccentPalette[800]); // Darker for light theme
    }

    // Fixed Pie Chart Colors (RGB for Chart.js)
    root.style.setProperty('--pie-chart-segment-1-rgb', 'rgb(54, 162, 235)'); // Blue
    root.style.setProperty('--pie-chart-segment-2-rgb', 'rgb(255, 159, 64)'); // Orange
    root.style.setProperty('--pie-chart-segment-3-rgb', 'rgb(75, 192, 192)'); // Green


    // Apply animation setting
    if (animationsEnabled) {
      root.classList.remove('no-animations');
    } else {
      root.classList.add('no-animations');
    }

    // Apply base font size setting
    switch (contentBaseFontSize) {
      case 'small':
        root.style.fontSize = '90%';
        break;
      case 'large':
        root.style.fontSize = '110%';
        break;
      case 'medium':
      default:
        root.style.fontSize = '100%';
        break;
    }

  }, [accentColor, theme, animationsEnabled, contentBaseFontSize]);

  const handleSetAccentColor = useCallback((newAccent: AccentColor) => {
    setAccentColor(newAccent);
    localStorage.setItem('appAccentColor', newAccent);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'settings':
        return <SettingsPage 
                  animationsEnabled={animationsEnabled}
                  toggleAnimations={toggleAnimations}
                  contentBaseFontSize={contentBaseFontSize}
                  setContentBaseFontSize={handleSetContentBaseFontSize}
                  userName={userName}
                  userEmail={userEmail}
                  onUserNameChange={handleSetUserName}
                  onUserEmailChange={handleSetUserEmail}
                  highScoreAlertsEnabled={highScoreAlertsEnabled}
                  weeklySummaryEnabled={weeklySummaryEnabled}
                  onToggleHighScoreAlerts={toggleHighScoreAlerts}
                  onToggleWeeklySummary={toggleWeeklySummary}
                />;
      case 'theme':
        return <ThemePage 
                  currentAccent={accentColor} 
                  setAccent={handleSetAccentColor}
                  currentTheme={theme}
                  toggleTheme={toggleTheme} 
                />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--app-bg)', color: 'var(--text-primary)' }}
    >
      <Header />
      <div className="flex flex-1 overflow-hidden pt-16"> {/* pt-16 to offset fixed Header height */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} pages={PAGES} />
        <main 
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto" 
          style={{ backgroundColor: 'var(--main-content-bg)' }}
        >
          {renderPage()}
        </main>
      </div>
      <footer 
        className="text-center py-4 text-sm"
        style={{ 
          backgroundColor: 'var(--footer-bg)', 
          color: 'var(--footer-text)',
          borderTop: '1px solid var(--footer-border)'
        }}
      >
        <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
