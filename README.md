# Portfolio Template - Actor/Performer Website

**This is a template** for creating professional portfolio websites for actors, performers, and artists. It includes a content management system (Decap CMS) and is ready to deploy.

## ✨ Features

- 🎨 **Beautiful responsive design** - Works on all devices
- 📝 **Decap CMS integration** - Easy content editing through admin panel
- 🌍 **Bilingual support** - Finnish and English content
- 📸 **Gallery with image optimization** - Automatic WebP conversion
- 🎬 **Media page** - Videos, audio samples, and external links
- 📄 **CV page** - Downloadable PDF support
- 📧 **Contact page** - Email and social media links
- ⚡ **Fast and lightweight** - Built with Vite for optimal performance

## 🚀 Quick Start

### 1. Copy this template for a new client

```bash
cp -r /Users/timosaari/Documents/YazDigiStudio/templates/portfolio-template1 /path/to/new-client-site
cd /path/to/new-client-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Initialize git repository

```bash
git init
git add .
git commit -m "Initial commit from portfolio-template1"
```

### 4. Update content

**Option A: Use Decap CMS (Recommended)**
- Deploy to Netlify first
- Access `/admin` on your deployed site
- Edit content through the CMS interface

**Option B: Edit JSON files directly**
- Edit files in `public/content/` folder
- See "Content Structure" section below

### 5. Run development server

```bash
npm run dev
```

### 6. Deploy to Netlify

```bash
# Connect to Netlify
netlify init

# Deploy
netlify deploy --prod
```

## 📁 Content Structure

All content is stored in JSON files in the `public/content/` folder:

### Home Page
- `home-en.json` / `home-fi.json`
- Name, subtitle, hero paragraphs, button configuration

### About Page
- `about-en.json` / `about-fi.json`
- Biography paragraphs

### Gallery
- `gallery-en.json` / `gallery-fi.json`
- Image gallery with categories (Headshots, Production, Promotional)

### Media Page
- `media-en.json` / `media-fi.json`
- Videos (YouTube, Vimeo, direct)
- Audio files
- External links

### CV Page
- `cv-en.json` / `cv-fi.json`
- CV sections (Education, Work Experience, Skills, etc.)
- Downloadable PDF option

### Contact Page
- `contact-en.json` / `contact-fi.json`
- Email, social media links, related links

## 🎨 Customization

### Change Color Palette

Edit `src/styles/colorPalettes.ts`:

```typescript
export const ACTIVE_PALETTE_KEY: keyof typeof PALETTES = 'graphite'
```

Available palettes:
1. **driftwoodPearlMorning** - Warm, earthy
2. **graphite** - Soft, elegant (default)
3. **sapphireAshMorning** - Cool, professional

### Add Custom Domain

1. In Netlify dashboard: Domain settings → Add custom domain
2. Update DNS records at your registrar
3. SSL certificate will be automatically provisioned

## 📝 Decap CMS Setup

### Access the CMS

- **Production**: `https://your-domain.com/admin`
- **Local development**:
  1. Run `npx decap-server` in one terminal
  2. Run `npm run dev` in another terminal
  3. Access `http://localhost:5173/admin`

### CMS Configuration

The CMS config is in `public/admin/config.yml`. It includes:

- **Editorial workflow** enabled (Draft → Ready → Publish)
- **Git Gateway** backend (requires Netlify Identity)
- **Media folder**: `public/images/downloads`

## 🖼️ Images

### Adding Images

1. **Via CMS**: Upload through Decap CMS admin panel
2. **Manually**: Place images in `public/images/downloads/`
3. **Optimize**: Run `npm run optimize` to convert to WebP

### Image Optimization

The template includes automatic image optimization:

```bash
npm run optimize
```

This converts all JPG/PNG images to WebP format for faster loading.

## 📦 Tech Stack

- **React 19** with TypeScript
- **Vite 7** - Build tool
- **Decap CMS 3.9** - Content management
- **Sharp** - Image optimization
- **No CSS framework** - Lightweight inline styles

## 🌐 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Enable Netlify Identity for CMS authentication

### Other Platforms

The site can be deployed to any static hosting platform:
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3

## 📋 Checklist for New Client

- [ ] Copy template to new directory
- [ ] Initialize git repository
- [ ] Update package.json (name, description)
- [ ] Replace placeholder content with client content
- [ ] Add client's images to gallery
- [ ] Configure Decap CMS if needed
- [ ] Deploy to Netlify
- [ ] Set up custom domain
- [ ] Enable Netlify Identity (for CMS)
- [ ] Test CMS workflow
- [ ] Hand over access to client

## 🛠️ Troubleshooting

### CMS not loading

- Check that Netlify Identity is enabled
- Verify Git Gateway is configured
- Check browser console for errors

### Images not showing

- Verify images are in `public/images/` folders
- Run `npm run optimize` to generate WebP versions
- Check image paths in content JSON files

### Build errors

- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors: `npx tsc --noEmit`
- Clear cache: `rm -rf node_modules dist && npm install`

## 📄 License

Template for Yaz Digi Studio clients

---

**Created by**: Timo Saari
**Template Version**: 1.0
**Last Updated**: December 2025
