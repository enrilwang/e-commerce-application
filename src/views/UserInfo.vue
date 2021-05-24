<template>
    <body>
        <div class="user">
            <el-tabs type="border-card" @tab-click="handleClick">
              <div class="logout">
              <el-button type="text" class="button" v-on:click="logout()">{{out}}</el-button>
              </div>

            <el-tab-pane label="Edit profile">
            <div class="container">
            <p>Firstname: <el-input v-model="username[0]" ></el-input></p>
            <p>Lastname: <el-input v-model="username[2]"></el-input></p>
            <p>Email: <el-input v-model="userEmail"></el-input></p>
            <el-button type="success" plain @click="update()">Update profile</el-button>
            </div>
            </el-tab-pane>

            <el-tab-pane label="Change password">
            <div class="container">
                <label for="psw"><b>Current Password:</b></label>
                <el-input placeholder="Please input current password" v-model="currentpwd" show-password >
                </el-input>
                <br>
                <br>
                <label for="psw"><b>New Password:</b></label>
                <el-input placeholder="Please input new password" v-model="newpwd" show-password ></el-input>
                <el-button type="success" plain @click="change()">Confirm</el-button>
            </div>
            </el-tab-pane>

            <el-tab-pane  label="Manage listings" name="Manage listings">
              <el-button type="text" @click="add()">Add a new list</el-button>
              <div class="container">
                
                <div class="form1" v-show="formState">
                <el-form ref="form" :model="form" label-width="120px"  >
                  <el-form-item label="Title">
                    <el-input v-model="form.title"></el-input>
                  </el-form-item>
                  <el-form-item label="Brand">
                    <el-input v-model="form.brand"></el-input>
                  </el-form-item>
                  <el-form-item label="Image">
                    <el-input v-model="form.image"></el-input>
                  </el-form-item>
                  <el-form-item label="Stock">
                    <el-input v-model="form.stock"></el-input>
                  </el-form-item>
                  <el-form-item label="Price">
                    <el-input v-model="form.price"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="add1()">Add a new list</el-button>
                    <el-button @click="cancel()">Cancel</el-button>
                  </el-form-item>
                </el-form>
                </div>
              </div>
              <div class="container">
               <el-row>
                  <el-col :span="12" v-for="(post,index) in addedList" 
                    v-bind:item="post"
                    v-bind:index="index"
                    v-bind:key="post.id" >
                    

                    <el-card :body-style="{ padding: '0px' }">
                      <div style="padding: 14px;">  
                        <img :src="require('../../public/image/'+post.image)" style="width:100%" class="image"  alt="">
                        <span><h4>Title:{{post.title}}</h4></span>
                        <span><h4>Brand:{{post.brand}}</h4></span>
                        <span><h4>Stock:{{post.stock}}</h4></span>
                        <span><h4>Price:${{post.price}}</h4></span>
                        <!-- <br> -->
                        <span><p>Display: 
                          
                           <el-switch v-model="post.disabled" @change='changeStatus($event,post,index)' ></el-switch> 
                          </p>
                          </span>

                        <span><el-button type="danger" circle @click="remove(post,index)">Remove</el-button></span>
                      </div>
                    </el-card>
                  </el-col>
                </el-row> 
              </div>
            </el-tab-pane>
            
            

            </el-tabs>
        </div>
    </body>
