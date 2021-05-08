

<template>
  <div class="hello">
    
    <p class="error" v-if="error">{{error}}</p>
    <div style = "width:408px;height:400px" class="post" v-for="(post,index) in posts"
    v-bind:item="post"
    v-bind:index="index"
    v-bind:key="post.id"
    >
    <p><img :src="require('../../public/image/'+post.image)" alt="">------{{post.price}}</p>
    </div>

    <div  class="bestSeller" v-for="(post,index) in bestSeller"
    v-bind:item="post"
    v-bind:index="index"
    v-bind:key="post.id"
    >
    <p><img :src="require('../../public/image/'+post._id.image)" alt="">------{{post.avgRating}}</p>
    </div>



  </div>

</template>

<script type="text/javascript">
import axios from 'axios';


// import PostService from '../PostService'

export default {
  name: "PostComponent",
  data(){
    return{
      posts:[],
      bestSeller:[],
      error:'',
      text:''


    }
  },
  
  async created(){
    
    let url ='http://localhost:3000/api/phones';
    let urlSeller ='http://localhost:3000/api/bestSeller';
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

    
   
    
  }
};



</script>
<style >
.post{
  
  left:0;
  background:blue;
  margin:0;
},
.bestSeller{

  float: left;
  width: 50%;
  

}


</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

