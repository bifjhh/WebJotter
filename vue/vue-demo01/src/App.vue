<template>
  <div>
    <h1>{{ count }}</h1>
    <h1>test:{{ test}}</h1>
    <h2>{{ countPlusLocalState }}</h2>
     <button @click="increment">+</button>
     <button @click="decrement">-</button>
  </div>
</template>

<script>
import store from "./store/index.js";
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      localCount: 2
    };
  },
  /* computed: mapState({
    count: "count",
    test: test => store.state.test,
    countPlusLocalState(state) {
      return state.count + this.localCount;
    }
  }), */
  /* computed: mapState([
      // 映射 this.count 为 store.state.count
      "count",
      "test"
    ]),
  */
  computed: {
    localComputed() {
      /* ... */
    },
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      count: "count",
      test: test => store.state.test,
      countPlusLocalState(state) {
        // console.log(this)
        // console.log(this.$store.state)
        // return state.count + this.localCount;
        return this.$store.state.count + this.localCount;
      }
    })
  },
  methods: {
    increment() {
      store.dispatch("increment");
    },
    decrement() {
      store.dispatch("decrement");
    }
  }
};
</script>

<style scoped>

</style>