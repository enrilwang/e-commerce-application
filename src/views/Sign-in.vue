<template >
  <div class="sign-in">
    
    <div class="container">
      <h1>Phone Zone</h1>
      <h2 class="text">Sign in</h2>
      <hr>
    
      <label for="email"><b>Email(userName)</b></label>
      <el-input placeholder="Please enter Email" v-model="email" clearable></el-input>

      <label for="psw"><b>Password</b></label>
      <el-input placeholder="Please input password" v-model="pwd" show-password></el-input>
      
      <div class="clearfix"> 
        <router-link to="/">
        <el-button type="danger" plain>Cancel</el-button>
        </router-link>
  
        <el-button type="success" plain v-on:click="Signin">Sign in</el-button>
        
      </div>
      <el-divider content-position="center">New to Phone Zone?</el-divider>
      <router-link to="/sign-up">
      <br>
      <button type="create" class="createbtn">Create your Phone Zone account</button>
      </router-link>
    </div>
  </div>
  
</template>
<script>
import axios from 'axios';
export default {
    data() {
      return {
        pwd: '',
        email:''
      }
    },
    methods:{
      Signin:function(){
        if(this.email==""||this.pwd==""){
          alert('Please fill in all the fields.')

        }

        const user = {email:this.email,
                      password:this.pwd
                      }
          axios.post("http://localhost:3000/login",JSON.stringify(user),{headers:{"Content-Type":"application/json"}},{withCredentials:true})
            .then(res => {
              console.log(res)
              
              console.log(document.cookies)
            if(res.status === 200){
              //console.log(req.cookies.userEmail);
              alert("Login successfully!")
            }else if(res.status ===201){
              alert("Email and/or password incorrect")
            }else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(error => {
            console.log(error);
            alert('Error login, please try again');
          })


          axios.get("http://localhost:3000/cookie").then(res=> console.log(res))
          console.log("finish")



         
      }
    }
  }
</script>


<style>
.sign-in {
  background-color:	#f5e29f
}
.text{
  text-align: left;
}
.container {
  padding: 16px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}


hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}



button:hover {
  opacity:1;
}


.el-button--danger {
  margin-top: 50px;
  margin-left: 100px
}
.el-button--success {
  margin-top: 50px;
  margin-left: 200px

}
.createbtn {
  
  margin-left: 203px
}
.el-divider {
    background-color: #d0991f;
}

</style>
