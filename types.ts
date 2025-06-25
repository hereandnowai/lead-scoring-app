
export interface LeadInput {
  leadName: string;
  company: string;
  role: string;
  industry: string;
  companySize: string;
  revenue: string;
  recentEngagements: string;
  recentActivities: string;
}

export interface ParsedLeadScore {
  id: string; // Unique ID for React list key, generated client-side
  leadName: string;
  company: string;
  role: string;
  score: number;
  fitScore: number;
  engagementScore: number;
  activityScore: number;
  positiveSignals: string;
  potentialConcerns: string;
  suggestedNextSteps: string;
}
