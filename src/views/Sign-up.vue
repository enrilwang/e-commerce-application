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
      <!-- <button type="button" class="cancelbtn" >Cancel</button> -->
      <el-button type="danger" plain>Cancel</el-button>

      </router-link>
      <el-button type="success" plain v-on:click="Signup">Sign Up</el-button>
      <!-- <button type="submit" class="signinbtn">Sign Up</button> -->
    </div>
  
    </div>
    
  </div>
</template>

<script>
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
        if(this.email==""||this.pwd==""){
          alert('Please fill in all the fields.')

        }
      }
    }
  }
  
</script>
<style>
.sign-up {
  background-color:	#FFFFE0
}
</style>