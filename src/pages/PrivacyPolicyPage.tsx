// Privacy Policy page — loads language-specific markdown file and renders it
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { PIHLA_FOLK_PALETTE } from "../styles/colorPalettes";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { useScreenSize } from "../hooks/useScreenSize";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslations } from "../hooks/useTranslations";
import { usePageMeta } from "../hooks/usePageMeta";

export const PrivacyPolicyPage: React.FC = () => {
  const { isMobile } = useScreenSize();
  const { language } = useLanguage();
  const t = useTranslations();
  const colors = PIHLA_FOLK_PALETTE.colors;
  const [content, setContent] = useState<string | null>(null);

  usePageMeta({
    title: t.seo.privacyPolicy.title,
    description: t.seo.privacyPolicy.description
  });

  useEffect(() => {
    fetch(`/content/privacy-policy-${language}.md`)
      .then(res => res.text())
      .then(setContent)
      .catch(() => setContent(null));
  }, [language]);

  return (
    <>
      <Navigation />
      <div style={{
        maxWidth: "800px",
        width: "95%",
        margin: "0 auto",
        paddingTop: "7rem",
        paddingBottom: "4rem",
        paddingLeft: isMobile ? "1rem" : "2rem",
        paddingRight: isMobile ? "1rem" : "2rem",
        color: colors.textBody,
        fontSize: isMobile ? "0.95rem" : "1rem",
        lineHeight: "1.8"
      }}>
        {content ? (
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, color: colors.accentPrimary, marginBottom: "1.5rem" }}>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: colors.textHeading, marginTop: "2rem", marginBottom: "0.5rem" }}>
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p style={{ margin: "0 0 0.75rem 0" }}>{children}</p>
              ),
              ul: ({ children }) => (
                <ul style={{ paddingLeft: "1.5rem", margin: "0 0 0.75rem 0" }}>{children}</ul>
              ),
              li: ({ children }) => (
                <li style={{ marginBottom: "0.25rem" }}>{children}</li>
              ),
              hr: () => (
                <hr style={{ border: "none", borderTop: "1px solid rgba(12,12,12,0.1)", margin: "1.5rem 0" }} />
              ),
              strong: ({ children }) => (
                <strong style={{ fontWeight: 600 }}>{children}</strong>
              )
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <p>{t.common.loading}</p>
        )}
      </div>
      <Footer />
    </>
  );
};
