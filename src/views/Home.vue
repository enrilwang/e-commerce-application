<template>
  <body>
    <div class="home" >
      <div class="topBar" v-show="topState">

        <el-menu :default-active="activeIndex"  class="el-menu-demo"  mode="horizontal"  @select="handleSelect"
        background-color="#f5bc62" text-color="#409EFF" active-text-color="white">
        <h1>Phone Zone</h1>
        <el-menu-item index="1">Home</el-menu-item>
        <el-menu-item index="2"><router-link to="/sign-in" v-show="visitorState">Sign-in/Sign-up</router-link></el-menu-item> 
        <el-menu-item index="3"><el-button type="text" class="button"@click="cart()">Checkout</el-button></el-menu-item>  
        <!-- <div class="isLogin"> -->
        <el-menu-item index="4"><el-button type="text" class="button"@click="userInfo()" v-show="memberState">User</el-button></el-menu-item> 
        <el-menu-item index="5"><el-button type="text" class="button"@click="logout" v-show="memberState">Log out</el-button></el-menu-item>  
        <!-- </div> -->
        <el-menu-item index="6"><input v-model="search"  placeholder="Search"></el-menu-item>
        <el-menu-item index="7"><button class="search" v-on:click="SendSearch">Search</button></el-menu-item>
        </el-menu>
      </div>
      <div class="searchComp" v-show="searchState">
        <el-dropdown :hide-on-click="false" @command="handleCommand">
          <span class="el-dropdown-link" >Filter by Brand<i class="el-icon-arrow-down el-icon--right"></i>
          </span>        
          <el-dropdown-menu slot="dropdown"  >
          <el-dropdown-item
          v-for="(brand,index) in dropdownList"
          v-bind:item="brand"
          v-bind:index="index"
          v-bind:key="brand.id"
          :command="{value:brand.name}"
          >{{brand.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="slidecontainer">
          <input type="range" min="0" max="600" value="24" class="slider" v-on:input="priceInput" id="mySlider" v-model="MaxPrice">
          <p class="maxprice">Maximum Price: {{MaxPrice}}</span></p>
        </div>
        <el-row>
          <el-col :span="6" v-for="(post,index) in searchItem" 
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post.id" class="card">
            <el-card :body-style="{ padding: '0px' }" >
              <div style="padding: 14px;">
                <img :src="require('../../public/image/'+post.image)"  style="width:100%"  class="image" alt="">
                <span><h3>Title:</h3> {{post.title}}</span><br>
                <span><h3>Price:</h3> ${{post.price}}</span><br>

                <div class="bottom clearfix">
                  <el-button type="text" class="button" v-on:click="detail(post)">More details</el-button>
                </div>
              </div>
            </el-card> 
          </el-col>
        </el-row>
      </div>
      <div class="itemcomp" v-show="itemState">
        <div class="homeItem" v-show="homeItemState">
         <el-row>
            <el-col :span="10" v-for="(post,index) in homeItem" 
              v-bind:item="post"
              v-bind:index="index"
              v-bind:key="post.id" >
              <el-card :body-style="{ padding: '0px' }">
                <div style="padding: 14px;">  
                  <img :src="require('../../public/image/'+post.image)" style="width:100%" class="image"  alt="">
                  <span><h3>Title:</h3> {{post.title}}</span><br>
                  <span><h3>Brand:</h3> {{post.brand}}</span><br>
                  <span><h3>Stock:</h3> {{post.stock}}</span><br>
                  <span><h3>Seller:</h3> {{name}}</span><br>
                  <span><h3>Price:</h3> ${{post.price}}</span><br>
                  <span><h3>Reviews:</h3></span>
                  
                  <div class="notShow" v-show="NotshowBoth">
                    <span v-for="(review,index) in reviewList.slice(0,3)" v-bind:item="review" v-bind:index="index">
                    <h4>Comment:{{index+1}}</h4>
                    <br>
                    <span v-if="review.comment.length>200">{{review.comment.slice(0, 200)}}
                      <button type="text"  @click="activateReadMore" >
                      Read More</button>
                    </span>
                    <span v-else>{{review.comment}}</span>

                    <br>————{{review.reviewer}}
                    (rating:{{review.rating}})<br></span>
                    <span v-if="reviewList.length>3">
                      <button type="text"  @click="activateShowMore" >
                    Show full comment</button></span>
                  </div>
                  
                  <div class="Show" v-show="showMoreActivated">
                    <span  v-for="(review,index) in reviewList" v-bind:item="review" v-bind:index="index" > 
                    <h4>Comment:{{index+1}}</h4>
                    <br>
                    <span v-if="review.comment.length>200">{{review.comment.slice(0, 200)}}
                      <button type="text"  @click="activateReadMore" >
                      Read More</button>
                    </span>
                    <span v-else>{{review.comment}}</span>
                    <br>————{{review.reviewer}}
                    (rating:{{review.rating}})<br></span>
                  </div>
                  
                  <div class="notShow" v-show="readMoreActivated">
                    <span v-for="(review,index) in reviewList.slice(0,3)" v-bind:item="review" v-bind:index="index">
                    <h4>Comment:{{index+1}}</h4><br>
                    <span>{{review.comment}}</span>
                    <br>————{{review.reviewer}}
                    (rating:{{review.rating}})<br></span>
                    <span v-if="reviewList.length>3">
                    <button type="text"  @click="activateShowMore" >Show full comment</button></span>
                  </div>

                   <div class="notShow" v-show="showBoth">
                    <span v-for="(review,index) in reviewList" v-bind:item="review" v-bind:index="index">
                    <h4>Comment:{{index+1}}</h4><br>
                    <span>{{review.comment}}</span>
                    <br>————{{review.reviewer}}
                    (rating:{{review.rating}})<br></span>
                  </div>

                  
                  
                  <div class="bottom clearfix">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="backHome">Back home</el-button>
                    <el-badge  class="item" :value="post.quantity">
                    <el-button type="warning" icon="el-icon-star-off" circle @click="add(post)" >Add to Cart</el-button>
                    </el-badge>  
                  </div>
                </div>
              </el-card>
            </el-col>
         </el-row> 
        </div>
      <div class="searchItem" v-show="searchItemState">
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
                  <span><h3>Seller:</h3> {{name}}</span><br>
                  <span><h3>Price:</h3> ${{post.price}}</span><br>
                  <span><h3>Reviews:</h3></span>
                  
                  <div class="notShow" v-show="NotshowBoth">
                    <span v-for="(review,index) in reviewList.slice(0,3)" v-bind:item="review" v-bind:index="index">
                    <h4>Comment:{{index+1}}</h4>
                    <br>
                    <span v-if="review.comment.length>200">{{review.comment.slice(0, 200)}}
                      <button type="text"  @click="activateReadMore" >
                      Read More</button>
                    </span>
                    <span v-else>{{review.comment}}</span>

                    <br>————{{review.reviewer}}
                    (rating:{{review.rating}})<br></span>
                    <span v-if="reviewList.length>3">
                      <button type="text"  @click="activateShowMore" >
                    Show full comment</button></span>
                  </div>
                  
                  <div class="Show" v-show="showMoreActivated">
                    <span  v-for="(review,index) in reviewList" v-bind:item="review" v-bind:index="index" > 
                    <h4>Comment:{{index+1}}</h4>
                    <br>
                    <span v-if="review.comment.length>200">{{review.comment.slice(0, 200)}}
                      <button type="text"  @click="activateReadMore" >
                      Read More</button>
                    </span>
                    <span v-else>{{review.comment}}</span>
                    <br>————{{review.reviewer}}
                    (rating:{{review.rating}})<br></span>
                  </div>
                  
                  <div class="notShow" v-show="readMoreActivated">
                    <span v-for="(review,index) in reviewList.slice(0,3)" v-bind:item="review" v-bind:index="index">
                    <h4>Comment:{{index+1}}</h4><br>
                    <span>{{review.comment}}</span>
                    <br>————{{review.reviewer}}
                    (rating:{{review.rating}})<br></span>
                    <span v-if="reviewList.length>3">
                    <button type="text"  @click="activateShowMore" >Show full comment</button></span>
                  </div>

                   <div class="notShow" v-show="showBoth">
                    <span v-for="(review,index) in reviewList" v-bind:item="review" v-bind:index="index">
                    <h4>Comment:{{index+1}}</h4><br>
                    <span>{{review.comment}}</span>
                    <br>————{{review.reviewer}}
                    (rating:{{review.rating}})<br></span>
                  </div>

                  
                  
                  <div class="bottom clearfix">
                    <el-button type="primary" icon="el-icon-arrow-left" @click="backSearch">Previous page</el-button>
                    <el-badge  class="item" :value="post.quantity">
                    <el-button type="warning" icon="el-icon-star-off" circle @click="add(post)" >Add to Cart</el-button>
                    </el-badge>  
                  </div>
                </div>
              </el-card>
            </el-col>
        </el-row> 
      </div>
          
      </div>    


      <div class="row" v-show="homeState">
      
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
                    <el-button type="text" class="button" v-on:click="Homedetail(post)">More details</el-button>
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
                    <el-button type="text" class="button" v-on:click="Homedetail(post)">More details</el-button>
                  </div>
                </div>
              </el-card> 
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="display: none;">{{beforeFilter}}</div>
      <div style="display: none;">{{cartList}}</div>    
  

      

    </div>
  </body>
</template>

<script>
import axios from 'axios';
axios.default.withCredentials = true
axios.withCredentials = true
export default {
  name: "Home",
  components: {
  },
  data:function(){
    
      return{
        posts:[],
        bestSeller:[],
        homeState:true,
        searchState:false,
        itemState:false,
        topState:true,
        memberState:false,
        visitorState:true,
        search:'',
        searchItem:[],
        rating:'',
        user:[],
        activeIndex: '1',
        name:'',
        Item:[],
        homeItem:[],
        homeItemState:false,
        searchItemState:false,
        
        beforeFilter:[],
        id:"",
        dropdownList:[
          {id:"1",name:"Apple"},
          {id:"2",name:"BlackBerry"},
          {id:"3",name:"HTC"},
          {id:"4",name:"Huawei"},
          {id:"5",name:"LG"},
          {id:"6",name:"Motorola"},
          {id:"7",name:"Nokia"},
          {id:"8",name:"Samsung"},
          {id:"9",name:"Sony"},
        ],
      MaxPrice:600,
      reviewList:[],
      readMoreActivated: false,
      showMoreActivated: false,
      NotshowBoth:true,
      showBoth:false,
      cartList:[],
      cartItem:{},
      userList:[],
      allData:[]
      }
  },
  
  activated(){
        this.getCookie()

  },
  
  beforeRouteLeave(to, from, next) {
        if (to.name == "Sign-in"||to.name == "Cart") {
            from.meta.keepAlive = true
        } else {
            from.meta.keepAlive = false
        }
        next()
},
  created(){
 
    let urlAll="http://localhost:3000/getAll"
    let urlSoon = "http://localhost:3000/soldsoon";
    let urlSeller ='http://localhost:3000/seller';
    let urlUser = 'http://localhost:3000/user';
    const reqOne =  axios.get(urlSoon)
    const reqTwo = axios.get(urlSeller)
    const reqThree = axios.get(urlUser);
    const reqFour = axios.get(urlAll);

    


    axios.all([reqOne, reqTwo,reqThree,reqFour]).then(axios.spread((...responses)=>{
      const responsesOne = responses[0]
      const responsesTwo = responses[1]
      const responsesThree = responses[2]
      const responsesFour = responses[3]
      //handle the sold out soon data

      this.posts = responsesOne.data;
      //handle the bestSeller data
      this.bestSeller = responsesTwo.data;
      this.allData = responsesFour.data;
      for(let i = 0; i < this.bestSeller.length;i++){
        this.bestSeller[i].avgRating = this.bestSeller[i].avgRating.toFixed(2)
      }      
       
      this.user = responsesThree.data;
      for (let i = 0;i < this.posts.length;i++) {
        this.posts[i]["quantity"] = 0;
        this.bestSeller[i]["quantity"] = 0;
      }
     
      
    })).catch(error=>{
      console.log(error)
    });
  },
  methods: {


    
     
      SendSearch: function () {
        
        this.homeState=false;
        this.searchState=true
        this.itemState=false;
        const url =`http://localhost:3000/search/${this.search}`;
        let urlUser = 'http://localhost:3000/user';
        let searchData = []
        let i=0
        axios.get(url)
              .then((res) => {
                  searchData = res.data;
                   for(let i = 0; i < searchData.length; i++) {
                      searchData[i]["quantity"] = 0;
                      
                    }
                  for(i=0;i<searchData.length;i++){
                    this.searchItem=searchData
                    this.beforeFilter=searchData       
                  }
              }).catch(err=>console.log(err))
        axios.get(urlUser).then(res=>{this.user = res.data;})
       
      },


      detail(post){
        this.readMoreActivated = false;
        this.NotshowBoth = true;
        this.showBoth = false;
        this.showMoreActivated = false

        this.searchItemState=true
        this.homeItemState=false
        this.Item=[]
        this.reviewList =[]
        this.homeState=false;
        this.searchState=false;
        this.itemState=true;
       let i=0
        let m=0
        for( i=0;i<1;i++){
          this.Item.push(post)
        }

        for(i=0;i<this.Item[0].reviews.length;i++){
          for(m=0; m < this.user.length; m++){
            if(this.Item[0].reviews[i].reviewer == this.user[m]._id){
              this.Item[0].reviews[i].reviewer = this.user[m].firstname +" "+ this.user[i].lastname;
  
            }
        }
          this.reviewList.push(this.Item[0].reviews[i])
        }
        for(let i = 0; i < this.user.length; i++){
            if (post.seller == this.user[i]._id) {
              this.name = this.user[i].firstname +" "+ this.user[i].lastname;
            }
        }
        
      },
      Homedetail(post){
        this.readMoreActivated = false;
        this.NotshowBoth = true;
        this.showBoth = false;
        this.showMoreActivated = false
        
        this.searchItemState=false
        this.homeItemState=true
        this.homeItem=[]
        this.reviewList =[]
        this.homeState=false;
        this.searchState=false;
        this.itemState=true;
       let i=0
        let m=0
        for( i=0;i<1;i++){
          this.homeItem.push(post)
        }

        for(i=0;i<this.homeItem[0].reviews.length;i++){
          for(m=0; m < this.user.length; m++){
            if(this.homeItem[0].reviews[i].reviewer == this.user[m]._id){
              this.homeItem[0].reviews[i].reviewer = this.user[m].firstname +" "+ this.user[i].lastname;
  
            }
        }
          this.reviewList.push(this.homeItem[0].reviews[i])
        }
        // if (this.reviewList.length>3) {
        //   this.showMoreActivated = true
        // }
     
        for(let i = 0; i < this.user.length; i++){
            if (post.seller == this.user[i]._id) {
              this.name = this.user[i].firstname +" "+ this.user[i].lastname;
            }
        }
        
      },
     
      handleCommand(command){
        let i=0
        let afterFilter = []
        this.searchItem=this.beforeFilter
        for(i=0;i<this.searchItem.length;i++){
          if(command.value==this.searchItem[i].brand){
            afterFilter.push(this.searchItem[i])
          }
        }      
            this.searchItem=afterFilter  
      
      },
      priceInput(){
        let Max=0
        let i=0
        let afterFilter = []
        this.searchItem=this.beforeFilter
          axios.get("http://localhost:3000/maxprice")
              .then((res) => {
                console.log(res.data[0].price)
                Max=res.data[0].price
              // })
              // console.log(Max)
        for(i=0;i<this.searchItem.length;i++){
          if(this.searchItem[i].price<=this.MaxPrice){
            afterFilter.push(this.searchItem[i])
          }
        }   
        console.log(afterFilter)
        this.searchItem=afterFilter  
        })
      },
      
      add(post){
       axios.get("http://localhost:3000",{headers:{"Content-Type":"application/json"},withCredentials:true})
              .then(res =>{
                  
            if(Object.keys(res.data.result.cookie).length > 0) {

                this.$prompt('Please enter the quantity',  {
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Cancel',
                
                }).then( value =>{
                  console.log(typeof(value))
                  console.log(value)
                  if(value.value != null) {
                    if(post.stock >= value.value && value.value >= 0) {
                      this.cartItem=post
                      let newQuantity = post.quantity 
                      this.cartItem.quantity = parseInt(value.value)
                      const user = {
                        user:res.data.result.cookie,
                        item:this.cartItem
                      }
                      axios.post("http://localhost:3000/add",JSON.stringify(user),{headers:{"Content-Type":"application/json"}})
                        .then(res => {
                          
                        if(res.status === 200){
                          
                          post.quantity = parseInt(value.value)
                           
                          this.$message({
                            type: 'success',
                            message: 'Your quantity is:' + value.value,
                            
                          });
                          
                        }else if(res.status === 201){
                            newQuantity += parseInt(value.value)
                            post.quantity  = newQuantity
      
                            console.log("same item")
                        }else {
                          const error = new Error(res.error);
                          throw error;
                        }
                      })
                      .catch(error => {
                        console.log(error);
                        alert('Error, please try again');
                      })
                      
                      
                    } else {
                      
                      alert("quantity cannot exceed stock/quantiity cannot be negative number");
                    }
                }else{
                  alert("type quantity that you need")
                }
              
              
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: 'Input cancelled'
                });       
              });
                
                            
            }else {
                this.$router.push("sign-in")
                
            }
          
      
    
        }) 
      
        
      
      },
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      
      activateReadMore(){
        console.log(this.showMoreActivated)
        if(this.showMoreActivated == false){
          this.readMoreActivated = true;
          this.NotshowBoth = false;
          this.showBoth = false;
        }
        else{
          this.readMoreActivated = false;
          this.NotshowBoth = false;
          this.showBoth = true;
          this.showMoreActivated = false
        }
        
      },
      activateShowMore(){
        if(this.readMoreActivated == false){
          this.showMoreActivated = true;
          this.NotshowBoth = false;
          this.showBoth = false;
        }
        else{
          this.readMoreActivated = false;
          this.NotshowBoth = false;
          this.showBoth = true;
          this.showMoreActivated = false
        }
      },
      backHome(){
        this.homeState=true;
        this.itemState=false;
      },
      backSearch(){
        this.searchState=true;
        this.itemState=false;
      },
      cart(){
        
        this.$router.push({
              name: 'Cart',
              query: {cartList:this.cartList}
              
              })
      },
      getCookie(){
        axios.get("http://localhost:3000",{headers:{"Content-Type":"application/json"},withCredentials:true})
              .then(res =>{
                  console.log(res)
                  if(Object.keys(res.data.result.cookie).length > 0) {
                    console.log(res.data.result.cookie)
                      this.memberState=true
                      this.visitorState=false
                     }else{
                       this.memberState=false
                      this.visitorState=true
                     }
                
              }) 
      },

      userInfo(){
        this.$router.push('UserInfo')
      },

      logout(){
        this.$confirm('Do you wish to log out', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {

          
          this.$message({

            
            type: 'success',
            message: 'You have logged out.'
          },
          axios.get("http://localhost:3000/signout",{headers:{"Content-Type":"application/json"},withCredentials:true})
            .then(res =>{
              if(res.status === 200){
                 this.memberState=false
                 this.visitorState=true
                 
              }
              
            })
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Logout canceled'
          });          
        });

      },
      
  }
}
</script>


