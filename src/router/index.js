import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import Comments from '@/components/comments/comments'
import Business from '@/components/business/business'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods',
    },{
      path: '/goods',
      component: Goods,
    },{
      path: '/comments',
      component: Comments,
    },{
      path: '/business',
      component: Business,
    }
  ]
})
