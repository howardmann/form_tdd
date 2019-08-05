module.exports = {
  launch: {
    headless: true,
    // slowMo: 250
  },
  server: {
    command: 'PORT=4444 node ./src/server.js',
    port: 4444
  }
}