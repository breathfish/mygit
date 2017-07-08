<template>
	<div class="cinema">
		<div class="content">
			<header>
				<div class="line">
					<span>影院</span>
					<router-link to="/cinema/search">
					    <i class="iconfont icon-sousuo" @click="btnAction()"></i>
					</router-link>
				</div>
				<div class="line">
					<span v-if='display'>全部区域、服务</span>
					<span v-else>已选:{{word}}</span>
					<i class="iconfont icon-shaixuan" @click="sortDistrict()"></i>
				</div>
				<div class="show" v-show="show">
					<div class="show-t">
						<p>区域<input type="text" v-model="word" /></p>
						<ul>
							<li v-for="(item,index) in results" :key='index' @click="spanAction(item,index)" ><span :class="{active:bgcolor==index}">{{item}}</span></li>																				
						</ul>						
					</div>
					<div class="show-m">
						<p>服务</p>
						<span>可退费</span>
						<span>观影小食</span>
						<span>IMAX</span>
						<span>特惠影院</span>
						<span>价格最低</span>
					</div>
					<div class="show-b">						
						<span>取消</span><span @click="comfirm()">确定</span>
					</div>
				</div>
			</header>
			<div class="ban">
				<mt-swipe :auto="4000">
				  <mt-swipe-item v-for="(item,index) in arr" :key="index"><img :src=item /></mt-swipe-item>	
				</mt-swipe>
			</div>
			<ul class="list">
				<li v-for="item in cinemaArr">
					<p>{{item.name}}<span>￥{{item.minimumPrice}}起</span></p>
					<p class="address"><i>{{item.address}}</i><span>1.1km</span></p>
					<!--<p class="address"><i>{{item.labels[0].name}}</i><i>{{item.labels[2].name}}</i></p>-->
				</li>				
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	data(){
		return{
			bgcolor:-1,
			display:true,
			show:false,
			flag:true,
			word:'',
			cinemaArr:[],
			disArr:[],
			results:[],
			edArr:[],
			arr:[]
		}
	},
	methods:{
		spanAction(val,index){	
			let flag = false
			this.word = val;
			this.bgcolor = index;
			var _this = this;
			
			console.log(this.edArr)					 
			var day=this.word;
			switch (day)
			{
			case "福田区":
			 _this.cinemaArr=[]
			 _this.cinemaArr=_this.edArr[0]
			  break;
			case "龙岗区":
			  _this.cinemaArr=[]
			  _this.cinemaArr=_this.edArr[1]
			  break;
			case "宝安区":
			  _this.cinemaArr=[]
			  _this.cinemaArr=_this.edArr[2]
			  break;
			case "坪山新区":
			  _this.cinemaArr=[]
			  _this.cinemaArr=_this.edArr[3]
			  break;
			case "南山区":
			  _this.cinemaArr=[]
			  _this.cinemaArr=_this.edArr[4]
			  break;
			case "光明新区":
			  _this.cinemaArr=[]
			  _this.cinemaArr=_this.edArr[5]
			  break;
			case "龙华新区":
			  _this.cinemaArr=[]
			  _this.cinemaArr=_this.edArr[6]
			  break;
			case "罗湖区":
			   _this.cinemaArr=[]
			   _this.cinemaArr=_this.edArr[7]
			  break;
			case "盐田区":
			  _this.cinemaArr=_this.edArr[8]			  
			  break;
			} 
		},
		comfirm(){
			this.show = false;
			if(this.word){
				this.display=false;
			}else{
				this.display=true;
			}	
			
		},
		btnAction(){						
			var len = this.cinemaArr.length
			for(var i=0;i<len;i++){
				console.log(this.cinemaArr[i].district.name);
			}
		},
		sortDistrict(){
			//装不同区域数组	
			//disArr 所有电影院
			var len = this.cinemaArr.length
			for(var i=0;i<len;i++){				
				this.disArr.push(this.cinemaArr[i].district.name);				
			}
			//将所有相同区的电影院划分为数组
//			console.log(this.cinemaArr)
			
			if(this.flag){
				this.sortObj(this.cinemaArr);
				this.flag=false;
			}
					
			
			
			//results 区域分块
			//edArr 区分块后的数组[ [arr[obj]],[]]
			this.results =this.sortDis(this.disArr)
			
			this.show = true;
		},
		sortDis(str){
			return [...new Set(str)];
		},
		sortObj(varialbe){
				var temp = [];
				var result = new Array;
				temp.push(varialbe[0]);
				for (var i = 1; i<varialbe.length; i++) {			 
				  var flag = 0;			 
				  for(var j = 0; j<temp.length; j++){
				      if (varialbe[i].district.name == temp[j].district.name) {
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
					      if (varialbe[j].district.name == temp[i].district.name) {
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
					this.edArr=result;						  				
			}
			
	
	},
	created(){
		//banner图片
		let timestamp = (new Date()).getTime();
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
	  	//电影院数据
	  	this.$http.get(`/api/cinema?__t=${timestamp}`)
	  	.then(function(response){	  		
	  		that.cinemaArr = response.data.data.cinemas;	  		 		
	  	})
	  	.catch(function(error){
	  		console.log(error)
	  	})
	  	
	  	
	}
}

</script>

<style scoped>
.content{
	font-size: .16rem;
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
	bottom: .49rem;
	overflow: auto;
}
.content header{	
	width: 100%;
	height: 0.8rem;	
}
.content header div:nth-of-type(1){
	height: .4rem;
	line-height: .4rem;
}
.content header div i{
	float: right;
	padding-right: .1rem;
	font-size: .32rem;
	color: cyan;
}
.content header .line span{
	padding-left: .1rem;
}
.content header div:nth-of-type(2){
	padding-top: .03rem;
}
.content header .line:after{
	content: '';
	width: 100%;
	height: .4rem;
	position: absolute;
	left: 0;
	top: .4rem;
	/*bottom: -1px;*/
	height: 1px;
	border-bottom: 1px solid #DFDFDF;
	transform: translateY(0.5);
}
.show{
	position: absolute;
	left: 0;
	top: .8rem;
	width: 100%;
	height: 4rem;
	background: white;
	z-index: 998;
}
.show p{
	padding-left: .1rem;
}
.show .show-t{
	width: 100%;
	height: 1.9rem;
}
.show-t input{
	border: 0;
	padding-left: .1rem;
}
.show .show-m{
	position: absolute;
	left: 0;
	top: 1.9rem;
	font-size: 0;
	width: 100%;
}
.show .show-m p{
	font-size: .16rem;
}
.show-m span{
	text-align: center;
	display: inline-block;
	font-size: .12rem;
	width: 25%;
	padding: .1rem 0;
}
.show-m:before {
	content: '';
	width: 100%;
	position: absolute;
	left: 0;
	top: -1px;
	height: 1px;
	border-top: 1px solid #DFDFDF;
	transform: translateY(0.5);
}
.show-b {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
}
.show-b:before{
	content: '';
	width: 100%;
	position: absolute;
	left: 0;
	top: -1px;
	height: 1px;
	border-top: 1px solid #DFDFDF;
	transform: translateY(0.5);
}
.show .show-b span{
	text-align: center;
	display: inline-block;
	width: 50%;
	line-height: .5rem;
}

/*ul-li*/
.show ul{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;	
}
.show ul li{	
	width: 25%;
	height: 0.3rem;
	line-height: 0.3rem;
	justify-content: center;
	text-align: center;
	padding: 0.1rem 0;
}
.show ul li span{		
	padding: .02rem;
	font-size: .12rem;
	text-align: center;
	border-radius: .03rem;
	border: 1px solid #00FFFF;
}


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

/*list*/
.list li{
	width: 100%;
	height: .75rem;
	background: yellowgreen;
	margin-bottom: .1rem;
}
.list li p{
	width: 100%;
	font-size: .12rem;
	height: .25rem;
}
.list li p span{
	float: right;
}
.list li .address i{
	display: inline-block;
	font-style: normal;
	width: 80%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.active{
	background: #DFDFDF;
}
	
</style>