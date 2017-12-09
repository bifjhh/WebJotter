var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("程序执行结束");
// Node.js 异步编程的直接体现就是回调。