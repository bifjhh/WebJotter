<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
import store from './store.js'
export default {
  name: "App",
  computed: {
    count() {
      return store.state.count;
    }
  },
  methods: {
    increment() {
      store.dispatch("increment");
      console.log('store.dispatch')
    },
    decrement() {
      store.commit("decrement");
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
