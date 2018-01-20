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
    props:['msgage'],
    methods:{
        onClickMe(){
            console.log(this.msgage);
            this.$emit('child-tell-me-something','child-tell-me-something')
        }
    }
};
</script>
<style scoped>

</style>

