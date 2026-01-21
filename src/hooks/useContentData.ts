import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Hook to fetch and load CMS content from JSON files
 * Automatically loads the correct language version based on current language
 *
 * @param contentFile - Name of the content file (e.g., 'home.json')
 * @returns The loaded content data or null if loading/error
 *
 * @example
 * const data = useContentData<HomeContent>('home.json');
 * // Loads 'home-fi.json' or 'home-en.json' based on current language
 * if (!data) return <div>Loading...</div>;
 * return <div>{data.name}</div>;
 */
export function useContentData<T>(contentFile: string): T | null {
  const { language } = useLanguage();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Add language suffix: 'home.json' -> 'home-fi.json' or 'home-en.json'
    const fileName = contentFile.replace('.json', `-${language}.json`);

    fetch(`/content/${fileName}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch ${fileName}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error(`Error loading content file ${fileName}:`, err);
        setError(err);
      });
  }, [contentFile, language]);

  if (error) {
    console.error('Content loading error:', error);
    return null;
  }

  return data;
}
