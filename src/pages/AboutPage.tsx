import React from 'react';
import { Navigation } from '../components/Navigation';
import { useScreenSize } from '../hooks/useScreenSize';
import { ACTIVE_PALETTE } from '../styles/colorPalettes';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';

interface AboutContent {
  title: string;
  bioParagraphs: string[];
}

/**
 * AboutPage for Portfolio Template
 * Bio page with rounded text box
 */

export const AboutPage: React.FC = () => {
  const { isMobile } = useScreenSize();
  const palette = ACTIVE_PALETTE;
  const data = useContentData<AboutContent>('about.json');
  const t = useTranslations();

  // Set page metadata for SEO
  usePageMeta({
    title: t.seo.about.title,
    description: t.seo.about.description
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
          color: '#FFFFFF'
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
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
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
              {data.title}
            </h1>
          </div>

          {/* Content Container */}
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: isMobile ? '0 1rem' : '0 2rem'
            }}
          >
            {/* Bio Text Box */}
            <div
              style={{
                backgroundColor: 'rgba(204, 205, 199, 0.7)',
                borderRadius: '16px',
                padding: isMobile ? '2rem 1.5rem' : '3rem 3.5rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                border: `2px solid ${palette.colors.borderColor}`
              }}
            >
              {data.bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: palette.colors.textPrimary,
                    margin: index === data.bioParagraphs.length - 1 ? 0 : '0 0 1.5rem 0'
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
