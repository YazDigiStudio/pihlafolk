/**
 * Font Styles for Portfolio Template
 *
 * Three Nordic-inspired font combinations using Google Fonts.
 * Easy to switch between styles to find the right feel.
 *
 * Usage:
 * import { ACTIVE_FONTS, FONT_STYLES, getFontImportUrl } from './fontStyles'
 *
 * Change ACTIVE_FONT_KEY to switch between font styles.
 */

export type FontStyle = {
  name: string
  description: string
  fonts: {
    // Title/Display fonts
    titleFamily: string
    titleWeight: number
    titleStyle: string

    // Body/Text fonts
    bodyFamily: string
    bodyWeight: number
    bodyStyle: string

    // Accent font (for special elements)
    accentFamily: string
    accentWeight: number
  }
  googleFonts: string[] // Font names for Google Fonts import
}

// Style 1: Modern Scandinavian
// Clean, geometric, Scandinavian modernist feel
export const MODERN_SCANDINAVIAN: FontStyle = {
  name: "Modern Scandinavian",
  description: "Clean geometric forms inspired by Scandinavian modernism. Josefin Sans has that classic Nordic design feel.",
  fonts: {
    titleFamily: "'Josefin Sans', sans-serif",
    titleWeight: 600,
    titleStyle: "normal",

    bodyFamily: "'Source Sans 3', sans-serif",
    bodyWeight: 400,
    bodyStyle: "normal",

    accentFamily: "'Josefin Sans', sans-serif",
    accentWeight: 300
  },
  googleFonts: ["Josefin+Sans:wght@300;400;600;700", "Source+Sans+3:wght@300;400;500;600"]
}

// Style 2: Folk Handwritten
// Handcrafted, folk art inspired, warm and personal
export const FOLK_HANDWRITTEN: FontStyle = {
  name: "Folk Handwritten",
  description: "Handcrafted feel inspired by Nordic folk art and traditions. Amatic SC has quirky, artisanal character.",
  fonts: {
    titleFamily: "'Amatic SC', cursive",
    titleWeight: 700,
    titleStyle: "normal",

    bodyFamily: "'Nunito', sans-serif",
    bodyWeight: 400,
    bodyStyle: "normal",

    accentFamily: "'Amatic SC', cursive",
    accentWeight: 400
  },
  googleFonts: ["Amatic+SC:wght@400;700", "Nunito:wght@300;400;500;600"]
}

// Style 3: Nature Organic
// Flowing, organic, nature-inspired handwritten feel
export const NATURE_ORGANIC: FontStyle = {
  name: "Nature Organic",
  description: "Flowing organic forms inspired by Nordic nature and forests. Caveat has a natural, personal handwritten quality.",
  fonts: {
    titleFamily: "'Caveat', cursive",
    titleWeight: 700,
    titleStyle: "normal",

    bodyFamily: "'Quicksand', sans-serif",
    bodyWeight: 400,
    bodyStyle: "normal",

    accentFamily: "'Caveat', cursive",
    accentWeight: 500
  },
  googleFonts: ["Caveat:wght@400;500;600;700", "Quicksand:wght@300;400;500;600"]
}

// All font styles available
export const FONT_STYLES = {
  modernScandinavian: MODERN_SCANDINAVIAN,
  folkHandwritten: FOLK_HANDWRITTEN,
  natureOrganic: NATURE_ORGANIC
} as const

// CHANGE THIS to switch active font style
// Options: 'modernScandinavian' | 'folkHandwritten' | 'natureOrganic'
export const ACTIVE_FONT_KEY: keyof typeof FONT_STYLES = "folkHandwritten"

// Active font style (use this in components)
export const ACTIVE_FONTS = FONT_STYLES[ACTIVE_FONT_KEY]

/**
 * Generate Google Fonts import URL for the active font style
 */
export function getFontImportUrl(fontStyle: FontStyle = ACTIVE_FONTS): string {
  const families = fontStyle.googleFonts.join("&family=")
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`
}

/**
 * Generate CSS for font-face declarations
 */
export function generateFontCSS(fontStyle: FontStyle = ACTIVE_FONTS): string {
  return `
    @import url('${getFontImportUrl(fontStyle)}');
  `.trim()
}

/**
 * Get inline style object for title elements
 */
export function getTitleStyles(fontStyle: FontStyle = ACTIVE_FONTS) {
  return {
    fontFamily: fontStyle.fonts.titleFamily,
    fontWeight: fontStyle.fonts.titleWeight,
    fontStyle: fontStyle.fonts.titleStyle
  }
}

/**
 * Get inline style object for body text
 */
export function getBodyStyles(fontStyle: FontStyle = ACTIVE_FONTS) {
  return {
    fontFamily: fontStyle.fonts.bodyFamily,
    fontWeight: fontStyle.fonts.bodyWeight,
    fontStyle: fontStyle.fonts.bodyStyle
  }
}

/**
 * Get inline style object for accent text
 */
export function getAccentStyles(fontStyle: FontStyle = ACTIVE_FONTS) {
  return {
    fontFamily: fontStyle.fonts.accentFamily,
    fontWeight: fontStyle.fonts.accentWeight
  }
}
