import React, { useState, useEffect, useCallback } from 'react';
import { useScreenSize } from '../hooks/useScreenSize';

/**
 * ImageCarousel - Coverflow-style carousel with blurred side images
 * Features: Auto-play, manual navigation, center focus with side previews
 * Images are managed via CMS JSON files
 */

interface CarouselImage {
  image: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useScreenSize();

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, autoPlayInterval, isHovered]);

  if (images.length === 0) return null;

  // Calculate indices for previous and next images
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  // Get image position style
  const getImageStyle = (position: 'prev' | 'current' | 'next' | 'hidden'): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      height: '100%',
      objectFit: 'cover',
      transition: 'all 0.5s ease-in-out',
      borderRadius: '8px'
    };

    switch (position) {
      case 'prev':
        return {
          ...baseStyle,
          left: isMobile ? '-15%' : '0%',
          width: isMobile ? '45%' : '35%',
          transform: 'scale(0.85)',
          filter: 'blur(4px) brightness(0.6)',
          zIndex: 1,
          cursor: 'pointer'
        };
      case 'current':
        return {
          ...baseStyle,
          left: '50%',
          transform: 'translateX(-50%) scale(1)',
          width: isMobile ? '85%' : '70%',
          filter: 'none',
          zIndex: 10,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        };
      case 'next':
        return {
          ...baseStyle,
          right: isMobile ? '-15%' : '0%',
          width: isMobile ? '45%' : '35%',
          transform: 'scale(0.85)',
          filter: 'blur(4px) brightness(0.6)',
          zIndex: 1,
          cursor: 'pointer'
        };
      default:
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'scale(0.5)',
          zIndex: 0
        };
    }
  };

  // Determine position for each image
  const getPosition = (index: number): 'prev' | 'current' | 'next' | 'hidden' => {
    if (index === currentIndex) return 'current';
    if (index === prevIndex) return 'prev';
    if (index === nextIndex) return 'next';
    return 'hidden';
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: '12px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '280px' : '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        }}
      >
        {images.map((item, index) => {
          const position = getPosition(index);
          if (position === 'hidden' && images.length > 3) return null;

          return (
            <img
              key={index}
              src={item.image}
              alt={item.alt}
              onClick={() => {
                if (position === 'prev') goToPrevious();
                if (position === 'next') goToNext();
              }}
              style={getImageStyle(position)}
            />
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        style={{
          position: 'absolute',
          top: '50%',
          left: isMobile ? '5px' : '15px',
          transform: 'translateY(-50%)',
          width: isMobile ? '36px' : '48px',
          height: isMobile ? '36px' : '48px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          color: '#FFFFFF',
          fontSize: isMobile ? '1.2rem' : '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 20,
          opacity: isHovered ? 1 : 0.6
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: isMobile ? '5px' : '15px',
          transform: 'translateY(-50%)',
          width: isMobile ? '36px' : '48px',
          height: isMobile ? '36px' : '48px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          color: '#FFFFFF',
          fontSize: isMobile ? '1.2rem' : '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 20,
          opacity: isHovered ? 1 : 0.6
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dot Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 20
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: index === currentIndex
                ? '#FFFFFF'
                : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
              boxShadow: index === currentIndex ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: '45px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: '#FFFFFF',
          padding: '8px 20px',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: 500,
          zIndex: 20,
          whiteSpace: 'nowrap',
          maxWidth: '80%',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {images[currentIndex].alt}
      </div>
    </div>
  );
};
