# Image Organization Guide

This document explains the organized image folder structure for the Pihla Folk website.

## Folder Structure

```
public/
├── assets/                           # Site infrastructure only
│   ├── pihla-folk-logo.png          # Site logos and branding
│   ├── pihla-folk-text-logo.png
│   ├── pihla-folk-icon.png
│   ├── wallpaper-home-bg.jpg        # Page background wallpapers
│   ├── wallpaper-productions-bg.jpg
│   ├── wallpaper-bg.jpg
│   ├── pattern-bg.jpg                # Background patterns
│   └── pattern-background.jpg
│
└── images/
    ├── downloads/                    # Developer staging area
    │   └── [Place original images here before optimization]
    │
    ├── uploads/                      # High-resolution sources
    │   ├── media/carousel/          # Original full-res images from CMS
    │   ├── artists/
    │   ├── productions/
    │   └── assets/                   # Backup of asset files
    │
    └── web/                          # Optimized images for web display
        ├── media/
        │   └── carousel/             # Media page carousel images
        ├── artists/                  # Artist profile photos
        ├── productions/              # Production photos
        └── home/                     # Home page content images
```

## Usage Workflows

### For Developers

1. **Adding new images:**
   ```bash
   # 1. Place original high-res images in public/images/downloads/
   # 2. Run optimization script
   npm run optimize
   # 3. Script will optimize and move to public/images/web/
   # 4. Clean up downloads/ folder when done
   ```

### For Content Managers (via CMS)

1. **Uploading through CMS:**
   - Upload images through the Decap CMS at `/admin` (on Netlify)
   - CMS saves high-res originals to: `public/uploads/` (committed to Git)
   - JSON files store `/uploads/` paths
   - Build process optimizes to: `public/images/web/` (not committed)
   - React code converts paths at runtime to use optimized versions

2. **Accessing high-resolution images:**
   - All original uploads are in `public/uploads/`
   - These are full-resolution files preserved in Git
   - Optimized versions are generated during build in `public/images/web/`

### Image Optimization Workflow

The `optimize-images.js` script:
- **CMS uploads** → Saved to `public/uploads/` (original quality, committed to Git)
- **JSON files** → Store `/uploads/` paths
- **Build process** → Optimizes from `uploads/` to `public/images/web/` (optimized, not committed)
- **React code** → Converts `/uploads/` paths to `/images/web/` at runtime via `getOptimizedImagePath()`
- **Maintains folder structure** in both locations
- **Reduces file sizes** by 50-97% without visible quality loss

**Run optimization manually:**
```bash
npm run optimize
```

**Optimize assets (logos, wallpapers):**
```bash
node optimize-images.js --assets
```

**Automatic optimization:**
- Runs automatically before every build (`prebuild` script)
- Netlify runs this before deploying

## File Paths in Code

- **Assets** → `/assets/filename.ext`
  - Example: `/assets/pihla-folk-logo.png`
  - Example: `/assets/wallpaper-home-bg.jpg`

- **Content Images** → `/images/web/page/section/filename.ext`
  - Example: `/images/web/media/carousel/carousel-1.jpg`
  - Example: `/images/web/artists/frander.jpg`
  - Example: `/images/web/productions/piot.jpg`

## CMS Configuration

The Decap CMS is configured as follows:

```yaml
media_folder: "public/uploads"
public_folder: "/uploads"
```

This means:
- CMS uploads files to `public/uploads/` (Git source of truth)
- JSON files store `/uploads/` paths (e.g., `/uploads/artists/photo.jpg`)

### Path Conversion (Runtime)

The React code converts paths to optimized versions using `getOptimizedImagePath()` in `src/utils/imageUtils.ts`:

```typescript
// Converts "/uploads/artists/photo.jpg" → "/images/web/artists/photo.jpg"
export function getOptimizedImagePath(uploadPath: string): string {
  return uploadPath.replace("/uploads/", "/images/web/");
}
```

All page components import and use this function:
- HomePage.tsx
- AboutPage.tsx
- ArtistsPage.tsx
- ProductionsPage.tsx
- MediaPage.tsx

### Build Process

1. CMS saves originals to `public/uploads/`
2. `npm run build` runs `optimize-images.js` (via prebuild script)
3. Script creates optimized copies in `public/images/web/`
4. Site displays optimized images via the path conversion utility

## Benefits

1. **Clear separation:**
   - Site infrastructure (assets/) vs content (images/)

2. **Organized by purpose:**
   - Easy to find images by page/section

3. **Multiple sizes managed:**
   - uploads/ = high-res sources
   - web/ = optimized for web delivery
   - downloads/ = temporary developer staging

4. **Easy backup:**
   - All originals preserved in uploads/
   - Can restore anytime with `--restore` flag

5. **Performance:**
   - Optimized images load faster
   - Smaller bandwidth usage
   - Better user experience

## Troubleshooting

### Image uploads failing in CMS

**Symptom**: Images upload in CMS but don't commit to GitHub. The CMS shows a broken image icon and the upload fails silently.

**Cause**: Decap CMS version 3.10.0 (released January 23, 2026) has a bug with Git Gateway image uploads. The version syntax `@^3.0.0` auto-updates to the latest version, which broke uploads when 3.10.0 was released.

**Solution**: The CMS version is pinned to 3.9.0 in `public/admin/index.html`:

```html
<script src="https://unpkg.com/decap-cms@3.9.0/dist/decap-cms.js"></script>
```

**Important**: Do NOT use `@^3.0.0` or `@latest` as these will auto-update to broken versions.

**Related**: [GitHub Issue #7576](https://github.com/decaporg/decap-cms/issues/7576)

## Migration

The reorganization has been completed:
- ✅ All images moved to new structure
- ✅ JSON files updated with new paths
- ✅ CMS config updated
- ✅ Optimization script updated
- ✅ Old duplicate files removed
