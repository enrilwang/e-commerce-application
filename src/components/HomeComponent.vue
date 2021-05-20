<template>
  <div class="hello">
    <p class="error" v-if="error">{{error}}</p>
    <div class="homecomp" v-show="hcState">
      <div class="phones">
        <el-row>
          <h2><center>Sold out soon</center></h2>
          <el-col :span="14" v-for="(post,index) in posts" 
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id" >
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <img :src="require('../../public/image/'+post.image)" style="width:100%" class="image"  alt="">
                <span>Price: ${{post.price}}</span> 
                <div class="bottom clearfix">
<<<<<<< HEAD
                   
=======
>>>>>>> b6da5ed8d1c2390e14dded46fffafd768824767d
                  <el-button type="text" class="button" v-on:click="detail(post)">More details</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>     
        <el-row>
        <h2><center>Best sellers</center></h2>
          <el-col :span="14" v-for="(post,index) in bestSeller"
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id" class="card" >
            <el-card :body-style="{ padding: '0px' }" >
              <div style="padding: 14px;">
                <img :src="require('../../public/image/'+post._id.image)"  style="width:100%"  class="image" alt="">
                <span>Average rating: {{post.avgRating}}</span>
                <div class="bottom clearfix">
                  <!-- <el-button type="warning" icon="el-icon-star-off" circle >Add to Cart</el-button> -->
                  <el-button type="text" class="button" v-on:click="detail(post)">More details</el-button>
                </div>
              </div>
            </el-card> 
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="itemcomp" v-show="icState">
      <el-row>
          <el-col :span="10" v-for="(post,index) in Item" 
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id" >
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                
                <img :src="require('../../public/image/'+post.image)" style="width:100%" class="image"  alt="">
                <span><h3>Title:</h3> {{post.title}}</span><br>
                <span><h3>Brand:</h3> {{post.brand}}</span><br>
                <span><h3>Stock:</h3> {{post.stock}}</span><br>
                <span><h3>Seller:</h3> {{Seller}}</span><br>
                <span><h3>Price:</h3> ${{post.price}}</span><br>
                <span><h3>Reviews:</h3></span>
                
                <span v-if="!showMoreActivated" v-for="(review,index) in reviewList.slice(0,3)" v-bind:item="review" v-bind:index="index" >
                <h4>Comment:{{index+1}}</h4>
                <br>
                <span v-if="!readMoreActivated">{{review.comment.slice(0, 200)}}...</span>
                
                <a class="readMore" v-if="!readMoreActivated" @click="activateReadMore" >
                <p style="color:#409EFF;">Read more</p>
                </a>
                <span v-if="readMoreActivated">{{review.comment}}</span>
                <br>————{{review.reviewer}}
                (rating:{{review.rating}})<br></span>
                <a class="showMore" v-if="!showMoreActivated" @click="activateShowMore" >
                <p style="color:orange; font-size:18px">Show full comment</p>
                </a>

                <!-- Show all comment -->
                <span v-if="showMoreActivated" v-for="(review,index) in reviewList" v-bind:item="review" v-bind:index="index" >
                <h4>Comment:{{index+1}}</h4>
                <span v-if="!readMoreActivated">{{review.comment.slice(0, 200)}}...</span>
                <a class="showMore" v-if="!readMoreActivated" @click="activateReadMore" >
                <p style="color:#409EFF;">Read more</p>
                </a>
                <span v-if="readMoreActivated">{{review.comment}}</span>
                <br>————{{review.reviewer}}
                (rating:{{review.rating}})<br></span><br>
                
                <div class="bottom clearfix">
                  <el-button type="primary" icon="el-icon-arrow-left" @click="back">Previous Page</el-button>
                  <el-badge :value="2" class="item" v-model="quantity">
                  <el-button type="warning"  circle @click="add" >Add to Cart</el-button>
                  </el-badge>  
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row> 
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
      user:[],
      error:'',
      text:'',
      hcState:true,
      icState:false,
      ShowState:false,
      Item:[],
      Seller:'',
      // Reviewer:'',
      reviewList:[],
      readMoreActivated: false,
      showMoreActivated: false,
      quantity:0,


    }
  },
  
  async created(){
    
    let url = "http://localhost:3000/all";
    let urlSeller ='http://localhost:3000/seller';
    let urlUser = 'http://localhost:3000/user';
    const reqOne =  axios.get(url)
    const reqTwo = axios.get(urlSeller)
    const reqThree = axios.get(urlUser);
    axios.all([reqOne, reqTwo,reqThree]).then(axios.spread((...responses)=>{
      const responsesOne = responses[0]
      const responsesTwo = responses[1]
      const responsesThree = responses[2]
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
      this.user = responsesThree.data;
      
    })).catch(error=>{
      console.log(error)
    });
  },
  methods:{
      detail(post){
        // this.$emit('itemInfo',post)

        this.Item=[]
        this.hcState=false;
        this.icState=true;
        let i=0
        let m=0
        for(i=0;i<1;i++){
          this.Item.push(post)
        }
        for(i=0;i<this.Item[0].reviews.length;i++){
          for(m= 0; m < this.user.length; m++) {
            if (this.Item[0].reviews[i].reviewer == this.user[m]._id) {
              this.Item[0].reviews[i].reviewer = this.user[m].firstname +" "+ this.user[i].lastname;
              console.log(this.Item[0].reviews[i].reviewer)
            }
        }
          this.reviewList.push(this.Item[0].reviews[i])

        }
        console.log(this.reviewList.slice(0,2))

        

        
        
        for(let i = 0; i < this.user.length; i++) {
            if (post.seller == this.user[i]._id) {
              
              this.Seller = this.user[i].firstname +" "+ this.user[i].lastname;
            }
        }
      },
      add() {
        this.$prompt('Please enter the quantity',  {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          
        }).then(({ value }) => {
            if(value != null) {
              this.quantity+= parseInt(value);
              if(this.Item[0].stock >= value && this.Item[0].stock >= this.quantity) {
                this.$message({
                  type: 'success',
                  message: 'Your quantity is:' + value,
                            
                });
              
                
              } else {
                this.quantity -= parseInt(value);
                alert("quantity cannot exceed stock");
              }
          }else{
            alert("type quanitity that you need")
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });       
        });
        // this.quantity=value
      },
      activateReadMore(){
        this.readMoreActivated = true;
      },
      activateShowMore(){
        this.showMoreActivated = true;
      },
      back(){
        this.hcState=true;
        this.icState=false;
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
  /* float: right; */
  margin-bottom:0px
}
.homecomp .el-col {
  margin-left: 125px;
  margin-top: 15px;
}
  
.itemcomp .el-col {
  margin-left: 360px;
  margin-top: 15px;

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
.homecomp .el-card{
  border:4px;
  /* height: 400px */
  }
.readMore{
    cursor: pointer;
  }
.showMore{
    cursor: pointer;
    margin-bottom:0px
  }  
.bottom .el-button--text {
  padding: 0;
  /* float: right; */
  margin-bottom:0px
}



</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

