
import React, { useState, useEffect } from 'react';
import type { ContentBaseFontSize } from '../App';

interface SettingsPageProps {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  contentBaseFontSize: ContentBaseFontSize;
  setContentBaseFontSize: (size: ContentBaseFontSize) => void;
  userName: string;
  userEmail: string;
  onUserNameChange: (name: string) => void;
  onUserEmailChange: (email: string) => void;
  highScoreAlertsEnabled: boolean;
  weeklySummaryEnabled: boolean;
  onToggleHighScoreAlerts: () => void;
  onToggleWeeklySummary: () => void;
}

const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onChange: () => void; idSuffix: string; }> = 
  ({ label, enabled, onChange, idSuffix }) => (
  <div className="flex items-center justify-between py-3">
    <label htmlFor={`toggle-${idSuffix}`} className="text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>{label}</label>
    <button
      type="button"
      id={`toggle-${idSuffix}`}
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-[var(--accent-focus-ring)]
                  ${enabled ? 'bg-[var(--accent-primary)]' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out
                    ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  </div>
);

const RadioButton: React.FC<{
  id: string; name: string; value: string; label: string;
  checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, name, value, label, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-[var(--accent-bg-light)]">
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-radio h-4 w-4 text-[var(--accent-primary)] border-slate-400 dark:border-slate-500 focus:ring-[var(--accent-focus-ring)] focus:ring-offset-0"
    />
    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
  </label>
);

const SettingsInputField: React.FC<{label: string, id: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string}> = 
  ({label, id, type = "text", value, onChange, placeholder}) => (
    <div className="py-2">
      <label htmlFor={id} className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)'}}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border 
                  focus:outline-none focus:ring-2 focus:ring-[var(--accent-focus-ring)] focus:border-[var(--accent-border)] 
                  sm:text-sm 
                  bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] 
                  placeholder:text-[var(--input-placeholder-text)] placeholder:opacity-100"
      />
    </div>
);


