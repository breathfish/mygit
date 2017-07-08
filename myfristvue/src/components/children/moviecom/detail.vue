<template>
	<transition name="slide">
	<div id="detail" >
		<div class="content"  v-for="item in nArr">
		<div class="header">
			<img :src=item.cover.origin />
		</div>
		<transition name="fade">
		<div class="header-top" :class="{ active: isActive }" >			
			<span @click="goBack">&lt;</span>			
			<span><i class="iconfont icon-sousuo"></i>预告片<i class="iconfont icon-qiapian"></i>剧照</span>
		</div>
		</transition>
		<div class="title">
			<h3>{{nArr[0].name}}</h3>
			<p><span>{{nArr[0].category}}</span><span>1小时46分</span><span>{{nArr[0].nation}}</span><i>{{nArr[0].grade}}</i></p>
		</div>
		<div class="intro">{{nArr[0].synopsis}}</div>
		<div class="actors">
			<div class="list">
				<div></div>
				<!--<p>{{nArr[0].actors[0].name}}</p>-->
				<p>夏天</p>
			</div>
			<div class="list">
				<div></div>
				<!--<p>{{nArr[0].actors[1].name}}</p>-->
				<p>夏天</p>
			</div>
			<div class="list">
				<div></div>
				<!--<p>{{nArr[0].actors[2].name}}</p>-->
				<p>夏天</p>
			</div>
			<div class="list">
				<div></div>
				<!--<p>{{nArr[0].actors[3].name}}</p>-->
				<p>夏天</p>
			</div>
		</div>
		<p class="bar"><span></span>影讯</p>
		<div class="file-tel">
			<div><img :src=item.cover.origin /></div>
			<p>{{nArr[0].intro}}</p>
		</div>
		<p class="bar"><span></span>评论</p>
		<ul>
			<li class="view">
				<div>
					<span></span>
				</div>
				<div></div>
			</li>
			<li class="view">
				<div></div>
				<div></div>
			</li>
		</ul>
		</div>
		<div class="footer">
			<div>
				<i class="iconfont icon-sousuo"></i>
				<i class="iconfont icon-wujiaoxing-copy"></i>
				<i class="iconfont icon-youhuijuan"></i>				
			</div>
			<div>立即购票</div>
		</div>
		<div class="no-active"></div>
	</div>
	</transition>
</template>

<script>
import Vue from 'vue'
import router from '../../../router'
import Bus from '../../../event.js'
export default {
	data(){
		return {
			id:'',
			isActive:false,
			scrolled:0,
			nArr:[]
		}
	},
	props:{
		listData:Object,
	},
	methods:{
		goBack(){
			router.go(-1);
//			console.log(this.nArr);
		},
		handleScroll () {
		    this.scrolled = window.scrollY;
		    if(this.scrolled>160){
		    	console.log(11111)
		    	this.isActive= true;
		    }else{
		    	this.isActive= false;
		    }
		}
	},
	created(){
		this.id = this.$route.params.id;
		let vid = this.$route.params.id;
		//filmPic
		var _this = this;
		let timestamp=(new Date()).getTime();
		this.$http.get(`/api/film/${vid}?__t=${timestamp}`)
	  	.then(function(response){
	  		  _this.nArr.push(response.data.data.film);
	  	})
	  	.catch(function(error){
	  		console.log(error)
	  	});
	},
	mounted(){
		 window.addEventListener('scroll', this.handleScroll);
	}
}
	
	
	
</script>

<style scoped>
#detail{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: white;
	z-index: 998;
	font-size: 16px;
	
}

#detail .header{
	width:100%;
	height: 2.5rem;
	background: yellow;
}
#detail .header img{
	width:100%;
	height: 2.5rem;
	background: yellow;
}
#detail .active.header-top{
	background: white;
	color: black;
}
.active.v-enter{  
   from{opacity:0;}
	to{opacity:1;}
}
.active.v-leave{  
   from{opacity:1;}
	to{opacity:0;}
}

