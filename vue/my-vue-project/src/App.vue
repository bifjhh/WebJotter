<template>
  <div id="app">
    <h1 v-html="title"></h1>
    <input type="text" v-model="newItem" @keyup.enter="addNew">
    <ul>
      <li v-for="item in items" v-bind:class="{finishend:item.isFinished}" v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
    <router-view/>
    <componentA></componentA>
  </div>
</template>

<script>
import store from "./store"; //调用封装好的函数
import componentA from './components/componentA';
export default {
  name: "App",
  data() {
    return {
      title: "this is a todo list", //标题
      items: store.fetch(), //在页面加载前读取本地存储的数据
      newItem: ""
    };
  },
  components: { componentA },
  watch: {
    items: {
      //检测items数据发生变化
      handler(items) {
        //发生变化则会执行handler函数
        store.save(items); //调用本地存储，将更新后的数据存储到本地
      },
      deep: true //深度检测，当键值发生改变时都会执行
    }
  },
  methods: {
    toggleFinish(item) {
      item.isFinished = !item.isFinished; //点击传入当前值isFinished 给他取反
    },
    addNew() {
      this.items.push({ label: this.newItem, isFinished: false });
      this.newItem = ""; //添加过新的事项之后，清空input内的数据
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.finishend {
  text-decoration: underline;
}
</style>
