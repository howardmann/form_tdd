const path = require('path');

module.exports = {
  // Define entry point
  entry: './src/components/app.js',
  // Define output point
  output: {
    path: path.resolve(__dirname + '/src/public'),
    filename: 'js/bundle.js'
  }
};