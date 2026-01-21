/**
 * Custom hook for managing page metadata (title, description, OG tags)
 * Works with React 19+ without external dependencies
 */

import { useEffect } from 'react';

type PageMetaOptions = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

export const usePageMeta = ({
  title,
  description,
  ogTitle,
  ogDescription
}: PageMetaOptions) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update OG tags
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', ogTitle || title);
    }

    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute('content', ogDescription || description);
    }

    // Update Twitter tags
    const twitterTitleTag = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitleTag) {
      twitterTitleTag.setAttribute('content', ogTitle || title);
    }

    const twitterDescriptionTag = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescriptionTag) {
      twitterDescriptionTag.setAttribute('content', ogDescription || description);
    }
  }, [title, description, ogTitle, ogDescription]);
};
