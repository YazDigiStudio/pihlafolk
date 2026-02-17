/**
 * Create Open Graph image from Pihla Folk logo
 * Creates 1200x630px image with logo centered on background
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createOGImage() {
  const logoPath = join(__dirname, 'public/assets/pihla-folk-logo.png');
  const outputPath = join(__dirname, 'public/og-image.jpg');

  // OG image dimensions
  const width = 1200;
  const height = 630;

  // Background color (light beige/cream to match site aesthetic)
  const backgroundColor = { r: 244, g: 244, b: 244 };

  try {
    // Get logo dimensions
    const logoMetadata = await sharp(logoPath).metadata();
    console.log(`Logo dimensions: ${logoMetadata.width}x${logoMetadata.height}px`);

    // Calculate logo size (max 60% of canvas width, maintain aspect ratio)
    const maxLogoWidth = Math.round(width * 0.6);
    const logoScale = Math.min(maxLogoWidth / logoMetadata.width, 1);
    const resizedLogoWidth = Math.round(logoMetadata.width * logoScale);
    const resizedLogoHeight = Math.round(logoMetadata.height * logoScale);

    // Resize logo
    const resizedLogo = await sharp(logoPath)
      .resize(resizedLogoWidth, resizedLogoHeight, { fit: 'inside' })
      .toBuffer();

    // Create canvas with background color and composite logo
    await sharp({
      create: {
        width: width,
        height: height,
        channels: 3,
        background: backgroundColor
      }
    })
    .composite([{
      input: resizedLogo,
      gravity: 'center'
    }])
    .jpeg({ quality: 90 })
    .toFile(outputPath);

    console.log('✓ Created og-image.jpg (1200×630px)');
    console.log(`  Logo size: ${resizedLogoWidth}×${resizedLogoHeight}px`);
    console.log(`  Background: RGB(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`);
  } catch (error) {
    console.error('Error creating OG image:', error);
  }
}

createOGImage();
