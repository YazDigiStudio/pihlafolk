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
   - Upload images through the Decap CMS at `/admin`
   - CMS saves to: `public/images/web/`
   - High-res backup kept in: `public/images/uploads/`

2. **Accessing high-resolution images:**
   - All original uploads are in `public/images/uploads/`
   - These are full-resolution files for archival/download purposes

### Image Optimization

The `optimize-images.js` script:
- Optimizes images in `public/images/web/` (recursively)
- Optimizes images in `public/assets/` (logos, wallpapers)
- Backs up originals to `public/images/uploads/` before optimization
- Maintains folder structure in backups
- Reduces file sizes by 50-97% without visible quality loss

**Run optimization:**
```bash
npm run optimize
```

**Restore originals:**
```bash
node optimize-images.js --restore
```

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
media_folder: "public/images/web"
public_folder: "/images/web"
```

This means:
- Uploaded files are saved to `public/images/web/`
- JSON references use `/images/web/` paths
- Optimization happens automatically on build

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

## Migration

The reorganization has been completed:
- ✅ All images moved to new structure
- ✅ JSON files updated with new paths
- ✅ CMS config updated
- ✅ Optimization script updated
- ✅ Old duplicate files removed
