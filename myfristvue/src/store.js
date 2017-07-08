import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//banner图片
const bannerModule = {
	namespaced:true,
	state: {
		hotpic:[],
		willpic:[],
		activepic:[]
	},
	mutations: {
		storePic(state){
			console.log("mutations 被触发")
		}
	},
	actions:{
		getPic(context){
			
		  	context.commit('storePic')
		}
	}
}



export default new Vue.store(
	{
		state:{
			name:''
		},
		modules: {
			'banner':bannerModule
		}
		
	}
)
