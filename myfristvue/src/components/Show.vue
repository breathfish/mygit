<template>
	<div id="show">
		<header>演出票务</header>
		<ul class="content">
			<li v-for="item in arr[0]">
				<div @click='btnAction()'><img :src=item.skuList[0].image /></div>
				<p class="tit">{{item.masterName}}</p>
			</li>
			<p class="bot">已经到底了</p>
		</ul>
		
	</div>
</template>

<script>
export default {
	data(){
		return {
			msg:'111',
			arr:[]
		}
	},
	methods:{
		btnAction(){
			console.log(this.arr)			
		}
	},
	created(){
		var that = this;
		let data = new Date();
		let timestamp = data.getTime();
		console.log(timestamp);
		this.$http.get(`/schedule?__t=${timestamp}&pageSize=9&pageNumber=1`)
	  	.then(function(response){		  					  	
//		  		let nArr = response.data.data.billboards			  		
//		  		for(let i=0;i<nArr.length;i++){
//		  				let obj = nArr[i];			  				
//		  				that.arr.push(obj.imageUrl)								
//		  		}			
			that.arr.push(response.data.data.list)
	  	})
	  	.catch(function(error){
	  		console.log(error)
	  	});
	}
}

</script>

<style>
header{
	position: relative;
	width: 100%;
	height: .5rem;
	line-height: .5rem;
	padding-left: .15rem;
	background: yellow;	
	font-size: .16rem;
}
header:after{
	content: '';
	position: absolute;
	left: 0;
	bottom: -1px;
	height: 1px;
	border-bottom: 1px solid #DFDFDF;
	width: 100%;
	transform: translateY(0.5);
}
.content{
	position: absolute;
	left: 0;
	top: .5rem;
	bottom: .49rem;
	overflow: auto;
	font-size: .12rem;
	background: #DFDFDF;
	width: 100%;
}
ul li {
	box-sizing: border-box;
	padding: .1rem;
	width: 100%;
	font-size: .12rem;
	background: white;
	margin-bottom: .1rem;
}
ul li .tit{
	width: 100%;
	height: .5rem;
	/*background: blue;*/
}
ul li div{
	background: red;
	height: 2rem;
}
ul li div img{
	height: 2rem;
}

.bot{
	width: 100%;
	height: .5rem;
	line-height: .5rem;
	text-align: center;
}

</style>