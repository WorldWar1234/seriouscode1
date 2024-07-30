// Import required modules
const sharp = require('sharp'); // Image processing library
const shouldCompress = require('./shouldCompress'); // Function to determine if compression is needed

// Define the proxy function
function proxy(req, res) {
  try {
    // Use Sharp to process the image
    sharp(req.params.url)
      .grayscale(req.params.grayscale) // Convert to grayscale if specified
      .toFormat(req.params.webp ? 'webp' : 'jpeg', { // Convert to webp or jpeg
        quality: req.params.quality, // Set quality level
        progressive: true, // Enable progressive scan
        optimizeScans: true // Optimize scans
      })
      .toBuffer((err, output, info) => { // Convert to buffer
        if (err) {
          console.error('Error processing image:', err);
          res.status(500).send('Error processing image');
        } else if (shouldCompress(req)) {
          // Set headers and return compressed image
          res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
          res.setHeader('content-length', info.size);
          res.status(200).send(output);
        } else {
          // Bypass compression and return original image
          bypass(req, res, output);
        }
      });
  } catch (err) {
    console.error('Error in proxy:', err);
    res.status(500).send('Error in proxy');
  }
}

// Export the proxy function
module.exports = proxy;
