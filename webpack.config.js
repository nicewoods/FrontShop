const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./node_modules/angular/angular.js',
  './node_modules/angular-route/angular-route.js',
  './app/app.js',
  './app/ShopFrontFactory.js',
  './app/controllers/ManageAccountController.js', 
  './app/controllers/MainController.js', 
  './app/controllers/AdminController.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: 'app/index.html', to: "index.html" }
    ]),
    new CopyWebpackPlugin([
      { from: 'app/partials/home.html', to: "partials/home.html" }
    ]),
    new CopyWebpackPlugin([
      { from: 'app/partials/admin.html', to: "partials/admin.html" }
    ]),
    new CopyWebpackPlugin([
      { from: 'app/partials/buy.html', to: "partials/buy.html" }
    ]),
    new CopyWebpackPlugin([
      { from: 'app/partials/manageAccount.html', to: "partials/manageAccount.html" }
    ])

  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}