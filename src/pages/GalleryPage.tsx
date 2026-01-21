import React, { useState } from 'react';
import { ACTIVE_PALETTE } from '../styles/colorPalettes';
import { Navigation } from '../components/Navigation';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * GalleryPage - Portfolio Template
 *
 * Features:
 * - Hero section with same background as HomePage
 * - Responsive gallery grid (4 cols desktop, 2 tablet, 1 mobile)
 * - Lightbox modal to view images full-size
 * - Organized by photographer
 */

interface GalleryImage {
  src?: string; // Web-optimized image for display (optional, auto-generated from downloadSrc)
  downloadSrc: string; // High-resolution original for download
  alt: string;
  photographer: string;
  category: 'Headshots' | 'Production' | 'Promotional';
}

/**
 * Helper function to convert download image path to web-optimized path
 * Converts: /images/downloads/IMG_0168.jpg -> /images/web/IMG_0168.webp
 */
const getWebImagePath = (downloadPath: string): string => {
  return downloadPath
    .replace('/images/downloads/', '/images/web/')
    .replace(/\.(jpg|jpeg|png)$/i, '.webp');
};

interface GalleryContent {
  introText: string;
  images: GalleryImage[];
}

export const GalleryPage: React.FC = () => {
  const palette = ACTIVE_PALETTE;
  const { isMobile, isTablet } = useScreenSize();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const data = useContentData<GalleryContent>('gallery.json');
  const t = useTranslations();

  // Set page metadata for SEO
  usePageMeta({
    title: t.seo.gallery.title,
    description: t.seo.gallery.description
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
          color: '#FFFFFF'
        }}>
          {t.common.loading}
        </div>
      </>
    );
  }

  const images = data.images;

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {/* Navigation Header */}
      <Navigation />

      {/* Full Page Container with Background */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Background Image - Full page */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: 'url(/assets/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 42%',
            filter: 'brightness(0.5)',
            zIndex: -3
          }}
        />

        {/* White background layer */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            zIndex: -2
          }}
        />

        {/* Overlay gradient - Full page */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)',
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
                fontWeight: 300,
                letterSpacing: '0.1em',
                margin: 0,
                textTransform: 'uppercase',
                textShadow: '1px 1px 2px rgba(255,255,255,0.3)'
              }}
            >
              {t.gallery.title}
            </h1>
          </div>

          {/* Gallery Grid */}
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: isMobile ? '0 1rem' : '0 2rem'
            }}
          >
        {/* Gallery intro text */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            color: palette.colors.textHeading
          }}
        >
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '0 auto',
              color: palette.colors.textHeading,
              textShadow: '1px 1px 2px rgba(255,255,255,0.3)',
              opacity: 1
            }}
          >
            {data.introText}
          </p>
        </div>

        {/* Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : isTablet
              ? 'repeat(2, 1fr)'
              : 'repeat(4, 1fr)',
            gap: isMobile ? '1.5rem' : '2rem',
            marginBottom: '4rem'
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(image)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: palette.colors.bgSecondary,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                setHoveredIndex(null);
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={image.src || getWebImagePath(image.downloadSrc)}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  aspectRatio: '3/4',
                  objectFit: 'cover'
                }}
              />
              {/* Overlay on hover */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <p style={{ margin: 0, fontWeight: 600 }}>📷 {image.photographer}</p>
              </div>
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1rem' : '2rem',
            cursor: 'pointer'
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
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
              lineHeight: 1
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

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative'
            }}
          >
            <img
              src={selectedImage.src || getWebImagePath(selectedImage.downloadSrc)}
              alt={selectedImage.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                width: 'auto',
                height: 'auto',
                borderRadius: '4px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
              }}
            />
            {/* Caption and Download */}
            <div
              style={{
                marginTop: '1rem',
                textAlign: 'center',
                color: '#FFFFFF'
              }}
            >
              <p style={{ margin: '0.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
                {t.gallery.photo}: {selectedImage.photographer}
              </p>

              {/* Download Button */}
              <a
                href={selectedImage.downloadSrc}
                download
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  padding: '0.75rem 2rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
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
                {t.gallery.downloadHighRes}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
