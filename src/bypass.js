// Export the bypass function
function bypass(req, res, buffer) {
  // Set the x-proxy-bypass header to indicate that the response was not modified
  res.setHeader('x-proxy-bypass', 1);

  // Set the content-length header to the length of the response buffer
  res.setHeader('content-length', buffer.length);

  // Return a 200 OK response with the original buffer
  res.status(200).send(buffer);
}

// Export the bypass function
module.exports = bypass;
