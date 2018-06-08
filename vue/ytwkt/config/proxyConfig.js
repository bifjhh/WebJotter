module.exports = {
  proxy: {
    '/api': {    //将www.exaple.com印射为/apis
      target: 'http://180.76.52.158/index.php',  // 接口域名
      // target: 'www.uhuigo168.com/index.php',  // 接口域名
      changeOrigin: false,  //是否跨域
      pathRewrite: {
        '^/api': ''   //需要rewrite的,
      }
    }
  }
}