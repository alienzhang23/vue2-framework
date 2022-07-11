import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
/* 按需加载 */
// const Framework = r => require.ensure([], () => r(require('@/views/framework.vue')), 'chunkname2');
const Framework = r => require.ensure([], () => r(require('@/layout/index.vue')), 'chunkname2');
const routes = [
  {
    path: '/', component: Framework, hidden: true, redirect: '/index',
    children: [{
      path: '/index',
      name: 'Home',
      component: Home,
      meta: {
        affix: true,
        title: "首页"
      }
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
      meta: {
        title: "关于"
      }
    },
    {
      path: '/page1',
      name: 'Page1',

      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ '../views/page1.vue'),
      meta: {
        title: "page1"
      }
    },
    {
      path: '/page2',
      name: 'Page2',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ '../views/page2.vue'),
      meta: {
        title: "page2"
      }
    },
    {
      path: '/page3',
      name: 'Page3',
      component: () => import( /* webpackChunkName: "about" */ '../views/page3.vue'),
      meta: {
        title: "page3"
      }
    }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },


]

const router = new VueRouter({
  routes
})

export default router