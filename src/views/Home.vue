<template>
  <div class="home">

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
      <div class="left" >
        <h2><center>Sold out soon</center></h2>
        <!-- <PostComponent /> -->
        
      </div>
      <div class="right">
        <h2><center>Best sellers</center></h2>
      </div>
    </div>
    <PostComponent />
  </div>
</template>

<script>
import PostComponent from '../components/PostComponent'
import axios from 'axios';


export default {
  name: "Home",
  components: {
    PostComponent
  },

  data:function(){
    
      return{
        homeState:true,
        search:""
        // orders:[]
      
      }
  },

  methods: {
      SendSearch: function () {
        this.homeState=false;
        let url =`http://localhost:3000/search/${this.search}`;
        let searchData = []
        axios.get(url)
              .then(function(res) {
                  searchData = res.data;
                  
                  console.log(searchData);
              }).catch(err=>console.log(err))
        
      }
      
  }
}

</script>


<style>
.home {
  background-color:	#FFFFE0
}
.row:after {
   content: "";
   display: table;
   clear: both;
 }
 .right {
  float: left;
  width: 50%;
  
}
.left {
  float: left;
  width: 50%;
  
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