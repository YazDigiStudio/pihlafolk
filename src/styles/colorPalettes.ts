/**
 * Color Palettes for Portfolio Template
 *
 * Three professional color palettes available for customization.
 * Easy to switch between palettes to match client's brand or photos.
 *
 * Usage:
 * import { ACTIVE_PALETTE, PALETTES } from './colorPalettes'
 *
 * Change ACTIVE_PALETTE_KEY to switch between palettes.
 */

export type ColorPalette = {
  name: string
  description: string
  colors: {
    // Backgrounds
    bgPrimary: string      // Main background
    bgSecondary: string    // Section backgrounds
    bgAccent: string       // Subtle highlights

    // Text
    textPrimary: string    // Main text
    textHeading: string    // Headings
    textMuted: string      // Secondary text

    // Accents
    accentPrimary: string      // Primary accent
    accentSecondary: string    // Secondary accent
    accentTertiary: string     // Tertiary accent

    // Borders & UI
    borderColor: string    // Borders
    dividerColor: string   // Dividers
    hoverColor: string     // Hover states
    activeColor: string    // Active/selected states
  }
  rawColors: string[]  // Original palette colors for reference
}

// Palette 1: Driftwood Pearl Morning
export const DRIFTWOOD_PALETTE: ColorPalette = {
  name: 'Driftwood Pearl Morning',
  description: 'Warm, earthy, sophisticated with dusty rose and blue-gray accents',
  colors: {
    bgPrimary: '#F5F5F5',      // Light neutral background
    bgSecondary: '#CCCDC7',    // Driftwood gray sections
    bgAccent: '#E4A499',       // Light peachy pink highlights

    textPrimary: '#35627A',    // Dark brown main text
    textHeading: '#2e566bff',    // Dark brown headings
    textMuted: '#718A9E',      // Dusty blue-gray secondary

    accentPrimary: '#BC7B6F',  // Dusty rose primary
    accentSecondary: '#E4A499', // Peachy pink secondary
    accentTertiary: '#718A9E', // Dusty blue-gray tertiary

    borderColor: '#CCCDC7',    // Driftwood gray
    dividerColor: '#BC7B6F',   // Dusty rose dividers
    hoverColor: '#E4A499',     // Peachy pink hover
    activeColor: '#BC7B6F'     // Dusty rose active
  },
  rawColors: ['#CCCDC7', '#BC7B6F', '#5A322A', '#E4A499', '#718A9E']
}

// Palette 2: Graphite
export const GRAPHITE_PALETTE: ColorPalette = {
  name: 'Graphite',
  description: 'Soft, elegant, professional with pink and blue accents',
  colors: {
    bgPrimary: '#F5E9E7',      // Very light peachy beige
    bgSecondary: '#ECC5C6',    // Light pink sections
    bgAccent: '#C1C0C2',       // Light gray highlights

    textPrimary: '#837D68',    // Olive/taupe gray main text
    textHeading: '#5A322A',    // Dark brown headings (borrowed)
    textMuted: '#8A9DB1',      // Dusty blue secondary

    accentPrimary: '#ECC5C6',  // Light pink primary
    accentSecondary: '#8A9DB1', // Dusty blue secondary
    accentTertiary: '#C1C0C2', // Light gray tertiary

    borderColor: '#C1C0C2',    // Light gray
    dividerColor: '#ECC5C6',   // Light pink dividers
    hoverColor: '#8A9DB1',     // Dusty blue hover
    activeColor: '#ECC5C6'     // Light pink active
  },
  rawColors: ['#ECC5C6', '#C1C0C2', '#F5E9E7', '#837D68', '#8A9DB1']
}

// Palette 3: Sapphire Ash Morning
export const SAPPHIRE_PALETTE: ColorPalette = {
  name: 'Sapphire Ash Morning',
  description: 'Cool, professional, clean with blue and peachy accents',
  colors: {
    bgPrimary: '#F5F5F5',      // Off-white background
    bgSecondary: '#E5AEA9',    // Peachy pink sections
    bgAccent: '#A6A9D0',       // Soft lavender highlights

    textPrimary: '#35627A',    // Deep blue main text
    textHeading: '#35627A',    // Deep blue headings
    textMuted: '#8E9A98',      // Gray-green secondary

    accentPrimary: '#B46258',  // Dusty rose primary
    accentSecondary: '#E5AEA9', // Peachy pink secondary
    accentTertiary: '#A6A9D0', // Soft lavender tertiary

    borderColor: '#8E9A98',    // Gray-green
    dividerColor: '#B46258',   // Dusty rose dividers
    hoverColor: '#E5AEA9',     // Peachy pink hover
    activeColor: '#A6A9D0'     // Soft lavender active
  },
  rawColors: ['#35627A', '#E5AEA9', '#B46258', '#A6A9D0', '#F5F5F5', '#8E9A98']
}

