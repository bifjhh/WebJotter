<template>
  <div id="app" :style="{minHeight:h+'px'}">
  
    <router-view></router-view>
    
  </div>
</template>

<script>
/* 商户界面根页面 */

export default {
  components: {
   
  },
  data() {
    return {
      h: 0
    };
  },
  created() {
    // console.log(document.documentElement.clientHeight)
    this.h = document.documentElement.clientHeight;
  }
};
</script>

<style >
* {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #000;
}

img {
  border: none;
  vertical-align: top;
}

input,
button,
textarea {
  outline-style: none;
  border: none;
}
</style>