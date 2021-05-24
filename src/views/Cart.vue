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
          <th>Stock<th>
          
          <th>Price</th>
          <th>Quantity</th>
          <th>Update Quantity</th>
          <th></th>
        </tr>
        <tr v-for="(product,key,index) in carts" :key="index" >
          <td><input type="checkbox"  @click="check($event,product)" :value="product.price*product.quantity" v-model="product[key]"></td>

          <td>{{ product.title}}</td>  
          <td></td>
          <td>{{ product.stock}}</td>
          <td></td>
          <td>{{ product.price}}</td> 
          <td>{{ product.quantity}}</td> 
          <td><el-button @click="editRow(product,index)" type="text" size="small">Save</el-button>
          <input type="text" v-model="product.id" placeholder="new quantity" >
          </td>
          <td>
            <el-button@click="deleteRow(product,index,carts)" type="text" size="small" >Remove</el-button>
            </td>
        </tr>
      </table>
      <br><br>
      <p>Total:{{total}}</p>
      <a href="javascript:history.go(-1)">
      <el-button type="primary" icon="el-icon-arrow-left" >Previous Page</el-button></a>
      
      <el-button type="success" plain @click="confirm">Confirm</el-button>
      
      <div style="display:none">
        {{selectedItem}}
      </div>
      
    </div>
  </body>
</template>
<script>

import axios from "axios"
import qs from 'qs'
export default {
  name: 'Cart',
  components: {
  },
  data(){
      return{
        
        carts:[],
        total:0.00,
        amount:'',
        checked:false,
        selectedItem:[]
      }
  },
  created() {
     axios.get("http://localhost:3000/cart",{headers:{"Content-Type":"application/json"}})
              .then(res =>{
                this.carts = res.data 
              })
                  

  },

  methods:{
      deleteRow(product,index,carts){
        const item = {
            product:product
            
          }

          axios.post("http://localhost:3000/deleteQuantity",JSON.stringify(item),{headers:{"Content-Type":"application/json"}})
            .then(res =>{
              if(res.status === 200){
                index=carts.indexOf(product)
                carts.splice(index, 1)
              }
            })
      },



      editRow(product,index){
        let firstquantity=product.quantity

        if (product.id > product.stock) {

            alert("quantity cannot exceed stock")
        
        }else if(product.id < 0){
            alert("quantity cannot be negative number")
        } else{
          const item = {
            quantity:product.id,
            product:product
            
          }

          axios.post("http://localhost:3000/updateQuantity",JSON.stringify(item),{headers:{"Content-Type":"application/json"}})
            .then(res =>{
              if(res.status === 201){
                index=this.carts.indexOf(product)
                this.carts.splice(index, 1)
                 for(let i=0;i<this.selectedItem.length;i++){
                  if (this.selectedItem[i]==product.title){
                    product.id=parseInt(product.id)
                   
                    this.total-= Number(parseFloat(firstquantity*product.price).toFixed(2))
                  }

                }
                
                //this.total+=((product.id-firstquantity)*product.price)
              }else if(res.status === 200) {
                product.quantity=product.id
                alert("save successfully")
                let i=0
                for(i=0;i<this.selectedItem.length;i++){
                  if (this.selectedItem[i]==product.title){
                    product.id=parseInt(product.id)
                    if(product.id>firstquantity){
                      
                      this.total+=Number(parseFloat((product.id-firstquantity)*product.price).toFixed(2))
                     
                    }else{
                      this.total-=Number(parseFloat((firstquantity-product.id)*product.price).toFixed(2))
                    }
                

                  }

                }
              
                
              }
              
            })

        }
        
        
        
        
      },

      check: function(e,product) {
        if (e.target.checked) {

          this.total = Number(parseFloat(this.total + parseFloat(e.target.value)).toFixed(2))

          this.selectedItem.push(product.title)
        }
        else{
        
          let index=0
          this.total= Number(parseFloat(this.total-parseFloat(e.target.value)).toFixed(2))
          index=this.selectedItem.indexOf(product.title)
          this.selectedItem.splice(index,1)
         
        }
      },

      confirm:function() {
        const carts = {
          carts:this.carts,
          length:this.carts.length
        }
        let num = 0
        for (let i = 0; i < this.carts.length; i++) {
          if (this.carts[i].quantity > this.carts[i].stock) {
            alert("quantitiy cannot exceed stock")
          }else {
            num += 1
          }
        }
        if (num == this.carts.length) {
          axios.post("http://localhost:3000/updateStock",qs.stringify(carts))
            .then(res => {
            if(res.status === 200){
              
              alert("Thanks for purchasing!")
            }else if(res.status ===201){
              alert("stock not enough, go back to check")
            }else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(error => {
            console.log(error);
            alert('Error login, please try again');
          })
          
          this.$router.push("/")

        }
        

      }

  },
  

  
  
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