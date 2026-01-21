import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { MediaPage } from './pages/MediaPage';
import { CVPage } from './pages/CVPage';
import { ContactPage } from './pages/ContactPage';

/**
 * Main site component for Portfolio Template
 *
 * Simple hash-based routing:
 * - #home or / -> HomePage
 * - #galleria -> GalleryPage
 * - #tietoa -> AboutPage
 * - #media -> MediaPage
 * - #cv -> CVPage
 * - #yhteystiedot -> ContactPage
 */

export const PortfolioSite: React.FC = () => {
  // Initialize state with current hash
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return window.location.hash.replace('#', '') || 'home';
  });

  useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(newHash);
      // Scroll to top when page changes
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Render the appropriate page
  const renderPage = () => {
    switch (currentPage) {
      case 'galleria':
        return <GalleryPage />;
      case 'tietoa':
        return <AboutPage />;
      case 'media':
        return <MediaPage />;
      case 'cv':
        return <CVPage />;
      case 'yhteystiedot':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default PortfolioSite;
