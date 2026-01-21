import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * LanguageSwitcher component
 * Allows users to switch between Finnish and English
 */
export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center'
      }}
    >
      <button
        onClick={() => setLanguage('fi')}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: language === 'fi' ? '#FFFFFF' : 'transparent',
          color: language === 'fi' ? '#000000' : '#FFFFFF',
          border: '2px solid #FFFFFF',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (language !== 'fi') {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (language !== 'fi') {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        FI
      </button>
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: language === 'en' ? '#FFFFFF' : 'transparent',
          color: language === 'en' ? '#000000' : '#FFFFFF',
          border: '2px solid #FFFFFF',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (language !== 'en') {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (language !== 'en') {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        EN
      </button>
    </div>
  );
};
