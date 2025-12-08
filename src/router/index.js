import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
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
      { path: 'shop', component: () => import('../views/UserCartVue.vue') },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckOut.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  { path: '/login', component: () => import('../views/LoginVue.vue') },
  {
    path: '/dashboard',
    component: () => import('../views/DashboardVue.vue'),
    children: [
      { path: 'products', component: () => import('../views/ProductsVue.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }, // catch-all
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
