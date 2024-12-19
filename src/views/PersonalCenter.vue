<template>
  <div class="person">
    <div class="user-info flex-left">
      <van-image round width="58px" height="58px" :src="userInfo?.avatar"/>
      <div class="flex-1 ml-16" style="width: 0">
        <div class="text-20 font-bold overflowText">{{ userInfo?.username || '--' }}</div>
        <div class="flex-left mt-8">
          <div class="mr-8 flex-1 overflowText">ID：{{ userInfo?.id || '--' }}</div>
          <!--          <div id="ton-connect"></div>-->
          <van-button type="primary" color="#F55266" @click="tonBtnClick()">
            {{ !hasConnect ? 'Подключить кошелёк' : 'Отключить кошелёк' }}
          </van-button>
        </div>
      </div>
    </div>
    <div class="menu-list">
      <div class="menu-item flex-left" v-for="(item, index) in menuList" :key="index" @click="gotoUrl(item.path)">
        <img :src="getImageUrl(item.icon)" alt="" width="24px" height="24px" class="mr-16">
        <div class="flex-1">{{ item.title }}</div>
      </div>
    </div>
    <TabBar v-model="activeTab"/>
  </div>
</template>

<script setup>

import TabBar from "@/components/TabBar.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import tonConnectUI from "@/ton/index.js";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";
import axios from "axios";
import {THEME} from "@tonconnect/ui";
import {showConfirmDialog} from "vant";
import {wallet_address} from "@/api/api.js";

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

const router = useRouter();
const activeTab = ref('PersonalCenter');

const menuList = [{
  title: 'Мой адрес',
  icon: 'person-address.png',
  path: 'AddressList'
}, {
  title: 'Мой заказ',
  icon: 'person-order.png',
  path: 'OrderList'
}, {
  title: 'Служба поддержки клиентов',
  icon: 'person-chat.png',
  path: 'https://t.me/RedRocketSupport'
}]

const hasConnect = ref(false)

function getImageUrl(filename) {
  return new URL(`../assets/${filename}`, import.meta.url).href;
}

let sub = null
let sub2 = null
onBeforeUnmount(() => {
  if (sub) {
    sub()
  }
})

onMounted(() => {
  sub = tonConnectUI.onStatusChange(wallet => {
    hasConnect.value = tonConnectUI.connected
  })

  hasConnect.value = tonConnectUI.connected

  // tonConnectUI.uiOptions = {
  //   buttonRootId: 'ton-connect',
  //   language: 'ru',
  //   uiPreferences: {
  //     borderRadius: 's',
  //     colorsSet: {
  //       [THEME.DARK]: {
  //         connectButton: {
  //           background: '#F55266'
  //         }
  //       },
  //       [THEME.LIGHT]: {
  //         connectButton: {
  //           background: '#F55266'
  //         }
  //       }
  //     }
  //   }
  // }
  getAvatar()
})

async function tonBtnClick() {
  if (hasConnect.value) {
    showConfirmDialog({
      title: '',
      message:
        'Отключить кошелёк?',
    }).then(() => {
      tonConnectUI.disconnect()
    })
  } else {
    await tonConnectUI.openModal()

    sub2 = tonConnectUI.onStatusChange((wallet) => {
      if (wallet && tonConnectUI.connected) {
        wallet_address({
          walletAddress: wallet.account.address,
          id: userInfo.value?.id
        })

        sub2()
      }
    })
  }
}

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
  }
}

function gotoUrl(path) {
  if (path) {
    if (path.indexOf('http') === 0) {
      window.open(path, '_blank')
    } else {
      router.push({name: path})
    }
  }
}
</script>

<style scoped lang="scss">
.person {
  padding: 30px 24px;

  :deep(.van-image__loading) {
    background: #FEEEF0;
  }

  .menu-list {
    margin-top: 40px;
    padding: 0 10px;

    .menu-item {
      background: #FFFFFF;
      box-shadow: 0px 2px 20px 6px rgba(0, 0, 0, 0.06);
      border-radius: 25px;
      padding: 21px 30px;
      color: #222324;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;

      img {
        width: 30px;
        height: 30px;
        margin-right: 20px;
      }

      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>