<template>
  <div class="cart"> 
    <h1>Shopping cart</h1>
      
      <!-- <Home @cartInfo="getCartInfo"></Home> -->
    <el-table :data="carts"  style="width: 100%" > 
      <!-- <template slot-scope="scope"> -->
      <el-table-column type="selection" @change="handleSelection" width="55">
      </el-table-column>
      <!-- </template> -->
      <el-table-column  prop="title" label="Title" width="800">        
      </el-table-column>
      <el-table-column  prop="price" label="Price" width="100">
      </el-table-column>
      <el-table-column  prop="quantity" label="Quantity" width="100">
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="180">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, carts)" type="text" size="small">
          Remove
        </el-button>
        <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">Edit</el-button>
          <el-input
          v-model="amount" size="mini" placeholder="Please input quantity"/>
      </template>
      </el-table-column>
    </el-table>
    {{Total}}
    <a href="javascript:history.go(-1)">
    <el-button type="primary" icon="el-icon-arrow-left" >Previous Page</el-button></a>
    <router-link to="/">
    <el-button type="success" plain >Confirm</el-button>
    </router-link>
    
      
      <!-- {{product}} -->


  </div>
</template>
<script>
import Home from "../views/Home"

export default {
  name: 'Cart',
  components: {
    Home
  },
  data(){
      return{
        product:'111',
        // homeState:false
        // homeState:true
        visible:true,
        carts:[],
        Total:'',
        amount:''


      }
  },
  created() {
    this.getRouterData()
  },
  // created() {
  //   this.selection()
  // },
 
  methods:{
            // getCartInfo(data){
            //     this.product = data
            //     console.log(data)
            // }
            getRouterData() {
              this.carts = this.$route.query.cartList
              this.product=this.carts
              // console.log(this.cart)
            //   console.log('code', this.code)
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            handleSelectionChange(cart) {
              this.multipleSelection = cart;
            },
            handleEdit(index,row) {
              if(this.amount==''){
                alert("please input quantity first")
              }else if(this.amount=='0'){
                this.carts.splice(index,1)

              }
              else{
                row.quantity=this.amount
                console.log(row.quantity);
              }
            },
            
        }
 
  
  

};
</script>
<style>
.cart {
  background-color:	#f5e29f
}

/* .el-table__empty-block .el-table__empty-text {
   display: none;
   color:white
} */
.el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 20px;
}
.el-button--primary {
  float:right
  }
.el-button--success {
  float:right
  }
</style>