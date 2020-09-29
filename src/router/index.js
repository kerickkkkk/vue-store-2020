import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 如果有隨意輸入path全都回login
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/test',
    component: () => import('../views/Template.vue')
  },
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontEnd/Index.vue')
      },
      {
        // 內層不用 /
        path: 'about',
        component: () => import('../views/frontEnd/About.vue')
      },
      {
        path: 'products',
        component: () => import('../views/frontEnd/Products.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/frontEnd/Cart.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'storages',
        component: () => import('../views/dashboard/Storages.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
