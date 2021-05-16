<template>
  <div class="home" >

    <ul v-show="topBar">
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
              <br/>
              <span>Price: ${{post.price}}</span>

              <div class="bottom clearfix">
              
                <el-button type="text" class="button" v-on:click="detail(post)">More details</el-button>
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
        topBar:true,
        search:"",
        // orders:[]
        searchItem:[],
        rating:'',
        user:[]
      
      }
  },

  methods: {
      SendSearch: function () {
        this.topBar = false;
        this.homeState=false;
        this.columnState=false;
        const url =`http://localhost:3000/search/${this.search}`;
        let urlUser = 'http://localhost:3000/user';
        let searchData = []
        let i=0
        axios.get(url)
              .then((res) => {
                  searchData = res.data;
                  for(i=0;i<searchData.length;i++){
                    this.searchItem=searchData
              
                  }
          

              }).catch(err=>console.log(err))
        axios.get(urlUser).then(res=>{this.user = res.data;})    
        
      },

      

      detail(post){

        this.topBar = false;
        let name = "";
  
        for(let i = 0; i < this.user.length; i++) {
            if (post.seller == this.user[i]._id) {
              
              name = this.user[i].firstname +" "+ this.user[i].lastname;
            }
        }
        console.log(name);
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