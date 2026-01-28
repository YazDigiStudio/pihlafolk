import React from 'react';
import { Navigation } from '../components/Navigation';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { PIHLA_FOLK_PALETTE } from '../styles/colorPalettes';
import { usePageMeta } from '../hooks/usePageMeta';

interface CVSection {
  title: string;
  content: string;
}

interface CVContent {
  sections: CVSection[];
  showDownloadButton: boolean;
  cvFile: string;
  downloadButtonText: string;
}

/**
 * CVPage for Portfolio Template
 * Dynamic CV sections managed by CMS
 */

export const CVPage: React.FC = () => {
  const { isMobile } = useScreenSize();
  const palette = PIHLA_FOLK_PALETTE;
  const colors = PIHLA_FOLK_PALETTE.colors;
  const data = useContentData<CVContent>('cv.json');
  const t = useTranslations();

  // Set page metadata for SEO
  usePageMeta({
    title: t.seo.cv.title,
    description: t.seo.cv.description
  });

  if (!data) {
    return (
      <>
        <Navigation />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: colors.bgPrimary
        }}>
          {t.common.loading}
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />

      {/* Full Page Container with Background */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: 'url(/assets/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 42%',
            filter: 'brightness(0.5)',
            zIndex: -3
          }}
        />

        {/* White background layer */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(244, 244, 244, 0.35)',
            zIndex: -2
          }}
        />

        {/* Overlay gradient */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)',
            zIndex: -1
          }}
        />

        {/* Page Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            paddingTop: '6rem',
            paddingBottom: '4rem'
          }}
        >
          {/* Title Section */}
          <div
            style={{
              textAlign: 'center',
              color: palette.colors.textHeading,
              padding: '2rem',
              marginBottom: '3rem'
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                fontWeight: 300,
                letterSpacing: '0.1em',
                margin: 0,
                textTransform: 'uppercase',
                textShadow: '1px 1px 2px rgba(255,255,255,0.3)'
              }}
            >
              {t.cv.title}
            </h1>
          </div>

          {/* Content Container */}
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: isMobile ? '0 1rem' : '0 2rem',
              textAlign: 'center'
            }}
          >
            {/* Download Button */}
            {data.showDownloadButton && (
              <a
                href={data.cvFile}
                download
                style={{
                  display: 'inline-block',
                  marginBottom: '3rem',
                  padding: '1rem 2.5rem',
                  backgroundColor: 'rgba(244, 244, 244, 0.95)',
                  color: colors.textPrimary,
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(12,12,12,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.bgSecondary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(12,12,12,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(244, 244, 244, 0.95)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(12,12,12,0.3)';
                }}
              >
                {data.downloadButtonText}
              </a>
            )}

            {/* CV Sections */}
            <div
              style={{
                textAlign: 'left',
                color: palette.colors.textPrimary,
                lineHeight: '1.8'
              }}
            >
              {data.sections.map((section, index) => (
                <div key={index}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600, color: palette.colors.textHeading }}>
                    {section.title}
                  </h2>
                  <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
