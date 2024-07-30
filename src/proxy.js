// Import the sharp module for image processing
const sharp = require('sharp');

// Import the shouldCompress module for compression logic
const shouldCompress = require('./shouldCompress');

// Import the bypass module for bypassing compression
const bypass = require('./bypass');

// Export the proxy middleware function
module.exports = (req, res) => {
  // Process the image using sharp
  sharp(req.params.url)
    .grayscale(req.params.grayscale)
    .toFormat(req.params.webp ? 'webp' : 'jpeg', {
      quality: req.params.quality,
      progressive: true,
      optimizeScans: true
    })
    .toBuffer((err, output, info) => {
      if (err) {
        // Handle errors
        console.error(err);
        res.status(500).send('Error processing image');
      } else if (shouldCompress(req)) {
        // Compress the image if required
        res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
        res.setHeader('content-length', info.size);
        res.status(200).send(output);
      } else {
        // Bypass compression and send the original image
        bypass(req, res, output);
      }
    });
};
