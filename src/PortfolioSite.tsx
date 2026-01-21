import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ArtistsPage } from './pages/ArtistsPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductionsPage } from './pages/ProductionsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Main site component for Pihla Folk
 *
 * React Router routing structure:
 * - / -> HomePage (Etusivu)
 * - /artistit -> ArtistsPage (Artists represented by Pihla Folk)
 * - /tietoa -> AboutPage (About Pihla Folk and Mari Pääkkönen)
 * - /palvelut -> ServicesPage (Services offered)
 * - /tuotannot -> ProductionsPage (Ongoing and past productions)
 * - /yhteystiedot -> ContactPage (Contact information)
 */

export const PortfolioSite: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artistit" element={<ArtistsPage />} />
        <Route path="/tietoa" element={<AboutPage />} />
        <Route path="/palvelut" element={<ServicesPage />} />
        <Route path="/tuotannot" element={<ProductionsPage />} />
        <Route path="/yhteystiedot" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PortfolioSite;
