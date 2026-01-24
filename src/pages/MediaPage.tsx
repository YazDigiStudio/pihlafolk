import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ImageCarousel } from '../components/ImageCarousel';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContentData } from '../hooks/useContentData';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';

interface CarouselImage {
  image: string;
  alt: string;
  photographer?: string;
}

interface MediaVideo {
  type: 'youtube' | 'vimeo' | 'direct';
  url: string;
  title: string;
  description?: string;
}

interface MediaAudioFile {
  url: string;
  title: string;
  description?: string;
}

interface MediaExternalLink {
  url: string;
  buttonText: string;
}

interface MediaSection {
  type: 'carousel' | 'videos' | 'audio' | 'links' | string;
  title?: string;
  subtitle?: string;
  carousel?: CarouselImage[];
  videos?: MediaVideo[];
  audioFiles?: MediaAudioFile[];
  externalLinks?: MediaExternalLink[];
}

interface MediaContent {
  sections: MediaSection[];
}

/**
 * MediaPage for Portfolio Template
 * Dynamic sections - only shows sections with content
 */

export const MediaPage: React.FC = () => {
  const { isMobile } = useScreenSize();
  const data = useContentData<MediaContent>('media.json');
  const t = useTranslations();

  // Set page metadata for SEO
  usePageMeta({
    title: t.seo.media.title,
    description: t.seo.media.description
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

  return (
    <>
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
        {/* Background Wallpaper - Same as Productions */}
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
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(15px)',
                borderRadius: '16px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                minHeight: '600px'
              }}
            >
            {/* Dynamic Sections */}
            {data.sections.map((section, sectionIndex) => {
              // Skip sections with no content
              const hasCarousel = section.carousel && section.carousel.length > 0;
              const hasVideos = section.videos && section.videos.length > 0;
              const hasAudio = section.audioFiles && section.audioFiles.length > 0;
              const hasLinks = section.externalLinks && section.externalLinks.length > 0;

              if (!hasCarousel && !hasVideos && !hasAudio && !hasLinks) {
                return null;
              }

              return (
                <div key={sectionIndex} style={{ marginBottom: '4rem' }}>
                  {section.title && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h2
                        style={{
                          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                          fontWeight: 700,
                          marginBottom: section.subtitle ? '1rem' : '0',
                          color: '#FFFFFF'
                        }}
                      >
                        {section.title}
                      </h2>
                      {section.subtitle && (
                        <p
                          style={{
                            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                            lineHeight: '1.6',
                            color: 'rgba(255, 255, 255, 0.85)',
                            maxWidth: '800px',
                            marginTop: '0.5rem'
                          }}
                        >
                          {section.subtitle}
                        </p>
                      )}
                      <div
                        style={{
                          marginTop: '1rem',
                          height: '2px',
                          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.3), transparent)',
                          maxWidth: '200px'
                        }}
                      />
                    </div>
                  )}

                  {/* Render Carousel */}
                  {hasCarousel && section.carousel && (
                    <div style={{ marginBottom: '2rem' }}>
                      <ImageCarousel images={section.carousel} autoPlayInterval={5000} />
                    </div>
                  )}

                  {/* Render Videos */}
                  {hasVideos && section.videos!.map((video, videoIndex) => (
                    <div key={videoIndex} style={{ marginBottom: '2rem' }}>
                      <div
                        style={{
                          position: 'relative',
                          paddingBottom: '56.25%',
                          height: 0,
                          overflow: 'hidden',
                          borderRadius: '8px',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                        }}
                      >
                        <iframe
                          src={video.url}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none'
                          }}
                        />
                      </div>
                      <p
                        style={{
                          color: '#FFFFFF',
                          textAlign: 'center',
                          marginTop: '1rem',
                          opacity: 0.9
                        }}
                      >
                        {video.title}
                      </p>
                    </div>
                  ))}

                  {/* Render Audio Files */}
                  {hasAudio && section.audioFiles!.map((audio, audioIndex) => (
                    <div key={audioIndex} style={{ marginBottom: '2rem' }}>
                      <p
                        style={{
                          color: '#FFFFFF',
                          textAlign: 'center',
                          marginBottom: '1rem',
                          fontSize: '1.1rem',
                          fontWeight: 600
                        }}
                      >
                        {audio.title}
                      </p>
                      <audio
                        controls
                        style={{
                          width: '100%',
                          maxWidth: '600px',
                          display: 'block',
                          margin: '0 auto',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                      >
                        <source src={audio.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      {audio.description && (
                        <p
                          style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            textAlign: 'center',
                            marginTop: '0.5rem',
                            fontSize: '0.9rem'
                          }}
                        >
                          {audio.description}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Render External Links */}
                  {hasLinks && (
                    <div style={{ textAlign: 'center' }}>
                      {section.externalLinks!.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            padding: '1rem 2.5rem',
                            margin: '0.5rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            color: '#1a1a1a',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
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
                          {link.buttonText}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
