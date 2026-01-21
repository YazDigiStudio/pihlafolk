import React from 'react';
import { Link } from 'react-router-dom';
import { ACTIVE_PALETTE } from '../styles/colorPalettes';
import { Navigation } from '../components/Navigation';
import { useTranslations } from '../hooks/useTranslations';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * 404 Not Found page for Pihla Folk
 *
 * Displayed when user navigates to a non-existent route.
 * Provides a link back to the homepage.
 */

export const NotFoundPage: React.FC = () => {
  const palette = ACTIVE_PALETTE;
  const t = useTranslations();

  // Set page metadata for SEO
  usePageMeta({
    title: '404 - ' + (t as any).notFound?.title || 'Page Not Found',
    description: (t as any).notFound?.description || 'The page you are looking for does not exist.'
  });

  return (
    <>
      <Navigation showName={true} />
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: palette.colors.bgPrimary,
          padding: '2rem',
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(4rem, 15vw, 10rem)',
            fontWeight: 700,
            color: palette.colors.accentPrimary,
            margin: '0 0 1rem 0',
            lineHeight: 1
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 400,
            color: palette.colors.textHeading,
            margin: '0 0 1rem 0'
          }}
        >
          {(t as any).notFound?.heading || 'Sivua ei löytynyt'}
        </h2>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: palette.colors.textMuted,
            margin: '0 0 2.5rem 0',
            maxWidth: '600px'
          }}
        >
          {(t as any).notFound?.message || 'Etsimääsi sivua ei löytynyt. Se on saatettu poistaa tai siirtää toiseen osoitteeseen.'}
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            backgroundColor: palette.colors.accentPrimary,
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '1.125rem',
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
          {(t as any).notFound?.homeButton || 'Palaa etusivulle'}
        </Link>
      </div>
    </>
  );
};
