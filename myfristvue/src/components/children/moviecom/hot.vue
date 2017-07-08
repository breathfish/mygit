<template>
	
  <div class="movie">  	    	
    	<div class="content">
    	<mt-loadmore ref="loadmore" :autoFill="false" >
    	<ul>
	    	<div class="banner">
	    			<mt-swipe :auto="4000">
					  <mt-swipe-item v-for="(item,index) in arr" :key="index"><img :src=item /></mt-swipe-item>					 
					</mt-swipe>
	    	</div>
	    	<div class="touch">
	    		<router-link to="/show">
	    		<div class="list">
	    			<div><p class="bg-color1"><i class="iconfont icon-maikefeng"></i></p></div>
	    			<div>
	    				<p>卖座演出</p>
	    				<p>折扣特惠享不停</p>
	    			</div>
	    		</div>
	    		</router-link>
	    		<router-link to="/market">
	    		<div class="list">
	    			<div><p class="bg-color2"><i class="iconfont icon-shangcheng"></i></p></div>
	    			<div>
	    				<p>周边好货</p>
	    				<p>全场包邮￥9.9起</p>
	    			</div>
	    		</div>
	    		</router-link>
	    		<router-link to="/market">
	    		<div class="list" >
	    			<div><p class="bg-color3"><i class="iconfont icon-icon_shiyanshi"></i></p></div>
	    			<div>
	    				<p>电影实验室</p>
	    				<p>让你大开眼界</p>
	    			</div>
	    		</div>
	    		</router-link>
	    		<router-link to="/market">
	    		<div class="list">
	    			<div><p class="bg-color4"><i class="iconfont icon-youhuijuan"></i></p></div>
	    			<div>
	    				<p>福利大放送</p>
	    				<p>免费电影卷天天领</p>
	    			</div>
	    		</div>
	    		</router-link>
	    	</div>
	    	<div class="bottom">
	    		<div></div>
	    		<div class="second">
	    			<p>蛙蛙在线</p>
	    			<p>免费领16张电影票</p>
	    			<p>活动时间</p>
	    		</div>
	    	</div>	    	
	    	<div class="bottom">
	    		<div></div>
	    		<div class="second">
	    			<p>浙商银行</p>
	    			<p>1元看电影</p>
	    			<p>活动时间</p>
	    		</div>
	    	</div>
	    </ul>
    	</mt-loadmore>
   		</div>    
  </div>
</template>
<script>	
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//Vue.use(InfiniteScroll);
export default {
  name: 'hello',
	  data () {
	    return {	    		    		    		    		    	
	      	arr: []
	    }
	  },
	  methods:{
	  	
	  },
	  created(){		  		
	  		var that = this;
	  		let timestamp =(new Date()).getTime();
			this.$http.get(`/api/billboard/home?__t=${timestamp}`)
		  	.then(function(response){		  					  	
			  		let nArr = response.data.data.billboards			  		
			  		for(let i=0;i<nArr.length;i++){
			  				let obj = nArr[i];			  				
			  				that.arr.push(obj.imageUrl)								
			  		}
		  	})
		  	.catch(function(error){
		  		console.log(error)
		  	});	
	  }

}
</script>


<style scoped>


/*mint swiper*/
.mint-swipe{
	font-size: 0.16rem;
	width: 100%;
	height: 1.5rem;
	background: blueviolet;
}
.mint-swipe img{
	 width: 100%;
	 height: 1.5rem;
}
/*ul内容区*/
.content{
	position: absolute;
	width: 100%;			
	top: 0.88rem;
	bottom: 0.49rem;
	left: 0;
	font-size: 0.16rem;
	background: #fcfcfc;
	overflow: auto;	
}
.touch{
	margin: 0.1rem 0.1rem 0 0.1rem;
	height: 1.6rem;
	border-bottom: 1px solid red;
}
.touch>a {
	display: block;
	float: left;
	width: 50%;
	height: 0.8rem;
}
.touch>div{
	float: left;
	width: 50%;
	height: 0.8rem;
}
.touch .list div:nth-of-type(1){
	float: left;
	width: 25%;
	height: 0.8rem;	
	text-align: center;
}
.touch .list div:nth-of-type(1) p{
	display: block;	
	border-radius: 50%;
	width: 0.4rem;
	height: 0.4rem;		
}
.touch .list .bg-color1{
	background: pink;
	color: orange;	
}
.touch .list .bg-color2{
	background: pink;
	color: red;	
}
.touch .list .bg-color3{
	background: pink;
	color: blueviolet;	
}
.touch .list .bg-color4{
	background: pink;
	color: green;	
}
.touch .list div:nth-of-type(1) i{	
	height: 0.3rem;
	width: 0.3rem;
	line-height: 0.4rem;	
	font-size: 0.32rem!important;
}

.touch .list div:nth-of-type(2){
	float: left;
	width: 75%;
	height: 0.8rem;
}
.touch .list p:nth-of-type(1){
	font-size: 0.16rem;
	margin-top: 0.16rem;
}
.touch .list p:nth-of-type(2){
	font-size: 0.12rem;
	margin-top: 0.08rem;
}

/*bottom*/
.bottom{	
	height: 1.0rem;
	width: 100%;
	position: relative;	
}
.bottom div:nth-of-type(1){
	float: left;
	width: 25%;
	height: 1rem;
	background: green;
}
.bottom .second{
	float: left;
	/*box-sizing: border-box;*/
	margin: 0.1rem ;
	width: 65%;
	height: 0.8rem;	
}
.bottom .second p:nth-of-type(2){
	line-height: 0.32rem;
}
.bottom .second p:nth-of-type(3){
	padding-top: 0.06rem;
	color: orange;
}
.bottom .second:after{
	content: '';
	width: 72%;
	position: absolute;
	left: 25%;
	bottom: -1px;
	height: 1px;
	border-bottom: 1px solid red;
	/*transform: translateY(0.5);*/
}
.bottom div:nth-of-type(2) p:nth-of-type(2){
	font-size: 0.12rem;
	color: #DFDFDF;
}
.bottom div:nth-of-type(2) p:nth-of-type(3){
	font-size: 0.12rem;
}

</style>

