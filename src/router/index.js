import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../page/Home'
import QuoteDay from '../page/QuoteDay'
import QuoteDayphoto from '../page/QuoteDayphoto'
import NumberDay from '../page/NumberDay'

Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/quoteday',
    name: 'QuoteDay',
    component: QuoteDay
  },


  {
    path: '/quotedayphoto',
    name: 'QuoteDayphoto',
    component: QuoteDayphoto
  },

  {
    path: '/numberday',
    name: 'NumberDay',
    component:NumberDay
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
