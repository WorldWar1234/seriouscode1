// Import the basic-auth module for HTTP Basic Authentication
const auth = require('basic-auth');

// Set the login and password from environment variables
const LOGIN = process.env.LOGIN;
const PASSWORD = process.env.PASSWORD;

// Export the authenticate middleware function
function authenticate(req, res, next) {
  // Check if login and password are set
  if (LOGIN && PASSWORD) {
    // Parse the Basic Authentication credentials from the request
    const credentials = auth(req);

    // Check if credentials are valid
    if (!credentials || credentials.name !== LOGIN || credentials.pass !== PASSWORD) {
      // Set the WWW-Authenticate header for Basic Authentication
      res.setHeader('WWW-Authenticate', `Basic realm="Bandwidth-Hero Compression Service"`);

      // Return a 401 Unauthorized response with a message
      return res.status(401).end('Access denied');
    }
  }

  // Call the next middleware function if authentication succeeds or is not required
  next();
}

// Export the authenticate function
module.exports = authenticate;
