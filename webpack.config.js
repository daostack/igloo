const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf|ico)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
