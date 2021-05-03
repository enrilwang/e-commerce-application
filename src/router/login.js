import Vue from "vue";

Vue.component("counter",{    
	data:function(){
			return {count:0}
			},
 

	template:'<button v-on:click="count++">点击计算点击次数：{{count}}次</button>'
})
 

new Vue({
	el:"#home"
	})
 
