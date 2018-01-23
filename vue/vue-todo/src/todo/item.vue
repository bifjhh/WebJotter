<template>
  <div :class="['todo-item',todo.completed?'completed':'']">
      <input 
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
      >
      <label class="info">{{todo.content}}</label>
      <button class="del" @click="del">X</button>
  </div>
</template>
<script>
export default {
  props: ["todo"],
  methods: {
    del() {
    //   console.log(this.todo);
    this.$emit('del',this.todo.id)
    }
  }
};
</script>
<style  scoped>
.todo-item {
  background-color: #fff;
  position: relative;
  font-size: 30px;
  font-weight: 600;
  padding: 0.5em 0;
  border-bottom: 1px solid #999;
  border-top: 1px solid #999;
  /* line-height: 2em; */
}
.toggle {
  float: left;
  border-radius: 50%;
}
.del {
  float: right;
}
.destory {
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background-color: transparent;
  appearance: none;
  border-width: 0;
  cursor: pointer;
  outline: none;
}
</style>


