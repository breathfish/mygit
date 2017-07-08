<template>
  <div id="app">
    <router-view></router-view>
    <nav class="tabs">
    		<router-link v-for="(item,index) in tabs" :key="index" :to="item.path">
    				<i :class="item.icon"></i>
    				<span>{{item.title}}</span>    			
    		</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
   	  return {
   	  	tabs: [
		   	  	{title:"电影", icon:"iconfont icon-dianying", path:"/movie"},
		   	  	{title:"影院", icon:"iconfont icon-shafa", path:"/cinema"}, 
		   	  	{title:"演出", icon:"iconfont icon-maikefeng", path:"/show"},
		   	  	{title:"商城", icon:"iconfont icon-shangcheng", path:"/market"},
		   	  	{title:"我的", icon:"iconfont icon-wo", path:"/me"} 
   	  	]
   	  }
   }
}
</script>

<style>
#app .tabs{
	position: absolute;
	display: flex;
	flex-direction: row;
	left: 0;
	bottom: 0;
	height: 0.49rem;
	width: 100%;
	font-size: .12rem;
	background: yellow;	
}
#app .tabs a{
	display: flex;
	flex: 1;
	flex-direction: column;	
	align-items: center;
}
#app .tabs:before{
	content: '';
	height: 1px;
	border-top: 1px solid #DDD;
	position: absolute;
	left: 0;
	top: -1px;
	width: 100%;
	transform: translateY(0.5);
}
#app .tabs a i{
	display: block;
	align-self: center;
	height: 0.32rem;	
	line-height: 0.32rem;
	font-size: 0.32rem;
	text-align: center;
}
#app .tabs a span{
	display: block;
	line-height: 0.16rem;
	align-self: center;
} 
</style>
