<template>
  <div class="hello">
      <h1>{{msg}}</h1>
      <button v-on:click="onClickMe">Click!</button>
  </div>
</template>
<script>
export default {
    name:'componentA',
    // es6写法
    data(){
        return{
            msg:'hello component!'
        }
    },
    methods:{
        onClickMe(){
            
        }
    }
};
</script>
<style scoped>

</style>

