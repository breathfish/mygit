<template>
	
  <div class="movie">  	    	
    	<div class="content">
    	<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" :autoFill="false" :bottom-all-loaded="!allLoaded">
    	<ul>
	    	<div class="banner">
	    			<mt-swipe :auto="4000">
					  <mt-swipe-item v-for="(item,index) in arr" :key="index"><img :src=item /></mt-swipe-item>					 
					</mt-swipe>
	    	</div>
	    	<div v-for="(item,index) in results" :key="index">
	    	<p class="board">{{((new Date(spanVal[index])).getMonth()+1)+'月'+(new Date(spanVal[index])).getDate()+'日'}}</p>
    		<li v-for="(item,index) in results[index]" :key="index" @click.stop.prevent="findRouter(item.id)">
    			<div><img :src=item.poster.origin /></div>      			
    			<div class="list">
    				<p>{{item.name}}</p>
    				<p>{{item.intro}}</p>
    				<p>上映日期：{{(new Date(item.premiereAt)).getFullYear()+"-0"+((new Date(item.premiereAt)).getMonth()+1)+'-'+(new Date(item.premiereAt)).getDate()}}</p>    				
    				<p><span>资讯</span>{{pages}}</p>
    			</div>
    		</li>
    		</div>
    	</ul>
    	<p v-show="!allLoaded" class="tips"><span>没有数据了,别扯了!</span></p>
    	</mt-loadmore>
   		</div>    
  </div>
</template>
<script>	
import Vue from 'vue'
import { Swipe, SwipeItem,InfiniteScroll,  Loadmore } from 'mint-ui';
import router from '../../../router'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
//Vue.use(InfiniteScroll);
export default {
  name: 'hello',
	  data () {
	    return {
	    	name:'',
	    	allLoaded: true,	    		    	
	    	listData:[],
	    	results:[],
	    	pages:1,
	      	arr: []
	    }
	  },
	  computed:{
	  		spanVal(){
	  			var arr_n=[];
	  			var arr_m = ['一','二','三','四','五','六','日']
	  			this.results.map(function(item,index){
	  				var n = item[0].premiereAt
					arr_n.push(n)	  				
	  			})
	  			return arr_n;
	  			
	  		}
	  	
	  },
	  methods:{	
	  		findRouter(id){
	  				console.log(11111)
	  				console.log(this.results)	  				
	  				router.push('/movie/detail/'+id);
	  		},
	  		loadTop(){
	  			console.log("下拉加载.....")
	  			clearTimeout(timer);
	  			let timer = setTimeout(()=>{
	  				this.$refs.loadmore.onTopLoaded();
	  			},1000)
	  			console.log('aaaaaaaaaa')
	  			console.log(this.results)
	  		},
	  		loadBottom(){	  			
	  			console.log("上拉加载更多.......")
//	  			this.$refs.loadmore.onBottomLoaded();
				const data = this.pages++;					
	  			let that = this;
	  			if(this.pages<=6){	  					  				
	  			let timestamp = (new Date()).getTime();
	  			clearTimeout(timer);
	  			var timer=setTimeout(()=>{	  					
	  					that.$http.get(`/api/film/coming-soon?__t=${timestamp}&page=${that.pages}&count=5`)
					  	.then(function(response){						  			
					  			let obj = response.data.data.films;
					  			console.log(response.data.data.films)
					  			for(let i=0;i<obj.length;i++){
					  					that.listData.push(obj[i]);
					  			}
					  			that.sortObj(that.listData)					  			
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
	  			
	  		},
	  		sortObj(varialbe){
				var temp = [];
				var result = new Array;
				temp.push(varialbe[0]);
				for (var i = 1; i<varialbe.length; i++) {			 
				  var flag = 0;			 
				  for(var j = 0; j<temp.length; j++){
				      if (varialbe[i].premiereAt == temp[j].premiereAt) {
				       flag = 1;
				       break;
				      }
				  }			 
				  if (flag == 0) {
				    temp.push(varialbe[i]);
				  }				 
				}			 
				for (var i = 0; i<temp.length; i++){			 
				  var array1 = new Array;
				  var array2 = [];
				  var count = 0;			   
					  for(var j = 0; j<varialbe.length; j++){
					      if (varialbe[j].premiereAt == temp[i].premiereAt) {
					       array1.push(varialbe[j]);
					       count++;
					      }
					  }
					  if (count>1) {
					  result.push(array1);}
					  else{
					   array2.push(temp[i])
					   result.push(array2); 
					  }				 
				}						
					this.results=result;					
	  				
			} 
				
	  },
	  created(){		  		
	  		var that = this;
	  		let timestamp = (new Date()).getTime();
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
		  	this.$http.get(`/api/film/coming-soon?__t=${timestamp}&page=1&count=5`)
		  	.then(function(response){		  				  			
		  			let obj = response.data.data.films;
		  			for(let i=0;i<obj.length;i++){
		  					that.listData.push(obj[i]);
		  			}
		  			that.sortObj(that.listData)
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
.board{
	width: 100%;
	line-height: 0.5rem;
	height: 0.5rem;
	padding-left: 0.2rem;
	background: #DDD;
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

