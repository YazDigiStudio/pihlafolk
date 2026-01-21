# Portfolio Template - Professional Portfolio Website

**Type:** Reusable portfolio template for professional clients
**Technology:** React + TypeScript + Vite + Decap CMS
**Status:** Production Ready

## Folder Structure

```
/src/
├─ .developmentPlan.md          # Development guide and template documentation
├─ .cmsPlan.md                  # CMS implementation guide
├─ README.md                    # This file
├─ PortfolioSite.tsx            # Main site router
├─ App.tsx                      # Main app component
├─ components/                  # Reusable components
│  ├─ Navigation.tsx            # Responsive navigation header
│  └─ LanguageSwitcher.tsx      # Multi-language toggle
├─ contexts/                    # React contexts
│  └─ LanguageContext.tsx       # Language state management
├─ hooks/                       # Custom React hooks
│  ├─ useContentData.ts         # CMS content loading
│  ├─ useScreenSize.ts          # Responsive breakpoints
│  ├─ useTranslations.ts        # UI translations
│  └─ usePageMeta.ts            # SEO meta tags
├─ pages/                       # Page components
│  ├─ HomePage.tsx              # Hero landing page
│  ├─ AboutPage.tsx             # Professional bio
│  ├─ GalleryPage.tsx           # Photo gallery with lightbox
│  ├─ MediaPage.tsx             # Videos and media embeds
│  ├─ CVPage.tsx                # Resume/CV with download
│  └─ ContactPage.tsx           # Contact information and social links
├─ styles/                      # Styling
│  └─ colorPalettes.ts          # 3 professional color palettes
└─ translations/                # UI translations
   └─ translations.ts           # Multi-language UI text
```

## Color Palettes

Three professional color palettes available (easily switchable):
1. **Driftwood Pearl Morning** - Warm, earthy, sophisticated
2. **Graphite** - Soft, elegant, professional
3. **Sapphire Ash Morning** - Cool, professional, clean

Currently using: **Driftwood** (configurable in `styles/colorPalettes.ts`)

To change palette: Edit `ACTIVE_PALETTE_KEY` in `styles/colorPalettes.ts`

## Features

### Multi-Language Support
- Language 1 (Primary) and Language 2 (Secondary)
- Language switcher component
- Separate content files per language
- Client-side language persistence

### CMS Integration
- Decap CMS for content management
- Git-based workflow
- Non-technical client interface
- Image upload capability
- Dynamic sections

### Responsive Design
- Mobile-first approach
- Responsive navigation (hamburger on mobile)
- Optimized for all screen sizes
- Touch-friendly interface

## Development Phases

When deploying for a new client:

1. **Phase 1:** Customize content
   - Replace placeholder content with client data
   - Upload client photos and media
   - Configure language settings

2. **Phase 2:** CMS Configuration
   - Update CMS labels for client
   - Test content management
   - Configure authentication

3. **Phase 3:** Deployment
   - Deploy to Netlify
   - Set up custom domain (if applicable)
   - Configure Netlify Identity
   - Train client on CMS usage

4. **Phase 4:** SEO Optimization
   - Create Open Graph image
   - Update meta tags
   - Submit to search engines
   - Link from client's social media

## Template Customization

### Essential Updates Per Client:
1. Content files in `/public/content/`
2. Meta tags in `/index.html`
3. Color palette in `src/styles/colorPalettes.ts` (optional)
4. Language codes if different from defaults
5. Hero background image

### Optional Customizations:
- Additional color palettes
- Custom navigation structure
- Additional page types
- Integration with third-party services

## Design Principles

- **Clean layout** - Large hero photo, clear structure
- **Bright backgrounds** - Light backgrounds, lots of whitespace
- **Professional navigation** - Clear horizontal menu with good UX
- **Sophisticated colors** - Muted, professional tones
- **Mobile responsive** - Works beautifully on all devices

## Technical Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **CMS:** Decap CMS (free, Git-based)
- **Hosting:** Netlify (recommended)
- **Styling:** Inline styles with color palette system
- **Image Optimization:** Sharp (automated)

## Notes

- Keep text COMPACT - concise and impactful
- Bright, clean design (not dark)
- Professional but approachable
- Mobile responsive throughout
- SEO-optimized structure

## Documentation

See these files for detailed documentation:
- `.developmentPlan.md` - Complete development guide
- `.cmsPlan.md` - CMS implementation and training guide
- `SEO-CHECKLIST.md` - SEO optimization checklist
- `public/OG-IMAGE-README.md` - Social media image guide
