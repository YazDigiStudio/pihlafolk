# Open Graph Image Setup

## What is this?

The `og-image.jpg` file is used when someone shares the website on social media (Facebook, LinkedIn, WhatsApp, etc.). It's the preview image that appears.

## Requirements:

- **Size:** 1200px × 630px (Facebook/LinkedIn standard)
- **Format:** JPG or PNG
- **File name:** `og-image.jpg`
- **Location:** `/public/og-image.jpg`

## What should it show?

For a professional portfolio, the OG image should be:
- Professional headshot or photo of the client
- Name clearly visible: "CLIENT NAME"
- Job title or professional title
- Clean, professional design matching the website colors

## How to create:

1. **Option 1: Use Canva (easiest)**
   - Go to canva.com
   - Create custom size: 1200 × 630px
   - Add client's professional headshot
   - Add text overlay with name and title
   - Download as JPG
   - Save as `/public/og-image.jpg`

2. **Option 2: Use Photoshop/Figma**
   - Create canvas 1200 × 630px
   - Add professional photo
   - Add text overlay
   - Export as JPG (quality 90%)
   - Save as `/public/og-image.jpg`

3. **Option 3: Use hero image**
   - Resize hero image to 1200 × 630px
   - Crop to show client prominently
   - Save as `/public/og-image.jpg`

## Example text overlay:

```
CLIENT NAME
Professional Title | Specialty
```

## Test the image:

After uploading, test how it looks:
- Facebook: https://developers.facebook.com/tools/debug/
- LinkedIn: Share the URL and preview
- Twitter: https://cards-dev.twitter.com/validator

## File location in this project:

```
/public/og-image.jpg  ← Put the image here
```

Currently referenced in `/index.html` meta tags.