</template>
<script>
import axios from "axios"
export default {
  name: 'UserInfo',
  components: {
  },
  data(){
      return{
        value:'',
        userEmail:"",
        user:[],
        username:[],
        currentpwd:'',
        newpwd:'',
        id:"",
        addedList:[],
        // disableState:false,
        enable:'enable',
        out:'',
        checked:false,
        value1:'1',
        name:"",
        state:2,
        form: {
          title: '',
          brand: '',
          image: '',
          stock: '',
          price: '',
          disabled: false,
          
        },
        formState:false,
       
          
      }
  },
  created() {
    this.userlist()
  },
  methods:{
      
      update(){
          if (this.username[0]=="" || this.username[2]=="" || this.userEmail=="" ){
            alert("cannot be null")
          }else{
            this.$prompt('Please enter your current password', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
          
            }).then(({ value }) => {
               var passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
               
               if(value != null && passwordReg.test(value) == true) {
                  const users = {
                  firstName:this.username[0],
                  lastName:this.username[2],
                  password:value,
                  email:this.userEmail,
                  id:this.id
              }
             
              axios.post("http://localhost:3000/updateProfile",JSON.stringify(users),{headers:{"Content-Type":"application/json"}})
                  .then(res => {
                  if(res.data.status === 200){
                    
                    this.userEmail = res.data.result.userEmail;
                    this.name = res.data.result.userName;
                     const user = {
                        userEmail:this.userEmail,
                        userName:this.name,
                        id:this.id
                      }
                       axios.get("http://localhost:3000/signout",{headers:{"Content-Type":"application/json"},withCredentials:true})
                              .then(res =>{
                                if(res.status === 200){
                                 
                                }
                                
                              }),
                      axios.post("http://localhost:3000/updateCookie",JSON.stringify(user),{headers:{"Content-Type":"application/json"},withCredentials:true})
                        .then(res => {
                        if(res.status === 200){
                          alert("Your profile has been updated successfully")
                        }})
                          
                         location.reload()             
                    
                    //this.$router.push('Sign-in')
                  }else if(res.status ===201){
                    alert("Sorry, password is not correct")
                  }else {
                    const error = new Error(res.error);
                    throw error;
                  }
                })
                .catch(error => {
                  console.log(error);
                  alert('Error login, please try again');
                })
               
              }else{
                alert("password cannot be null and password must contain 6 characters, at least one letter and one number")
              }

          }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Update cancelled'
              });       
          });


          }
          
          
      },

      //call change password
      change(){
        if (this.currentpwd=="" || this.newpwd=="" ){
          alert("password cannot be null")
        }else{
          var passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
         
          if(passwordReg.test(this.currentpwd) == true && passwordReg.test(this.newpwd) == true) {
            const passwords = {
              current:this.currentpwd,
              new:this.newpwd,
              id:this.id
            }
        
            axios.post("http://localhost:3000/updatePassword",JSON.stringify(passwords),{headers:{"Content-Type":"application/json"}})
              .then(res => {
              if(res.status === 200){
                
                alert("Your password has been updated successfully")
                
              }else if(res.status ===201){
                alert("Sorry, current password is not correct")
              }else {
                const error = new Error(res.error);
                throw error;
              }
            })
            .catch(error => {
              console.log(error);
              alert('Error, please try again');
            })
            
          }else{
            alert("password must contain 6 characters, at least one letter and one number")
          }

        }

      },
      add(){
         this.formState=true
      },
      
      //add a new list
      add1(){
        const newlist = {
          userEmail:this.userEmail,
          id:this.id,
          item:this.form,
        }
        
        axios.post("http://localhost:3000/addNewList",JSON.stringify(newlist),{headers:{"Content-Type":"application/json"}})
          .then(res => {
          if(res.status === 200){
             axios.get("http://localhost:3000/userAddList",{headers:{"Content-Type":"application/json"}})
            .then(res =>{
              this.addedList = res.data 
              console.log(this.addedList)
              
            })
            this.formState=false
            // this.disableState=true
            
            alert("Added successfully")
            
          }else if(res.status ===201){
            alert("Sorry, not correct")
          }else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(error => {
          console.log(error);
          alert('Error, please try again');
        })



        // add to phonlisting 
        const newlist1 = {
          userId:this.id,
          item:this.form
        }
        axios.post("http://localhost:3000/addToPhone",JSON.stringify(newlist1),{headers:{"Content-Type":"application/json"}})
          .then(res => {
          if(res.status === 200){
            
            console.log("good")
            
          }else if(res.status ===201){
            alert("Sorry, not correct")
          }else {
            const error = new Error(res.error);
            throw error;
          }
          
        })
        .catch(error => {
          console.log(error);
          alert('Error, please try again');
        })
        this.showListing()
      },


      cancel(){
        this.formState=false
      },


      remove(product,index){
        const item = {
          product:product
        }

        axios.post("http://localhost:3000/deleteCreated",JSON.stringify(item),{headers:{"Content-Type":"application/json"}})
          .then(res =>{
            console.log("good")  
          })

        axios.post("http://localhost:3000/deletePhone",JSON.stringify(item),{headers:{"Content-Type":"application/json"}})
          .then(res =>{
            console.log("good")  
          })
        this.addedList.splice(index, 1)

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
              
            }),
            this.$router.push("/")
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Logout canceled'
          });          
        });

      },

     changeStatus: function($event,post,index){
        
        console.log($event)
        
        // console.log("first")
        let go = false;
        if (post.disabled) {

          go = false;
        }else {
          go = "";
          
        }
       
        const item = {
          product:post,
          disable:go,
          id:this.id
        }
        
        axios.post("http://localhost:3000/changeStatus",JSON.stringify(item),{headers:{"Content-Type":"application/json"}})
          .then(res =>{
            if(res.status === 200) {
                console.log("good")
            }
            
        })

		
				
     },

      handleClick(tab, event) {
        console.log(tab, event);
        if(tab.name == 'Manage listings'){
        	this.showListing();
        }
      },
      showListing(){
        const item = {
          id:this.id
        }
        

        axios.post("http://localhost:3000/userAddList",JSON.stringify(item),{headers:{"Content-Type":"application/json"}})
            .then(res =>{
              this.addedList = res.data 
            
               for(let i = 0; i < this.addedList.length; i++) {
                if (Boolean(this.addedList[i].disabled) == true) {
                  this.addedList[i].disabled = true;
                }else {
                   this.addedList[i].disabled = false;
         
                }
              }
      
              
            })

       
      },




      // get user cookie
      userlist(){
        axios.get("http://localhost:3000",{headers:{"Content-Type":"application/json"},withCredentials:true})
              .then(res =>{
                  this.userEmail = res.data.result.cookie.userEmail
                  this.username=(res.data.result.cookie.userName).split(/(\s+)/)
                  this.id = res.data.result.cookie.id
                  this.out="Hi, "+this.username[0]+" (log out)"
                  
              }) 
      },

      check: function(e,post) {
        if (e.target.checked) {
          console.log(e.target.checked)
          console.log(e.target.value)
        }
      }
      


  }
}
</script>
<style>
body{
  background-color:	#f5e29f
}
.user .el-button--success{
margin-left: 0px;
margin-top: 0px
}
.user input[type=text] {
  width: 100%;
}
.user .el-card {
  /* height: 800px; */
  overflow-y: auto; 
  height:400px;
  margin-left: 36px;
  margin-top: 15px;
  
}
.user .el-button--danger {
    margin-top: 50px;
    float:right;
}
.logout .el-button--text{
  margin-top: 0px;
  float:right

}
.container {
  padding: 16px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>