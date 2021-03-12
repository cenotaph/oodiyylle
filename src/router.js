import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start.vue'


Vue.use(Router)
const routes = [
  {
    path: '/start',
    name: 'Start',
    component: Start,
  },
  {
    path: '/undefined',
    redirect: {name: 'Start' }
  },
  {
    path: '/ysound',
    name: 'Ysound',
    component: () => import('@/components/Ysound')
  },
  {
    path: '/yword',
    name: 'Yword',
    component: () => import('@/components/Yword')
  },  
  {
    path: '/tablestory',
    name: 'Tablestory',
    component: () => import('@/components/Tablestory')
  }, 
  {
    path: '/finish',
    name: 'Finish',
    component: () => import('@/components/Finish')
  },
  {
    path: '/kiitos',
    name: 'Kiitos',
    component: () => import('@/components/Kiitos')
  }   
]

const router = new Router({
  mode: 'history',
  hash: false,
  routes: routes
})

export default router
