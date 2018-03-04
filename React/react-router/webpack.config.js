const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  entry:path.join(__dirname,'./src/main.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js',
  },
  plugins:[//插件
    new htmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'),
      filename:'index.html'
    })
  ],
  module : {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:5]']
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.(png|gif|bmp|jpg)$/,
        use: 'url-loader?limit=5000'
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      }

    ]
  }
}