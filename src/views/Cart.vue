<template>
  <body>
    <div class="cart"> 
      <!-- <body> -->
      <h1>Shopping cart</h1>  
        <!-- <Home @cartInfo="getCartInfo"></Home> -->
      <table class="shoppingcart">
        <tr>
          <th></th>
          <th>Title<th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="(product,index) in carts" :key="index">
          <td><input type="checkbox" v-model="checked" @click="myCheck(product)"></td>
          <!-- <span class="checkmark"></span> -->
          <td>{{ product.title}}</td>  
          <td></td>
          <td>{{ product.price}}</td> 
          <td>{{ product.quantity}}</td> 
          <td><el-button @click="editRow(index,product)" type="text" size="small">Edit</el-button>
          <input type="text" v-model="amount" placeholder="new quantity">
          </td>
          <td><el-button@click="deleteRow(index)" type="text" size="small">Remove</el-button></td>
        </tr>
      </table>
      <br><br>
      {{Total}}
      <a href="javascript:history.go(-1)">
      <el-button type="primary" icon="el-icon-arrow-left" >Previous Page</el-button></a>
      <router-link to="/">
      <el-button type="success" plain >Confirm</el-button>
      </router-link>
      
        
        <!-- {{product}} -->


    </div>
  </body>
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
        visible:true,
        carts:[],
        Total:'',
        amount:'',
        checked:false


      }
  },
  created() {
    this.getRouterData()
  },
  
 
  methods:{
            // getCartInfo(data){
            //     this.product = data
            //     console.log(data)
            // }
            getRouterData() {
              this.carts = this.$route.query.cartList
              this.product=this.carts
              console.log(this.carts)
            },
           
            
            deleteRow(index){
              this.carts.splice(index, 1)

            },
            editRow(product,index){
              
              this.amount=parseInt(this.amount)
              console.log(typeof(amount))
              if(this.amount==0){
                this.carts.splice(index, 1)
                console.log(product)
              }else if(this.amount==''){
                alert("please enter the quantity")
                console.log(product)
              }else{
                product.quantity=this.amount
                console.log(product.quantity)
              }
              

            },

            myCheck(product){
              if(this.checked==true){
                // this.Total=product.price+this.Total
                this.Total=parseInt(this.Total)
                this.Total+= product.price
                console.log(typeof(this.Total))

              }
            }
        }
 
  
  

};
</script>
<style>

body {
  background-color:	#f5e29f
}


.el-button--primary {
  float:left
  }
.el-button--success {
  float:right
  }
.shoppingcart {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.shoppingcart td, .shoppingcart th {
  border: 1px solid #ddd;
  padding: 8px;
}

.shoppingcart tr:nth-child(even){background-color: #f2f2f2;}

.shoppingcart tr:hover {background-color: #ddd;}

.shoppingcart th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
.cart input[type=text] {
  width: 35%;
}


</style>