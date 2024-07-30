// Import required modules
const sharp = require('sharp');
const shouldCompress = require('./shouldCompress');
const bypass = require('./bypass');
const copyHeaders = require('./copyHeaders');

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
        // Set origin size and type
        req.params.originSize = buffer.length;
        req.params.originType = `image/${req.params.webp ? 'webp' : 'jpeg'}`;

        // Log buffer size and contents
        console.log('Buffer size:', buffer.length);
        console.log('Buffer contents:', buffer.slice(0, 100));

        if (shouldCompress(req)) {
          // Compress the image if required
          res.setHeader('content-type', req.params.originType);
          res.setHeader('content-length', info.size);
          res.setHeader('content-encoding', 'identity');
          res.status(200).send(buffer);
        } else {
          // Bypass compression and send the original image
          res.setHeader('content-type', req.params.originType);
          res.setHeader('content-length', buffer.length);
          res.setHeader('content-encoding', 'identity');
          bypass(req, res, buffer);
        }
      }
    });
};

// Copy headers from original response to proxy response
const proxyRes = (req, res) => {
  copyHeaders(req, res, proxyRes);
};
