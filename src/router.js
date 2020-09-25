import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component:  () => import('./pages/home.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('./pages/about.vue')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('./pages/test.vue')
      }
    ]
  })
}
