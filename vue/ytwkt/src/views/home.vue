<template>
  <div>
    <Banner></Banner>
    <div class="nav">
      <div class="info" @click="toInfo"  v-for='(item,index) in list' :key="index" v-bind="{ 'data-type': item<9?item:'' }">
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
  created() {
    this.$http
      .post("/api",{"apiCode": "_bannerlist_001"} )
      .then(res => {
        console.log(res);
      });
  },

  data: () => ({
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }),
  methods: {
    toInfo(e) {
      if (e.target.dataset.type) {
        console.log(e.target.dataset.type);
      }
    }
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0.15rem;
  padding-left: 0.2rem;
}
.info {
  box-sizing: border-box;
  width: 2.22rem;
  height: 1.48rem;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
  border-radius: 0.15rem;
  background-size: 100%, 100%;
  background-image: url("../images/11.png");
}
.info:nth-of-type(2) {
  background-image: url("../images/12.png");
}
.info:nth-of-type(3) {
  background-image: url("../images/13.png");
}
.info:nth-of-type(4) {
  background-image: url("../images/14.png");
}
.info:nth-of-type(5) {
  background-image: url("../images/15.png");
}
.info:nth-of-type(6) {
  background-image: url("../images/16.png");
}
.info:nth-of-type(7) {
  background-image: url("../images/21.png");
}
.info:nth-of-type(8) {
  background-image: url("../images/22.png");
}
.info:nth-of-type(9) {
  background-image: url("../images/23.png");
}
.info:nth-of-type(10) {
  background-image: url("../images/31.png");
}
.info:nth-of-type(11) {
  background-image: url("../images/32.png");
}
.info:nth-of-type(12) {
  background-image: url("../images/33.png");
}
</style>