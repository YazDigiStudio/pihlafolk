/**
 * Image path utilities for converting CMS upload paths to optimized web paths.
 *
 * The CMS saves images to /uploads/ (public/uploads/ on disk)
 * The build process optimizes them to /images/web/ (public/images/web/ on disk)
 * This utility converts paths from the CMS format to the optimized web format.
 */

/**
 * Converts a CMS upload path to an optimized web image path.
 *
 * @param uploadPath - Path from CMS (e.g., "/uploads/artists/artist.jpg")
 * @returns Optimized web path (e.g., "/images/web/artists/artist.jpg")
 *
 * @example
 * getOptimizedImagePath("/uploads/artists/artist.jpg")
 * // Returns: "/images/web/artists/artist.jpg"
 */
export function getOptimizedImagePath(uploadPath: string): string {
  if (!uploadPath) return "";
  return uploadPath.replace("/uploads/", "/images/web/");
}
