/**
 * Image Folder Reorganization Script
 *
 * Reorganizes images into a clean structure:
 * - public/assets/              → site infrastructure (logos, wallpapers, patterns)
 * - public/images/downloads/    → developer staging area
 * - public/images/uploads/      → high-res sources from CMS
 * - public/images/web/          → optimized web images organized by page/section
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of current files to new locations
const IMAGE_MAP = {
  // Site assets (logos, wallpapers, patterns) - stay in assets/
  'pihla-folk-logo.png': 'assets/pihla-folk-logo.png',
  'pihla-folk-text-logo.png': 'assets/pihla-folk-text-logo.png',
  'pihla-folk-icon.png': 'assets/pihla-folk-icon.png',
  'wallpaper-home-bg.jpg': 'assets/wallpaper-home-bg.jpg',
  'wallpaper-bg.jpg': 'assets/wallpaper-bg.jpg',
  'wallpaper-productions-bg.jpg': 'assets/wallpaper-productions-bg.jpg',
  'pattern-bg.jpg': 'assets/pattern-bg.jpg',
  'pattern-background.jpg': 'assets/pattern-background.jpg',
  'hero-bg-pihlafolk.jpg': 'assets/hero-bg-pihlafolk.jpg',

  // Media carousel images
  'carousel-1.jpg': 'images/web/media/carousel/carousel-1.jpg',
  'carousel-2.jpg': 'images/web/media/carousel/carousel-2.jpg',
  'carousel-3.jpg': 'images/web/media/carousel/carousel-3.jpg',
  'carousel-4.jpg': 'images/web/media/carousel/carousel-4.jpg',
  'carousel-5.jpg': 'images/web/media/carousel/carousel-5.jpg',
  'ilona-korhonen-ensemble-piot.jpg': 'images/web/media/carousel/ilona-korhonen-ensemble-piot.jpg',
  'mari-etnogaala.jpg': 'images/web/media/carousel/mari-etnogaala.jpg',
  'mari-jani-snellman.jpg': 'images/web/media/carousel/mari-jani-snellman.jpg',
  'pol00820.jpg': 'images/web/media/carousel/pol00820.jpg',
};

// JSON file path replacements
const PATH_REPLACEMENTS = [
  { from: '/assets/carousel-', to: '/images/web/media/carousel/carousel-' },
  { from: '/assets/ilona-korhonen-ensemble-piot.jpg', to: '/images/web/media/carousel/ilona-korhonen-ensemble-piot.jpg' },
  { from: '/assets/mari-etnogaala.jpg', to: '/images/web/media/carousel/mari-etnogaala.jpg' },
  { from: '/assets/mari-jani-snellman.jpg', to: '/images/web/media/carousel/mari-jani-snellman.jpg' },
  { from: '/assets/mari-paakkonen.jpg', to: '/images/web/media/carousel/mari-paakkonen.jpg' },
  { from: '/assets/pol00820.jpg', to: '/images/web/media/carousel/pol00820.jpg' },
  { from: '/assets/artists/', to: '/images/web/artists/' },
  { from: '/assets/productions/', to: '/images/web/productions/' },
];

async function reorganize() {
  console.log('Starting image reorganization...\n');

  const assetsDir = path.join(__dirname, 'public/assets');
  const publicDir = path.join(__dirname, 'public');

  // 1. Create new folder structure
  console.log('Creating new folder structure...');
  const newFolders = [
    'public/images/downloads',
    'public/images/uploads',
    'public/images/web/media/carousel',
    'public/images/web/artists',
    'public/images/web/productions',
    'public/images/web/home',
  ];

  for (const folder of newFolders) {
    const folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`  ✓ Created ${folder}`);
    }
  }

  // 2. Move files from assets/ to new locations
  console.log('\nMoving files...');
  let movedCount = 0;

  for (const [filename, newPath] of Object.entries(IMAGE_MAP)) {
    const sourcePath = path.join(assetsDir, filename);
    const destPath = path.join(publicDir, newPath);

    if (fs.existsSync(sourcePath)) {
      // Ensure destination directory exists
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Copy file (don't delete original yet, for safety)
      fs.copyFileSync(sourcePath, destPath);
      console.log(`  ✓ ${filename} → ${newPath}`);
      movedCount++;
    }
  }

  // 3. Move originals to uploads folder (high-res source)
  console.log('\nMoving originals to uploads folder...');
  const originalsDir = path.join(assetsDir, 'originals');
  const uploadsDir = path.join(__dirname, 'public/images/uploads');

  if (fs.existsSync(originalsDir)) {
    const originals = fs.readdirSync(originalsDir);
    let uploadedCount = 0;

    for (const file of originals) {
      const sourcePath = path.join(originalsDir, file);

      // Determine destination based on file mapping
      let destSubfolder = '';
      if (file.startsWith('carousel-') || ['ilona-korhonen-ensemble-piot.jpg', 'mari-etnogaala.jpg', 'mari-jani-snellman.jpg', 'pol00820.jpg'].includes(file)) {
        destSubfolder = 'media/carousel';
      } else if (!['pihla-folk-logo.png', 'pihla-folk-text-logo.png', 'pihla-folk-icon.png', 'wallpaper-home-bg.jpg', 'wallpaper-bg.jpg', 'wallpaper-productions-bg.jpg', 'pattern-bg.jpg', 'pattern-background.jpg', 'hero-bg-pihlafolk.jpg'].includes(file)) {
        destSubfolder = 'media/carousel'; // default to media/carousel for content images
      }

      if (destSubfolder) {
        const destDir = path.join(uploadsDir, destSubfolder);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        const destPath = path.join(destDir, file);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`  ✓ ${file} → images/uploads/${destSubfolder}/${file}`);
        uploadedCount++;
      }
    }

    console.log(`Moved ${uploadedCount} high-res originals to uploads/`);
  }

  // 4. Move existing subfolders (artists, productions)
  console.log('\nMoving existing subfolders...');
  const subfolders = ['artists', 'productions'];

  for (const subfolder of subfolders) {
    const sourceFolder = path.join(assetsDir, subfolder);
    const destFolder = path.join(__dirname, 'public/images/web', subfolder);

    if (fs.existsSync(sourceFolder)) {
      const files = fs.readdirSync(sourceFolder);

      for (const file of files) {
        const sourcePath = path.join(sourceFolder, file);
        const destPath = path.join(destFolder, file);

        fs.copyFileSync(sourcePath, destPath);
        console.log(`  ✓ ${subfolder}/${file} → images/web/${subfolder}/${file}`);
      }
    }
  }

  // 5. Update JSON files
  console.log('\nUpdating JSON file references...');
  const contentDir = path.join(__dirname, 'public/content');
  const jsonFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));

  for (const jsonFile of jsonFiles) {
    const filePath = path.join(contentDir, jsonFile);
    let content = fs.readFileSync(filePath, 'utf-8');
    let updated = false;

    for (const { from, to } of PATH_REPLACEMENTS) {
      if (content.includes(from)) {
        content = content.replaceAll(from, to);
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`  ✓ Updated ${jsonFile}`);
    }
  }

  console.log('\n========================================');
  console.log('Reorganization complete!');
  console.log(`Files moved: ${movedCount}`);
  console.log('\nNew structure:');
  console.log('  public/assets/           → logos, wallpapers, patterns');
  console.log('  public/images/downloads/ → developer staging');
  console.log('  public/images/uploads/   → high-res sources (CMS)');
  console.log('  public/images/web/       → optimized web images');
  console.log('\nNext steps:');
  console.log('  1. Update CMS config: media_folder: "public/images/uploads"');
  console.log('  2. Update optimization script to use new paths');
  console.log('  3. Test the site');
  console.log('  4. If everything works, delete old files from public/assets/');
}

reorganize().catch(console.error);
