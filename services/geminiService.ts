
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ParsedLeadScore } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const extractSectionFromAnalysis = (analysisText: string, sectionTitle: string): string => {
  // Regex to match the section title, allowing for optional markdown bolding (**)
  const titleRegex = new RegExp(`^- \\*\\*?${sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\*\\*?\\s*\\n?`, "im");
  const sectionMatch = analysisText.match(titleRegex);
  
  if (!sectionMatch || typeof sectionMatch.index === 'undefined') {
    // console.warn(`Section title "${sectionTitle}" not found in analysis text.`);
    return "Not provided by AI.";
  }

  const startIndex = sectionMatch.index + sectionMatch[0].length;
  let endIndex = analysisText.length;

  // Find the start of the next section (which could also be bolded), if any
  const nextSectionRegex = /^- \*\*?\w+.*:\*\*?\s*\n?/im;
  const nextSectionMatch = analysisText.substring(startIndex).match(nextSectionRegex);
  if (nextSectionMatch && typeof nextSectionMatch.index !== 'undefined') {
    endIndex = startIndex + nextSectionMatch.index;
  }
  
  return analysisText.substring(startIndex, endIndex).trim();
};


const parseGeminiResponse = (responseText: string): ParsedLeadScore | null => {
  const text = responseText.trim();
  
  // Regexes updated to handle optional markdown bold (**) and score formats like "value/max"
  const leadNameMatch = text.match(/^\*\*?Lead Name:\*\*?\s*(.*)$/im);
  const companyMatch = text.match(/^\*\*?Company:\*\*?\s*(.*)$/im);
  const roleMatch = text.match(/^\*\*?Role:\*\*?\s*(.*)$/im);
  const scoreMatch = text.match(/^\*\*?Score:\*\*?\s*(\d+)(?:\s*\/\s*\d+)?/im); 
  const fitScoreMatch = text.match(/^\s*-\s*\*\*?Fit Score:\*\*?\s*(\d+)(?:\s*\/\s*\d+)?/im);
  const engagementScoreMatch = text.match(/^\s*-\s*\*\*?Engagement Score:\*\*?\s*(\d+)(?:\s*\/\s*\d+)?/im);
  const activityScoreMatch = text.match(/^\s*-\s*\*\*?Activity Score:\*\*?\s*(\d+)(?:\s*\/\s*\d+)?/im);
  
  // Find the start of the "Detailed Analysis:" block, allowing for optional markdown bolding
  const detailedAnalysisHeaderMatch = text.match(/^\*\*?Detailed Analysis:\*\*?\s*\n?/im);

  if (
    !leadNameMatch || !companyMatch || !roleMatch || !scoreMatch ||
    !fitScoreMatch || !engagementScoreMatch || !activityScoreMatch ||
    !detailedAnalysisHeaderMatch || typeof detailedAnalysisHeaderMatch.index === 'undefined'
  ) {
    console.error("Failed to parse basic lead info or Detailed Analysis header. Raw text:", responseText);
    return null;
  }

  const analysisBlockStartIndex = detailedAnalysisHeaderMatch.index + detailedAnalysisHeaderMatch[0].length;
  const analysisBlockText = text.substring(analysisBlockStartIndex);

  const positiveSignals = extractSectionFromAnalysis(analysisBlockText, "Positive Signals");
  const potentialConcerns = extractSectionFromAnalysis(analysisBlockText, "Potential Concerns");
  const suggestedNextSteps = extractSectionFromAnalysis(analysisBlockText, "Suggested Next Steps");

  if (
    leadNameMatch[1] && companyMatch[1] && roleMatch[1] && scoreMatch[1] &&
    fitScoreMatch[1] && engagementScoreMatch[1] && activityScoreMatch[1]
  ) {
    return {
      id: crypto.randomUUID(),
      leadName: leadNameMatch[1].trim(),
      company: companyMatch[1].trim(),
      role: roleMatch[1].trim(),
      score: parseInt(scoreMatch[1], 10),
      fitScore: parseInt(fitScoreMatch[1], 10),
      engagementScore: parseInt(engagementScoreMatch[1], 10),
      activityScore: parseInt(activityScoreMatch[1], 10),
      positiveSignals: positiveSignals,
      potentialConcerns: potentialConcerns,
      suggestedNextSteps: suggestedNextSteps,
    };
  }
  
  console.error("Failed to parse one or more critical fields after analysis block. Raw text:", responseText);
  return null;
};

export const scoreLeadWithGemini = async (systemInstruction: string, leadDetails: string): Promise<ParsedLeadScore | null> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set. Please ensure it is configured.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: leadDetails, 
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const responseText = response.text;
    if (!responseText) {
        console.error("Gemini API returned an empty response text.");
        return null; 
    }
    return parseGeminiResponse(responseText);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
