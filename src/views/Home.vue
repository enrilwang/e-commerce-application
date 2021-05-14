<template>
  <div class="home">

    <ul>
      <h1>Phone Zone</h1>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/checkout">Checkout</router-link></li>
      <li><router-link to="/sign-up">Sign-up</router-link></li>
      <li><router-link to="/sign-in">Sign-in/Sign-up</router-link></li>
      <li><router-link to="/userInfo">User</router-link></li>
      <li><input v-model="search"  placeholder="Search"></li>
      <li><button class="search" v-on:click="SendSearch">Search</button></li>
    </ul>
    <div class="searchState" v-show="searchState">
      <!-- <p class="error" v-if="error">{{error}}</p> -->
      <el-row>
        <el-col :span="6" v-for="(post,index) in searchItem" 
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post.id" class="card">
          <el-card :body-style="{ padding: '0px' }" >
            <div style="padding: 14px;">
              <img :src="require('../../public/image/'+post.image)"  style="width:100%"  class="image" alt="">
              <span>Title: {{post.title}}</span>
              <span>Price: {{post.price}}</span>

              <div class="bottom clearfix">
                <el-button type="warning" icon="el-icon-star-off" circle v-on:click="detail">Add to Cart</el-button>

                <el-button type="text" class="button" v-on:click="detail">More details</el-button>
              </div>
            </div>
          </el-card> 
        </el-col>
      </el-row>
    </div>

    <div class="row" v-show="homeState">

      <div class="left" >
        <h2><center>Sold out soon</center></h2>
      </div>
      <div class="right">
        <h2><center>Best sellers</center></h2>
      </div>
    </div>
    <div class="homecomp" v-show="columnState">
    <HomeComponent />
    </div>

  </div>
</template>

<script>

import HomeComponent from '../components/HomeComponent'
import axios from 'axios';


export default {
  name: "Home",
  components: {
    HomeComponent
  },

  data:function(){
    
      return{
        homeState:true,
        columnState:true,
        searchState:true,
        search:"",
        // orders:[]
        searchItem:[],
        rating:''

      
      }
  },

  methods: {
      SendSearch: function () {
        
        this.homeState=false;
        this.columnState=false;
        const url =`http://localhost:3000/search/${this.search}`;
        let searchData = []
        let i=0
        axios.get(url)
              .then((res) => {
                  searchData = res.data;
                  for(i=0;i<searchData.length;i++){
                    this.rating=searchData[i].image
                    this.searchItem=searchData
                    console.log(this.rating)
                    
                  }
                  console.log(this.searchItem);

              }).catch(err=>console.log(err))
              
        
      },
      detail: function(){
        this.searchState=false;

        // alert("hhh")
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
  .search {
    cursor: pointer;
}

</style>