
import React from 'react';
import { Page, PageKey } from '../constants';

interface SidebarProps {
  activePage: PageKey;
  setActivePage: (page: PageKey) => void;
  pages: Page[];
}

// Basic SVG paths for icons - can be expanded or replaced with an icon library
const ICONS: Record<PageKey, string> = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3M7 21h10a2 2 0 002-2V9.5a2.5 2.5 0 00-1.186-2.165L12 3 6.186 7.335A2.5 2.5 0 005 9.5V19a2 2 0 002 2z",
  dashboard: "M9 17v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2m15-2v-2a3 3 0 00-3-3h-2a3 3 0 00-3 3v2m9-10V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0h-2m-2 0H5",
  settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z",
  theme: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z", // Moon for dark theme
  privacy: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11V6c0-1.21.986-2.204 2.201-2.204A2.204 2.204 0 0112.4 6v5c0 1.21-.986 2.204-2.201 2.204A2.204 2.204 0 018 10.796M12 11c0-2.21-.894-4.208-2.353-5.657M12 11V6m0 5H9.353M12 11H6.647M12 11v3.867L18.799 21M12 11V3", // Shield
  about: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Info circle
};

const SidebarIcon: React.FC<{ path: string, isActive: boolean }> = ({ path, isActive }) => (
  <svg 
    className={`w-5 h-5 mr-3 transition-colors duration-150 
                ${isActive 
                    ? 'text-[var(--accent-text-primary)]' 
                    : 'text-[var(--text-secondary)] group-hover:text-[var(--accent-text-primary)]' // Use text-secondary for inactive icon
                }`}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
  </svg>
);


export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, pages }) => {
  return (
    <aside 
      className="w-64 shadow-md flex-shrink-0 overflow-y-auto transition-colors duration-300"
      style={{
        backgroundColor: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--border-color)'
      }}
    >
      <nav className="p-4">
        <ul className="space-y-1">
          {pages.map((page) => {
            const isActive = activePage === page.key;
            return (
              <li key={page.key}>
                <button
                  onClick={() => setActivePage(page.key)}
                  className={`group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-150 ease-in-out
                              ${
                                isActive
                                  ? 'bg-[var(--accent-bg-light)] text-[var(--accent-text-primary)] shadow-sm'
                                  : 'hover:bg-[var(--accent-bg-light)] hover:text-[var(--accent-text-primary)]'
                              }`}
                  style={{
                     color: isActive ? 'var(--accent-text-primary)' : 'var(--text-primary)' // Base text color
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <SidebarIcon path={ICONS[page.key] || ICONS['home']} isActive={isActive} />
                  {page.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
