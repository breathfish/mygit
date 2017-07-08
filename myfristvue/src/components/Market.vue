<template>	
	<div id="market">
		<div class="market-h"><div>商城</div><i class="iconfont icon-sousuo"></i></div>
		<div class="content">
			<div class="banner">
	    			<mt-swipe :auto="4000">
				  		<mt-swipe-item v-for="(item,index) in banner" :key="index"><img :src=item.imageSrc /></mt-swipe-item>					 				  							 
					</mt-swipe>
	    	</div>
	    	<ul class="list">
	    		<li v-for="(item,index) in listArr" :key="index">
	    			<div><img :src=item.imageSrc key="index"/></div>
	    			<p>{{item.name}}</p>
	    		</li>	    		
	    	</ul>
	    	<div class="top" >
	    		<div v-for="item in topArr"><img :src=item.imageSrc /></div>	    		
	    	</div>
	    	<div class="phone">
	    		<p>-有品专区-</p>
	    		<div class="phone-l"><img :src=this.phoneArr[0] /></div>
	    		<div class="phone-r">
	    			<div><img :src=this.phoneArr[1] /></div>
	    			<div><img :src=this.phoneArr[2] /></div>
	    		</div>
	    	</div>
	    	<div class="listgood" v-for="(item,index) in listGood" :key="index">
	    		<div class="listImg"><img :src=item.imageSrc /></div>
	    		<ul>
	    			<li v-for="(arr,i) in item.products">
	    				<div><img :src=arr.image /></div>
	    				<p>{{arr.name}}</p>
	    				<p>￥{{(arr.price/100).toFixed(2)}}</p>
	    			</li>
	    			<li class="box">
	    				<div>全部</div>
	    			</li>
	    		</ul>
	    	</div>
	    	<div class="selectgood">
	    		<p>-好货精选-</p>
	    		<div class="pic" v-for="(item,index) in selectGood[0]">
	    			<img :src=item.skuList[0].image />
	    			<p>{{item.masterName}}</p>
	    			<p><span>￥129.00</span><span>已销售{{item.displaySalesCount}}</span></p>
	    		</div>
	    		
	    	</div>
	    	
		</div>
	</div>
	
</template>

<script>
export default{
	data(){
		return {			
			listData:[],
			banner:[],
			topArr:[],
			phoneArr:[],
			listGood:[],
			liGood:[],
			selectGood:[],
			listArr:[]
		}
	},
	methods:{
		btnAction(){
			document.addEventListener("plusready",onplusReady,false);
			function onPlusReady(){
				var cmr = plus.camera.getCamera();
				var res = cmr.supportedImageResolutions[0];
				var fmt = cmr.supportedImageFormats[0];
				cmr.captureImage( function( path ){
						alert( "Capture image success: " + path );  
					},
					function( error ) {
						alert( "Capture image failed: " + error.message );
					},
					{resolution:res,format:fmt}
				);
			}
			
		}
	},
	created(){
		//抓取list数据
		let _this = this;
	  	this.$http.get('/ad/list')
	  	.then(function(response){		  				  			
	  		console.log(response.data.data)
	  		_this.listData=response.data.data;
	  		let len = response.data.data.length
	  		for(var i=0;i<8;i++){
	  			_this.listArr.push(response.data.data[i])
	  		}
	  		for(var i=8;i<11;i++){
	  			_this.banner.push(response.data.data[i]);
	  		}
	  		for(var i=11;i<13;i++){
	  			_this.topArr.push(response.data.data[i]);
	  		}
	  		for(var i=13;i<16;i++){
	  			_this.phoneArr.push(response.data.data[i].imageSrc);
	  		}
	  		for(var i=16;i<22;i++){
	  			//小黄人
	  			_this.listGood.push(response.data.data[i]);
	  			_this.liGood.push(response.data.data[i].products);
	  		}
//	  		console.log(_this.listGood)	
	  		
	  		console.log(_this.liGood)	  		
	  	})
	  	.catch(function(error){
	  			console.log(error)
	  	}) 
	  	
	  	//http://aura.maizuo.com/api/recommend/home?page=1&num=20
	  	this.$http.get('/recommend/home?page=1&num=20')
	  	.then(function(response){
	  		console.log(22222)	
	  		console.log(response)
	  		_this.selectGood.push(response.data.data.list);
	  		console.log(_this.selectGood)
	  	})
	  	.catch(function(error){
	  		console.log(error)
	  	})
	  	
	}
}
</script>

