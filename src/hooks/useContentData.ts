import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Hook to fetch and load CMS content from Markdown files with YAML frontmatter.
 * Automatically loads the correct language version based on current language.
 *
 * @param contentFile - Name of the content file (e.g., 'home.json')
 * @returns The loaded content data or null if loading/error
 *
 * @example
 * const data = useContentData<HomeContent>('home.json');
 * // Loads 'home-fi.md' or 'home-en.md' based on current language
 * if (!data) return <div>Loading...</div>;
 * return <div>{data.name}</div>;
 */
export function useContentData<T>(contentFile: string): T | null {
  const { language } = useLanguage();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    // Convert 'home.json' -> 'home-fi.md' or 'home-en.md'
    const base = contentFile.replace('.json', '');
    const fileName = `${base}-${language}.md`;

    fetch(`/content/${fileName}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch ${fileName}: ${res.statusText}`);
        return res.text();
      })
      .then(text => {
        const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
        if (!match) throw new Error(`No YAML frontmatter in ${fileName}`);
        return yaml.load(match[1]) as T;
      })
      .then(setData)
      .catch(err => {
        console.error(`Error loading content file ${fileName}:`, err);
        setData(null);
      });
  }, [contentFile, language]);

  return data;
}
