
import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { LeadInput, ParsedLeadScore } from '../types';
import { scoreLeadWithGemini } from '../services/geminiService';
import { LeadInputForm } from '../components/LeadInputForm';
import { ScoredLeadsDisplay } from '../components/ScoredLeadsDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SYSTEM_INSTRUCTION } from '../constants';

const initialLeadInputState: LeadInput = {
  leadName: '',
  company: '',
  role: '',
  industry: '',
  companySize: '',
  revenue: '',
  recentEngagements: '',
  recentActivities: '',
};

// Define expected columns and their possible names in the Excel file (case-insensitive)
const EXPECTED_COLUMNS_CONFIG: { field: keyof LeadInput; names: string[] }[] = [
  { field: 'leadName', names: ['Lead Name', 'Name'] },
  { field: 'company', names: ['Company', 'Organization'] },
  { field: 'role', names: ['Role', 'Job Title', 'Position'] },
  { field: 'industry', names: ['Industry'] },
  { field: 'companySize', names: ['Company Size', 'Size', 'Employees'] },
  { field: 'revenue', names: ['Revenue', 'Annual Revenue'] },
  { field: 'recentEngagements', names: ['Recent Engagements', 'Engagements'] },
  { field: 'recentActivities', names: ['Recent Activities', 'Activities'] },
];


