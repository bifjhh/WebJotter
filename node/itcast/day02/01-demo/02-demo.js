
var http = require('http');


http.createServer(function (req, res) {
  console.log('有人访问了。');
  res.end('over');
}).listen(7560, function () {
  console.log('http://localhost:7560');
});