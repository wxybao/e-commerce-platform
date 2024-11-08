<template>
  <div class="order-list">
    <div class="title">Заказы</div>

    <div class="orders">
      <div class="order-item" v-for="item in orderList" :key="item">
        <img src="@/assets/goods-1.png"/>
        <van-row class="mt-16">
          <van-col span="12" class="item-label">Заказ #</van-col>
          <van-col span="12" class="item-content">All terrain off-road go kart</van-col>
        </van-row>
        <van-row class="mt-16">
          <van-col span="12" class="item-label">Цвет</van-col>
          <van-col span="12" class="item-content">blue</van-col>
        </van-row>
        <van-row class="mt-16">
          <van-col span="12" class="item-label">Дата заказа</van-col>
          <van-col span="12" class="item-content">12 декабря 2024 года</van-col>
        </van-row>
        <van-row class="mt-16">
          <van-col span="12" class="item-label">Статус</van-col>
          <van-col span="12" class="item-content">Доставлено</van-col>
        </van-row>
        <van-row class="mt-16">
          <van-col span="12" class="item-label">Итог</van-col>
          <van-col span="12" class="item-content">$240 USDT</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const orderList = ref([1])
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