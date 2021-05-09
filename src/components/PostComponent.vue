

<template>
  <div class="hello">
        <p class="error" v-if="error">{{error}}</p>
    <div class="phones">
      <div  class="cardid">
        <div  class="post" v-for="(post,index) in posts"

          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post.id"
        >
          <img :src="require('../../public/image/'+post.image)" style="width:80%"   alt="">
          <!-- <div class="container"> -->
            <p>------{{post.price}}</p>
          <!-- </div> -->
        </div>
      </div>
      <div  class="cardid">
        <div  class="bestSeller" v-for="(post,index) in bestSeller"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post.id"
        >
    
          <img :src="require('../../public/image/'+post._id.image)"  style="width:80%" alt="">
          <!-- <div class="container"> -->
            <p>------{{post.avgRating}}</p>
          <!-- </div> -->
        </div>
      </div>
    </div>




  </div>

</template>

<script type="text/javascript">
import axios from 'axios';


// import Home from '../views/Home'

export default {
  name: "PostComponent",
  components: {
    // Home
  },
  data(){
    return{
      posts:[],
      bestSeller:[],
      error:'',
      text:''


    }
  },
  
  async created(){
    
    let url ='api/phones';
    let urlSeller ='api/bestSeller';
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
<style>
.phones {
  column-count: 2;
}
.cardid {
  width: 60%;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 25px;
  margin-left: 120px;
}

.post{
  margin-left: 80px;
}
.bestSeller{
  margin-left: 80px;
}

.container {
  text-align: center;
  padding: 10px 20px;
}

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

