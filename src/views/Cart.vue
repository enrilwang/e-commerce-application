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
          <td><input type="checkbox"  @click="check($event,product)" :value="product.price*product.quantity" v-model="product[key]"></td>

          <td>{{ product.title}}</td>  
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
      <router-link to="/">
      <el-button type="success" plain @click="confirm">Confirm</el-button>
      </router-link>
      <div style="display:none">
        {{selectedItem}}
      </div>
      
    </div>
  </body>
</template>
<script>
// import Home from "../views/Home"
import axios from "axios"
import qs from 'qs'
export default {
  name: 'Cart',
  components: {
  },
  data(){
      return{
        
        carts:[],
        total:0,
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
                //  console.log(index)
                index=carts.indexOf(product)
                carts.splice(index, 1)
              }
            })
      },



      editRow(product,index){
        let firstquantity=product.quantity
        
        if (product.quantity > product.stock) {
            
            alert("quantity cannot exceed stock")
            product.quantity=firstquantity
            // console.log(firstquantity)
        }else if(product.quantity < 0){
            alert("quantity cannot be negative number")
        } else{
          const item = {
            quantity:product.quantity,
            product:product
            
          }

          axios.post("http://localhost:3000/updateQuantity",JSON.stringify(item),{headers:{"Content-Type":"application/json"}})
            .then(res =>{
              if(res.status === 201){
                index=this.carts.indexOf(product)
                 console.log(index)
                this.carts.splice(index, 1)
              
              }else if(res.status === 200) {
                product.quantity=product.id
                // console.log(typeof(product.id))
                alert("save successfully")
                let i=0
                for(i=0;i<this.selectedItem.length;i++){
                  if (this.selectedItem[i]=product.title){
                    product.id=parseInt(product.id)
                    if(product.id>firstquantity){
                   console.log(product.id-firstquantity)
                  this.total+=((product.id-firstquantity)*product.price)
                  console.log(this.total)
                }else if(product.id==0){
                  this.total-=firstquantity*product.price
                }
                else{
                  this.total-=((firstquantity-product.id)*product.price)
                }
                

                  }

                }
                // product.id=parseInt(product.id)
                // if(product.id>firstquantity){
                //    console.log(product.id-firstquantity)
                //   this.total+=((product.id-firstquantity)*product.price)
                //   console.log(this.total)
                // }else if(product.id==0){
                //   this.total-=firstquantity*product.price
                // }
                // else{
                //   this.total-=((firstquantity-product.id)*product.price)
                // }
                
              }
              
            })

        }
        
        
        
        
      },

      check: function(e,product) {
        if (e.target.checked) {
          // console.log(product)
          this.total+= parseFloat(e.target.value)
          // this.total+= e.target.value
          // console.log(product.title)
          this.selectedItem.push(product.title)
          console.log(this.selectedItem)
          

        }
        else{
          let index=0
          this.total= this.total-e.target.value
          // console.log(index)
          index=this.selectedItem.indexOf(product.title)
          console.log(index)

          this.selectedItem.splice(index,1)
          console.log(this.selectedItem)
        }
      },

      confirm:function() {
        const carts = {
          carts:this.carts,
          length:this.carts.length
        }
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