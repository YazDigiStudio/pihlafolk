import React from 'react';
import { ACTIVE_PALETTE } from '../styles/colorPalettes';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
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
 * - Production sections with images and descriptions
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
  const { isMobile } = useScreenSize();
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
    <div>
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
      <div style={{ marginTop: '1rem' }}>
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
            color: '#ff0000'
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
            backgroundImage: 'url(/assets/wallpaper-productions-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
          {/* Outer Container for width control */}
          <div
            style={{
              maxWidth: '1200px',
              width: '95%',
              margin: '0 auto',
              padding: isMobile ? '1rem' : '2rem'
            }}
          >
            {/* Inner Content Container */}
            <div
              style={{
                padding: isMobile ? '1rem' : '3rem',
                backgroundColor: 'rgba(245, 242, 235, 0.95)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                minHeight: '600px'
              }}
            >
            {/* Ongoing Productions */}
            <div style={{ marginBottom: '4rem' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 700,
                  marginBottom: '2rem',
                  color: '#ff0000',
                  paddingBottom: '1rem',
                  borderBottom: '2px solid rgba(255, 0, 0, 0.2)'
                }}
              >
                {t.productions.ongoing}
              </h2>
              <div>
                {data.ongoing.productions.map((production, index) => (
                  <div key={production.id} style={{
                    marginBottom: index < data.ongoing.productions.length - 1 ? '3rem' : '0',
                    paddingBottom: index < data.ongoing.productions.length - 1 ? '3rem' : '0',
                    borderBottom: index < data.ongoing.productions.length - 1 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
                  }}>
                    <ProductionCard production={production} />
                  </div>
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
                  color: '#ff0000',
                  paddingBottom: '1rem',
                  borderBottom: '2px solid rgba(255, 0, 0, 0.2)'
                }}
              >
                {t.productions.past}
              </h2>
              <div>
                {data.past.productions.map((production, index) => (
                  <div key={production.id} style={{
                    marginBottom: index < data.past.productions.length - 1 ? '3rem' : '0',
                    paddingBottom: index < data.past.productions.length - 1 ? '3rem' : '0',
                    borderBottom: index < data.past.productions.length - 1 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
                  }}>
                    <ProductionCard production={production} />
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
