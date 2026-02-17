import React from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { useScreenSize } from "../hooks/useScreenSize";
import { useContentData } from "../hooks/useContentData";
import { useTranslations } from "../hooks/useTranslations";
import { usePageMeta } from "../hooks/usePageMeta";
import { PIHLA_FOLK_PALETTE } from "../styles/colorPalettes";

interface SocialMedia {
  platform: "facebook" | "instagram" | "youtube" | "linkedin";
  url: string;
}

interface RelatedLink {
  url: string;
  text: string;
}

interface ContactContent {
  email: string;
  phone: string;
  socialMedia: SocialMedia[];
  relatedLinks: RelatedLink[];
}

/**
 * ContactPage - Contact information, social media, and related links
 */

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.971h-1.514c-1.491 0-1.955.93-1.955 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="white"/>
        </svg>
      );
    case "instagram":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="white"/>
        </svg>
      );
    case "youtube":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
        </svg>
      );
    default:
      return null;
  }
};

export const ContactPage: React.FC = () => {
  const { isMobile } = useScreenSize();
  const data = useContentData<ContactContent>("contact.json");
  const t = useTranslations();
  const colors = PIHLA_FOLK_PALETTE.colors;

  usePageMeta({
    title: t.seo.contact.title,
    description: t.seo.contact.description
  });

  if (!data) {
    return (
      <>
        <Navigation />
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
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

      <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
        {/* Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/assets/kuosiRaportti.jpg)",
            backgroundSize: "300px",
            backgroundRepeat: "repeat",
            backgroundPosition: "top left",
            zIndex: -1
          }}
        />

        {/* Page Content */}
        <div style={{ position: "relative", zIndex: 1, paddingTop: "6rem", paddingBottom: "4rem" }}>
          {/* Content Container */}
          <div style={{ maxWidth: "1200px", width: "95%", margin: "0 auto", padding: isMobile ? "1rem" : "2rem" }}>
            {/* Content container */}
            <div
              style={{
                backgroundColor: "rgba(244, 244, 244, 0.80)",
                backdropFilter: "blur(5px)",
                borderRadius: "16px",
                padding: isMobile ? "2rem 1.5rem" : "3rem 2.5rem",
                boxShadow: "0 12px 40px rgba(12, 12, 12, 0.5)",
                textAlign: "center",
                minHeight: "600px"
              }}
            >
              {/* Email Section */}
              <div style={{ marginBottom: "3rem", paddingTop: "2rem" }}>
                <p style={{ fontSize: "1.1rem", color: colors.textPrimary, margin: "0 0 0.5rem 0", fontWeight: 500 }}>
                  {t.contact.contactLabel}
                </p>
                <a
                  href={`mailto:${data.email}`}
                  style={{
                    fontSize: "1.4rem",
                    color: colors.textPrimary,
                    textDecoration: "none",
                    fontWeight: 500
                  }}
                >
                  {data.email}
                </a>
              </div>

              {/* Phone Number */}
              {data.phone && (
                <div style={{ marginBottom: "3rem" }}>
                  <a
                    href={`tel:${data.phone}`}
                    style={{
                      fontSize: "1.4rem",
                      color: colors.textPrimary,
                      textDecoration: "none",
                      fontWeight: 500
                    }}
                  >
                    {data.phone}
                  </a>
                </div>
              )}

              {/* Social Media Icons */}
              {data.socialMedia && data.socialMedia.length > 0 && (
                <div style={{ marginBottom: "3rem" }}>
                  <div style={{ display: "flex", flexDirection: "row", gap: "2rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                    {data.socialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "block", opacity: 0.9, filter: "invert(1)" }}
                      >
                        {getSocialIcon(social.platform)}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Links */}
              {data.relatedLinks && data.relatedLinks.length > 0 && (
                <div>
                  {data.relatedLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "1.1rem",
                        color: colors.textPrimary,
                        textDecoration: "none",
                        display: "block",
                        marginBottom: "0.5rem"
                      }}
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
