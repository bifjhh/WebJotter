import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

 const store = new Vuex.Store({
  state: {
    count: 0,
    test:6,
  },
  mutations: {
    increment(state) {
      // console.log(state)
      state.count++
    },
    decrement(state){
      // console.log(state)
      state.count--
    }
  },
   actions: {
     increment(context) {
      //  console.log(context)
       context.commit('increment')
     },
     decrement(context) {
      //  console.log(context)
       context.commit('decrement')
     }
   }
})
export default store