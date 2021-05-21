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
          <th>Update Quantity</th>
          <th></th>
        </tr>
        <tr v-for="(product,key,index) in carts" :key="index" >
          <!-- <td><input type="checkbox"  @click="myCheck(product)" value=product.price v-model="checked"></td> -->
          <td><input type="checkbox"  @click="check($event)" :value="product.price*product.quantity" v-model="product[key]"></td>

          <td>{{ product.title}}</td>  
          <td></td>
          <td>{{ product.price}}</td> 
          <td>{{ product.quantity}}</td> 
          <td><el-button @click="editRow(product,index)" type="text" size="small">Save</el-button>
          <input type="text" v-model="product.quantity" placeholder="new quantity" >
          </td>
          <td><el-button@click="deleteRow(index)" type="text" size="small">Remove</el-button></td>
        </tr>
      </table>
      <br><br>
      <p>Total:{{total}}</p>
      <a href="javascript:history.go(-1)">
      <el-button type="primary" icon="el-icon-arrow-left" >Previous Page</el-button></a>
      <router-link to="/">
      <el-button type="success" plain >Confirm</el-button>
      </router-link>
      
    </div>
  </body>
</template>
<script>
export default {
  name: 'Cart',
  components: {
  },
  data(){
      return{
        
        carts:[],
        total:0,
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
              // this.amount=parseInt(this.amount)
              if(product.quantity==0){
                this.carts.splice(index, 1)
                console.log(product)
              }
              // else{
          
              // }
              
            },

            check: function(e) {
            if (e.target.checked) {
              console.log(e.target.value)
              this.total+= parseInt(e.target.value)
            }
            else{
              this.total= this.total-parseInt(e.target.value)
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
  width: 50%;
}
</style>