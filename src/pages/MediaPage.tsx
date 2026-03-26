import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ImageCarousel } from '../components/ImageCarousel';
import { useScreenSize } from '../hooks/useScreenSize';
import yaml from 'js-yaml';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../contexts/LanguageContext';
import { getOptimizedImagePath } from '../utils/imageUtils';
import { PIHLA_FOLK_PALETTE } from '../styles/colorPalettes';

interface CarouselImage {
  image: string;
  alt: string;
  photographer?: string;
}

interface MediaVideo {
  id?: string;
  type: 'youtube' | 'vimeo' | 'direct';
  url: string;
  titleFi: string;
  titleEn: string;
  descriptionFi?: string;
  descriptionEn?: string;
}

interface MediaAudioFile {
  id?: string;
  url?: string;          // direct file upload
  streamingUrl?: string; // Spotify / SoundCloud URL
  titleFi: string;
  titleEn: string;
  descriptionFi?: string;
  descriptionEn?: string;
  type?: 'spotify' | 'soundcloud' | 'direct';
}

interface MediaExternalLink {
  url: string;
  buttonTextFi: string;
  buttonTextEn: string;
}

interface MediaSection {
  type: 'carousel' | 'videos' | 'audio' | 'links' | string;
  titleFi?: string;
  titleEn?: string;
  subtitleFi?: string;
  subtitleEn?: string;
  carousel?: CarouselImage[];
  videos?: MediaVideo[];
  audioFiles?: MediaAudioFile[];
  externalLinks?: MediaExternalLink[];
}

interface MediaContent {
  sections: MediaSection[];
}

type AudioEmbedType = 'spotify' | 'soundcloud' | 'direct';

