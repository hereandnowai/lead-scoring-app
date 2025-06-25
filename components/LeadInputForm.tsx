
import React from 'react';
import { LeadInput } from '../types';

interface LeadInputFormProps {
  leadInput: LeadInput;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{label: string, name: keyof LeadInput, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string, type?: string, required?: boolean}> = 
  ({label, name, value, onChange, placeholder, type = "text", required = true}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)'}}>
      {label} {required && <span className="text-red-500 dark:text-red-400">*</span>}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border 
                 focus:outline-none focus:ring-2 focus:ring-[var(--accent-focus-ring)] focus:border-[var(--accent-border)] 
                 sm:text-sm 
                 bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] 
                 placeholder:text-[var(--input-placeholder-text)] placeholder:opacity-100 
                 disabled:cursor-not-allowed 
                 disabled:bg-[var(--input-disabled-bg)] disabled:border-[var(--input-disabled-border)] 
                 disabled:text-[var(--input-disabled-text)] disabled:placeholder:text-[var(--input-disabled-text)]"
    />
  </div>
);

const TextAreaField: React.FC<{label: string, name: keyof LeadInput, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder?: string, rows?: number, required?: boolean}> = 
  ({label, name, value, onChange, placeholder, rows = 3, required = true}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)'}}>
      {label} {required && <span className="text-red-500 dark:text-red-400">*</span>}
    </label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm border
                 focus:outline-none focus:ring-2 focus:ring-[var(--accent-focus-ring)] focus:border-[var(--accent-border)]
                 sm:text-sm
                 bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)]
                 placeholder:text-[var(--input-placeholder-text)] placeholder:opacity-100
                 disabled:cursor-not-allowed
                 disabled:bg-[var(--input-disabled-bg)] disabled:border-[var(--input-disabled-border)] 
                 disabled:text-[var(--input-disabled-text)] disabled:placeholder:text-[var(--input-disabled-text)]"
    />
  </div>
);


export const LeadInputForm: React.FC<LeadInputFormProps> = ({ leadInput, onInputChange, onSubmit, onClear, isLoading }) => {
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        <InputField label="Lead Name" name="leadName" value={leadInput.leadName} onChange={onInputChange} placeholder="e.g., Jane Doe" />
        <InputField label="Company" name="company" value={leadInput.company} onChange={onInputChange} placeholder="e.g., Acme Corp" />
        <InputField label="Role" name="role" value={leadInput.role} onChange={onInputChange} placeholder="e.g., Marketing Director" />
        <InputField label="Industry" name="industry" value={leadInput.industry} onChange={onInputChange} placeholder="e.g., Technology" />
        <InputField label="Company Size (Employees)" name="companySize" value={leadInput.companySize} onChange={onInputChange} placeholder="e.g., 500" />
        <InputField label="Revenue (Annual)" name="revenue" value={leadInput.revenue} onChange={onInputChange} placeholder="e.g., $10M" />
      </div>
      
      <TextAreaField 
        label="Recent Engagements" 
        name="recentEngagements" 
        value={leadInput.recentEngagements} 
        onChange={onInputChange} 
        placeholder="e.g., Website visits, email opens, downloads, event attendance" 
      />
      <TextAreaField 
        label="Recent Activities" 
        name="recentActivities" 
        value={leadInput.recentActivities} 
        onChange={onInputChange} 
        placeholder="e.g., Demo requests, pricing page visits, recent replies" 
      />
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto flex-1 justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-[var(--accent-focus-ring)] 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--accent-text-on-primary)'
          }}
          onMouseOver={e => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
            }
          }}
          onMouseOut={e => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
            }
          }}
        >
          {isLoading ? 'Scoring Lead...' : 'Score Lead'}
        </button>
        <button
          type="button"
          onClick={onClear}
          disabled={isLoading}
          className="w-full sm:w-auto flex-1 justify-center py-3 px-6 rounded-md shadow-sm text-base font-medium 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-[var(--accent-focus-ring)]
                     disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--secondary-button-bg)',
            color: 'var(--secondary-button-text)',
            borderColor: 'var(--secondary-button-border)',
            borderWidth: '1px', // Ensure border is visible
          }}
          onMouseOver={e => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'var(--secondary-button-hover-bg)';
            }
          }}
          onMouseOut={e => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'var(--secondary-button-bg)';
            }
          }}
        >
          Clear Form
        </button>
      </div>
    </form>
  );
};
