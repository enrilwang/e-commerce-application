<template>
  <div class="sign-up">
    
    <div class="container">
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>
    <label for="fname"><b>First Name</b></label>
    <el-input placeholder="Please enter First Name" v-model="fname" clearable></el-input>
    

    <label for="lname"><b>Last Name</b></label>
    <el-input placeholder="Please input Last Name" v-model="lname" clearable></el-input>

    <label for="email"><b>Email</b></label>
    <el-input placeholder="Please enter Email" v-model="email" clearable></el-input>
    

    <label for="pwd"><b>Password</b></label>
    <el-input placeholder="Please input password" v-model="pwd" show-password></el-input>

    

    <div class="clearfix">
      
      <router-link to="/">
      <el-button type="danger" plain>Cancel</el-button>

      </router-link >
      <el-button type="success" plain v-on:click="Signup">Sign Up</el-button>
    </div>
  
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
      return {
        fname: '',
        lname:'',
        pwd: '',
        email:''
      }
    },
    methods:{
      Signup:function(){
        var passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        var emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        
        if(this.fname=="" || this.lname==""||this.email==""||this.pwd==""){
          alert('Please fill in all the fields.')
        }
        else if(emailReg.test(this.email) == false){
          alert("email format is not correct! ");
        }
        else if (passwordReg.test(this.pwd) == false) {
          alert("Password must contain 6 characters, at least one letter and one number ");
        }else {

          const user = {firstName:this.fname,
                        lastName:this.lname,
                        email:this.email,
                        password:this.pwd
                        }
          axios.post("http://localhost:3000/signUp",JSON.stringify(user),{headers:{"Content-Type":"application/json"}})
            .then(res => {
              console.log("check"+res.data)
            if(res.status === 200){
              
              alert("Sign up successfully!")
            }else if(res.status ===201){
              alert("Email has already existed! Please sign up with different email")
            }else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(error => {
            console.error(error.response.data);
            alert('Error sign up, please try again');
          })


        }
        
      }
    }
  }
  
</script>
<style>
.sign-up {
  background-color:	#f5e29f
}
</style>