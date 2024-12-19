<template>
  <div class="order-list">
    <NavBar/>
    <div class="flex-between">
      <div class="page-title">Заказы</div>

      <van-button style="width: 120px" size="small" :loading="loading" plain icon="replay" type="primary"
                  color="#F55266"
                  @click="getOrderList()">подновление
      </van-button>
    </div>

    <div class="orders">
      <template v-if="hasInit && !orderList.length">
        <van-empty description="еще ничего не купил"/>
      </template>
      <template v-else>
        <div class="order-item" v-for="item in orderList" :key="item">
          <div class="status-text">{{
              item.state === 'UN_PAY' ? 'Ожидает оплаты'
                : item.state === 'WAITING_FOR_SHIP' ? 'Ожидает отправки'
                  : item.state === 'SHIPPED' ? 'Ожидает получения'
                    : item.state === 'COMPLETED' ? 'Завершенный'
                      : ''
            }}
          </div>
          <div>
            номер заказа：{{ item.orderNo }} <br/>
            Дата заказа：{{ item.createdAt }}
          </div>
          <div class="product-list">
            <div class="product-item" v-for="(product, index) in item.saleOrderDetailList" :key="index">
              <img src="../assets/goods-1.png"/>
              <van-row class="mt-10">
                <van-col span="12" class="item-label">Заказ #</van-col>
                <van-col span="12" class="item-content">{{ product.productName }}</van-col>
              </van-row>
              <van-row class="mt-10">
                <van-col span="12" class="item-label">Итог</van-col>
                <van-col span="12" class="item-content">${{ product.money }} USDT</van-col>
              </van-row>
              <van-row class="mt-10">
                <van-col span="12" class="item-label">количество</van-col>
                <van-col span="12" class="item-content">{{ product.qty }}</van-col>
              </van-row>
            </div>
          </div>

          <template v-if="item.state === 'UN_PAY'">
            <div class="pay-box flex-between">
              <span>итого：${{ item.money }} USDT</span>
              <van-button class="ok-btn" type="primary">расчет</van-button>
            </div>
          </template>

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
const loading = ref(false)

onMounted(() => {
  getOrderList()
})

function getOrderList() {
  // 模拟5条数据
  orderList.value = [{
    orderNo: '12312312312',
    "buildingCall": 1,
    "buildingNo": 1,
    "city": "城市",
    "createdAt": "2024-01-01 00:00:00",
    "floor": 1,
    "freight": 1,
    "id": 1,
    "idBase64": 1,
    "jettonWalletAddress": 1,
    "merchantId": 0,
    "money": 1,
    "name": 1,
    "phone": 1,
    "saleOrderDetailList": [
      {
        "createdAt": 1,
        "merchantId": 0,
        "money": 1,
        "orderDetailNum": 1,
        "orderId": 1,
        "orderNo": 1,
        "price": 1,
        "productId": 1,
        "productMasterImageUrl": 1,
        "productName": 1,
        "qty": 1,
        "updatedAt": 1
      }, {
        "createdAt": 1,
        "merchantId": 0,
        "money": 1,
        "orderDetailNum": 1,
        "orderId": 1,
        "orderNo": 1,
        "price": 1,
        "productId": 1,
        "productMasterImageUrl": 1,
        "productName": 1,
        "qty": 1,
        "updatedAt": 1
      }
    ],
    "state": 'UN_PAY',
    "street": "街道",
    "unit": 1,
    "updatedAt": "2024-01-01 00:00:00",
    "userAddressId": 1,
    "userId": 1
  }, {
    orderNo: '12312312312',
    "buildingCall": 1,
    "buildingNo": 1,
    "city": "城市",
    "createdAt": "2024-01-01 00:00:00",
    "floor": 1,
    "freight": 1,
    "id": 1,
    "idBase64": 1,
    "jettonWalletAddress": 1,
    "merchantId": 0,
    "money": 1,
    "name": 1,
    "phone": 1,
    "saleOrderDetailList": [
      {
        "createdAt": 1,
        "merchantId": 0,
        "money": 1,
        "orderDetailNum": 1,
        "orderId": 1,
        "orderNo": 1,
        "price": 1,
        "productId": 1,
        "productMasterImageUrl": 1,
        "productName": 1,
        "qty": 1,
        "updatedAt": 1
      }
    ],
    "state": "COMPLETED",
    "street": "街道",
    "unit": 1,
    "updatedAt": "2024-01-01 00:00:00",
    "userAddressId": 1,
    "userId": 1
  }]

  return
  loading.value = true
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
      message: err.msg || 'Ошибка запроса',
      wordBreak: 'break-word',
    })
  }).finally(() => {
    hasInit.value = true
    loading.value = false
  })
}
</script>

<style scoped lang="scss">
.order-list {
  padding: 20px 24px;

  .orders {
    margin-top: 25px;

    .order-item {
      padding: 20px 0 0 0;
      position: relative;

      .status-text {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        color: #F55266;
        text-align: center;
        font-size: 20px;
        font-weight: 800;
        line-height: 42px;
        transform: rotate(-15deg);
        transform-origin: 140% 100% 0;

        &:before{
          content: '';
          border-top:4px solid #F55266;
          position: absolute;
          left: 0;
          right: 0;
        }
        &:after{
          content: '';
          border-top:4px solid #F55266;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      .product-list {
        margin-top: 20px;

        .product-item {
          padding: 20px 0;
          border-top: 1px solid #E0E5EB;

          img {
            width: 80px;
            height: 80px;
            margin: 0 auto;
          }

          .item-label {
            color: #4E5562;
          }

          .item-content {
            color: #181D25;
          }
        }
      }

      .pay-box {
        border-top: 1px solid #E0E5EB;
        padding-top: 20px;
        font-weight: bold;

        .ok-btn {
          height: 40px;
        }
      }
    }
  }
}
</style>