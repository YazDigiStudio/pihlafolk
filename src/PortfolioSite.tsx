import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
// HIDDEN at client request – uncomment to restore Artists page
// import { ArtistsPage } from './pages/ArtistsPage';
import { AboutPage } from './pages/AboutPage';
import { MediaPage } from './pages/MediaPage';
import { ProductionsPage } from './pages/ProductionsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Main site component for Pihla Folk
 *
 * React Router routing structure:
 * - / -> HomePage (Etusivu)
 * - /artistit -> ArtistsPage (HIDDEN – route commented out, CMS content kept)
 * - /tietoa -> AboutPage (About Pihla Folk and Mari Pääkkönen)
 * - /palvelut -> ServicesPage (Services offered)
 * - /media -> MediaPage (Media resources and press materials)
 * - /tuotannot -> ProductionsPage (Ongoing and past productions)
 * - /yhteystiedot -> ContactPage (Contact information)
 */

export const PortfolioSite: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* HIDDEN at client request – uncomment to restore Artists page */}
        {/* <Route path="/artistit" element={<ArtistsPage />} /> */}
        <Route path="/tietoa" element={<AboutPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/tuotannot" element={<ProductionsPage />} />
        <Route path="/yhteystiedot" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PortfolioSite;