<style>
body {
  background-color:	#f5e29f
}
.home h1{
  color:white;
  font-family: "Times New Roman";
  font-weight: bold;
}
/* .home {
  background-color:	#f5e29f
} */
.row:after {
   content: "";
   display: table;
   clear: both;
}
 
.search {
    cursor: pointer;
}
.searchComp .el-col {
    margin-left: 250px;
    margin-top: 10px;
}
.el-menu-item {
    font-size: 17px;
}
.bottom .el-button--warning{
  margin-left: 350px;
}
.bottom .el-button--success{
  margin-left: 10px;
  margin-bottom: 0px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #66b1ff;
    margin-top: 10px;
    font-weight: bold;
}
.slidecontainer {
  width: 100%;
}
.slider {
  -webkit-appearance: none;
  width: 25%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  margin-top: 5px;
}
.maxprice{
  margin-top: 0px;
  
  color:#66b1ff
}
.slider:hover {
  opacity: 1;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #04AA6D;
  cursor: pointer;
}
.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #04AA6D;
  cursor: pointer;
}
.el-dropdown{
    float: right;
    font-size: 16px;
}
.searchComp .el-card {
  height: 600px
  
}
.row .el-col {
  margin-left: 125px;
  margin-top: 15px;
}
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
  margin-bottom:0px
}
</style>