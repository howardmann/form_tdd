// const path = require('path');

// module.exports = {
//   // Define entry point
//   entry: './src/components/app.js',
//   // Define output point
//   output: {
//     path: path.resolve(__dirname + '/src/public'),
//     filename: 'js/bundle.js'
//   }
// };

module.exports = {
  entry: {
    form: './src/components/form/index.js',
    counter: './src/components/counter/index.js',
    omdb: './src/components/omdb/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/src/public/js'
  }
};
