
export const COMPANY_NAME = "HEREANDNOW AI RESEARCH INSTITUTE";
export const COMPANY_LOGO_URL = "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Fevicon%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-03.png";
export const COMPANY_IMAGE_URL = "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png";

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const SYSTEM_INSTRUCTION = `You are a lead scoring analysis expert. Your task is to assess and score potential sales leads based on their fit with an ideal customer profile (ICP), engagement with the company, and recent activity. Provide a clear numerical score and a detailed analysis for each lead.

### Scoring Criteria

- **Fit Score (0–40):** How well the lead matches the ICP (industry, company size, role, revenue, etc.).
- **Engagement Score (0–30):** Level of interaction (website visits, email opens, downloads, event attendance, etc.).
- **Activity Score (0–30):** Recent actions or signals of buying intent (e.g., demo requests, pricing page visits, recent replies).

**Total Score:** Sum of all three (0–100). Higher scores indicate higher conversion potential.

### Response Format

For each lead, respond in the following format:
\`\`\`
Lead Name: [Lead Name]
Company: [Company Name]
Role: [Role]
Score: [Total Score out of 100]

Scoring Breakdown:
- Fit Score: [0–40]
- Engagement Score: [0–30]
- Activity Score: [0–30]

Detailed Analysis:
- Positive Signals: [List specific positive attributes or signals observed. Explain why they are positive. Be concise but informative.]
- Potential Concerns: [List any potential risks, weaknesses, or red flags. Explain why these are concerns.]
- Suggested Next Steps: [Provide actionable recommendations for sales or marketing to pursue this lead. Be specific.]
\`\`\`
`;

export type PageKey = 'home' | 'dashboard' | 'settings' | 'theme' | 'privacy' | 'about';

export type Page = {
  key: PageKey;
  name: string;
};

export const PAGES: Page[] = [
  { key: 'home', name: 'Home' },
  { key: 'dashboard', name: 'Dashboard' },
  { key: 'settings', name: 'Settings' },
  { key: 'theme', name: 'Theme' },
  { key: 'privacy', name: 'Privacy Policy' },
  { key: 'about', name: 'About' },
];

// Accent Color Definitions
export const ACCENT_COLOR_OPTIONS = [
    { name: 'Teal', className: 'teal', color: '#0d9488' }, // approx teal-600
    { name: 'Blue', className: 'blue', color: '#2563eb' }, // approx blue-600
    { name: 'Amber', className: 'amber', color: '#d97706' }, // approx amber-600
    { name: 'Rose', className: 'rose', color: '#e11d48' }, // approx rose-600
    { name: 'Custom Green', className: 'customGreen', color: '#60C85B' },
    { name: 'Custom Blue', className: 'customBlue', color: '#7AD8FE' },
] as const;

export type AccentColor = typeof ACCENT_COLOR_OPTIONS[number]['className'];

interface ColorShades {
  50: string; 100: string; 200: string; 300: string; 400: string; 
  500: string; 600: string; 700: string; 800: string; 900: string; 950: string;
}

export interface AccentColorPalette {
  light: ColorShades;
  dark: ColorShades;
}

export const ACCENT_PALETTES: Record<AccentColor, AccentColorPalette> = {
  teal: {
    light: {
      50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
      500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e'
    },
    dark: { // For dark theme, "main" colors might be lighter shades
      50: '#134e4a', 100: '#115e59', 200: '#0f766e', 300: '#0d9488', 400: '#14b8a6',
      500: '#2dd4bf', 600: '#5eead4', 700: '#99f6e4', 800: '#ccfbf1', 900: '#f0fdfa', 950: '#ffffff'
    }
  },
  blue: {
    light: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
      500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
    },
    dark: {
      50: '#1e3a8a', 100: '#1e40af', 200: '#1d4ed8', 300: '#2563eb', 400: '#3b82f6',
      500: '#60a5fa', 600: '#93c5fd', 700: '#bfdbfe', 800: '#dbeafe', 900: '#eff6ff', 950: '#ffffff'
    }
  },
  amber: {
    light: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
      500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03'
    },
    dark: {
      50: '#78350f', 100: '#92400e', 200: '#b45309', 300: '#d97706', 400: '#f59e0b',
      500: '#fbbf24', 600: '#fcd34d', 700: '#fde68a', 800: '#fef3c7', 900: '#fffbeb', 950: '#ffffff'
    }
  },
  rose: {
    light: {
      50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
      500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519'
    },
    dark: {
      50: '#881337', 100: '#9f1239', 200: '#be123c', 300: '#e11d48', 400: '#f43f5e',
      500: '#fb7185', 600: '#fda4af', 700: '#fecdd3', 800: '#ffe4e6', 900: '#fff1f2', 950: '#ffffff'
    }
  },
  customGreen: {
    light: { 
      50: '#F3FCF2', 100: '#E7F9E5', 200: '#CFEFCA', 300: '#B6E5AF', 400: '#9EDC94',
      500: '#82D97D', 600: '#60C85B', 700: '#4EAA4A', 800: '#3C8C38', 900: '#2B6D27', 950: '#194E17'
    },
    dark: { 
      50: '#061705', 100: '#0D2D0B', 200: '#134411', 300: '#1A5A17', 400: '#60C85B', // Using 400 as a primary lighter shade for dark mode
      500: '#82D97D', 600: '#A0E39C', 700: '#BEEBCB', 800: '#DBF3D9', 900: '#EDF9EC', 950: '#F6FDF5'
    }
  },
  customBlue: {
    light: { 
      50: '#F0FBFF', 100: '#E0F8FF', 200: '#C2F0FF', 300: '#A3E7FF', 400: '#7AD8FE',
      500: '#47C5FC', 600: '#1FB1F8', 700: '#0A94D8', 800: '#0877AD', 900: '#065982', 950: '#043C5B'
    },
    dark: { 
      50: '#01212C', 100: '#024259', 200: '#036485', 300: '#0485B2', 400: '#7AD8FE', // Using 400 as a primary lighter shade for dark mode
      500: '#9AE2FE', 600: '#B5EAFF', 700: '#CFF1FF', 800: '#E6F7FF', 900: '#F2FAFF', 950: '#FAFDFF'
    }
  }
};
