<template>
  <div class="person">
    <div class="user-info flex-left">
      <van-image round width="58px" height="58px" src=""/>
      <div class="flex-1 ml-16" style="width: 0">
        <div class="text-20 font-bold overflowText">My_NAME_IS_HAHAH</div>
        <div class="flex-left mt-8">
          <div class="mr-8">ID：123456789</div>
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
import {ref} from "vue";
import {useRouter} from "vue-router";
import tonConnectUI from "@/ton/index.js";

const router = useRouter();
const activeTab = ref('person');

const menuList = [{
  title: 'Мой адрес',
  icon: '../assets/person-address.png',
  path: 'AddressList'
}, {
  title: 'Мой заказ',
  icon: '../assets/person-order.png',
  path: 'OrderList'
}, {
  title: 'Служба поддержки клиентов',
  icon: '../assets/person-chat.png',
  path: ''
}]

function getImageUrl(url) {
  return new URL(url, import.meta.url).href;
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