// Palette 4: Pihla Folk
export const PIHLA_FOLK_PALETTE: ColorPalette = {
  name: 'Pihla Folk',
  description: 'Bold red and black brand identity with clean gray backgrounds',
  colors: {
    bgPrimary: '#f4f4f4',      // Light gray background
    bgSecondary: '#ffffff',    // White sections
    bgAccent: '#ff0000',       // Red highlights

    textPrimary: '#0c0c0c',    // Black text
    textHeading: '#0c0c0c',    // Black headings
    textMuted: '#666666',      // Gray secondary text

    accentPrimary: '#ff0000',  // Red primary accent
    accentSecondary: '#cc0000',// Darker red secondary
    accentTertiary: '#0c0c0c', // Black tertiary

    borderColor: '#dddddd',    // Light gray borders
    dividerColor: '#ff0000',   // Red dividers
    hoverColor: '#cc0000',     // Darker red hover
    activeColor: '#ff0000'     // Red active state
  },
  rawColors: ['#ff0000', '#0c0c0c', '#f4f4f4']
}

// Combined/Recommended Palette (starting point)
// Combines best elements from all three
export const COMBINED_PALETTE: ColorPalette = {
  name: 'Combined Palette',
  description: 'Carefully selected colors from all three palettes for optimal versatility',
  colors: {
    // Backgrounds - bright and clean
    bgPrimary: '#F5F5F5',      // Off-white (Sapphire)
    bgSecondary: '#F5E9E7',    // Cream (Graphite)
    bgAccent: '#ECC5C6',       // Light pink (Graphite)

    // Text - readable contrast
    textPrimary: '#5A322A',    // Dark brown (Driftwood)
    textHeading: '#35627A',    // Deep blue (Sapphire)
    textMuted: '#837D68',      // Olive gray (Graphite)

    // Accents - warm and sophisticated
    accentPrimary: '#BC7B6F',  // Dusty rose (Driftwood)
    accentSecondary: '#E5AEA9', // Peachy pink (Sapphire)
    accentTertiary: '#718A9E', // Dusty blue-gray (Driftwood)

    // UI elements
    borderColor: '#C1C0C2',    // Light gray (Graphite)
    dividerColor: '#CCCDC7',   // Driftwood gray
    hoverColor: '#E4A499',     // Light peachy pink (Driftwood)
    activeColor: '#A6A9D0'     // Soft lavender (Sapphire)
  },
  rawColors: [] // Combined from multiple palettes
}

// All palettes available
export const PALETTES = {
  driftwood: DRIFTWOOD_PALETTE,
  graphite: GRAPHITE_PALETTE,
  sapphire: SAPPHIRE_PALETTE,
  pihlafolk: PIHLA_FOLK_PALETTE,
  combined: COMBINED_PALETTE
} as const

// CHANGE THIS to switch active palette
// Options: 'driftwood' | 'graphite' | 'sapphire' | 'pihlafolk' | 'combined'
export const ACTIVE_PALETTE_KEY: keyof typeof PALETTES = 'pihlafolk'

// Active palette (use this in components)
export const ACTIVE_PALETTE = PALETTES[ACTIVE_PALETTE_KEY]

/**
 * Generate CSS variables for active palette
 * Use in component style tags or global styles
 */
export function generateCSSVariables(palette: ColorPalette = ACTIVE_PALETTE): string {
  const { colors } = palette

  return `
    --bg-primary: ${colors.bgPrimary};
    --bg-secondary: ${colors.bgSecondary};
    --bg-accent: ${colors.bgAccent};

    --text-primary: ${colors.textPrimary};
    --text-heading: ${colors.textHeading};
    --text-muted: ${colors.textMuted};

    --accent-primary: ${colors.accentPrimary};
    --accent-secondary: ${colors.accentSecondary};
    --accent-tertiary: ${colors.accentTertiary};

    --border-color: ${colors.borderColor};
    --divider-color: ${colors.dividerColor};
    --hover-color: ${colors.hoverColor};
    --active-color: ${colors.activeColor};
  `.trim()
}

/**
 * Get inline style object for React components
 */
export function getPaletteStyles(palette: ColorPalette = ACTIVE_PALETTE) {
  return {
    backgroundColor: palette.colors.bgPrimary,
    color: palette.colors.textPrimary
  }
}
