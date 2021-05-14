<template>
  <div class="hello">
    <p class="error" v-if="error">{{error}}</p>
    <div class="homecomp" v-show="hcState">
      <div class="phones">
        <el-row>
          <el-col :span="14" v-for="(post,index) in posts" 
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <img :src="require('../../public/image/'+post.image)" style="width:100%" class="image"  alt="">
                <span>Price: ${{post.price}}</span> 
                <div class="bottom clearfix">
                  <el-button type="warning" icon="el-icon-star-off" circle >Add to Cart</el-button>
                  <el-button type="text" class="button" v-on:click="detail">More details</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="14" v-for="(post,index) in bestSeller" 
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id" class="card">
            <el-card :body-style="{ padding: '0px' }" >
              <div style="padding: 14px;">
                <img :src="require('../../public/image/'+post._id.image)"  style="width:100%"  class="image" alt="">
                <span>Average rating: {{post.avgRating}}</span>
                <div class="bottom clearfix">
                  <el-button type="warning" icon="el-icon-star-off" circle >Add to Cart</el-button>
                  <el-button type="text" class="button" v-on:click="detail">More details</el-button>
                </div>
              </div>
            </el-card> 
          </el-col>
        </el-row>
      </div>
    </div>

  </div>


</template>

<script type="text/javascript">
import axios from 'axios';



export default {
  name: "HomeComponent",
  components: {
    // Home
  },
  data(){
    return{
      posts:[],
      bestSeller:[],
      error:'',
      text:'',
      hcState:true,


    }
  },
  
  async created(){
    
    let url = "http://localhost:3000/all";
    let urlSeller ='http://localhost:3000/seller';
    const reqOne =  axios.get(url)
    const reqTwo = axios.get(urlSeller)
    axios.all([reqOne, reqTwo]).then(axios.spread((...responses)=>{
      const responsesOne = responses[0]
      const responsesTwo = responses[1]
      responsesOne.data.sort(function(a,b){return a.stock-b.stock})
      let num = 0;
      let ls = [];
      for (let i = 0; i < responsesOne.data.length; i++) {
          if (responsesOne.data[i].stock == 0) continue;
          else {
            ls.push(responsesOne.data[i]);
            num ++;
            if (num == 5) break;
          }
      }
      //handle the sold out soon data
      this.posts = ls;
      //handle the bestSeller data
      this.bestSeller = responsesTwo.data;
      
    })).catch(error=>{
      console.log(error)
    });
  },
  methods:{

    detail: function(){
        // const url ='http://localhost:3000/all'
        this.hcState=false
      }

  }
  
};
</script>
<style>
.phones {
  column-count: 2;
}

.post{
  margin-left: 80px;
}
.bestSeller{
  margin-left: 80px;
}


  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
  .el-col {
    margin-left: 100px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  


</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

