// Import required modules
const sharp = require('sharp');
const shouldCompress = require('./shouldCompress');
const bypass = require('./bypass');

// Export the proxy middleware function
module.exports = (req, res) => {
  // Check if URL is valid
  if (!req.params.url || typeof req.params.url !== 'string') {
    return res.status(400).send('Invalid image URL');
  }

  // Process the image using sharp
  sharp(req.params.url)
    .grayscale(req.params.grayscale)
    .toFormat(req.params.webp ? 'webp' : 'jpeg', {
      quality: req.params.quality,
      progressive: true,
      optimizeScans: true
    })
    .toBuffer((err, buffer, info) => {
      if (err) {
        console.error(err);
        res.status(500).send(`Error processing image: ${err.message}`);
      } else {
        // ...
      }
    });
};
