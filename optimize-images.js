/**
 * Image Optimization Script for Pihla Folk Website
 *
 * This script optimizes images in the organized folder structure:
 * - Optimizes images in public/images/web/ (recursively)
 * - Optimizes images in public/assets/ (logos, wallpapers)
 * - Backs up originals to public/images/uploads/ before optimization
 * - Reduces file size significantly without visible quality loss
 *
 * Usage:
 *   node optimize-images.js           - Optimize all images
 *   node optimize-images.js --restore - Restore original images from backup
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEB_DIR = path.join(__dirname, 'public/images/web');
const ASSETS_DIR = path.join(__dirname, 'public/assets');
const BACKUP_DIR = path.join(__dirname, 'public/images/uploads');
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 85;
const PNG_QUALITY = 85;

// Check if restore mode
const restoreMode = process.argv.includes('--restore');

if (restoreMode) {
  restoreOriginals();
} else {
  optimizeImages();
}

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  let totalSavings = 0;
  let processedCount = 0;

  // Optimize images in web/ folder (recursively)
  if (fs.existsSync(WEB_DIR)) {
    console.log('Optimizing images in public/images/web/...');
    const webResults = await optimizeDirectory(WEB_DIR, WEB_DIR);
    totalSavings += webResults.savings;
    processedCount += webResults.count;
  }

  // Optimize images in assets/ folder (logos, wallpapers)
  if (fs.existsSync(ASSETS_DIR)) {
    console.log('\nOptimizing images in public/assets/...');
    const assetsResults = await optimizeDirectory(ASSETS_DIR, ASSETS_DIR, false); // Don't recurse for assets
    totalSavings += assetsResults.savings;
    processedCount += assetsResults.count;
  }

  const totalSavedMB = (totalSavings / 1024 / 1024).toFixed(2);
  console.log('\n========================================');
  console.log(`Image optimization complete!`);
  console.log(`Processed: ${processedCount} images`);
  console.log(`Total saved: ${totalSavedMB}MB`);
  console.log(`Originals backed up to: public/images/uploads/`);
  console.log(`\nTo restore originals: node optimize-images.js --restore`);
}

async function optimizeDirectory(dir, baseDir, recursive = true) {
  let totalSavings = 0;
  let processedCount = 0;

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory() && recursive) {
      // Recursively process subdirectories
      const results = await optimizeDirectory(itemPath, baseDir, recursive);
      totalSavings += results.savings;
      processedCount += results.count;
    } else if (stat.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(item)) {
      // Process image file
      const result = await optimizeImage(itemPath, baseDir);
      if (result) {
        totalSavings += result.savings;
        processedCount += result.processed ? 1 : 0;
      }
    }
  }

  return { savings: totalSavings, count: processedCount };
}

async function optimizeImage(inputPath, baseDir) {
  try {
    const stats = fs.statSync(inputPath);
    const inputSizeKB = (stats.size / 1024).toFixed(0);
    const relativePath = path.relative(baseDir, inputPath);

    // Skip if already very small (< 100KB)
    if (stats.size < 100 * 1024) {
      console.log(`⊘ ${relativePath} - Already optimized (${inputSizeKB}KB), skipping`);
      return { savings: 0, processed: false };
    }

    // Determine backup path maintaining folder structure
    let backupPath;
    if (inputPath.startsWith(WEB_DIR)) {
      // For web/ images, backup to uploads/ with same structure
      const relativeToWeb = path.relative(WEB_DIR, inputPath);
      backupPath = path.join(BACKUP_DIR, relativeToWeb);
    } else {
      // For assets/ images, backup to uploads/assets/
      const relativeToAssets = path.relative(ASSETS_DIR, inputPath);
      backupPath = path.join(BACKUP_DIR, 'assets', relativeToAssets);
    }

    // Backup original if not already backed up
    if (!fs.existsSync(backupPath)) {
      const backupDir = path.dirname(backupPath);
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      fs.copyFileSync(inputPath, backupPath);
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

      console.log(`✓ ${relativePath}`);
      console.log(`  ${inputSizeKB}KB → ${outputSizeKB}KB (saved ${savedKB}KB, ${reduction}% smaller)`);

      return { savings: (stats.size - outputStats.size), processed: true };
    } else {
      // Remove temp file if no improvement
      fs.unlinkSync(tempPath);
      console.log(`⊘ ${relativePath} - No improvement, keeping original (${inputSizeKB}KB)`);

      return { savings: 0, processed: false };
    }
  } catch (error) {
    console.error(`✗ Failed to process ${inputPath}:`, error.message);
    // Clean up temp file if it exists
    const tempPath = inputPath + '.tmp';
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return { savings: 0, processed: false };
  }
}

function restoreOriginals() {
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('No backup folder found. Nothing to restore.');
    return;
  }

  console.log('Restoring original images...\n');
  let restoredCount = 0;

  restoreDirectory(BACKUP_DIR, BACKUP_DIR);

  function restoreDirectory(dir, baseBackupDir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        restoreDirectory(itemPath, baseBackupDir);
      } else if (stat.isFile()) {
        const relativePath = path.relative(baseBackupDir, itemPath);

        // Determine target path
        let targetPath;
        if (relativePath.startsWith('assets' + path.sep)) {
          // Restore to public/assets/
          const relPath = path.relative('assets', relativePath);
          targetPath = path.join(ASSETS_DIR, relPath);
        } else {
          // Restore to public/images/web/
          targetPath = path.join(WEB_DIR, relativePath);
        }

        try {
          const targetDir = path.dirname(targetPath);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }

          fs.copyFileSync(itemPath, targetPath);
          console.log(`✓ Restored ${relativePath}`);
          restoredCount++;
        } catch (error) {
          console.error(`✗ Failed to restore ${relativePath}:`, error.message);
        }
      }
    }
  }

  console.log(`\nRestore complete! Restored ${restoredCount} files.`);
}
