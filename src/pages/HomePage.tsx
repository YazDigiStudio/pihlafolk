import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';

interface HomeSection {
  header?: string;
  text: string;
  image?: string;
  imagePosition?: 'left' | 'right';
  maxTextLength?: number;
}

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
  showMedia?: boolean;
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  additionalText?: string;
  sections?: HomeSection[];
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
 * - Optional additional sections below hero
 */

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const HomePage: React.FC = () => {
  const { isMobile } = useScreenSize();
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
        <Navigation showName={true} />
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
      {/* Navigation Header - Show Pihla Folk logo */}
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
          backgroundImage: 'url(/assets/wallpaper-home-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            borderRadius: '16px',
            padding: isMobile ? '1.5rem' : '2.5rem',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: isMobile ? '2rem' : '3rem',
            minHeight: '600px'
          }}
        >
          {/* Top Row: Image and Text Side by Side */}
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'flex-start',
              gap: isMobile ? '2rem' : '3rem',
              width: '100%'
            }}
          >
            {/* Media Container - Image or Video */}
            {data.showMedia && data.mediaUrl && (
              <div
                style={{
                  maxWidth: isMobile ? '80%' : '45vw',
                  width: '100%',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(10px)',
                  marginTop: isMobile ? '0' : '2.5rem'
                }}
              >
                {data.mediaType === 'video' ? (
                  <video
                    src={data.mediaUrl}
                    controls
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                ) : (
                  <img
                    src={data.mediaUrl}
                    alt="Media"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                )}
              </div>
            )}

            {/* Text Container */}
            <div
              style={{
                flex: 1,
                maxWidth: isMobile ? '100%' : '500px',
                padding: isMobile ? '0' : '0 1rem',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <h1
                style={{
                  fontSize: isMobile ? '2rem' : '3rem',
                  fontWeight: 700,
                  marginTop: 0,
                  marginBottom: '0.5rem',
                  color: '#FFFFFF'
                }}
              >
                {data.name}
              </h1>

              <h2
                style={{
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  fontWeight: 400,
                  marginBottom: '2rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  opacity: 0.9
                }}
              >
                {data.subtitle}
              </h2>

              <p
                style={{
                  fontSize: isMobile ? '0.95rem' : '1.1rem',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                  color: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                {data.heroParagraph1}
              </p>

              <p
                style={{
                  fontSize: isMobile ? '0.95rem' : '1.1rem',
                  lineHeight: 1.6,
                  marginBottom: '0',
                  color: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                {data.heroParagraph2}
              </p>
            </div>
          </div>

          {/* Additional Text Area - Full Width Below */}
          {data.additionalText && (
            <div
              style={{
                width: '100%',
                padding: isMobile ? '1.5rem 0 0 0' : '0',
                color: '#FFFFFF'
              }}
            >
              <p
                style={{
                  fontSize: isMobile ? '0.95rem' : '1.1rem',
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.95)',
                  whiteSpace: 'pre-wrap',
                  margin: 0
                }}
              >
                {data.additionalText}
              </p>
            </div>
          )}

          {/* Additional Sections */}
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
                    color: '#FFFFFF',
                    paddingTop: isMobile ? '1rem' : '2rem'
                  }}
                >
                  {section.header && (
                    <h2
                      style={{
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        fontWeight: 700,
                        color: '#ff0000',
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
                      color: 'rgba(255, 255, 255, 0.95)',
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
                  width: '100%',
                  paddingTop: isMobile ? '1rem' : '2rem'
                }}
              >
                {section.header && (
                  <h2
                    style={{
                      fontSize: isMobile ? '1.5rem' : '2rem',
                      fontWeight: 700,
                      color: '#ff0000',
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
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={section.image}
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
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <p
                      style={{
                        fontSize: isMobile ? '0.95rem' : '1.1rem',
                        lineHeight: 1.8,
                        color: 'rgba(255, 255, 255, 0.95)',
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
