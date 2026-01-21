import React, { useState } from 'react';
import { ACTIVE_PALETTE } from '../styles/colorPalettes';
import { Navigation } from '../components/Navigation';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * ArtistsPage - Pihla Folk Artists Showcase
 *
 * Features:
 * - Hero section with wallpaper background
 * - Filter buttons: All / Booking / Management
 * - Responsive artist cards grid
 * - Modal to view full artist bio
 * - Links to artist websites
 */

interface Artist {
  id: string;
  name: string;
  type: 'booking' | 'management';
  image: string;
  website: string;
  bio: {
    fi: string;
    en: string;
  };
  featured: boolean;
  order: number;
}

interface ArtistsContent {
  artists: Artist[];
}

export const ArtistsPage: React.FC = () => {
  const palette = ACTIVE_PALETTE;
  const { isMobile, isTablet } = useScreenSize();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [filter, setFilter] = useState<'all' | 'booking' | 'management'>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const data = useContentData<ArtistsContent>('artists.json');
  const t = useTranslations();

  // Set page metadata for SEO
  usePageMeta({
    title: t.seo.artists.title,
    description: t.seo.artists.description
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

  const artists = data.artists
    .filter(artist => filter === 'all' || artist.type === filter)
    .sort((a, b) => a.order - b.order);

  const openModal = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const closeModal = () => {
    setSelectedArtist(null);
  };

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
        {/* Background Wallpaper - Full page */}
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

        {/* White background layer for readability */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            zIndex: -2
          }}
        />

        {/* Overlay gradient */}
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
              marginBottom: '2rem'
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
              {t.artists.title}
            </h1>
          </div>

          {/* Filter Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              padding: '0 2rem'
            }}
          >
            {[
              { key: 'all', label: t.artists.filterAll },
              { key: 'booking', label: t.artists.filterBooking },
              { key: 'management', label: t.artists.filterManagement }
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key as 'all' | 'booking' | 'management')}
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  border: `2px solid ${palette.colors.accentPrimary}`,
                  backgroundColor: filter === btn.key ? palette.colors.accentPrimary : 'rgba(255, 255, 255, 0.9)',
                  color: filter === btn.key ? '#FFFFFF' : palette.colors.textHeading,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (filter !== btn.key) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== btn.key) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Artists Grid */}
          <div
            style={{
              maxWidth: '1400px',
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
                gap: isMobile ? '2rem' : '3rem',
                marginBottom: '4rem'
              }}
            >
              {artists.map((artist, index) => (
                <div
                  key={artist.id}
                  onClick={() => openModal(artist)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    setHoveredIndex(index);
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredIndex(null);
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                >
                  {/* Artist Image */}
                  <img
                    src={artist.image}
                    alt={artist.name}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      aspectRatio: '3/2',
                      objectFit: 'cover'
                    }}
                  />

                  {/* Artist Info */}
                  <div
                    style={{
                      padding: '1.5rem'
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        margin: '0 0 0.5rem 0',
                        color: palette.colors.textHeading
                      }}
                    >
                      {artist.name}
                    </h2>
                    <p
                      style={{
                        margin: '0 0 1rem 0',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: palette.colors.accentPrimary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {artist.type === 'booking' ? t.artists.booking : t.artists.management}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        color: palette.colors.textMuted,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {artist.bio.fi.split('\n')[0]}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1.5rem',
                      right: '1.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: palette.colors.accentPrimary,
                      color: '#FFFFFF',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      borderRadius: '4px',
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none'
                    }}
                  >
                    Lue lisää →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Artist Bio Modal */}
      {selectedArtist && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1rem' : '2rem',
            cursor: 'pointer',
            overflowY: 'auto'
          }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid #FFFFFF',
              color: '#FFFFFF',
              fontSize: '2rem',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              fontWeight: 300,
              lineHeight: 1,
              zIndex: 1001
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ×
          </button>

          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              cursor: 'default'
            }}
          >
            {/* Artist Image */}
            <img
              src={selectedArtist.image}
              alt={selectedArtist.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* Artist Bio Content */}
            <div style={{ padding: isMobile ? '2rem 1.5rem' : '3rem' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  margin: '0 0 0.5rem 0',
                  color: palette.colors.textHeading
                }}
              >
                {selectedArtist.name}
              </h2>
              <p
                style={{
                  margin: '0 0 2rem 0',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: palette.colors.accentPrimary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {selectedArtist.type === 'booking' ? t.artists.booking : t.artists.management}
              </p>

              {/* Bio Text */}
              <div
                style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.8',
                  color: palette.colors.textPrimary,
                  whiteSpace: 'pre-line',
                  marginBottom: '2rem'
                }}
              >
                {selectedArtist.bio.fi}
              </div>

              {/* Website Link */}
              {selectedArtist.website && (
                <a
                  href={selectedArtist.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-block',
                    padding: '0.875rem 2rem',
                    backgroundColor: palette.colors.accentPrimary,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = palette.colors.hoverColor;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = palette.colors.accentPrimary;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                >
                  {t.artists.website} →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
