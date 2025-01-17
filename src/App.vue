<template>
  <RouterView/>
</template>

<script setup>
import {useUserStore} from "@/stores/user.js";
import {onMounted} from "vue";
import axios from "axios";
import {storeToRefs} from "pinia";
import {user_account} from "@/api/api.js";

if (window.Telegram) {
  window.Telegram.WebApp.disableVerticalSwipes();
  window.Telegram.WebApp.enableClosingConfirmation();
  window.Telegram.WebApp.expand()
}

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

onMounted(() => {
  if (!userStore.userInfo?.id) {
    window.location.href = 'https://t.me/tg_ecommerce_bot?startapp'
    return
  }
  const currentShopId = location.pathname.split('/')[1]
  if (!currentShopId) {
    return
  }

  // const currentShopId = 'eNhH18azu1urGKuqZhP0'

  if (userStore.shopId !== currentShopId) {
    userStore.setShopId(currentShopId)
  }

  getAvatar()
})

async function getAvatar() {
  const token = '7826079215:AAHvxL69IRgyhhgJJjCsl5nadQumqP22DEI'
  const res = await axios.get(`https://api.telegram.org/bot${token}/getUserProfilePhotos`, {
    params: {
      user_id: userInfo.value?.id
    }
  })

  const photos = res.data.result.photos || []
  if (photos.length) {
    const fileId = photos[0][0].file_id

    const file = await axios.get(`https://api.telegram.org/bot${token}/getFile`, {
      params: {
        file_id: fileId
      }
    })

    const file_path = file.data.result.file_path

    // 拼接头像地址
    userInfo.value.avatar = `https://api.telegram.org/file/bot${token}/${file_path}`
    userStore.setUserInfo(userInfo.value.avatar)
  }

  // 更新会员信息
  user_account({
    id: userInfo.value?.id,
    profile: userInfo.value?.avatar,
    user_name: userInfo.value?.username
  })
}

</script>

<style scoped>
</style>
