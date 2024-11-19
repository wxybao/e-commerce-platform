<template>
  <div class="order-list">
    <NavBar/>
    <div class="title">Заказы</div>

    <div class="orders">
      <template v-if="hasInit && !orderList.length">
        <van-empty description="еще ничего не купил"/>
      </template>
      <template v-else>
        <div class="order-item" v-for="item in orderList" :key="item">
          <img :src="item.image"/>
          <van-row class="mt-16">
            <van-col span="12" class="item-label">Заказ #</van-col>
            <van-col span="12" class="item-content">{{ item.productName }}</van-col>
          </van-row>
          <van-row class="mt-16">
            <van-col span="12" class="item-label">Цвет</van-col>
            <van-col span="12" class="item-content">{{ item.color }}</van-col>
          </van-row>
          <van-row class="mt-16">
            <van-col span="12" class="item-label">Дата заказа</van-col>
            <van-col span="12" class="item-content">{{ item.createdAt }}</van-col>
          </van-row>
          <van-row class="mt-16">
            <van-col span="12" class="item-label">Статус</van-col>
            <van-col span="12" class="item-content">Доставлено</van-col>
          </van-row>
          <van-row class="mt-16">
            <van-col span="12" class="item-label">Итог</van-col>
            <van-col span="12" class="item-content">${{ item.money }} USDT</van-col>
          </van-row>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {sale_order} from "@/api/api.js";
import {showToast} from "vant";
import NavBar from "@/components/NavBar.vue";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

const orderList = ref([])
const pageIndex = 0
const hasInit = ref(false)

onMounted(() => {
  getOrderList()
})

function getOrderList() {
  sale_order({
    limit: 100,
    offset: pageIndex,
    userId: userInfo.value?.id || 0
  }).then(res => {
    if (res.code === "0") {
      orderList.value = res.data || []
    }
  }).catch(err => {
    showToast({
      message: err.msg,
      wordBreak: 'break-word',
    })
  }).finally(() => {
    hasInit.value = true
  })
}
</script>

<style scoped lang="scss">
.order-list {
  padding: 20px 24px;

  .title {
    font-size: 32px;
    line-height: 42px;
    font-weight: bold;
  }

  .orders {
    margin-top: 40px;
    padding: 10px 24px;

    .order-item {
      &:not(:last-child) {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #E0E5EB;
      }

      img {
        width: 100px;
        margin: 0 auto;
        margin-bottom: 4px;
      }

      .item-label {
        color: #4E5562;
      }

      .item-content {
        color: #181D25;
      }
    }
  }
}
</style>