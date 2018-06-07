import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [{
      id: 1,
      text: '...',
      done: true
    },
      {
        id: 2,
        text: '...',
        done: false
      },
      {
        id: 3,
        text: '...',
        done: true
      }
    ]
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    addNum (state, payload) {
      state.count += payload.num
    }
  },
  actions: {
    increment({commit}) {
      commit('increment')
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
      // test
    }
  }
});

export default store
