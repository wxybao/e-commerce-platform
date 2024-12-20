
// src/router/index.js
import {createRouter, createWebHistory, RouterView} from 'vue-router'
import {h} from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/:shopId',
      component: {
        render() {
          return h(RouterView)
        }
      },
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue'),
          props: true
        },
        {
          path: 'goodsDetail',
          name: 'GoodsDetail',
          component: () => import('../views/GoodsDetail.vue'),
          props: true
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('../views/Cart.vue'),
          props: true
        },
        {
          path: 'personalCenter',
          name: 'PersonalCenter',
          component: () => import('../views/PersonalCenter.vue'),
          props: true
        },
        {
          path: 'orderConfirm',
          name: 'OrderConfirm',
          component: () => import('../views/OrderConfirm.vue'),
          props: true
        },
        {
          path: 'orderList',
          name: 'OrderList',
          component: () => import('../views/OrderList.vue'),
          props: true
        },
        {
          path: 'addressList',
          name: 'AddressList',
          component: () => import('../views/AddressList.vue'),
          props: true
        },
        {
          path: 'addressDetail',
          name: 'AddressDetail',
          component: () => import('../views/AddressDetail.vue'),
          props: true
        }
      ]
    }
  ],
})

export default router