import React from 'react';
import { PIHLA_FOLK_PALETTE } from '../styles/colorPalettes';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';
import { getOptimizedImagePath } from '../utils/imageUtils';

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
  const palette = PIHLA_FOLK_PALETTE;
  const colors = PIHLA_FOLK_PALETTE.colors;
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
          src={getOptimizedImagePath(production.image)}
          alt={production.title}
          style={{
            maxWidth: '600px',
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto'
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
            color: colors.bgPrimary,
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
            color: colors.accentPrimary
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
              color: 'rgba(12, 12, 12, 0.6)',
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
            color: 'rgba(12, 12, 12, 0.9)',
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
              borderTop: '1px solid rgba(12, 12, 12, 0.15)'
            }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'rgba(12, 12, 12, 0.6)',
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
                color: 'rgba(12, 12, 12, 0.6)',
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
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/assets/kuosiRaportti.jpg)',
            backgroundSize: '300px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top left',
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
                backgroundColor: 'rgba(244, 244, 244, 0.80)',
                backdropFilter: 'blur(5px)',
                borderRadius: '16px',
                boxShadow: '0 12px 40px rgba(12, 12, 12, 0.5)',
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
                  color: colors.accentPrimary,
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
                    borderBottom: index < data.ongoing.productions.length - 1 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none'
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
                  color: colors.accentPrimary,
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
                    borderBottom: index < data.past.productions.length - 1 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none'
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
