var package = {
  "name": "demo01",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {/* 配置脚本运行命令 */
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --port 3000 --hot",/* 配置生产阶段的打包 */
    "pub":"webpack --config webpack.pub.config.js"/* 配置发布环境的打包 */
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jquery": "^3.3.1"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",/* es6 语法转换 */
    "babel-loader": "^7.1.3",/* es6 语法转换 */
    "babel-plugin-transform-runtime": "^6.23.0",/* es6 语法转换 */
    "babel-preset-env": "^1.6.1",/* es6 语法转换 */
    "babel-preset-stage-0": "^6.24.1",/* es6 语法转换 */
    "clean-webpack-plugin": "^0.1.18",/* 删除文件的依赖 */
    "css-loader": "^0.28.10",/* css 转换 */
    "file-loader": "^1.1.10",
    "html-webpack-plugin": "^3.0.3",/* html 插件 */
    "node-sass": "^4.7.2",/* sass 语法编译 */
    "sass-loader": "^6.0.6",/* sass 语法编译 */
    "style-loader": "^0.20.2",/* css 样式 编译  */
    "url-loader": "^0.6.2",/* url 地址编译 */
    "webpack": "^3.8.1",/* webpack  */
    "webpack-dev-server": "^2.9.4"/* webpack 启动服务的依赖 */
  }
}
