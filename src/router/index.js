import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/goodsDetail',
      name: 'GoodsDetail',
      component: () => import('../views/GoodsDetail.vue'),
    },
    {
      path: '/personalCenter',
      name: 'PersonalCenter',
      component: () => import('../views/PersonalCenter.vue'),
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component: () => import('../views/OrderList.vue'),
    },
    {
      path: '/addressList',
      name: 'AddressList',
      component: () => import('../views/AddressList.vue'),
    },
    {
      path: '/addressDetail',
      name: 'AddressDetail',
      component: () => import('../views/AddressDetail.vue'),
    }
  ],
})

export default router
