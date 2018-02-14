// 读写文件中的路径问题
var fs = require('fs');

// 此处的 ./ 相对路径 相对的是执行node命令的路径
// 而不是相对于正在执行的这个 js 文件来查找 hello.txt
fs.readFile('./hello.txt', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
})

// 解决在文件读取中 ./ 相对路径的问题
// 解决 __dirname  __filename
// __dirnname 表示 当前正在执行的js 文件 所在的目录
// __filename 表示 当前正在执行的 js 文件的完整路径