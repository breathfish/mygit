<template>	
  <div class="choice">
  	<header>
    		<p><img src="../assets/logo.jpg" /> <span><i class="iconfont">&#xe62a;</i></span></p>
    		<p><span v-for="(item, index) in tabs" :key="index" @click="btnAction(index)"  :class="{'active':index==activeIndex}">{{item}}</span></p>
    </header>
    <div v-if="activeIndex==0">
  		<anow></anow>
  	</div>
  	<div v-else-if="activeIndex==1">
  		<asoon></asoon>
  	</div>
  	<div v-else>
  		<ahot></ahot>
  	</div>
  	<router-view></router-view>
  </div>
  
</template>

<script>
import now from './children/moviecom/now.vue'
import soon from './children/moviecom/soon.vue'
import hot from './children/moviecom/hot.vue'

import Vue from 'vue'
//Vue.use(InfiniteScroll);
export default {
  	name: 'hello',
  	data(){
  		return {
  			tabs:['热映电影','即将上映','热门活动'],
  			activeIndex:0
  		}
  	},
  	methods:{
  		btnAction(index){
	  				this.activeIndex=index;	
	  		},
  	},
	  components:{
	  	'anow':now,
	  	'asoon':soon,
	  	'ahot':hot
	  }
	  
  
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.choice header{
	position: relative;
	width: 100%;
	height: 0.88rem;
	font-size: 0.16rem;
	background: #fcfcfc;
	
}
.choice header p:nth-of-type(1) img{
	display: inline-block;
	position: absolute;
	left: 0.15rem;
	top: 0.15rem;
	height: 0.45rem;
}
.choice header p:nth-of-type(1) i{
	position: absolute;
	right: 0.1rem;
	top: 0.18rem;
	font-size: 0.32rem;
	color: #adf6ef;
}
.choice header p:nth-of-type(2){
	position: absolute;
	display: flex;
	flex: 1;
	flex-direction: row;
	align-content: space-around;
	left: 0;
	bottom: 0;
	height: 0.25rem;
	width: 100%;
	
}
.choice header p:nth-of-type(2) span{
	flex: 1;
	text-align: center;
}
.choice header p:nth-of-type(2) span:after{
	content: '';
	position: absolute;
	height: 1px;
	border-bottom: 1px solid white;
	left: 0;
	bottom: -1px;
	transform: translateY(0.5);
	width: 100%;	
}
.choice header p:nth-of-type(2) span.active{
	border-bottom: 1px solid #e0733a;
	color: #e0733a;
}
</style>