export const SettingsPage: React.FC<SettingsPageProps> = ({
  animationsEnabled,
  toggleAnimations,
  contentBaseFontSize,
  setContentBaseFontSize,
  userName,
  userEmail,
  onUserNameChange,
  onUserEmailChange,
  highScoreAlertsEnabled,
  weeklySummaryEnabled,
  onToggleHighScoreAlerts,
  onToggleWeeklySummary
}) => {
  const [currentName, setCurrentName] = useState(userName);
  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [profileSaveStatus, setProfileSaveStatus] = useState<string | null>(null);
  const [apiTestStatus, setApiTestStatus] = useState<string | null>(null);
  const [isApiTesting, setIsApiTesting] = useState(false);

  useEffect(() => { setCurrentName(userName); }, [userName]);
  useEffect(() => { setCurrentEmail(userEmail); }, [userEmail]);

  const handleProfileSave = () => {
    onUserNameChange(currentName);
    onUserEmailChange(currentEmail);
    setProfileSaveStatus("Profile saved successfully!");
    setTimeout(() => setProfileSaveStatus(null), 3000);
  };

  const handleTestApiConnection = () => {
    setIsApiTesting(true);
    setApiTestStatus("Testing connection...");
    setTimeout(() => {
      // Simulate API check
      const success = Math.random() > 0.3; // Simulate success/failure
      if (process.env.API_KEY) { // Check if env var might be present (client-side check is illustrative)
         setApiTestStatus(success ? "API connection successful!" : "Mock API connection failed. Check console (simulated).");
      } else {
         setApiTestStatus("API Key not found in environment (simulated check). Configure API_KEY.");
      }
      setIsApiTesting(false);
      setTimeout(() => setApiTestStatus(null), 5000);
    }, 2000);
  };

  return (
    <div 
      className="p-6 sm:p-8 rounded-lg shadow-xl"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <h1 className="text-3xl font-bold text-[var(--accent-text-primary)] mb-8">Settings</h1>
      <div className="space-y-10">
        
        <div>
          <h2 className="text-xl font-semibold mb-3 pb-2 text-[var(--text-primary)]" style={{ borderBottom: '1px solid var(--border-color)' }}>
            User Profile
          </h2>
          <div className="space-y-3 max-w-md">
            <SettingsInputField label="Name" id="userName" value={currentName} onChange={(e) => setCurrentName(e.target.value)} placeholder="Your Name"/>
            <SettingsInputField label="Email" id="userEmail" type="email" value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} placeholder="your.email@example.com"/>
            <button
              onClick={handleProfileSave}
              className="mt-2 w-full sm:w-auto px-5 py-2.5 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-[var(--accent-focus-ring)]"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--accent-text-on-primary)'}}
            >
              Save Profile
            </button>
            {profileSaveStatus && <p className="text-xs mt-2" style={{color: 'var(--accent-primary)'}}>{profileSaveStatus}</p>}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3 pb-2 text-[var(--text-primary)]" style={{ borderBottom: '1px solid var(--border-color)' }}>
            API Configuration
          </h2>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            The API Key for Gemini is configured via the <code>API_KEY</code> environment variable and is not managed here.
          </p>
          <button
            onClick={handleTestApiConnection}
            disabled={isApiTesting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-[var(--accent-focus-ring)] disabled:opacity-60"
             style={{ backgroundColor: 'var(--secondary-button-bg)', color: 'var(--secondary-button-text)', borderColor: 'var(--secondary-button-border)', borderWidth: '1px'}}
          >
            {isApiTesting ? 'Testing...' : 'Test API Connection (Simulated)'}
          </button>
          {apiTestStatus && <p className={`text-xs mt-2 ${apiTestStatus.includes("successful") ? 'text-[var(--accent-primary)]' : 'text-red-500'}`}>{apiTestStatus}</p>}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3 pb-2 text-[var(--text-primary)]" style={{ borderBottom: '1px solid var(--border-color)' }}>
            Notification Preferences
          </h2>
          <div className="space-y-1 max-w-md">
            <ToggleSwitch
              label="Email alerts for high-scoring leads"
              enabled={highScoreAlertsEnabled}
              onChange={onToggleHighScoreAlerts}
              idSuffix="high-score"
            />
            <ToggleSwitch
              label="Weekly summary emails"
              enabled={weeklySummaryEnabled}
              onChange={onToggleWeeklySummary}
              idSuffix="weekly-summary"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 pb-2 text-[var(--text-primary)]" style={{ borderBottom: '1px solid var(--border-color)' }}>
            Appearance & Accessibility
          </h2>
          <div className="space-y-1 max-w-md">
            <ToggleSwitch
              label="Enable UI Animations"
              enabled={animationsEnabled}
              onChange={toggleAnimations}
              idSuffix="animations"
            />
            <div>
              <p className="text-sm my-2 pt-1" style={{ color: 'var(--text-secondary)' }}>Content Font Size</p>
              <div className="flex space-x-1 sm:space-x-2">
                <RadioButton
                  id="font-sm" name="fontSize" value="small" label="Small"
                  checked={contentBaseFontSize === 'small'} onChange={() => setContentBaseFontSize('small')}
                />
                <RadioButton
                  id="font-md" name="fontSize" value="medium" label="Medium"
                  checked={contentBaseFontSize === 'medium'} onChange={() => setContentBaseFontSize('medium')}
                />
                <RadioButton
                  id="font-lg" name="fontSize" value="large" label="Large"
                  checked={contentBaseFontSize === 'large'} onChange={() => setContentBaseFontSize('large')}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
      <p className="mt-12 text-xs italic" style={{ color: 'var(--text-secondary)' }}>
        Appearance settings (animations, font size) reset on page reload. Profile and notification preferences are saved in your browser.
      </p>
    </div>
  );
};
