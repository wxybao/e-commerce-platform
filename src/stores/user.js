import {defineStore} from 'pinia'

// function parseQuery(src) {
//   const parsedObj = {};
//
//   if (src) {
//     const info = decodeURIComponent(src)
//     const urlParams = new URLSearchParams(info);
//     for (const [key, value] of urlParams.entries()) {
//       try {
//         parsedObj[key] = JSON.parse(value);
//       } catch (error) {
//         parsedObj[key] = value;
//       }
//     }
//   }
//   return parsedObj;
// }

export const useUserStore = defineStore('user', {
  state: () => ({
    user: window.Telegram?.WebApp.initDataUnsafe,
    shopId: ''
  }),
  getters: {
    // userInfo: state => {
    //   return {
    //     id: 1
    //   }
    // }
    userInfo: state => state.user?.user
  },
  actions: {
    setShopId(shopId) {
      this.shopId = shopId
    },
    setUserAvatar(avatar){
      this.user.avatar = avatar
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['shopId']
      }
    ]
  }
})