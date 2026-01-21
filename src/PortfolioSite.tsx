import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { MediaPage } from './pages/MediaPage';
import { CVPage } from './pages/CVPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Main site component for Pihla Folk
 *
 * React Router routing structure:
 * - / -> HomePage (Etusivu)
 * - /artistit -> GalleryPage (will become ArtistsPage)
 * - /tietoa -> AboutPage
 * - /palvelut -> MediaPage (will become ServicesPage)
 * - /tuotannot -> CVPage (will become ProductionsPage)
 * - /yhteystiedot -> ContactPage
 */

export const PortfolioSite: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artistit" element={<GalleryPage />} />
        <Route path="/tietoa" element={<AboutPage />} />
        <Route path="/palvelut" element={<MediaPage />} />
        <Route path="/tuotannot" element={<CVPage />} />
        <Route path="/yhteystiedot" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PortfolioSite;