const DashboardPage: React.FC = () => {
  const [currentLeadInput, setCurrentLeadInput] = useState<LeadInput>(initialLeadInputState);
  const [scoredLeads, setScoredLeads] = useState<ParsedLeadScore[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileProcessingMessage, setFileProcessingMessage] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentLeadInput(prev => ({ ...prev, [name]: value }));
  }, []);

  const processSingleLead = async (leadData: LeadInput): Promise<ParsedLeadScore | null> => {
    const leadDetailsString = `Lead Name: ${leadData.leadName}
Company: ${leadData.company}
Role: ${leadData.role}
Industry: ${leadData.industry}
Company Size: ${leadData.companySize}
Revenue: ${leadData.revenue}
Recent Engagements: ${leadData.recentEngagements}
Recent Activities: ${leadData.recentActivities}`;

    if (!process.env.API_KEY) {
      throw new Error("API Key is not configured. Please set the API_KEY environment variable.");
    }
    return await scoreLeadWithGemini(SYSTEM_INSTRUCTION, leadDetailsString);
  };

  const handleSubmitLead = useCallback(async () => {
    setError(null);
    setFileProcessingMessage(null);
    setIsLoading(true);

    try {
      const newScoredLead = await processSingleLead(currentLeadInput);
      if (newScoredLead) {
        setScoredLeads(prevLeads => [newScoredLead, ...prevLeads]);
        setCurrentLeadInput(initialLeadInputState); // Clear form
      } else {
        setError("Failed to parse the score from the API response for the manually entered lead. The response might not be in the expected format.");
      }
    } catch (err) {
      console.error("Error scoring manually entered lead:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred while scoring the manually entered lead.");
    } finally {
      setIsLoading(false);
    }
  }, [currentLeadInput]);

  const handleClearForm = useCallback(() => {
    setCurrentLeadInput(initialLeadInputState);
    setError(null);
    setFileProcessingMessage(null);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setFileProcessingMessage(null); // Clear previous messages
      setError(null);
    } else {
      setSelectedFile(null);
    }
  };

  const handleProcessExcelFile = async () => {
    if (!selectedFile) {
      setError("Please select an Excel file first.");
      return;
    }

    setError(null);
    setFileProcessingMessage("Starting file processing...");
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          throw new Error("Could not read file data.");
        }
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

        if (jsonData.length === 0) {
          setFileProcessingMessage("The Excel file is empty or the first sheet has no data.");
          setIsLoading(false);
          return;
        }

        const headers = Object.keys(jsonData[0]);
        const columnMapping: { [key in keyof LeadInput]?: string } = {};
        let missingRequiredColumns: string[] = [];

        EXPECTED_COLUMNS_CONFIG.forEach(config => {
          const foundHeader = headers.find(h => 
            config.names.some(name => name.toLowerCase() === h.trim().toLowerCase())
          );
          if (foundHeader) {
            columnMapping[config.field] = foundHeader;
          } else {
            // Check if this is a mandatory field (e.g. leadName, company)
            if (config.field === 'leadName' || config.field === 'company') {
                 missingRequiredColumns.push(config.names[0]); // Report primary name
            }
          }
        });
        
        if (missingRequiredColumns.length > 0) {
            throw new Error(`Missing required columns in Excel: ${missingRequiredColumns.join(', ')}. Required columns are Lead Name and Company.`);
        }


        const leadsFromFile: LeadInput[] = jsonData.map((row): LeadInput => {
          const lead: Partial<LeadInput> = {};
          for (const key in columnMapping) {
            const typedKey = key as keyof LeadInput;
            const excelHeader = columnMapping[typedKey];
            if (excelHeader) {
              lead[typedKey] = row[excelHeader] !== undefined && row[excelHeader] !== null ? String(row[excelHeader]) : '';
            } else {
              // Ensure all fields from LeadInput are present, even if not in Excel
              if (!EXPECTED_COLUMNS_CONFIG.find(c => c.field === typedKey)?.names.some(n => headers.find(h => h.trim().toLowerCase() === n.toLowerCase()))) {
                 lead[typedKey] = ''; // Default to empty string if not found and not mapped
              }
            }
          }
          // Ensure all LeadInput fields are present
          Object.keys(initialLeadInputState).forEach(fieldKey => {
            if (!(fieldKey in lead)) {
              (lead as any)[fieldKey] = '';
            }
          });
          return lead as LeadInput;
        }).filter(lead => lead.leadName && lead.company); // Filter out leads missing essential info

        if (leadsFromFile.length === 0) {
          setFileProcessingMessage("No valid leads found in the Excel file. Ensure 'Lead Name' and 'Company' columns are present and populated.");
          setIsLoading(false);
          return;
        }
        
        setFileProcessingMessage(`Found ${leadsFromFile.length} leads. Processing...`);
        
        const newlyScoredLeads: ParsedLeadScore[] = [];
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < leadsFromFile.length; i++) {
          const leadData = leadsFromFile[i];
          setFileProcessingMessage(`Processing lead ${i + 1} of ${leadsFromFile.length}: ${leadData.leadName}`);
          try {
            const scoredLead = await processSingleLead(leadData);
            if (scoredLead) {
              newlyScoredLeads.push(scoredLead);
              successCount++;
            } else {
              console.warn(`Failed to parse score for lead: ${leadData.leadName} from Excel.`);
              errorCount++;
            }
          } catch (leadError) {
            console.error(`Error scoring lead ${leadData.leadName} from Excel:`, leadError);
            errorCount++;
          }
        }
        setScoredLeads(prev => [...newlyScoredLeads.reverse(), ...prev]); // Add new leads to the top
        setFileProcessingMessage(`File processing complete. Successfully scored ${successCount} leads. Failed to score ${errorCount} leads.`);

      } catch (err) {
        console.error("Error processing Excel file:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred while processing the Excel file.");
        setFileProcessingMessage(null);
      } finally {
        setIsLoading(false);
        setSelectedFile(null); // Clear selected file after processing
        // Optionally clear the file input visually
        const fileInput = document.getElementById('excel-file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
    };
    reader.onerror = () => {
      setError("Failed to read the selected file.");
      setIsLoading(false);
      setFileProcessingMessage(null);
    };
    reader.readAsBinaryString(selectedFile);
  };


  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--accent-text-primary)] mb-2 text-center">Lead Scoring</h1>
      <p className="mb-8 text-center text-sm sm:text-base" style={{ color: 'var(--text-secondary)'}}>
        Enter lead details below or upload an Excel file to receive AI-powered scores and actionable insights.
      </p>

      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      {fileProcessingMessage && !error && (
        <div className="mb-4 p-3 rounded-md text-sm" style={{ backgroundColor: 'var(--accent-bg-light)', color: 'var(--accent-text-primary)'}}>
          {fileProcessingMessage}
        </div>
      )}

      {/* Excel Upload Section */}
      <div 
        className="mb-10 p-6 rounded-lg shadow"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderWidth: '1px' }}
      >
        <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)'}}>Upload Excel File</h2>
        <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)'}}>
          Accepted formats: .xlsx, .xls. The first sheet will be used.
          Expected columns (case-insensitive): Lead Name, Company, Role, Industry, Company Size, Revenue, Recent Engagements, Recent Activities.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-grow">
            <label htmlFor="excel-file-input" className="block text-sm font-medium mb-1" style={{color: 'var(--text-secondary)'}}>
                Choose file
            </label>
            <input
              type="file"
              id="excel-file-input"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="block w-full text-sm rounded-md cursor-pointer
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-[var(--accent-primary)] file:text-[var(--accent-text-on-primary)]
                         hover:file:bg-[var(--accent-hover)]
                         bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)]
                         focus:outline-none focus:ring-2 focus:ring-[var(--accent-focus-ring)] focus:border-[var(--accent-border)]"
              disabled={isLoading}
            />
             {selectedFile && <p className="text-xs mt-1" style={{color: 'var(--text-secondary)'}}>Selected: {selectedFile.name}</p>}
          </div>
          <button
            onClick={handleProcessExcelFile}
            disabled={!selectedFile || isLoading}
            className="w-full sm:w-auto py-2.5 px-6 rounded-md shadow-sm text-sm font-medium
                       focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-[var(--accent-focus-ring)]
                       disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--accent-text-on-primary)'
            }}
          >
            {isLoading && selectedFile ? 'Processing...' : 'Process Excel File'}
          </button>
        </div>
      </div>
      
      <div className="mb-8 text-center">
        <p className="text-sm font-medium" style={{color: 'var(--text-secondary)'}}>- OR -</p>
      </div>


      <h2 className="text-xl font-semibold mb-3 text-center" style={{ color: 'var(--text-primary)'}}>Enter Lead Manually</h2>
      <LeadInputForm
        leadInput={currentLeadInput}
        onInputChange={handleInputChange}
        onSubmit={handleSubmitLead}
        onClear={handleClearForm}
        isLoading={isLoading && !selectedFile} // Only show loading on manual form if not processing file
      />

      {isLoading && <div className="mt-8 flex justify-center"><LoadingSpinner /></div>}
      
      {scoredLeads.length > 0 && (
        <div className="mt-12">
          <h2 
            className="text-2xl font-semibold mb-6 pb-2" 
            style={{ 
              color: 'var(--accent-text-primary)', 
              borderBottom: '2px solid var(--accent-border)' 
            }}
          >Scored Leads</h2>
          <ScoredLeadsDisplay leads={scoredLeads} />
        </div>
      )}

      {scoredLeads.length === 0 && !isLoading && !error && (
         <div 
            className="mt-12 text-center p-8 rounded-lg shadow"
            style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)', 
                borderWidth: '1px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
                 className="mx-auto h-12 w-12" 
                 style={{ color: 'var(--text-secondary)' }}
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg mt-4 font-semibold" style={{ color: 'var(--text-primary)' }}>No leads scored yet.</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Enter lead details or upload an Excel file to get started!</p>
         </div>
      )}
    </div>
  );
};

export default DashboardPage;
