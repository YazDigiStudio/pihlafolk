/**
 * Create Open Graph image from hero image
 * Resizes to 1200x630px (OG standard size)
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createOGImage() {
  const inputPath = join(__dirname, 'public/assets/hero-bg.jpg');
  const outputPath = join(__dirname, 'public/og-image.jpg');

  try {
    // First, get the original image dimensions
    const metadata = await sharp(inputPath).metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;

    // Calculate the aspect ratio we need (1200:630 = 1.9:1)
    const targetAspectRatio = 1200 / 630;

    // Calculate crop dimensions maintaining the target aspect ratio
    let cropWidth = originalWidth;
    let cropHeight = Math.round(originalWidth / targetAspectRatio);

    // If calculated height is larger than original, base it on height instead
    if (cropHeight > originalHeight) {
      cropHeight = originalHeight;
      cropWidth = Math.round(originalHeight * targetAspectRatio);
    }

    // Start crop at 1/5 from the top of the image
    const cropTop = Math.round(originalHeight / 5);
    const cropLeft = Math.round((originalWidth - cropWidth) / 2); // Center horizontally

    // Make sure crop doesn't go beyond image bounds
    const adjustedTop = Math.min(cropTop, originalHeight - cropHeight);

    await sharp(inputPath)
      .extract({
        left: cropLeft,
        top: adjustedTop,
        width: cropWidth,
        height: cropHeight
      })
      .resize(1200, 630)
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log('✓ Created og-image.jpg (1200×630px)');
    console.log(`  Cropped from position: top ${adjustedTop}px, left ${cropLeft}px`);
  } catch (error) {
    console.error('Error creating OG image:', error);
  }
}

createOGImage();
