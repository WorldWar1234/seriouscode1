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
      res.status(500).send('Error processing image');
    } else {
      console.log('Buffer size:', buffer.length);
      console.log('Buffer contents:', buffer.slice(0, 100)); // Log the first 100 bytes
      if (shouldCompress(req)) {
        // Compress the image if required
        res.setHeader('content-type', `image/${req.params.webp ? 'webp' : 'jpeg'}`);
        res.setHeader('content-length', info.size);
        res.status(200).send(buffer);
      } else {
        // Bypass compression and send the original image
        bypass(req, res, buffer);
      }
    }
  });
