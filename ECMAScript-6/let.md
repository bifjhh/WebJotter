# let
- 纯粹的自己学习的看法
- ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 Jscript 和 ActionScript）。日常场合，这两个词是可以互换的。

1. let 命令 
- ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```JavaScript
{
  let a = 10;
  var b = 1;
}

console.log(a) // ReferenceError: a is not defined. // 因为 let 声明的变量,只在所在的代码块内部有效,在代码块外部调用 let 声明的变量,则无法使用
console.log(b) // 1

```
- for 循环的计数器,可以使用 let 命令, 如果在 for 循环上使用 `var i = 0 ` 其实,声明的 `i` 是全局变量;如果使用 `let i = 0;` 则 `i` 只存在于 for 循环中使用

```javaScript
// 使用 let
for (let i = 0; i < 10; i++) {
  // ...
}
console.log(i);
// ReferenceError: i is not defined

// 使用 var 
for (var i = 0; i < 10; i++) {
  // ...
}
console.log(i);// 10
```
### let 不存在变量提升
- var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

- 为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```JavaScript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;

```
### 暂时性死区
- 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
```javascript
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```
- 上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

- ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

- 总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

### 不允许重复声明
- let不允许在`相同作用域`内，重复声明同一个变量。

```javascript
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

// 因此，不能在函数内部重新声明参数。

function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```