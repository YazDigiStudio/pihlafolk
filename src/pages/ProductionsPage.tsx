import React from 'react';
import { ACTIVE_PALETTE } from '../styles/colorPalettes';
import { Navigation } from '../components/Navigation';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * ProductionsPage - Pihla Folk Productions
 *
 * Features:
 * - Hero section with wallpaper background
 * - Ongoing productions section
 * - Past productions section
 * - Production cards with images and descriptions
 */

interface Production {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
  status: 'ongoing' | 'completed';
  year: string;
  image: string;
  description: {
    fi: string;
    en: string;
  };
  funding?: {
    fi: string[];
    en: string[];
  };
  link: string;
}

interface ProductionsContent {
  ongoing: {
    title: {
      fi: string;
      en: string;
    };
    productions: Production[];
  };
  past: {
    title: {
      fi: string;
      en: string;
    };
    productions: Production[];
  };
}

export const ProductionsPage: React.FC = () => {
  const palette = ACTIVE_PALETTE;
  const { isMobile, isTablet } = useScreenSize();
  const data = useContentData<ProductionsContent>('productions.json');
  const t = useTranslations();

  // Set page metadata for SEO
  usePageMeta({
    title: t.seo.productions.title,
    description: t.seo.productions.description
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

  const ProductionCard: React.FC<{ production: Production }> = ({ production }) => (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
    >
      {/* Production Image */}
      {production.image && (
        <img
          src={production.image}
          alt={production.title}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '16/9',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      )}

      {/* Production Info */}
      <div style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
        {/* Year Badge */}
        <div
          style={{
            display: 'inline-block',
            padding: '0.375rem 0.875rem',
            backgroundColor: palette.colors.accentPrimary,
            color: '#FFFFFF',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: '4px',
            marginBottom: '1rem'
          }}
        >
          {production.year}
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: '0 0 0.5rem 0',
            color: palette.colors.textHeading
          }}
        >
          {production.title}
        </h2>

        {/* Subtitle */}
        {production.subtitle && (
          <p
            style={{
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: palette.colors.textMuted,
              margin: '0 0 1rem 0'
            }}
          >
            {production.subtitle}
          </p>
        )}

        {/* Description */}
        <p
          style={{
            fontSize: '1rem',
            lineHeight: '1.7',
            color: palette.colors.textPrimary,
            margin: '0 0 1rem 0',
            whiteSpace: 'pre-line'
          }}
        >
          {production.description.fi}
        </p>

        {/* Funding */}
        {production.funding && production.funding.fi.length > 0 && (
          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: `1px solid ${palette.colors.borderColor}`
            }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: palette.colors.textMuted,
                margin: '0 0 0.5rem 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {t.productions.funding}:
            </p>
            <p
              style={{
                fontSize: '0.9rem',
                color: palette.colors.textMuted,
                margin: 0
              }}
            >
              {production.funding.fi.join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );

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
            zIndex: -3
          }}
        />

        {/* White overlay for readability */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
              marginBottom: '3rem'
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
              {t.productions.title}
            </h1>
          </div>

          {/* Main Content */}
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: isMobile ? '0 1rem' : '0 2rem'
            }}
          >
            {/* Ongoing Productions */}
            <div style={{ marginBottom: '5rem' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 700,
                  marginBottom: '2rem',
                  color: palette.colors.textHeading,
                  textShadow: '1px 1px 3px rgba(255,255,255,0.6)'
                }}
              >
                {t.productions.ongoing}
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile
                    ? '1fr'
                    : isTablet
                    ? '1fr'
                    : 'repeat(2, 1fr)',
                  gap: isMobile ? '2rem' : '3rem'
                }}
              >
                {data.ongoing.productions.map((production) => (
                  <ProductionCard key={production.id} production={production} />
                ))}
              </div>
            </div>

            {/* Past Productions */}
            <div>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 700,
                  marginBottom: '2rem',
                  color: palette.colors.textHeading,
                  textShadow: '1px 1px 3px rgba(255,255,255,0.6)'
                }}
              >
                {t.productions.past}
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile
                    ? '1fr'
                    : isTablet
                    ? '1fr'
                    : 'repeat(2, 1fr)',
                  gap: isMobile ? '2rem' : '3rem'
                }}
              >
                {data.past.productions.map((production) => (
                  <ProductionCard key={production.id} production={production} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
