/* 配置一个发布阶段的 config js文件 */

const path = require('path');/*  引入 path 地址依赖包 */
const htmlWebpackPlugin = require('html-webpack-plugin');/*  引入 html 模板生成依赖包 */
const cleanWebpackPlugin = require('clean-webpack-plugin');/* 引入 删除文件 依赖包 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');/* 引入 抽取 css 样式依赖包  */
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');/* 导入 压缩 css 文件的依赖 */


module.exports={
entry : {/* 设置入口文件 */
    app:path.join(__dirname,'./src/main.js'),
    vendors:['jquery']/* 设置需要抽离的第三方包的名字 */
  },
  output:{/* 设置输出文件 */
    path:path.join(__dirname,'./dist'),/* 设置输出的目录 地址 */
    filename:'js/bundle.js',/* 设置文件名 */
  },
  plugins:[/* 使用插件 */
    new htmlWebpackPlugin({/* 使用一个 html 模板 */
      template:path.join(__dirname,'./src/index.html'),/* 配置一个模板的位置 */
      filename:'index.html',/* 配置输出后的文件名 */
      minify:{
        collapseWhitespace:true,/* 合并多余的空格 */
        removeComments:true,/* 移除注释 */
        removeAttributeQuotes:true,/* 移除属性上的双引号 */
      }
    }),
    new cleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendors',/* 指定要抽离的入口名称 */
      filename:'lib/jquery.js'/* 将来发布的时候,除了会有一个 bundle.js ,还会有一个 vendors.js 文件,里面存放了所有被抽离出来的第三方包  */
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{/* 配置压缩选项 */
        warnings:false/* 移除警告 */

      }
    }),
    new webpack.optimize.DedupePlugin({/* 设置一个上线环境 进一步压缩 js 代码*/
      'process.env.NODE_ENV':'"production"'
      
    }),
    new ExtractTextPlugin({/* 抽取 css 样式  */
     filename: 'css/style.css'
    }),
     new OptimizeCssAssetsPlugin() /* 压缩CSS文件的插件 */
  ],
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader", 
          use: "css-loader", 
          publicPath: '../'/* 指定抽取的时候 自动为我们的 路径 加上 ../ 前缀 */
        })
      },
      /* 配置 .css 使用的 loader */
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'], 
          publicPath: '../'/* 指定抽取的时候 自动为我们的 路径 加上 ../ 前缀 */
        })
      },
      /* 配置 .sass 使用的 loader */
      {
        test: /\.(png|gif|bmp|jpg)$/,
        use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]'
      },
      /* 设置 图片打包 地址和名字  取哈希值8位 加- 和 原来的名字 */
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      /* 忽略 node_modules 文加下的内容 */
      
    ]
  }
}