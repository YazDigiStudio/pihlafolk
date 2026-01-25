import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';
import { getOptimizedImagePath } from '../utils/imageUtils';

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
  mediaVideoUrl?: string;
  logoPositionHorizontal?: 'left' | 'right';
  logoPositionVertical?: 'up' | 'middle' | 'down';
  additionalText?: string;
  sections?: HomeSection[];
}

/**
 * HomePage for Portfolio Template
 *
 * Full-width hero design:
 * - Large hero image fills width
 * - Text content below image
 * - Clean, modern presentation
 * - Fixed navigation header
 * - Responsive spacing for mobile/tablet/desktop
 * - Optional additional sections below
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
        {/* Glassmorphic Container */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            borderRadius: '16px',
            padding: isMobile ? '1.5rem' : '2.5rem',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? '2rem' : '2.5rem'
          }}
        >
          {/* Hero Media on Top */}
          {data.showMedia && (data.mediaUrl || data.mediaVideoUrl) && (
            <div
              style={{
                width: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                position: 'relative'
              }}
            >
              {data.mediaType === 'video' && data.mediaVideoUrl ? (
                <video
                  src={data.mediaVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              ) : data.mediaUrl ? (
                <img
                  src={getOptimizedImagePath(data.mediaUrl)}
                  alt={data.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              ) : null}

              {/* Vignette overlay and logo - for both images and videos */}
              {(data.mediaUrl || data.mediaVideoUrl) && (() => {
                // Calculate logo position
                const horizontal = data.logoPositionHorizontal || 'left';
                const vertical = data.logoPositionVertical || 'middle';

                const horizontalStyle: React.CSSProperties = horizontal === 'left'
                  ? { left: isMobile ? '1rem' : '2rem' }
                  : { right: isMobile ? '1rem' : '2rem' };

                let verticalStyle: React.CSSProperties = {};
                let transform = '';

                if (vertical === 'up') {
                  verticalStyle = { top: isMobile ? '1rem' : '2rem' };
                } else if (vertical === 'middle') {
                  verticalStyle = { top: '50%' };
                  transform = 'translateY(-50%)';
                } else { // down
                  verticalStyle = { bottom: isMobile ? '1rem' : '2rem' };
                }

                return (
                  <>
                    {/* Vignette overlay - darkens edges to create abyss effect */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: isMobile
                          ? 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.5) 85%, rgba(0, 0, 0, 0.7) 100%)'
                          : 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.9) 85%, #000000 100%)',
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Pihla Folk Logo Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        ...horizontalStyle,
                        ...verticalStyle,
                        width: '50%',
                        zIndex: 10,
                        pointerEvents: 'none',
                        transform
                      }}
                    >
                      <img
                        src="/assets/pihla-folk-text-logo.png"
                        alt="pihla folk"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          filter: 'drop-shadow(10px 0px 16px rgba(0, 0, 0, 1.0)) drop-shadow(-10px 0px 16px rgba(0, 0, 0, 1.0)) drop-shadow(0px 10px 16px rgba(0, 0, 0, 1.0)) drop-shadow(0px -10px 16px rgba(0, 0, 0, 1.0))'
                        }}
                      />
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Text Content Below Image */}
          <div
            style={{
              width: '100%',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            {/* Red Subtitle */}
            {data.heroParagraph1 && (
              <h2
                style={{
                  fontSize: isMobile ? '1.3rem' : '1.6rem',
                  fontWeight: 600,
                  color: '#ff0000',
                  marginTop: 0,
                  marginBottom: '1.5rem',
                  lineHeight: 1.4
                }}
              >
                {data.heroParagraph1}
              </h2>
            )}

            {/* Main Text Section */}
            <p
              style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.95)',
                marginTop: 0,
                marginBottom: '1.5rem',
                whiteSpace: 'pre-wrap'
              }}
            >
              {data.heroParagraph2}
              {data.additionalText && `\n\n${data.additionalText}`}
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '1rem',
                alignItems: isMobile ? 'stretch' : 'flex-start',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {data.showButton1 && (
                <a
                  href={data.ctaButton1Link}
                  style={{
                    display: 'inline-block',
                    padding: '0.875rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    backgroundColor: '#ff0000',
                    border: 'none',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#cc0000';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff0000';
                    e.currentTarget.style.transform = 'translateY(0)';
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
                    padding: '0.875rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {data.ctaButton2Text}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Additional Sections (outside hero) */}
    <div
      style={{
        backgroundColor: '#000000',
        padding: isMobile ? '2rem 1.5rem' : '3rem 3rem',
        minHeight: '50vh'
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >

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
                    paddingTop: isMobile ? '2rem' : '3rem'
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
                  paddingTop: isMobile ? '2rem' : '3rem'
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
    <Footer />
    </>
  );
};
