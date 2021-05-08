<template>
  <div class="home">
    
    <!-- <hello-world/> -->
    <ul>
      <h1>Phone Zone</h1>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/checkout">Checkout</router-link></li>
      <li><router-link to="/sign-up">Sign-up</router-link></li>
      <li><router-link to="/sign-in">Sign-in</router-link></li>
      <li><router-link to="/userInfo">User</router-link></li>
      <li><input v-model="search"  placeholder="Search"></li>
      <li><button v-on:click="SendSearch">Search</button></li>
    </ul>

  
    <div class="row" v-show="homeState">
      <div class="column">
        <h2>Sold out soon</h2>
        
      </div>
      <div class="column">
        <h2>Best sellers</h2>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
    
  },

  data:function(){
    
      return{
        homeState:true,
        search:""
        // orders:[]
      
      }
  },
// mounted:function(){
//   this.getFive();
// },
  methods: {
      SendSearch: function () {
        this.homeState=false;
        alert('Hello ' + this.search + '!')
      }
      
  }
}

</script>

<style scoped lang="stylus">
.home 
  background-color:	#FFFFE0

 .row:after {
   content: "";
   display: table;
   clear: both;
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