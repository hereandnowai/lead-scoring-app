
import React from 'react';
import { COMPANY_NAME } from '../constants';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div 
      className="p-6 sm:p-8 rounded-lg shadow-xl 
                   prose prose-slate dark:prose-invert 
                   max-w-none 
                   prose-h1:text-[var(--accent-text-primary)]
                   prose-h2:text-[var(--text-primary)] /* Use theme var */
                   prose-strong:text-[var(--text-primary)] /* Use theme var */
                   prose-a:text-[var(--accent-600)] dark:prose-a:text-[var(--accent-400)]
                   hover:prose-a:text-[var(--accent-700)] dark:hover:prose-a:text-[var(--accent-300)]
                   prose-code:text-pink-600 dark:prose-code:text-pink-400
                   prose-ul:text-[var(--text-secondary)] /* Use theme var */
                   prose-p:text-[var(--text-secondary)] /* Use theme var */
                   transition-colors duration-300"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

      <p>
        Welcome to the Lead Scoring AI application provided by {COMPANY_NAME} ("we," "us," or "our"). 
        We are committed to protecting your privacy. This Privacy Policy explains how we collect, 
        use, disclose, and safeguard your information when you use our application.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect information about you in a variety of ways. The information we may collect via the Application includes:
      </p>
      <ul>
        <li>
          <strong>Lead Data:</strong> When you input lead details (such as name, company, role, industry, company size, revenue, 
          recent engagements, and recent activities) into the application for scoring, this data is processed to provide you 
          with a lead score. This data is sent to the Google Gemini API for processing. We do not store this lead data persistently 
          on our servers after the scoring is complete and displayed to you in your current session.
        </li>
        <li>
          <strong>API Key:</strong> The application requires a Google Gemini API key to function. This API key is stored and used 
          exclusively in your browser's environment (e.g., from an environment variable you configure) and is sent directly 
          from your browser to the Google Gemini API. We do not collect, store, or have access to your API key.
        </li>
        <li>
          <strong>Usage Data:</strong> We may collect anonymous usage data to improve our application, such as features accessed or error occurrences. 
          This data does not personally identify you.
        </li>
      </ul>

      <h2>2. Use of Your Information</h2>
      <p>
        Having accurate information permits us to provide you with a smooth, efficient, and customized experience. 
        Specifically, we may use information collected about you via the Application to:
      </p>
      <ul>
        <li>Provide the lead scoring service.</li>
        <li>Improve our Application and offerings.</li>
        <li>Monitor and analyze usage and trends to improve your experience with the Application.</li>
        <li>Respond to your requests and troubleshoot problems.</li>
      </ul>

      <h2>3. Disclosure of Your Information</h2>
      <p>
        We do not sell, trade, rent, or otherwise share your personal information or the lead data you process for scoring with third parties for their marketing purposes.
        Lead data is sent to the Google Gemini API for the sole purpose of generating a score as requested by you. Please refer to Google's Privacy Policy for information on how they handle data.
      </p>

      <h2>4. Security of Your Information</h2>
      <p>
        We use administrative, technical, and physical security measures to help protect your information. 
        While we have taken reasonable steps to secure the information you provide to us, please be aware that 
        despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission 
        can be guaranteed against any interception or other type of misuse.
      </p>
       <p>
        Your Google Gemini API key is handled client-side and its security is your responsibility within your environment.
      </p>

      <h2>5. Third-Party Websites</h2>
      <p>
        The Application may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. 
        Once you have used these links to leave the Application, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee 
        the safety and privacy of your information.
      </p>
      
      <h2>6. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. 
        You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have questions or comments about this Privacy Policy, please contact us at [Insert Contact Email or Link to Contact Page for {COMPANY_NAME}].
      </p>
      
      <p 
        className="mt-10 text-sm italic"
        style={{ color: 'var(--text-secondary)'}}
      >
        This is a template privacy policy. Please review and adapt it to your specific data handling practices and consult with a legal professional if necessary.
      </p>
    </div>
  );
};
