<template >
  <div class="sign-in">
    
    <div class="container">
      <h1>Phone Zone</h1>
      <h2 class="text">Sign in</h2>
      <hr>
    
      <label for="email"><b>Email</b></label>
      <el-input placeholder="Please enter Email" v-model="email" clearable></el-input>

      <label for="psw"><b>Password</b></label>
      <el-input placeholder="Please input password" v-model="pwd" show-password></el-input>
      
      <div class="clearfix"> 
        <router-link to="/">
        <el-button type="danger" plain>Cancel</el-button>
        </router-link>
  
        <el-button type="success" plain v-on:click="Signin">Sign in</el-button>
        
      </div>
      <p>——————————————— New to Phone Zone? ———————————————</p>
      <router-link to="/sign-up">
      <button type="create" class="createbtn">Create your Phone Zone account</button>
      </router-link>
    </div>
  </div>
  
</template>
<script>
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
      }
    }
  }
</script>


<style>
.sign-in {
  background-color:	#FFFFE0
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

</style>
