import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PIHLA_FOLK_PALETTE } from '../styles/colorPalettes';

/**
 * LanguageSwitcher component
 * Allows users to switch between Finnish and English
 */
export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const colors = PIHLA_FOLK_PALETTE.colors;

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
          backgroundColor: language === 'fi' ? colors.bgSecondary : 'transparent',
          color: language === 'fi' ? colors.textPrimary : colors.bgPrimary,
          border: `2px solid ${colors.bgPrimary}`,
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (language !== 'fi') {
            e.currentTarget.style.backgroundColor = 'rgba(244, 244, 244, 0.1)';
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
          backgroundColor: language === 'en' ? colors.bgSecondary : 'transparent',
          color: language === 'en' ? colors.textPrimary : colors.bgPrimary,
          border: `2px solid ${colors.bgPrimary}`,
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (language !== 'en') {
            e.currentTarget.style.backgroundColor = 'rgba(244, 244, 244, 0.1)';
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
