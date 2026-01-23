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

      {/* Full Page Container with White Background */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#FFFFFF'
        }}
      >

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
                    position: 'relative',
                    borderRadius: '8px',
                    padding: isMobile ? '2.5rem 1.5rem' : '3rem 2rem',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    backgroundImage: 'url(/assets/pattern-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* White overlay for readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      zIndex: 0
                    }}
                  />

                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Logo Icon */}
                    <div
                      style={{
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        src="/assets/pihla-folk-icon.png"
                        alt="Pihla Folk"
                        style={{
                          height: '60px',
                          width: 'auto',
                          display: 'block'
                        }}
                      />
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
