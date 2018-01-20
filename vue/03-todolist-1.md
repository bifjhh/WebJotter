# 使用vue制作简单的todolist
- 在data内创建数据合集
```javascript 
    data() {
        return {
        title: "this is a todo list",//标题
        items: [//tuod 事项数据合集
            {
            label: "coding",//事项
            isFinished: false//完成标志
            },
            {
            label: "walking",
            isFinished: true
            }
        ]
        };
    }
```  
- 使用v-for 来渲染 事项
    + 根据 isFinished 来标记是否完成
- 通过 v-bind:class="{finishend:item.isFinished}" 判断是否完成，为true时增加finishend类名效果完成的效果
```html
    <ul>
      <li v-for="item in items" v-bind:class="{finishend:item.isFinished}">
        {{item.label}}
      </li>
    </ul>
```
- 使用v-on 绑定事件 实现点击完成/取消
- 在methods内注册方法，才能使用v-on绑定
    + 获取当前的isFinished，取反值 
```javascript
methods:{
       toggleFinish(item){
         console.log(item.isFinished=!item.isFinished);
       },
  }
``` 
- v-model 随表单控件类型不同而不同 在表单控件或者组件上创建双向绑定
    + 实现表单内数据的双向绑定
- v-on 修饰符    
    + .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调

- 设置input触发回调事件 addNew 添加新的列表内
```javascript
    addNew() {
      this.items.push({ 
          label: this.newItem, 
          isFinished: false 
          });
      this.newItem = "";//添加过新的事项之后，清空input内的数据
    }
```

- 利用localstorage来存储todolist数据
    + 封装函数，反复调用
```javascript
const STORAGE_KEY = 'todos-vuejs'; //ES6定义常量，存储用来本地保存的 key 值
export default { //设置函数出口
  fetch() { //获取本地存储的数据，并转换json对象
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save(items) { //设置到本地存储，并将对象转换为json字符串
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}
```
- 在App.vue内引入封装好的函数
```javascript
import store from "./store"; //调用封装好的函数
```
- 使用watch 检测items内的数据变化
```javascript
    watch: {
        items: {//检测items数据发生变化
        handler(items) {//发生变化则会执行handler函数
            store.save(items);//调用本地存储，将更新后的数据存储到本地
        },
        deep: true//深度检测，当键值发生改变时都会执行
        }
    },
```    




