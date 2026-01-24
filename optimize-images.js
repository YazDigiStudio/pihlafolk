/**
 * Image Optimization Script for Pihla Folk Website
 *
 * This script processes CMS uploads and optimizes them:
 * - CMS uploads high-res originals to public/uploads/
 * - Script optimizes and copies to public/images/web/
 * - Site references /images/web in JSON files
 * - Originals remain in public/uploads/ as backup
 *
 * Usage:
 *   node optimize-images.js           - Optimize CMS uploads
 *   node optimize-images.js --assets  - Also optimize public/assets/
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_DIR = path.join(__dirname, 'public/uploads');
const WEB_DIR = path.join(__dirname, 'public/images/web');
const ASSETS_DIR = path.join(__dirname, 'public/assets');
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 85;
const PNG_QUALITY = 85;

// Check for asset optimization flag
const optimizeAssets = process.argv.includes('--assets');

optimizeImages();

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  let totalSavings = 0;
  let processedCount = 0;

  // Process CMS uploads from public/uploads/ to public/images/web/
  if (fs.existsSync(UPLOADS_DIR)) {
    console.log('Processing CMS uploads from public/uploads/ to public/images/web/...');
    const uploadResults = await processUploadsToWeb(UPLOADS_DIR);
    totalSavings += uploadResults.savings;
    processedCount += uploadResults.count;
  } else {
    console.log('No uploads folder found, skipping CMS uploads.');
  }

  // Optionally optimize images in assets/ folder (logos, wallpapers)
  if (optimizeAssets && fs.existsSync(ASSETS_DIR)) {
    console.log('\nOptimizing images in public/assets/...');
    const assetsResults = await optimizeAssetsInPlace(ASSETS_DIR);
    totalSavings += assetsResults.savings;
    processedCount += assetsResults.count;
  }

  const totalSavedMB = (totalSavings / 1024 / 1024).toFixed(2);
  console.log('\n========================================');
  console.log(`Image optimization complete!`);
  console.log(`Processed: ${processedCount} images`);
  console.log(`Total saved: ${totalSavedMB}MB`);
  console.log(`Originals preserved in: public/uploads/`);
  console.log(`Optimized copies in: public/images/web/`);
}

// Process uploads from public/uploads/ to public/images/web/
async function processUploadsToWeb(uploadsDir) {
  let totalSavings = 0;
  let processedCount = 0;

  async function processDirectory(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(itemPath);
      } else if (stat.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(item)) {
        // Calculate relative path from uploads dir
        const relativePath = path.relative(uploadsDir, itemPath);
        const outputPath = path.join(WEB_DIR, relativePath);

        const result = await optimizeAndCopyImage(itemPath, outputPath);
        if (result) {
          totalSavings += result.savings;
          processedCount += result.processed ? 1 : 0;
        }
      }
    }
  }

  await processDirectory(uploadsDir);
  return { savings: totalSavings, count: processedCount };
}

// Optimize assets in place (with backup)
async function optimizeAssetsInPlace(assetsDir) {
  let totalSavings = 0;
  let processedCount = 0;

  const items = fs.readdirSync(assetsDir);

  for (const item of items) {
    const itemPath = path.join(assetsDir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(item)) {
      const result = await optimizeImageInPlace(itemPath);
      if (result) {
        totalSavings += result.savings;
        processedCount += result.processed ? 1 : 0;
      }
    }
  }

  return { savings: totalSavings, count: processedCount };
}

// Optimize image from uploads and copy to web directory
async function optimizeAndCopyImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const inputSizeKB = (stats.size / 1024).toFixed(0);
    const relativePath = path.relative(UPLOADS_DIR, inputPath);

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Skip if output already exists and is newer than input
    if (fs.existsSync(outputPath)) {
      const outputStats = fs.statSync(outputPath);
      if (outputStats.mtime > stats.mtime) {
        console.log(`⊘ ${relativePath} - Already processed, skipping`);
        return { savings: 0, processed: false };
      }
    }

    // Determine output format and settings
    const ext = path.extname(inputPath).toLowerCase();
    let sharpInstance = sharp(inputPath).resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });

    if (ext === '.jpg' || ext === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: JPEG_QUALITY, progressive: true });
    } else if (ext === '.png') {
      sharpInstance = sharpInstance.png({ quality: PNG_QUALITY, compressionLevel: 9 });
    } else if (ext === '.webp') {
      sharpInstance = sharpInstance.webp({ quality: JPEG_QUALITY });
    }

    // Save optimized version to web directory
    await sharpInstance.toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(0);
    const reduction = ((1 - outputStats.size / stats.size) * 100).toFixed(0);
    const savedKB = ((stats.size - outputStats.size) / 1024).toFixed(0);

    console.log(`✓ ${relativePath}`);
    console.log(`  ${inputSizeKB}KB → ${outputSizeKB}KB (saved ${savedKB}KB, ${reduction}% smaller)`);

    return { savings: (stats.size - outputStats.size), processed: true };
  } catch (error) {
    console.error(`✗ Failed to process ${inputPath}:`, error.message);
    return { savings: 0, processed: false };
  }
}

// Optimize image in place (for assets)
async function optimizeImageInPlace(inputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const inputSizeKB = (stats.size / 1024).toFixed(0);
    const fileName = path.basename(inputPath);

    // Skip if already very small (< 100KB)
    if (stats.size < 100 * 1024) {
      console.log(`⊘ ${fileName} - Already optimized (${inputSizeKB}KB), skipping`);
      return { savings: 0, processed: false };
    }

    const tempPath = inputPath + '.tmp';

    // Determine output format and settings
    const ext = path.extname(inputPath).toLowerCase();
    let sharpInstance = sharp(inputPath).resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });

    if (ext === '.jpg' || ext === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: JPEG_QUALITY, progressive: true });
    } else if (ext === '.png') {
      sharpInstance = sharpInstance.png({ quality: PNG_QUALITY, compressionLevel: 9 });
    } else if (ext === '.webp') {
      sharpInstance = sharpInstance.webp({ quality: JPEG_QUALITY });
    }

    // Save to temp file first
    await sharpInstance.toFile(tempPath);

    const outputStats = fs.statSync(tempPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(0);
    const reduction = ((1 - outputStats.size / stats.size) * 100).toFixed(0);
    const savedKB = ((stats.size - outputStats.size) / 1024).toFixed(0);

    // Only replace if we actually saved space
    if (outputStats.size < stats.size) {
      fs.renameSync(tempPath, inputPath);

      console.log(`✓ ${fileName}`);
      console.log(`  ${inputSizeKB}KB → ${outputSizeKB}KB (saved ${savedKB}KB, ${reduction}% smaller)`);

      return { savings: (stats.size - outputStats.size), processed: true };
    } else {
      // Remove temp file if no improvement
      fs.unlinkSync(tempPath);
      console.log(`⊘ ${fileName} - No improvement, keeping original (${inputSizeKB}KB)`);

      return { savings: 0, processed: false };
    }
  } catch (error) {
    console.error(`✗ Failed to process ${inputPath}:`, error.message);
    const tempPath = inputPath + '.tmp';
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return { savings: 0, processed: false };
  }
}

