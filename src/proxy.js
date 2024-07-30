const sharp = require('sharp');

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
      } else {
        res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
        res.setHeader('content-length', info.size);
        res.status(200).send(output);
      }
    });
}

module.exports = proxy;
