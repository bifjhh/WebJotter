# const 常量
- 基本用法
- const声明一个只读的常量。一旦声明，常量的值就不能改变。
```javascript

const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```
- 上面代码表明改变常量的值会报错。
- const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

```JavaScript
const foo;
// SyntaxError: Missing initializer in const declaration
// 上面代码表示，对于const来说，只声明不赋值，就会报错。
```
- const的作用域与let命令相同：只在声明所在的块级作用域内有效。
```JavaScript
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
/* const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。 */

if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
// 上面代码在常量MAX声明之前就调用，结果报错。

/* const声明的常量，也与let一样不可重复声明。 */

var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```
### 本质
- const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```JavaScript
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```
- 上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

下面是另一个例子。

```javascript
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```
上面代码中，常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。

如果真的想将对象冻结，应该使用`Object.freeze`方法。
```javascript
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。
```
除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
```JavaScript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```
### ES6 声明变量的六种方法
- ES5 只有两种声明变量的方法：`var`命令和`function`命令。
- ES6 除了添加`let`和`const`命令，后面章节还会提到，另外两种声明变量的方法：`import`命令和`class`命令。
- 所以，ES6 一共有 6 种声明变量的方法。
