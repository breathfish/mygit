<template>
<div id="search">
	<div class="top">
		<div class="sea-top">
			<i class="iconfont icon-sousuo"></i>
			<input type="text" placeholder="输入影院关键字或首字母拼音" />			
		</div>
		<span>取消</span>
	</div>
	
</div>
	
</template>

<script>
</script>

<style scoped>
#search{
	position: absolute;
	width: 100%;
	height: 100%;
	background: red;
	left: 0;
	top: 0;
	bottom: .49rem;
	z-index: 999;
}
#search .top{	
	height: .5rem;
	width: 100%;
	background: yellow;
	overflow: hidden;
}
#search .top div{
	width: 80%;
	height: .32rem;
	background: blue;
	border-radius: .15rem;
	margin-left: .1rem;
	margin-top: .09rem;
}
#search .top div input{	
	font-size: .12rem;
}	
	
</style>