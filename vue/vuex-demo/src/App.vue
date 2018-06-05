<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <p>可被改变的值:{{ count }}</p>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
    <div>
      <button @click="addNum">点击+10</button>
    </div>
    <P>{{doneTodosCount}}</P>
    <P>{{doneTodos}}</P>
    <P>{{doneTodosCount}}</P>
    <P>{{getTodoById}}</P>
  </div>
</template>

<script>
  import store from "./store.js";
  import {mapGetters} from "Vuex";

  export default {
    name: "App",
    /*   computed: {
          ...mapGetters([
          'doneTodosCount',
          'anotherGetter',
          // ...
        ])
      }, */
    computed: {
      count() {
        return this.$store.state.count
      },
      doneTodos() {
        return store.getters.doneTodos
      },
      doneTodosCount() {
        return store.getters.doneTodosCount
      },
      getTodoById() {
        return store.getters.getTodoById(2)
      },
      // doneTodosCount() {
      //   return this.$store.state.todos.filter(todo => todo.done).length;
      // }
    },
    methods: {
      increment() {
        // store.commit("increment");
        store.dispatch("increment");
      },
      addNum() {
        store.commit({
          type:'addNum',
          num: 10
        });
        // store.dispatch("increment");
      },
      decrement() {
        store.commit("decrement");
        // store.dispatch("decrement");
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
</style>
