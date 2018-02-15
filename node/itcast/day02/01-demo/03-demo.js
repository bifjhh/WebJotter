

// var fs = require('fs');

// fs.writeFile('./xxx/abc.txt', '大家早上好！', 'utf8', function (err) {
//   if (err) {
//     console.log('出错了！');
//     throw err;
//   }

//   console.log('ok');

// });


// 异步操作，try-catch 是无法捕获异常的
// 对于异步操作，要通过判断错误号（err.code）来进行出错处理
var fs = require('fs');

try {
  fs.writeFile('./yyy/abcd.txt', '大家早上好！6666', 'utf8', function (err) {
    console.log('ok');
  });
} catch(e) {
  console.log('出错了~' + e)
}