<template>
  <div id="app">
    
    <router-view></router-view>
    <!-- <HelloWorld /> -->
    <PostComponent />

  </div>
  
</template>


<script>
import PostComponent from './components/PostComponent';
// import HelloWorld from './components/HelloWorld';


export default {
  name: 'App',
  components: {
    PostComponent,
    // HelloWorld
  }
 
  
  

};
</script>

<style lang="stylus">
#app
 
  margin-top 0px
  ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #FFDEAD	;
}

li {
  float: left;
}
li:hover {
  background-color: 	#FFFFE0;
}

li  {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}



  

</style>
