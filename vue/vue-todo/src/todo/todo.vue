<template>
  <section class="real-app">
      <input 
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做什么？"
      @keyup.enter="addTodo"
      >
      <Item 
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="del"
       />
      <Tabs 
      :filter="filter" 
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllcompleted="clearAllcompleted"
      ></Tabs>
  </section>
</template>
<script>
import Item from "./item.vue";
import Tabs from "./tabs.vue";
let id = 0;
export default {
  components: {
    Item,
    Tabs
  },
  data() {
    return {
      todos: [],
      filter: "all"
    };
  },
  computed:{
    filteredTodos(){
      if(this.filter ==='all'){
        return this.todos;
      };
      const completed = this.filter === 'completed';
      return this.todos.filter(todo => completed ==todo.completed)
    }
  },
  methods: {
    toggleFilter(state) {
      this.filter = state;
    },
    clearAllcompleted(){
      this.todos= this.todos.filter(todo=>!todo.completed);
    },
    addTodo(e) {
      if (e.target.value.trim() == "") {
        alert("您还没有输入内容");
        return;
      }
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      });
      e.target.value = "";
    },
    del(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
    }
  }
};
</script>

<style scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input {
  position: relative;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1 5 0 rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px;
  padding-left: 60px;
  border: none;
  box-shadow: inset 0 -2 1px rgba(0, 0, 0, 0.5);
}
</style>


