// js 打包入口文件
import $ from 'jquery';
/* 发布思路: bundle.js 只存放自己的代码,第三方包的代码,全部抽离到 一个另外的 js 中 ' */
import './css/index.scss';

$(()=>{
  $('li:odd').css('backgroundColor', 'pink');
  $('li:even').css('backgroundColor', 'lightblue');
});


class Person {/* es6 语法 class 类 */
  static info = { name: 'zs' }
}

console.log(Person.info);