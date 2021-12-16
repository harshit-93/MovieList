<template>
   <div id="app">
     <router-view />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import login from './components/login.vue'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components: {
    HelloWorld,
    login
  },
  data(){
    return{
      islogin : '',
      user:""
    }
  },
  computed:{
   ...mapState([
      'user'
   ]),
  },
  mounted() {
    if(!localStorage.getItem('user')||localStorage.getItem('user')=='') {
      this.$router.push({
        name: 'login'
      })
    }
    else{
      this.$store.state.user=localStorage.getItem('user')
      }
  },
  methods:{
    logOut(){
         if(localStorage.getItem('user'))
         { 
           localStorage.setItem('user','')     
           this.$store.state.user=localStorage.getItem('user')
           this.$router.push({ name: 'login' })
         }
    }
  }
}
</script>

