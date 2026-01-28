import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';
import { getOptimizedImagePath } from '../utils/imageUtils';
import { PIHLA_FOLK_PALETTE } from '../styles/colorPalettes';

interface AboutSection {
  header?: string;
  text: string;
  image?: string;
  imagePosition?: 'left' | 'right';
  maxTextLength?: number;
}

interface AboutContent {
  sections: AboutSection[];
}

/**
 * AboutPage - Pihla Folk Information
 *
 * Full-page design matching HomePage:
 * - Same background image as homepage
 * - Frosted glass container with semi-transparent background
 * - Flexible sections with configurable image positioning
 * - Text truncation for sections with images
 * - Managed through Decap CMS
 */

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const AboutPage: React.FC = () => {
  const { isMobile } = useScreenSize();
  const data = useContentData<AboutContent>('about.json');
  const t = useTranslations();
  const colors = PIHLA_FOLK_PALETTE.colors;

  // Set page metadata for SEO
  usePageMeta({
    title: t.seo.about.title,
    description: t.seo.about.description
  });

  if (!data) {
    return (
      <>
        <Navigation showName={true} />
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
      {/* Navigation Header */}
      <Navigation showName={true} />

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
        {/* Full-page Background Wallpaper */}
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

        {/* Outer Container for width control */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            width: '95%',
            margin: '0 auto',
            padding: isMobile ? '1rem' : '2rem',
            marginTop: isMobile ? '80px' : '120px'
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(244, 244, 244, 0.80)',
              backdropFilter: 'blur(5px)',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2.5rem',
              boxShadow: '0 12px 40px rgba(12, 12, 12, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '2rem' : '3rem',
              minHeight: '600px'
            }}
          >
            {/* Render Sections */}
            {data.sections && data.sections.map((section, index) => {
              const hasImage = !!section.image;
              const imagePosition = section.imagePosition || 'left';
              const maxLength = section.maxTextLength || (hasImage ? 800 : 10000);
              const displayText = truncateText(section.text, maxLength);

              if (!hasImage) {
                // Text-only section
                return (
                  <div
                    key={index}
                    style={{
                      width: '100%',
                      color: colors.textPrimary
                    }}
                  >
                    {section.header && (
                      <h2
                        style={{
                          fontSize: isMobile ? '1.5rem' : '2rem',
                          fontWeight: 700,
                          color: colors.accentPrimary,
                          marginTop: 0,
                          marginBottom: '1rem'
                        }}
                      >
                        {section.header}
                      </h2>
                    )}
                    <p
                      style={{
                        fontSize: isMobile ? '0.95rem' : '1.1rem',
                        lineHeight: 1.8,
                        color: colors.textPrimary,
                        whiteSpace: 'pre-wrap',
                        margin: 0
                      }}
                    >
                      {displayText}
                    </p>
                  </div>
                );
              }

              // Section with image
              return (
                <div
                  key={index}
                  style={{
                    width: '100%'
                  }}
                >
                  {section.header && (
                    <h2
                      style={{
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        fontWeight: 700,
                        color: colors.accentPrimary,
                        marginTop: 0,
                        marginBottom: '1rem'
                      }}
                    >
                      {section.header}
                    </h2>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: isMobile
                        ? 'column'
                        : imagePosition === 'left' ? 'row' : 'row-reverse',
                      alignItems: 'flex-start',
                      gap: isMobile ? '1.5rem' : '2rem',
                      width: '100%'
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        maxWidth: isMobile ? '100%' : '40%',
                        width: '100%',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(12, 12, 12, 0.4)',
                        flexShrink: 0
                      }}
                    >
                      <img
                        src={getOptimizedImagePath(section.image || "")}
                        alt={`Section ${index + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    </div>

                    {/* Text */}
                    <div
                      style={{
                        flex: 1,
                        color: colors.textPrimary,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <p
                        style={{
                          fontSize: isMobile ? '0.95rem' : '1.1rem',
                          lineHeight: 1.8,
                          color: colors.textPrimary,
                          whiteSpace: 'pre-wrap',
                          margin: 0
                        }}
                      >
                        {displayText}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
