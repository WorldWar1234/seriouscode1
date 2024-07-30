const sharp = require('sharp');
const shouldCompress = require('./shouldCompress');

function proxy(req, res) {
  sharp(req.params.url)
    .grayscale(req.params.grayscale)
    .toFormat(req.params.webp ? 'webp' : 'jpeg', {
      quality: req.params.quality,
      progressive: true,
      optimizeScans: true
    })
    .toBuffer((err, output, info) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error processing image');
      } else if (shouldCompress(req)) {
        res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
        res.setHeader('content-length', info.size);
        res.status(200).send(output);
      } else {
        bypass(req, res, output);
      }
    });
}

module.exports = proxy;