<style scoped>
#market{
	position: absolute;
	left: 0;
	top: 0;
	bottom: .49rem;
	width: 100%;
}
#market .market-h{
	width: 100%;
	height: .5rem;
	background: yellow;
	/*overflow: hidden;*/
}
#market .market-h div {
	float: left;
	left: .1rem;
	display: inline-block;
	font-size: .16rem;
	line-height: .5rem;
	padding-left: .1rem;
}
#market .market-h i{	
	float: right;
	padding-right: .1rem;
	line-height: .5rem;
	font-size: .32rem;
}

/*banner*/
.banner{
	width: 100%;
	height: 1.5rem;
}
.banner img{
	width: 100%;
	height: 1.5rem;
}
.list{
	display: flex;
	flex-wrap: wrap;
	height: 1.6rem;
	width: 100%;
	background: white;
	font-size: .12rem;
	padding-top: .15rem;	
}
.list li{	
	width: 25%;
	height: .8rem;
	text-align: center;	
}
.list li div{
	margin: 0 auto;		
	width: .5rem;
	height: .5rem;

}
.list li div img{
	width: .5rem;
	height: .5rem;
}
.content{
	position: absolute;
	background: #DFDFDF;
	left: 0;
	top: .5rem;
	bottom: 0;
	width: 100%;
	overflow: auto;	
}
.content .top{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	background: white;
	margin-top: .1rem;
}
.content .top div{
	width: 45%;
	height: 1rem;
	padding: .1rem 0;	
}
.content .top div img{
	width: 100%;
	height: 1rem;	
}
.phone{
	margin-top: .1rem;
	font-size: .12rem;
	background: white;
	overflow: hidden;
}
.phone p{
	width: 100%;
	height: .4rem;
	line-height: .4rem;
	text-align: center;
	letter-spacing: .01rem;
}
.phone>div{
	height: 1.5rem;
	width: 46%;
}
.phone div:nth-of-type(1) img{
	height: 1.5rem;
	width: 100%;	
}
.phone-l{
	float: left;
	margin-left: .1rem;
	margin-bottom: .1rem;
}
.phone-r{
	float: right;
	margin-right: .1rem;
	margin-bottom: .1rem;
}
.phone-r div{
	height: .7rem;
}
.phone-r div:nth-of-type(1) img{
	width: 100%;
	height: .7rem;
	
}
.phone-r div:nth-of-type(2) img{
	width: 80%;
	height: .7rem;
	margin-top: .1rem;
}
/*listgood*/
.listgood{
	box-sizing: border-box;
	padding: .1rem;
	width: 100%;
	height: 2.1rem;
	background: white;
	margin-top: .1rem;
}
.listgood .listImg{
	width: 100%;
	height: .8rem;
}
.listgood .listImg img{
	width: 100%;
	height: .8rem;
}
.listgood ul{
	font-size: 0;
	width: 100%;
	height: 1rem;
	overflow: hidden;
	white-space: nowrap;
	overflow-x: scroll;	
}
.listgood ul li{
	vertical-align: top;
	width: 25%;
	height: 1rem;
	font-size: .12rem;
	display: inline-block;
	background: white;
	/*text-align: center;*/
}
.listgood ul .box div{
	border-radius: 50%;
	border: 1px solid #DFDFDF;
	margin-top: .2rem;
	text-align: center;
	line-height: .6rem;
	color: #DFDFDF;
}
.listgood ul li p{
	width: 80%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.listgood ul li p:nth-of-type(2){
	color: orange;
}
.listgood ul li div{
	margin: 0 auto;
	width: 0.6rem;
	height: .6rem;
}
.listgood ul li div img{
	width: 0.6rem;
	height: .6rem;
}



/**/
.selectgood {
	font-size: 0;

}
.selectgood p{
	font-size: .12rem;
	width: 100%;
	height: .4rem;
	line-height: .4rem;
	text-align: center;
	letter-spacing: .01rem;
}
.selectgood .pic{
	display: inline-block;
	width: 48%;
	height: 2rem;
	background: white;
	margin:0 1%;
	margin-bottom: .1rem;
}
.selectgood .pic img{
	width: 100%;
	height: 1.5rem;
}
.selectgood .pic p{
	width: 100%;
	height: .25rem;
	line-height: .25rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: .12rem;
	padding-left: .1rem;
}
.selectgood .pic p span:nth-of-type(1){
	float: left;
	padding-left: .1rem;
}





</style>