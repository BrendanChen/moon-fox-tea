import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/',
    component: () => import('../views/UserboardVue.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/UserProducts.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/UserProduct.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../views/UserboardVue.vue'),
    children: [
      {
        path: 'shop',
        component: () => import('../views/UserCartVue.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/LoginVue.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashboardVue.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductsVue.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
