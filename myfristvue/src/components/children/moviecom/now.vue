<template>
  <div>
  <div class="movie"> 		
    	<div class="content">
    	<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" :autoFill="false" :bottom-all-loaded="!allLoaded">
    	<ul>
	    	<div class="banner">
	    			<mt-swipe :auto="4000">
					  	<mt-swipe-item v-for="(item,index) in arr" :key="index"><img :src=item /></mt-swipe-item>					 
						</mt-swipe>
	    	</div>
	    	<router-link to="/movie/detail">
    		<li v-for="item in listData" @click.stop.prevent="findRouter(item.id)">
    			<div><img :src=item.poster.origin /></div>    			
    			<div class="list">
    				<p>{{item.name}}<span>{{item.grade}}</span></p>
    				<p>{{item.intro}}</p>
    				<p>{{item.cinemaCount}}影院正在上映</p>
    				<p><span>购票立减7.2元</span>首两张特惠</p>
    				<p><span>资讯</span>{{pages}}</p>
    			</div>
    		</li>
    		</router-link>
    	</ul>
    	<p v-show="!allLoaded" class="tips"><span>没有数据了,别扯了!</span></p>
    	</mt-loadmore>
   		</div>
  </div>  
 </div>
</template>
<script>
import Vue from 'vue'
import Bus from '../../../event.js'
import router from '../../../router'
import { Swipe, SwipeItem,InfiniteScroll,  Loadmore } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
//Vue.use(InfiniteScroll);
export default {
  name: 'movie',
	  data () {
	    return {	    	
	    	allLoaded: true,	    		    	
	    	listData:[],
	    	pages:1,
	      arr: []
	    }
	  },	 
	  methods:{
	  		findRouter(id){	  			  				
	  				router.push('/movie/detail/'+id);
	  		},
	  		loadTop(){
	  			console.log("下拉加载.....")
	  			console.log(this.listData)
	  			clearTimeout(timer);
	  			let timer = setTimeout(()=>{
	  				this.$refs.loadmore.onTopLoaded();
	  			},1000)	  			
	  		},
	  		loadBottom(){	  			
	  			console.log("上拉加载更多.......")
//	  			this.$refs.loadmore.onBottomLoaded();
					const data = this.pages++;					
	  			let that = this;	  			
		  		let timestamp = (new Date()).getTime();
	  			if(this.pages<=6){	  					  					  			
	  			clearTimeout(timer);
	  			var timer=setTimeout(()=>{	  					
	  					that.$http.get(`/api/film/now-playing?__t=${timestamp}&page=${that.pages}&count=5`)
					  	.then(function(response){						  			
					  			let obj = response.data.data.films;
					  			for(let i=0;i<obj.length;i++){
					  					that.listData.push(obj[i]);
					  			}
					  	})
					  	.catch(function(error){						  							  			
					  			console.log(error)
					  	})
					  	this.$refs.loadmore.onBottomLoaded();
	  			},1000);
	  			}else{
	  				this.$refs.loadmore.onBottomLoaded();
	  				this.allLoaded=false;
	  				clearTimeout(timer);
	  				var timer=setTimeout(()=>{
	  					this.allLoaded = true;
	  				},2000)
	  			}	  			
	  		}
	  },
	  created(){
	  	//banner图片
	  	let data = new Date();
		  let timestamp = data.getTime();
	  	var that = this;
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
		  	
		  	//抓取list数据	
		  	
		  	this.$http.get(`/api/film/now-playing?__t=${timestamp}&page=1&count=5`)
		  	.then(function(response){		  				  			
		  			let obj = response.data.data.films;
		  			for(let i=0;i<obj.length;i++){
		  					that.listData.push(obj[i]);
		  			}
		  	})
		  	.catch(function(error){
		  			console.log(error)
		  	}) 
				
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
ul li{
	font-size: 0;
	height: 1.2rem;
	position: relative;
}
ul li:after{
	content: '';
	position: absolute;
	left: 0;
	bottom: -1px;
	height: 1px;
	width: 100%;
	border-bottom: 1px solid #DDD;
	transform: translateY(0.5);
}
ul li div:nth-of-type(1){
	display: inline-block;
	width: 20%;
	height: 1.2rem;	
}

ul li img{
	display: inline-block;
	width: 0.6rem;
	height: 0.8rem;
	vertical-align: top;
	padding: 0.1rem 0 0 .15rem;
}
ul li .list{	
	vertical-align: top;
	display: inline-block;
	box-sizing: border-box;
	width: 80%;
	height: 1.2rem;
	/*background: cyan;*/
}
ul li .list p{
	height: 0.20rem;
	font-size: 0.12rem;
	padding:0.02rem 0 0 0.1rem;
	width: 80%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
ul li .list p:nth-of-type(1){
	padding-top: 0.05rem;
	height: 0.20rem;
	font-size: 0.16rem;
}
ul li .list p:nth-of-type(1) span{
	position: absolute;
	right: 0.2rem;
	height: 0.20rem;
	font-size: 0.16rem;
	color: #e0733a;
}
ul li .list p:nth-of-type(2){
	color: #666666;
}
ul li .list p:nth-of-type(3){
	color:#DDDDDD;
}
ul li .list p:nth-of-type(4) span, ul li .list p:nth-of-type(5) span{
	border-radius: 2px;
	height: 0.24rem;
	padding: 0.01rem;
	border: 1px solid #e0733a;
	color: #e0733a;
	font-size: 0.08rem!important;
}

/*tips*/
.tips{
	line-height: 0.5rem;
	font-size: .12rem;
	text-align: center;
}
.tips span{
	border-radius: 0.03rem;
	color: #e0733a;
	border: 1px solid #e0733a;
	padding: 0.02rem;
}
</style>

