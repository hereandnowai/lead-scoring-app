
import React from 'react';
import { COMPANY_NAME, COMPANY_LOGO_URL, COMPANY_IMAGE_URL } from '../constants';

export const AboutPage: React.FC = () => {
  return (
    <div 
      className="p-6 sm:p-8 rounded-lg shadow-xl transition-colors duration-300"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="text-center mb-10">
        <img src={COMPANY_LOGO_URL} alt={`${COMPANY_NAME} Logo`} 
            className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg border-2" 
            style={{ borderColor: 'var(--border-color)'}}
        />
        <img src={COMPANY_IMAGE_URL} alt={`${COMPANY_NAME} Title`} className="max-h-16 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-[var(--accent-text-primary)] mb-2">About Lead Scoring</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)'}}>Version 1.0.0</p>
      </div>

      <div className="prose prose-slate dark:prose-invert
                      max-w-none
                      prose-h2:text-[var(--text-primary)] prose-h2:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-[var(--border-color)]
                      prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed 
                      prose-ul:text-[var(--text-secondary)] prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-1
                      prose-strong:text-[var(--text-primary)] prose-strong:font-semibold
                      prose-a:text-[var(--accent-600)] dark:prose-a:text-[var(--accent-400)]
                      hover:prose-a:text-[var(--accent-700)] dark:hover:prose-a:text-[var(--accent-300)]
                      ">
        <p>
          The Lead Scoring application, developed by <strong style={{ color: 'var(--text-primary)'}}>{COMPANY_NAME}</strong>, is designed to empower sales and marketing professionals
          by providing an intelligent and efficient way to assess and prioritize potential leads.
        </p>
        
        <h2>How It Works</h2>
        <p>
          This application takes lead information provided by you – such as industry, company size, role, engagement history, and recent activities – 
          and uses a sophisticated AI model to generate a comprehensive score. The scoring is broken down into:
        </p>
        <ul>
          <li><strong>Fit Score:</strong> How well the lead matches your ideal customer profile.</li>
          <li><strong>Engagement Score:</strong> The level of interaction the lead has had with your company.</li>
          <li><strong>Activity Score:</strong> Recent actions indicating buying intent.</li>
        </ul>
        <p>
          Based on these scores, the AI provides a total score and a brief recommendation, helping you quickly identify high-potential leads 
          that require immediate attention.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to harness the power of cutting-edge artificial intelligence, specifically leveraging Google's Gemini models, 
          to deliver actionable insights that drive sales productivity and improve conversion rates. We aim to make sophisticated AI tools 
          accessible and easy to use for businesses of all sizes.
        </p>

        <h2>Technology Stack</h2>
        <p>
          This application is built using modern web technologies including:
        </p>
        <ul>
          <li>React for the user interface.</li>
          <li>Tailwind CSS for styling.</li>
          <li>TypeScript for robust and maintainable code.</li>
          <li>Google Gemini API for the AI-powered lead scoring.</li>
        </ul>
        
        <h2>Future Development</h2>
        <p>
          We are continuously working to enhance Lead Scoring. Future updates may include features like:
        </p>
        <ul>
          <li>Batch lead processing.</li>
          <li>Deeper integration options with CRM systems.</li>
          <li>Customizable scoring models.</li>
          <li>Advanced analytics and reporting.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          We welcome your feedback and inquiries. If you have any questions, suggestions, or require support, 
          please feel free to reach out to {COMPANY_NAME} at [Insert Contact Information or Link].
        </p>
      </div>
       <p 
        className="mt-10 text-sm italic text-center"
        style={{ color: 'var(--text-secondary)'}}
       >
        Thank you for using Lead Scoring by {COMPANY_NAME}!
      </p>
    </div>
  );
};
