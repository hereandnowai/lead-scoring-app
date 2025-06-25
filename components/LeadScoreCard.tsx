
import React from 'react';
import { ParsedLeadScore } from '../types';
import ScorePieChart from './ScorePieChart'; 

interface LeadScoreCardProps {
  lead: ParsedLeadScore;
}

const InsightSection: React.FC<{ title: string; content: string; iconPath: string }> = ({ title, content, iconPath }) => (
  <div className="mb-4">
    <h5 className="text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center" style={{ color: 'var(--text-secondary)' }}>
      <svg className="w-4 h-4 mr-2 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
      </svg>
      {title}
    </h5>
    <p className="text-sm leading-relaxed whitespace-pre-wrap pl-6" style={{ color: 'var(--text-primary)' }}>{content}</p>
  </div>
);

export const LeadScoreCard: React.FC<LeadScoreCardProps> = ({ lead }) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-500 dark:text-green-400';
    if (score >= 60) return 'text-yellow-500 dark:text-yellow-400';
    if (score >= 40) return 'text-orange-500 dark:text-orange-400';
    return 'text-red-500 dark:text-red-400';
  };
  
  const cardBgStyle = { backgroundColor: 'var(--lead-card-bg-dark)', borderColor: 'var(--border-color)' };

  return (
    <div 
      className="shadow-lg rounded-xl p-6 hover:shadow-2xl dark:hover:shadow-slate-600/50 transition-shadow duration-300 ease-in-out border"
      style={cardBgStyle}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--accent-text-primary)]">{lead.leadName}</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{lead.company} - {lead.role}</p>
        </div>
        <div className={`mt-2 sm:mt-0 text-3xl sm:text-4xl font-bold ${getScoreColor(lead.score)}`}>
          {lead.score}
          <span className="text-base font-normal" style={{ color: 'var(--text-secondary)' }}>/100</span>
        </div>
      </div>

      <div className="mb-6 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
        <h4 className="text-sm font-semibold mb-3 text-center" style={{ color: 'var(--text-primary)' }}>Scoring Breakdown:</h4>
        <ScorePieChart 
          fitScore={lead.fitScore}
          engagementScore={lead.engagementScore}
          activityScore={lead.activityScore}
        />
      </div>

      <div className="pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
        <h4 className="text-md font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Detailed Analysis:</h4>
        {lead.positiveSignals && lead.positiveSignals !== "Not provided by AI." && (
          <InsightSection 
            title="Positive Signals" 
            content={lead.positiveSignals}
            iconPath="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" // Thumbs up icon
          />
        )}
        {lead.potentialConcerns && lead.potentialConcerns !== "Not provided by AI." && (
          <InsightSection 
            title="Potential Concerns" 
            content={lead.potentialConcerns}
            iconPath="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" // Warning/X-Circle icon
          />
        )}
        {lead.suggestedNextSteps && lead.suggestedNextSteps !== "Not provided by AI." && (
          <InsightSection 
            title="Suggested Next Steps" 
            content={lead.suggestedNextSteps}
            iconPath="M13 5l7 7-7 7M5 5l7 7-7 7" // Arrow right / forward icon
          />
        )}
         {(lead.positiveSignals === "Not provided by AI." && lead.potentialConcerns === "Not provided by AI." && lead.suggestedNextSteps === "Not provided by AI.") && (
            <p className="text-sm italic" style={{color: 'var(--text-secondary)'}}>No detailed analysis provided by AI for this lead.</p>
        )}
      </div>
    </div>
  );
};
