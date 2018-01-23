<template>
  <div class="helper">
      <span class="left">
          2 items left
      </span>
      <span class="tabs">
          <span
           v-for="state in states"
           :key="state"
           :class="[state,filter === state?'actived':'']"
           @click="toggleFilter(state)"
          >
              {{state}}
          </span>
      </span>
      <span class="clear" @click="clearAllcompleted">clearAllcompleted</span>
  </div>
</template>
<script>
export default {
    props:['filter'],
  data() {
    return {
      states: ['all','active','completed']
    };
  },
  methods:{
      toggleFilter(){},
      clearAllcompleted(){},
  }
};
</script>
<style scoped>
.helper{
    font-weight: 100;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    line-height: 30px;
    background-color: #fff;
    font-size: 14px;
    font-smoothing:artialiased;
}
.left,cleat,.tabs{
    padding: 0 10px;
    box-sizing: border-box;
}
.left,cleat{
    width: 150px;
}
.left{
    text-align: left;
}
.clear{
    text-align: right;
    cursor: pointer;
}
.tabs{
    width: 200px;
    display: flex;
    justify-content: space-around;
}
.tabs *{
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0)
}
.tabs .actived{
    border: 1px solid rgba(175, 47, 47, 0);
    border-radius: 5px;
}
</style>


