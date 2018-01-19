<template>
  <div id="app">
    <h1 v-html="title"></h1>
    <ul>
      <li v-for="item in items" class="finishend">
        {{item.label}}
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      title: "this is a todo list",
      items: [
        {
          label: "coding",
          isFinished: false
        },
        {
          label: "walking",
          isFinished: true
        }
      ]
    };
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
.finishend{
  text-decoration: underline;
}
</style>
