import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScreenSize } from '../hooks/useScreenSize';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from '../hooks/useTranslations';
import { PIHLA_FOLK_PALETTE } from '../styles/colorPalettes';

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
  const colors = PIHLA_FOLK_PALETTE.colors;

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
    { label: t.nav.about, to: '/tietoa' },
    { label: t.nav.productions, to: '/tuotannot' },
    { label: t.nav.artists, to: '/artistit' },
    { label: t.nav.media, to: '/media' },
    { label: t.nav.contact, to: '/yhteystiedot' }
  ];

  return (
    <>
      <style>
        {`
          @keyframes expandUnderline {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }
        `}
      </style>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: colors.accentTertiary + "CC", // Slightly transparent
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(12, 12, 12, 0.1)'
        }}
      >
      <nav
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0.75rem 1.5rem' : '2rem 2rem',
          display: 'flex',
          justifyContent: isMobile ? 'flex-end' : 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {/* Logo - Only show if showName is true */}
        {showName && (
          <Link
            to="/"
            style={{
              position: 'absolute',
              left: isMobile ? '1.5rem' : '2rem',
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
          <>
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
                        position: 'relative',
                        display: 'inline-block',
                        color: isActive ? colors.accentPrimary : colors.bgPrimary,
                        textDecoration: 'none',
                        fontSize: isActive ? '1.5rem' : '1rem',
                        fontWeight: isActive ? 700 : 400,
                        transition: 'all 0.4s ease',
                        textShadow: '1px 1px 2px rgba(12,12,12,0.5)',
                        paddingBottom: '4px'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = colors.accentPrimary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = colors.bgPrimary;
                        }
                      }}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            backgroundColor: colors.accentPrimary,
                            transformOrigin: 'left',
                            animation: 'expandUnderline 0.6s ease-out forwards'
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div
              style={{
                position: 'absolute',
                right: '2rem'
              }}
            >
              <LanguageSwitcher />
            </div>
          </>
        )}

        {/* Mobile Hamburger Button */}
        {isMobile && (
          <button
            ref={buttonRef}
            onClick={toggleMobileMenu}
            style={{
              background: 'transparent',
              border: 'none',
              color: colors.bgPrimary,
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
                backgroundColor: colors.bgSecondary,
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
              }}
            />
            <span
              style={{
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: colors.bgSecondary,
                transition: 'all 0.3s ease',
                opacity: mobileMenuOpen ? 0 : 1
              }}
            />
            <span
              style={{
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: colors.bgSecondary,
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
            backgroundColor: colors.accentPrimary, // Pihla Folk red
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(12, 12, 12, 0.4)',
            border: '1px solid rgba(244, 244, 244, 0.2)',
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
                      color: colors.bgPrimary,
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: isActive ? 600 : 500,
                      padding: '0.875rem 1.5rem',
                      transition: 'all 0.2s ease',
                      borderLeft: isActive ? `3px solid ${colors.bgPrimary}` : '3px solid transparent',
                      textShadow: '1px 1px 2px rgba(12,12,12,0.3)',
                      backgroundColor: isActive ? 'rgba(12, 12, 12, 0.2)' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(244, 244, 244, 0.2)';
                        e.currentTarget.style.borderLeftColor = colors.bgPrimary;
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
            <li style={{ padding: '0.875rem 1.5rem', borderTop: '1px solid rgba(244, 244, 244, 0.2)' }}>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      )}
    </header>
    </>
  );
};
