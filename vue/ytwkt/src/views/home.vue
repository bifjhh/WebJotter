<template>
  <div>
    <Banner></Banner>
    <div class="nav">
      <div class="info" v-for="item in 12" :key="item">
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
 
  export default {
    components: {
    Banner
  },
  }
</script>

<style scoped>
.nav{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: .15rem;
  padding-left: 0.2rem;
}
.info{
  box-sizing: border-box;
  width: 2.22rem;
  height: 1.48rem;
  background-color: #fef;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
  border-radius:.15rem;
}
</style>