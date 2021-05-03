

<template>
  <div class="hello">
    <p>hhh</p>
    <p class="error" v-if="error">{{error}}</p>
    <div class="post" v-for="(post,index) in posts"
    v-bind:item="post"
    v-bind:index="index"
    v-bind:key="post.id"
    >
    <p>{{post.text}}</p>
  </div>
  </div>

</template>

<script type="text/javascript">
import PostService from '../PostService'
export default {
  name: "HelloWorld",
  data(){
    return{
      posts:[],
      error:'',
      text:''


    }
  },
  
  async created(){
    try{
      this.posts= PostService.getPosts();
      console.log(1)
      console.log(this.posts)
    }catch(err){
      this.error=err.message;
    }
  }
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