#detail .header-top{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height:0.5rem;
	color: white;
	background: transparent;
	z-index: 998;
}
.header-top span:nth-of-type(1){
	font-size: .28rem;
	line-height: 0.5rem;
	margin-left: 0.15rem;
}
 .header-top span:nth-of-type(2){
	position: absolute;
	right: 0.15rem;
	line-height: 0.5rem;
}
.header-top span:nth-of-type(2) i{
	margin-left: 0.25rem;	
	/*font-size: 0.24rem;*/
}
.title {
	position: absolute;
	left: .2rem;
	top: 1.8rem;
	color: white;	
	width: 100%;
}
.title h3{
	padding-bottom: 0.1rem;
}
.title p span {
	display: inline-block;
	font-size: 0.1rem;
	margin: 0 0.03rem;
	border: 1px solid #dfdfdf;
	border-radius: 3px;
	padding: .02rem;
	color: #DDDDDD;
}
.title p i{
	position: absolute;
	font-style: normal;
	right: 0.3rem;
	color: orange;
}
.intro {
	padding: .05rem;
	box-sizing: border-box;
	margin:0.2rem 0.1rem;
	border: 1px solid #DFDFDF;
	height: 0.8rem;
	font-size: .12rem;
	background: yellow;
	border-radius: 0.05rem;
	line-height: .18rem;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
}
#detail .actors{
	display: flex;
	width: 100%;
	height: 1.0rem;
	background: blueviolet;
}
#detail .actors>div{
	background: yellow;
	flex: 1;
}
#detail .actors .list{
	flex-direction: column;
	text-align: center;
}
#detail .actors .list div{
	display: inline-block;
	width: 0.6rem;
	height: 0.6rem;
	border-radius: 50%;
	background: greenyellow;
}
#detail .actors .list p{
	text-align: center;
	width: 100%;
	height: 0.18rem;	
	font-size: 0.12rem;
}
.file-tel{
	margin: 0.2rem 0.1rem;
	box-sizing: border-box;
	
}
.file-tel div{
	width: 100%;
	height: 1.6rem;
	background: #DFDFDF;
}
.file-tel div img{
	width: 100%;
	height: 1.6rem;
}

.bar{
	font-size: 0.12rem;
	margin-left: 0.1rem;
	line-height: 0.16rem;
}
.bar span {
	vertical-align: bottom;
	display: inline-block;
	width: 0.03rem;
	height: 0.16rem;
	background: orangered;
}
ul .view{	
	height: 0.8rem;
	margin: 0.2rem 0.1rem;
	box-sizing: border-box;
	background: red;
}
ul .view div:nth-of-type(1){
	display: flex;
	width: 0.8rem;
	height: 100%;
	background: yellow;
	justify-content: center;
}
ul .view div:nth-of-type(1) span{
	display: block;
	width: 0.6rem;
	height: 0.6rem;
	border-radius: 50%;
	background: cyan;
}

.footer{
	position: fixed;
	left: 0;
	bottom: 0;
	background: orange;
	width: 100%;
	height: 0.49rem;
}
.footer div:nth-of-type(1){
	float: left;
	height: .49rem;
}
.footer div:nth-of-type(1) i{
	font-size: 0.32rem;
	line-height: .49rem;
}
.footer div:nth-of-type(2){
	float: right;
	line-height: .49rem;
	color: white;
	padding: 0 .2rem;
	background: orangered;
}
.no-active{
	width: 100%;
	height: 0.49rem;
}
/*动画*/
@keyframes slide-enter{
	from{transform: translateX(100%);}
	to{transform: translateX(0%);}
}
@keyframes slide-leave{
	from{transform: translateX(0%);}
	to{transform: translateX(100%);}
}
.slide-enter-active {
  animation: slide-enter .5s ease-in;
}
.slide-leave-active {
  animation: slide-leave .5s ease-in;
}

/*opacity*/
@keyframes fade-enter{
	0%{opacity: 0;}
	20%{opacity: 0.2;}
	40%{opacity: 0.4;}
	60%{opacity: 0.6;}
	100%{opacity: 1;}
}
@keyframes fade-leave{
	0%{opacity: 1;}
	20%{opacity: 0.6;}
	40%{opacity: 0.4;}
	60%{opacity: 0.2;}
	100%{opacity: 0;}
}
.fade-enter-active {
  animation: fade-enter .5s ease-in;
}
.fade-leave-active {
  animation: fade-leave .5s ease-in;
}


</style>