<template>
  <RouterView/>
</template>

<script setup>
import {useUserStore} from "@/stores/user.js";
import {onMounted} from "vue";

if (window.Telegram) {
  window.Telegram.WebApp.disableVerticalSwipes();
  window.Telegram.WebApp.enableClosingConfirmation();
  window.Telegram.WebApp.expand()
}

const userStore = useUserStore()

onMounted(() => {
  if (!userStore.userInfo?.id) {
    // window.location.href = 'https://t.me/tg_ecommerce_bot?startapp'
    return
  }
  // const currentShopId = location.pathname.split('/')[1]
  // if (!currentShopId) {
  //   return
  // }

  const currentShopId = 'eNhH18azu1urGKuqZhP0'

  if (userStore.shopId !== currentShopId) {
    userStore.setShopId(currentShopId)
  }
})

</script>

<style scoped>
</style>
