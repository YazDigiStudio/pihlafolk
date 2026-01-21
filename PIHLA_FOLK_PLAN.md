# Pihla Folk Website Transformation Plan

**Project:** Transform portfolio template into artist management agency website
**Client:** Pihla Folk (led by Mari Pääkkönen)
**Studio:** YazDigiStudio
**Package:** Basic/Extended (€799-999)
**Date:** January 2026

---

## 1. About Pihla Folk

**Pihla Folk is an artist management agency**, not a festival. Key activities:

- **Artist Management & Booking** - Manages roster of folk/world music artists
- **Production Services** - Produces concerts, events, and recordings
- **Consulting & Mentoring** - Offers expertise in music production and artist development
- **Own Productions** - Creates original shows (e.g., Laulettu Kalevala)

**Led by:** Mari Pääkkönen (producer, artistic director, folk music professional)

**Managed Artists:**
- Ensemble Gamut
- FRÄNDER
- Dänkki Briha
- Aizhan Sultan

---

## 2. Project Assets

### Materials Folder
Located at: `PihlaFolk/pihla folkin verkkosivujen materiaalit/`

**Visual Identity:**
- Brand colors: Red (#ff0000), Black (#0c0c0c), Gray (#f4f4f4)
- Logos (himmeli-style geometric pattern)
- Pattern graphics (kuosiRaportti)
- Background images

**Content Documents (Word files):**
1. Pihla Folk introduction
2. Mari Pääkkönen bio
3. Blog/news content
4. Own productions descriptions
5. Artist bios (Ensemble Gamut, FRÄNDER, Dänkki Briha, Aizhan Sultan)
6. Services descriptions
7. Services offerings
8. Media bank materials
9. Contact information

### Template Folder
Located at: `PihlaFolk/pihlafolk website/`

**Tech Stack:**
- React 19 + TypeScript
- Vite (build tool)
- Decap CMS (already installed and configured!)
- Bilingual support (FI/EN)
- Color palette system
- Image optimization (Sharp)
- ~2,600 lines of code

**Current Pages:**
- HomePage (hero with full-page image)
- GalleryPage (image grid with categories)
- AboutPage (bio sections)
- MediaPage (videos, audio, external links)
- CVPage (sections with markdown)
- ContactPage (email, social media, links)

---

## 3. Transformation Strategy

### Why Keep the Template?

✅ **Solid Infrastructure:**
- Professional React/TypeScript setup
- Useful hooks (useScreenSize, useContentData, useTranslations, usePageMeta)
- Color palette system (easy to swap to Pihla Folk colors)
- Responsive design patterns
- SEO optimization hooks
- Image optimization scripts

✅ **Decap CMS Already Configured:**
- Visual content editor for clients
- Bilingual content management
- Git-based (no database, no security issues)
- Client can update content independently
- Adds major value to Basic/Extended package

✅ **"Build Once, Run Forever" Philosophy:**
- Static site = no server maintenance
- No WordPress update nightmares
- Deploy to Netlify (free hosting)
- Zero ongoing costs for client
- Aligns with YazDigiStudio's "easier, faster, better" approach

### What We'll Transform

**Keep:**
- React/TypeScript/Vite infrastructure
- Bilingual system
- Decap CMS
- Hooks and utilities
- Image optimization
- Build scripts

**Change:**
- Switch from hash routing to React Router (proper URLs)
- Replace color palette with Pihla Folk brand colors
- Rewrite all page components for agency content
- Update navigation structure
- Adapt Decap CMS config for agency pages
- Replace all content (text, images)

---

## 4. Site Structure

### Page Structure (6 pages)

| # | Route | Finnish | English | Content |
|---|-------|---------|---------|---------|
| 1 | `/` | Etusivu | Home | Agency intro, hero, what Pihla Folk does |
| 2 | `/artistit` | Artistit | Artists | Managed artist roster with photos/bios |
| 3 | `/palvelut` | Palvelut | Services | Booking, management, production, consulting |
| 4 | `/tuotannot` | Tuotannot | Productions | Own productions (Laulettu Kalevala, etc.) |
| 5 | `/tietoa` | Tietoa | About | Pihla Folk story + Mari Pääkkönen bio |
| 6 | `/yhteystiedot` | Yhteystiedot | Contact | Booking inquiries, contact form |

**Optional (can add later):**
- `/blogi` - News/Blog section (easy with Decap CMS)

### Navigation

**Desktop:** Horizontal menu in header
**Mobile:** Hamburger menu

**Language switcher:** FI/EN toggle (already implemented)

---

## 5. Design Approach

### Brand Colors (from visual identity)

```css
Primary Red:    #ff0000
Black:          #0c0c0c
Light Gray:     #f4f4f4
Text on Light:  #0c0c0c
Text on Dark:   #ffffff
```

### Visual Elements

- **Logo:** Himmeli geometric pattern (red)
- **Typography:** Clean, modern sans-serif (existing template style)
- **Patterns:** Use kuosiRaportti.jpg as background element
- **Images:** Artist photos, production photos from materials folder

### Reference Inspiration

**Kuhmo Festival (kuhmofestival.fi)** as visual reference for:
- Professional presentation
- Artist/event showcase approach
- Clean layout with warm accent colors
- Responsive navigation

---

## 6. Technical Implementation Plan

### Phase 1: Foundation Setup
**Goal:** Update infrastructure without breaking anything

- [ ] Create new git branch `feature/pihla-folk-transformation`
- [ ] Install React Router (`react-router-dom`)
- [ ] Replace hash routing with React Router in PortfolioSite.tsx
- [ ] Update color palette in `colorPalettes.ts` with Pihla Folk colors
- [ ] Copy visual assets (logos, patterns, images) to `/public`
- [ ] Update site metadata (title, description, favicon)
- [ ] Test that everything still works

**Estimated time:** 2-3 hours

---

### Phase 2: Navigation & Routing
**Goal:** Modern URL structure with proper routes

- [ ] Update Navigation component with new route structure
- [ ] Update route labels (Etusivu, Artistit, Palvelut, etc.)
- [ ] Create route definitions in PortfolioSite.tsx
- [ ] Update Decap CMS config button links (remove `#` prefix)
- [ ] Add 404 page
- [ ] Test routing and navigation

**Estimated time:** 2-3 hours

---

### Phase 3: Content Structure
**Goal:** Prepare content files and types

- [ ] Create new content JSON files:
  - `home-fi.json` / `home-en.json`
  - `artists-fi.json` / `artists-en.json`
  - `services-fi.json` / `services-en.json`
  - `productions-fi.json` / `productions-en.json`
  - `about-fi.json` / `about-en.json`
  - `contact-fi.json` / `contact-en.json`
- [ ] Define TypeScript types for each content structure
- [ ] Update translations file with new page labels
- [ ] Create placeholder content (to be filled later)

**Estimated time:** 2-3 hours

---

### Phase 4: Page Components
**Goal:** Rewrite pages for agency content

#### HomePage
- Agency introduction
- Hero section with Pihla Folk branding
- Featured artists or upcoming events
- Call-to-action buttons

#### ArtistsPage (was GalleryPage)
- Grid of artist cards
- Each card: photo, name, genre, short bio
- Click to expand or link to artist detail
- Filter by category if needed

#### ServicesPage (was MediaPage)
- Service categories:
  - Artist Management & Booking
  - Production Services
  - Consulting & Mentoring
  - Other Services
- Description of each service
- Contact CTA

#### ProductionsPage (was CVPage)
- Own productions showcase
- Laulettu Kalevala featured
- Past and upcoming productions
- Images, descriptions, links

#### AboutPage
- Pihla Folk story and mission
- Mari Pääkkönen bio with photo
- Team info if applicable
- Philosophy/values

#### ContactPage
- Contact form
- Email and phone
- Social media links
- Office address if applicable

**Estimated time:** 8-12 hours

---

### Phase 5: Decap CMS Configuration
**Goal:** Update CMS for new page structure

- [ ] Update `public/admin/config.yml` with new collections:
  - Home page fields
  - Artists collection (repeating items)
  - Services page fields
  - Productions collection
  - About page fields
  - Contact page fields
- [ ] Add blog collection (optional, simple)
- [ ] Test CMS locally (`npm run dev` + `/admin`)
- [ ] Verify all fields work correctly

**Estimated time:** 2-3 hours

---

### Phase 6: Content Population
**Goal:** Fill site with actual Pihla Folk content

**Content extraction from Word docs:**
- [ ] Extract text from materials folder documents
- [ ] Process and format for web
- [ ] Translate if needed (FI/EN)
- [ ] Optimize images from materials folder
- [ ] Input content into JSON files or via Decap CMS

**Images:**
- [ ] Copy logos to `/public/assets/`
- [ ] Optimize artist photos (Sharp script)
- [ ] Create optimized versions (WebP, multiple sizes)
- [ ] Update image paths in content

**Note:** This phase will be done later when actual content is provided

**Estimated time:** 4-6 hours (depends on content volume)

---

### Phase 7: Testing & Polish
**Goal:** Ensure everything works perfectly

- [ ] Test all pages on desktop
- [ ] Test all pages on mobile
- [ ] Test all pages on tablet
- [ ] Test language switching
- [ ] Test navigation and routing
- [ ] Test Decap CMS (all fields, image uploads)
- [ ] Verify SEO meta tags
- [ ] Run Lighthouse audit
- [ ] Test form submissions
- [ ] Fix any bugs or issues

**Estimated time:** 3-4 hours

---

### Phase 8: Deployment
**Goal:** Launch the site

- [ ] Merge feature branch to main
- [ ] Set up Netlify project
- [ ] Configure build settings
- [ ] Set up Netlify Identity (for Decap CMS authentication)
- [ ] Configure environment variables if needed
- [ ] Deploy to production
- [ ] Test live site
- [ ] Set up custom domain (if provided)
- [ ] Configure SSL certificate
- [ ] Set up Netlify Forms for contact form

**Estimated time:** 2-3 hours

---

## 7. Deliverables

### What Client Gets

**Website:**
- Professional artist management agency website
- 6 core pages (Home, Artists, Services, Productions, About, Contact)
- Fully responsive (mobile, tablet, desktop)
- Bilingual (Finnish/English)
- Fast loading (optimized images, static site)
- SEO optimized (meta tags, structured data)

**CMS Access:**
- Login at `yoursite.com/admin`
- Edit all page content
- Upload images
- Manage artist roster
- Update services and productions
- Add blog posts (if enabled)
- No technical knowledge required

**Hosting & Deployment:**
- Deployed to Netlify (free tier)
- Automatic SSL certificate
- CDN for fast global delivery
- Automatic deployments from git

**Documentation:**
- README with setup instructions
- Guide for using Decap CMS
- How to make content updates
- Contact for support

---

## 8. Future Expansion (Pro Package)

When Pihla Folk wants to expand (€1,999 Pro Package), we can add:

**Event Management:**
- Event calendar system
- Past and upcoming concerts
- Venue information
- Ticket links

**Advanced Features:**
- Artist detail pages (individual pages per artist)
- Advanced search/filtering
- Newsletter integration (Mailchimp/Klaviyo)
- Booking request system (more complex than contact form)
- Press kit downloads
- Media gallery with categories
- Testimonials/reviews section

**Integrations:**
- Ticketing platforms (Lippupiste, Ticketmaster)
- Social media feeds
- Email marketing
- Analytics dashboard
- Calendar exports (iCal)

---

## 9. Project Timeline

**Total estimated time:** 25-35 hours

**Suggested schedule:**
- Week 1: Phases 1-3 (Foundation, Routing, Content Structure)
- Week 2: Phase 4 (Page Components)
- Week 3: Phases 5-6 (CMS Config, Content Population)
- Week 4: Phases 7-8 (Testing, Deployment)

**Blockers/Dependencies:**
- Need actual content from Word documents
- Need finalized artist photos
- Need client contact information
- Need domain name (if custom domain desired)

---

## 10. Success Metrics

**Launch goals:**
- All 6 pages functional and beautiful
- Lighthouse score >90
- Mobile-friendly (passes Google test)
- Client can edit content via CMS
- Site loads in <2 seconds
- Works in all modern browsers

**Business goals:**
- Showcases Pihla Folk's artist roster professionally
- Generates booking inquiries via contact form
- Establishes Mari Pääkkönen as credible industry leader
- Reduces client dependency on developer for updates
- Zero hosting costs for client

---

## 11. Notes & Decisions

### Design Reference
- Kuhmo Festival used for inspiration (not a direct copy)
- Maintain Pihla Folk's unique red/black brand identity
- Modern, clean, professional aesthetic
- Focus on artists and their work

### Technical Decisions
- React Router over hash routing (better SEO, cleaner URLs)
- Keep Decap CMS (adds value to package)
- Static site approach (aligns with studio philosophy)
- TypeScript for type safety
- Component-based architecture

### Content Strategy
- Bilingual from day one (FI primary, EN for international reach)
- Focus on artists (they are the product)
- Clear service offerings (how to work with Pihla Folk)
- Mari's expertise highlighted (builds trust)

---

## 12. Open Questions

**To clarify with client:**
1. Do they want a blog/news section now, or later?
2. Do they have high-res photos of all artists?
3. Do they want individual artist detail pages, or grid is enough?
4. What social media platforms should we link to?
5. Do they have a preferred contact email/phone?
6. Do they want a physical address listed?
7. Any specific artist order/priority?
8. Do they want to highlight any upcoming events on homepage?

---

## Next Steps

1. Review this plan with YazDigiStudio team
2. Get approval to proceed
3. Create feature branch and start Phase 1
4. Document progress as we go
5. Schedule content gathering session with client
