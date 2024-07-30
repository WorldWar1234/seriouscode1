// Export the copyHeaders function
function copyHeaders(source, target) {
  // Iterate over the source headers using Object.entries()
  for (const [key, value] of Object.entries(source.headers)) {
    try {
      // Copy each header from the source to the target
      target.setHeader(key, value);
    } catch (e) {
      // Log any errors that occur while setting headers
      console.log(e.message);
    }
  }
}

// Export the copyHeaders function
module.exports = copyHeaders;
