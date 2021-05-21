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
export default {
  name: 'UserInfo',
  components: {
  },
  data(){
      return{
        
        user:[],
        username:[],
        currentpwd:'',
        newpwd:''
      }
  },
  created() {
    this.getRouterData()
  },
  methods:{
      getRouterData() {
              this.user = this.$route.query.userList
            //   console.log(this.user[0])
            //   console.log((this.user[0].userName).split(/(\s+)/))
              this.username=(this.user[0].userName).split(/(\s+)/)

            },
            update(){
                this.$prompt('Please enter your current password',  {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                
            }).then(({ value }) => {
                if(value != null) {
                this.$message({
                type: 'success',
                message: 'Your profile has been updated successfully'
                
            });
            }
            }).catch(() => {
                this.$message({
                type: 'info',
                message: 'Update cancelled'
          });       
        });

            },

            change(){

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