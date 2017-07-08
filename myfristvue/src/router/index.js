import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/components/Movie'
import Detail from '@/components/children/moviecom/detail.vue'
import Cinema from '@/components/Cinema'
import Search from '@/components/children/cinemacom/search.vue'
import Market from '@/components/Market'
import Me from '@/components/Me'
import Show from '@/components/Show'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Movie},
    {path: '/movie',component: Movie,
    	children:[{path:'detail/:id',component: Detail}]
    },
    {path: '/cinema',component: Cinema,
    	children:[{path:'search/',component: Search}]
    },
    {path: '/show',component: Show},
    {path: '/market',component: Market},
    {path: '/me',component: Me}
      
      
      
    
  ]
})
