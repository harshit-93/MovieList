import { createStore } from 'vuex'
import axios from 'axios';
export default createStore({
  state: {
    user:""
  },
  mutations: {
    SET_USER_DATA(state, token) {
      state.user = token
      localStorage.setItem('user', JSON.stringify(token))
    }
  },
  actions: {
  async login({ commit }, credentials) {
    console.log(" LOGIN ");
    let { data } = await axios.post('http://localhost:2020/login', credentials)
    if (data.token) {
      commit('SET_USER_DATA', data.token) 
    }
    return data.status
  },
  async signup({ commit }, credentials) {
    console.log("signup");
     let { data } = await axios.post('http://localhost:2020/signup', credentials)
     console.log(data.status);
     if(data.token)
        commit('SET_USER_DATA',data.token)
        return data.status
  },
  },
  modules: {}
})