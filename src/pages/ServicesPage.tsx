import React from 'react';
import { ACTIVE_PALETTE } from '../styles/colorPalettes';
import { Navigation } from '../components/Navigation';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * ServicesPage - Pihla Folk Services
 *
 * Features:
 * - Hero section with wallpaper background
 * - Service cards in responsive grid
 * - Icon-based visual design
 * - Clean, professional layout
 */

interface Service {
  id: string;
  title: {
    fi: string;
    en: string;
  };
  description: {
    fi: string;
    en: string;
  };
  icon: string;
}

interface ServicesContent {
  intro: {
    title: {
      fi: string;
      en: string;
    };
    description: {
      fi: string;
      en: string;
    };
  };
  services: Service[];
}

export const ServicesPage: React.FC = () => {
  const palette = ACTIVE_PALETTE;
  const { isMobile, isTablet } = useScreenSize();
  const data = useContentData<ServicesContent>('services.json');
  const t = useTranslations();

  // Set page metadata for SEO
  usePageMeta({
    title: t.seo.services.title,
    description: t.seo.services.description
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
          color: palette.colors.textHeading
        }}>
          {t.common.loading}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Navigation Header */}
      <Navigation />

      {/* Full Page Container with Wallpaper Background */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Background Wallpaper */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: 'url(/assets/wallpaper-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
            zIndex: -2
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.3) 100%)',
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
              marginBottom: '1rem'
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                margin: 0,
                textShadow: '2px 2px 4px rgba(255,255,255,0.5)'
              }}
            >
              {t.services.title}
            </h1>
          </div>

          {/* Intro Text */}
          <div
            style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 4rem auto',
              padding: '0 2rem'
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: '1.8',
                color: palette.colors.textHeading,
                textShadow: '1px 1px 3px rgba(255,255,255,0.6)',
                fontWeight: 500
              }}
            >
              {data.intro.description.fi}
            </p>
          </div>

          {/* Services Grid */}
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: isMobile ? '0 1rem' : '0 2rem'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? '1fr'
                  : isTablet
                  ? 'repeat(2, 1fr)'
                  : 'repeat(3, 1fr)',
                gap: isMobile ? '1.5rem' : '2rem',
                marginBottom: '4rem'
              }}
            >
              {data.services.map((service) => (
                <div
                  key={service.id}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    border: `2px solid ${palette.colors.borderColor}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.25)';
                    e.currentTarget.style.borderColor = palette.colors.accentPrimary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    e.currentTarget.style.borderColor = palette.colors.borderColor;
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      fontSize: '3rem',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      margin: '0 0 1rem 0',
                      color: palette.colors.textHeading,
                      textAlign: 'center'
                    }}
                  >
                    {service.title.fi}
                  </h2>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.7',
                      color: palette.colors.textMuted,
                      margin: 0,
                      textAlign: 'center'
                    }}
                  >
                    {service.description.fi}
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
