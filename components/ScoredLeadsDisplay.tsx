
import React from 'react';
import { ParsedLeadScore } from '../types';
import { LeadScoreCard } from './LeadScoreCard';

interface ScoredLeadsDisplayProps {
  leads: ParsedLeadScore[];
}

export const ScoredLeadsDisplay: React.FC<ScoredLeadsDisplayProps> = ({ leads }) => {
  if (leads.length === 0) {
    return null; 
  }

  return (
    <div className="space-y-6">
      {leads.map((lead) => (
        <LeadScoreCard key={lead.id} lead={lead} />
      ))}
    </div>
  );
};
