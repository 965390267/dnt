<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view  v-cloak/>
   
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{

  },
  methods:{

  },
  mounted() {
 
  },
}
</script>

<style>
[v-cloak]{
  display: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #F5F5F5;
  height: 100%;
}
</style>
