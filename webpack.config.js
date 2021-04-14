module.exports = {
  entry: ['babel-polyfill','./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  mode: 'development', //!
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env'
         ]
        }
      },
      // use the style-loader/css-loader combos for anything matching the .css extension
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  }
};