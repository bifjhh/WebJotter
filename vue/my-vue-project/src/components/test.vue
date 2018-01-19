<template>
  <div v-html="sun"></div>
</template>
<script>
export default {
    name:'test',
    // es6写法
    data(){
        return{
            sun:'sunkun'
        }
    }
    // es5写法 
    // data:function () {
    //     return {
    //         sun:'xmj'
    //     }
    // }
};
</script>
<style scoped>

</style>

