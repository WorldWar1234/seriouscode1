// Set the minimum compress length (adjust as needed)
const MIN_COMPRESS_LENGTH = 512;

// Set the minimum compress length for transparent images (e.g., PNG, GIF)
const MIN_TRANSPARENT_COMPRESS_LENGTH = MIN_COMPRESS_LENGTH * 100;

// Export the shouldCompress function
function shouldCompress(req) {
  // Extract parameters from the request
  const { originType, originSize, webp } = req.params;

  // Check if the origin type is an image
  if (!originType.startsWith('image')) {
    // Return false if not an image
    return false;
  }

  // Check if the origin size is 0
  if (originSize === 0) {
    // Return false if size is 0
    return false;
  }

  // Check if WebP compression is enabled and size is below minimum compress length
  if (webp && originSize < MIN_COMPRESS_LENGTH) {
    // Return false if size is too small for WebP compression
    return false;
  }

  // Check if non-WebP compression is enabled for transparent images (PNG, GIF) and size is below minimum transparent compress length
  if (!webp && (originType.endsWith('png') || originType.endsWith('gif')) && originSize < MIN_TRANSPARENT_COMPRESS_LENGTH) {
    // Return false if size is too small for non-WebP compression of transparent images
    return false;
  }

  // Return true if all checks pass (compression is needed)
  return true;
}

// Export the shouldCompress function
module.exports = shouldCompress;
