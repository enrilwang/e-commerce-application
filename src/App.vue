<template>
  <div id="app"> 
    <!-- <router-view></router-view> -->
      <!-- <Home /> -->
      <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>


  </div>
</template>


<script>
// import Home from "../src/views/Home"

export default {
  name: 'App',
  components: {
    // Home
  }
 
  
  

};
</script>

<style lang="stylus">



  

</style>
