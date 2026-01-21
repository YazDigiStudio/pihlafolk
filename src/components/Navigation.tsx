import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScreenSize } from '../hooks/useScreenSize';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from '../hooks/useTranslations';

/**
 * Responsive navigation header for Pihla Folk
 *
 * Features:
 * - Desktop: Horizontal menu with all links visible
 * - Mobile: Hamburger menu with dropdown
 * - Slightly transparent background with blur effect
 * - Fixed to top of page
 * - Click outside to close mobile menu
 * - Optional name/logo display (hidden on homepage where name is in hero)
 * - Uses React Router Link components for proper routing
 */

interface NavigationProps {
  showName?: boolean; // Whether to show client name in header (default: true)
}

export const Navigation: React.FC<NavigationProps> = ({ showName = true }) => {
  const { isMobile } = useScreenSize();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both menu and button
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    // Add listener after a small delay to prevent immediate closing
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.artists, to: '/artistit' },
    { label: t.nav.about, to: '/tietoa' },
    { label: t.nav.services, to: '/palvelut' },
    { label: t.nav.productions, to: '/tuotannot' },
    { label: t.nav.contact, to: '/yhteystiedot' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(12, 12, 12, 0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <nav
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0.25rem 1.5rem' : '0.25rem 2rem',
          display: 'flex',
          justifyContent: showName ? 'space-between' : 'flex-end',
          alignItems: 'center'
        }}
      >
        {/* Logo - Only show if showName is true */}
        {showName && (
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img
              src="/assets/pihla-folk-logo.png"
              alt="Pihla Folk"
              style={{
                height: isMobile ? '60px' : '80px',
                width: 'auto',
                display: 'block'
              }}
            />
          </Link>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              gap: '2rem',
              alignItems: 'center'
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'opacity 0.3s ease',
                      opacity: isActive ? 1 : 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      borderBottom: isActive ? '2px solid #FFFFFF' : 'none',
                      paddingBottom: '2px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = isActive ? '1' : '0.9';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        )}

        {/* Mobile Hamburger Button */}
        {isMobile && (
          <button
            ref={buttonRef}
            onClick={toggleMobileMenu}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              width: '30px'
            }}
            aria-label="Toggle menu"
          >
            {/* Hamburger icon */}
            <span
              style={{
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: '#FFFFFF',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
              }}
            />
            <span
              style={{
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: '#FFFFFF',
                transition: 'all 0.3s ease',
                opacity: mobileMenuOpen ? 0 : 1
              }}
            />
            <span
              style={{
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: '#FFFFFF',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
              }}
            />
          </button>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobile && mobileMenuOpen && (
        <div
          ref={menuRef}
          style={{
            position: 'absolute',
            top: '100%',
            right: '1rem',
            maxWidth: '200px',
            width: 'auto',
            minWidth: '180px',
            backgroundColor: '#ff0000', // Pihla Folk red
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginTop: '0.5rem',
            overflow: 'hidden',
            zIndex: 100
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: '0.5rem 0'
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: isActive ? 600 : 500,
                      padding: '0.875rem 1.5rem',
                      transition: 'all 0.2s ease',
                      borderLeft: isActive ? '3px solid #FFFFFF' : '3px solid transparent',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      backgroundColor: isActive ? 'rgba(0, 0, 0, 0.2)' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.borderLeftColor = '#FFFFFF';
                        e.currentTarget.style.paddingLeft = '1.75rem';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderLeftColor = 'transparent';
                        e.currentTarget.style.paddingLeft = '1.5rem';
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li style={{ padding: '0.875rem 1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
