

var http = require('http');

var server = http.createServer(function (req, res) {
  // body...
});

server.on('request', function (req, res) {
  // body...
});



// function createServer(fn) {

//   .on('request', fn);
// }


fs.readFile('./a.txt', function (err, data) {
  // err.code = 'E'
  // if (err.code === 'ENOENT') {}
});