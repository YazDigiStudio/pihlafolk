import React from 'react';
import { ACTIVE_PALETTE } from '../styles/colorPalettes';
import { Navigation } from '../components/Navigation';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';

interface HomeContent {
  name: string;
  subtitle: string;
  heroParagraph1: string;
  heroParagraph2: string;
  showButton1: boolean;
  ctaButton1Text: string;
  ctaButton1Link: string;
  showButton2: boolean;
  ctaButton2Text: string;
  ctaButton2Link: string;
}

/**
 * HomePage for Portfolio Template
 *
 * Full-page hero design:
 * - Background image fills entire viewport
 * - All content (name, bio, buttons) overlaid on image
 * - Clean, dramatic presentation
 * - Fixed navigation header
 * - Responsive spacing for mobile/tablet/desktop
 */

export const HomePage: React.FC = () => {
  const palette = ACTIVE_PALETTE;
  const { isMobile, isTablet } = useScreenSize();
  const data = useContentData<HomeContent>('home.json');
  const t = useTranslations();

  // Set page metadata for SEO
  usePageMeta({
    title: t.seo.home.title,
    description: t.seo.home.description
  });

  if (!data) {
    return (
      <>
        <Navigation showName={false} />
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
      {/* Navigation Header - Hide name since it's in the hero */}
      <Navigation showName={false} />

      {/* Hero Section */}
      <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}
    >
      {/* Full-page Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundPositionY: isMobile ? '85%' : '42%',
          filter: isMobile ? 'brightness(1)' : 'brightness(1)'
        }}
      />

      {/* White overlay for mobile to lighten background */}
      {isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          }}
        />
      )}

      {/* Overlay gradient for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Content Container - All content overlaid */}
      <div
        style={{
          marginTop: isMobile ? '45vh' : isTablet ? '6rem' : '8rem',
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          color: '#FFFFFF',
          padding: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
          maxWidth: '900px',
          width: '100%'
        }}
      >
        {/* Name */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 300,
            letterSpacing: '0.15em',
            margin: '0 0 1.5rem 0',
            textTransform: 'uppercase',
            textShadow: '2px 4px 8px rgba(0,0,0,0.6)',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}
        >
          {data.name}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            margin: '0 0 2.5rem 0',
            textShadow: '1px 2px 4px rgba(0,0,0,0.5)',
            opacity: 0.95
          }}
        >
          {data.subtitle}
        </p>

        {/* Bio Text */}
        <div
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: '1.8',
            marginBottom: '2.5rem',
            textShadow: '1px 2px 4px rgba(0,0,0,0.6)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem auto'
          }}
        >
          <p style={{ margin: '0 0 1.5rem 0', opacity: 0.95 }}>
            {data.heroParagraph1}
          </p>
          <p style={{ margin: 0, opacity: 0.95 }}>
            {data.heroParagraph2}
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {data.showButton1 && (
            <a
              href={data.ctaButton1Link}
              style={{
                display: 'inline-block',
                padding: '0.875rem 2.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: palette.colors.textPrimary,
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
              }}
            >
              {data.ctaButton1Text}
            </a>
          )}
          {data.showButton2 && (
            <a
              href={data.ctaButton2Link}
              style={{
                display: 'inline-block',
                padding: '0.875rem 2.5rem',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                border: '2px solid rgba(255, 255, 255, 0.9)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
            >
              {data.ctaButton2Text}
            </a>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