// Detects audio type and returns embed URL + type
// streamingUrl is used for Spotify/SoundCloud, url for direct file uploads
const getAudioEmbed = (audio: MediaAudioFile): { url: string; type: AudioEmbedType } | null => {
  let sourceUrl = audio.streamingUrl ?? audio.url;
  if (!sourceUrl) return null;

  // If client pastes a full <iframe> embed code, extract the src URL
  const iframeSrcMatch = sourceUrl.match(/src="([^"]+)"/);
  if (iframeSrcMatch) sourceUrl = iframeSrcMatch[1];

  const detectedType: AudioEmbedType =
    audio.type ?? (
      sourceUrl.includes('spotify.com') ? 'spotify' :
      sourceUrl.includes('soundcloud.com') ? 'soundcloud' :
      'direct'
    );

  if (detectedType === 'spotify') {
    const match = sourceUrl.match(/spotify\.com\/(track|album|playlist|artist)\/([a-zA-Z0-9]+)/);
    const embedUrl = match
      ? `https://open.spotify.com/embed/${match[1]}/${match[2]}`
      : sourceUrl;
    return { url: embedUrl, type: 'spotify' };
  }

  if (detectedType === 'soundcloud') {
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(sourceUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false`;
    return { url: embedUrl, type: 'soundcloud' };
  }

  return { url: sourceUrl, type: 'direct' };
};

// Converts any YouTube or Vimeo URL to a privacy-friendly embed URL
const getEmbedUrl = (video: MediaVideo): string => {
  if (video.type === 'youtube') {
    const match = video.url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : video.url;
  }
  if (video.type === 'vimeo') {
    const match = video.url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : video.url;
  }
  return video.url;
};

/**
 * MediaPage for Portfolio Template
 * Dynamic sections - only shows sections with content
 */

type SectionType = 'carousel' | 'videos' | 'audio' | 'links';

// Maps section type to a URL-friendly hash that matches the visible button label
const sectionHashMap: Record<SectionType, string> = {
  carousel: 'photos',
  videos: 'videos',
  audio: 'recordings',
  links: 'links'
};
const hashToSection: Record<string, SectionType> = {
  photos: 'carousel',
  videos: 'videos',
  recordings: 'audio',
  links: 'links'
};

export const MediaPage: React.FC = () => {
  const { isMobile } = useScreenSize();
  const [data, setData] = useState<MediaContent | null>(null);
  const t = useTranslations();
  const { language } = useLanguage();
  const colors = PIHLA_FOLK_PALETTE.colors;
  const photoLabel = language === "fi" ? "kuva" : "photo";
  const [activeSection, setActiveSection] = useState<SectionType>('carousel');

  // Load shared media.md (language-independent single file)
  useEffect(() => {
    fetch('/content/media.md')
      .then(res => res.text())
      .then(text => {
        const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
        if (!match) return;
        setData(yaml.load(match[1]) as MediaContent);
      })
      .catch(err => console.error('Error loading media content:', err));
  }, []);

  // Helper to get language-specific text
  const getText = (fi?: string, en?: string): string =>
    language === 'fi' ? (fi ?? en ?? '') : (en ?? fi ?? '');

  // On load: read URL hash to set active section or scroll to a specific item
  useEffect(() => {
    if (!data) return;

    const hash = window.location.hash.replace('#', '');
    const sectionTypes: SectionType[] = ['carousel', 'videos', 'audio', 'links'];

    // Check if hash matches a friendly section name (e.g. #photos, #recordings)
    if (hashToSection[hash]) {
      setActiveSection(hashToSection[hash]);
      return;
    }

    // Check if hash matches an individual item id — find which section it belongs to
    if (hash) {
      for (const section of data.sections) {
        const foundInVideos = section.videos?.some(v => v.id === hash);
        const foundInAudio = section.audioFiles?.some(a => a.id === hash);
        if (foundInVideos) { setActiveSection('videos'); return; }
        if (foundInAudio) { setActiveSection('audio'); return; }
      }
    }

    // Default to first section that has content
    const first = sectionTypes.find(type => {
      const section = data.sections.find(s => s.type === type);
      if (!section) return false;
      if (type === 'carousel') return (section.carousel?.length ?? 0) > 0;
      if (type === 'videos') return (section.videos?.length ?? 0) > 0;
      if (type === 'audio') return (section.audioFiles?.length ?? 0) > 0;
      if (type === 'links') return (section.externalLinks?.length ?? 0) > 0;
      return false;
    });
    if (first) setActiveSection(first);
  }, [data]);

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
          color: colors.bgPrimary
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
            backgroundImage: 'url(/assets/wallpaper-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }}
        />

        {/* Filter Buttons */}
        <div style={{ paddingTop: 'calc(6rem + 20px)', paddingBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            padding: '0 2rem'
          }}>
            {([
              { key: 'carousel' as SectionType, label: t.media.photos, hasContent: data.sections.some(s => s.type === 'carousel' && (s.carousel?.length ?? 0) > 0) },
              { key: 'videos' as SectionType, label: t.media.videos, hasContent: data.sections.some(s => s.type === 'videos' && (s.videos?.length ?? 0) > 0) },
              { key: 'audio' as SectionType, label: t.media.recordings, hasContent: data.sections.some(s => s.type === 'audio' && (s.audioFiles?.length ?? 0) > 0) },
              { key: 'links' as SectionType, label: t.media.links, hasContent: data.sections.some(s => s.type === 'links' && (s.externalLinks?.length ?? 0) > 0) }
            ].filter(btn => btn.hasContent)).map(btn => (
              <button
                key={btn.key}
                onClick={() => setActiveSection(btn.key)}
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  border: activeSection === btn.key ? `2px solid ${colors.textPrimary}` : '2px solid rgba(12, 12, 12, 0.2)',
                  backgroundColor: activeSection === btn.key ? colors.textPrimary : 'rgba(244, 244, 244, 0.9)',
                  color: activeSection === btn.key ? colors.bgPrimary : colors.textPrimary,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeSection === btn.key ? '0 4px 12px rgba(12, 12, 12, 0.3)' : '0 2px 8px rgba(12,12,12,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== btn.key) {
                    e.currentTarget.style.borderColor = colors.textPrimary;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== btn.key) {
                    e.currentTarget.style.borderColor = 'rgba(12, 12, 12, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            paddingTop: '1rem',
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
            {/* Dynamic Sections - only render active section */}
            {data.sections.map((section: MediaSection, sectionIndex: number) => {
              // Only show the active section
              if (section.type !== activeSection) return null;

              const hasCarousel = section.carousel && section.carousel.length > 0;
              const hasVideos = section.videos && section.videos.length > 0;
              const hasAudio = section.audioFiles && section.audioFiles.length > 0;
              const hasLinks = section.externalLinks && section.externalLinks.length > 0;

              if (!hasCarousel && !hasVideos && !hasAudio && !hasLinks) {
                return null;
              }

              const sectionTitle = getText(section.titleFi, section.titleEn);
              const sectionSubtitle = getText(section.subtitleFi, section.subtitleEn);

              return (
                <div key={sectionIndex} id={sectionHashMap[section.type as SectionType]} style={{ marginBottom: '4rem' }}>
                  {sectionTitle && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h2
                        style={{
                          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                          fontWeight: 700,
                          marginBottom: sectionSubtitle ? '1rem' : '0',
                          color: colors.textPrimary
                        }}
                      >
                        {sectionTitle}
                      </h2>
                      {sectionSubtitle && (
                        <p
                          style={{
                            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                            lineHeight: '1.6',
                            color: 'rgba(12, 12, 12, 0.7)',
                            maxWidth: '800px',
                            marginTop: '0.5rem'
                          }}
                        >
                          {sectionSubtitle}
                        </p>
                      )}
                      <div
                        style={{
                          marginTop: '1rem',
                          height: '2px',
                          background: 'linear-gradient(to right, rgba(12, 12, 12, 0.2), transparent)',
                          maxWidth: '200px'
                        }}
                      />
                    </div>
                  )}

                  {/* Render Carousel */}
                  {hasCarousel && section.carousel && (
                    <div style={{ marginBottom: '2rem' }}>
                      <ImageCarousel
                        images={section.carousel.map(img => ({
                          ...img,
                          image: getOptimizedImagePath(img.image)
                        }))}
                        autoPlayInterval={5000}
                        photoLabel={photoLabel}
                      />
                    </div>
                  )}

                  {/* Render Videos */}
                  {hasVideos && section.videos!.map((video: MediaVideo, videoIndex: number) => (
                    <div key={videoIndex} id={video.id} style={{ marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
                      <p
                        style={{
                          color: colors.textPrimary,
                          textAlign: 'center',
                          marginBottom: '0.75rem',
                          opacity: 0.9
                        }}
                      >
                        {getText(video.titleFi, video.titleEn)}
                      </p>
                      <div
                        style={{
                          position: 'relative',
                          paddingBottom: '56.25%',
                          height: 0,
                          overflow: 'hidden',
                          borderRadius: '8px',
                          boxShadow: '0 8px 24px rgba(12,12,12,0.3)'
                        }}
                      >
                        <iframe
                          src={getEmbedUrl(video)}
                          title={getText(video.titleFi, video.titleEn)}
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
                    </div>
                  ))}

                  {/* Render Audio Files */}
                  {hasAudio && section.audioFiles!.map((audio: MediaAudioFile, audioIndex: number) => {
                    const audioEmbed = getAudioEmbed(audio);
                    if (!audioEmbed) return null;
                    const { url: audioEmbedUrl, type: audioType } = audioEmbed;
                    const audioTitle = getText(audio.titleFi, audio.titleEn);
                    const audioDescription = getText(audio.descriptionFi, audio.descriptionEn);
                    return (
                    <div key={audioIndex} id={audio.id} style={{ marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
                      <p
                        style={{
                          color: colors.textPrimary,
                          textAlign: 'center',
                          marginBottom: '1rem',
                          fontSize: '1.1rem',
                          fontWeight: 600
                        }}
                      >
                        {audioTitle}
                      </p>
                      {audioType === 'direct' ? (
                        <audio
                          controls
                          style={{
                            width: '100%',
                            display: 'block',
                            margin: '0 auto',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(244, 244, 244, 0.95)',
                            boxShadow: '0 4px 12px rgba(12,12,12,0.2)'
                          }}
                        >
                          <source src={audioEmbedUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      ) : (
                        <iframe
                          src={audioEmbedUrl}
                          title={audioTitle}
                          width="100%"
                          height={audioType === 'spotify' ? '352' : '166'}
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          style={{
                            display: 'block',
                            maxWidth: '600px',
                            margin: '0 auto',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(12,12,12,0.2)'
                          }}
                        />
                      )}
                      {audioDescription && (
                        <p
                          style={{
                            color: 'rgba(12, 12, 12, 0.6)',
                            textAlign: 'center',
                            marginTop: '0.5rem',
                            fontSize: '0.9rem'
                          }}
                        >
                          {audioDescription}
                        </p>
                      )}
                    </div>
                  ); })}

                  {/* Render External Links */}
                  {hasLinks && (
                    <div style={{ textAlign: 'center' }}>
                      {section.externalLinks!.map((link: MediaExternalLink, linkIndex: number) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            padding: '1rem 2.5rem',
                            margin: '0.5rem',
                            backgroundColor: 'rgba(244, 244, 244, 0.95)',
                            color: colors.textPrimary,
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(12,12,12,0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.bgSecondary;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(12,12,12,0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(244, 244, 244, 0.95)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(12,12,12,0.3)';
                          }}
                        >
                          {getText(link.buttonTextFi, link.buttonTextEn)}
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
