<template>
  <div class="person">
    <div class="user-info flex-left">
      <van-image round width="58px" height="58px" src=""/>
      <div class="flex-1 ml-16" style="width: 0">
        <div class="text-20 font-bold overflowText">{{ userInfo?.username || '--' }}</div>
        <div class="flex-left mt-8">
          <div class="mr-8">ID：{{ userInfo?.id || '--' }}</div>
          <!--          <div id="ton-connect"></div>-->
          <van-button type="primary" color="#F55266" @click="connectWallet">Ton Кошелек</van-button>
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
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import tonConnectUI from "@/ton/index.js";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

// const src = 'query_id=AAEmLCBAAwAAACYsIEA25unZ&user=%7B%22id%22%3A7518301222%2C%22first_name%22%3A%22Candice%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22candicePenguin%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1731408451&hash=a64d1b55d610243069f3815f517e4a63a0b1f24ec1fed40e3907fdfd406e2ebd'

const router = useRouter();
const activeTab = ref('person');

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
  path: ''
}]

function getImageUrl(filename) {
  return new URL(`../assets/${filename}`, import.meta.url).href;
}

const connectWallet = async () => {
  try {
    const res = await tonConnectUI.openModal()
  } catch (e) {
    console.log(e)
  }
};

function gotoUrl(path) {
  if (path) {
    router.push({name: path})
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