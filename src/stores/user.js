import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    hasLogin: false
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    }
  }
})