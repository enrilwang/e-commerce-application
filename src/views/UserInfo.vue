<template>
    <body>
        <div class="user">
            <el-tabs type="border-card">
            <el-tab-pane label="Edit profile">
            <div class="container">
            <p>Firstname: <el-input v-model="username[0]" ></el-input></p>
            <p>Lastname: <el-input v-model="username[2]"></el-input></p>
            <p>Email: <el-input v-model="user[0].userEmail"></el-input></p>
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

            <el-tab-pane label="Manage listings">
            <el-button type="primary" @click="add()">Add a new list</el-button>
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
        
        user:[],
        username:[],
        currentpwd:'',
        newpwd:'',
        id:""
      }
  },
  created() {
    this.getRouterData()
  },
  methods:{
      getRouterData() {
        this.user = this.$route.query.userList
        this.username=(this.user[0].userName).split(/(\s+)/)
        this.id = this.user[0].id
       
      },
      update(){
          if (this.username[0]=="" || this.username[2]=="" || this.user[0].userEmail=="" ){
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
                  email:this.user[0].userEmail,
                  id:this.user[0].id
              }
             
              axios.post("http://localhost:3000/updateProfile",JSON.stringify(users),{headers:{"Content-Type":"application/json"}})
                  .then(res => {
                  if(res.status === 200){
                    
                    alert("Your profile has been updated successfully")
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
              id:this.user[0].id
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
</style>