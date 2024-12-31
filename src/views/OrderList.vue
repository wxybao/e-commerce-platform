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
            <template v-if="item.saleOrderDetailList && item.saleOrderDetailList.length">
              <div class="product-item" v-for="(product, index) in item.saleOrderDetailList" :key="index">
                <img :src="product.productMasterImageUrl"/>
                <van-row class="mt-10">
                  <van-col span="12" class="item-label">Заказ #</van-col>
                  <van-col span="12" class="item-content">
                    <span class="overflowText-2">{{ product.productName }}</span>
                  </van-col>
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
            </template>
          </div>

          <template v-if="item.state === 'UN_PAY'">
            <div class="pay-box flex-between">
              <span>итого：${{ item.money }}+${{ item.freight }} USDT</span>
              <van-button class="ok-btn" type="primary" @click="gotoPay(item)">расчет</van-button>
            </div>
          </template>

        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {get_orders, pay, wallet_address} from "@/api/api.js";
import {showSuccessToast, showToast} from "vant";
import NavBar from "@/components/NavBar.vue";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";
import tonConnectUI from "@/ton/index.js";

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
  loading.value = true
  get_orders({
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

async function gotoPay(item) {
  const currentIsConnectedStatus = tonConnectUI.connected;

  if (currentIsConnectedStatus) {
    if (!item.jettonWalletAddress) {
      setWalletAddress(item, tonConnectUI.wallet)
    } else {
      await setTransaction(item, item.jettonWalletAddress)
    }
  } else {
    try {
      await tonConnectUI.openModal()

      const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
        if (wallet && tonConnectUI.connected) {
          setWalletAddress(item, wallet)

          unsubscribe()
        }
      });
    } catch (e) {
      console.log(e)
    } finally {
    }
  }
}

function setWalletAddress(item, wallet) {
  wallet_address({
    walletAddress: wallet.account.address,
    id: userInfo.value?.id
  }).then(pay => {
    if (pay.code === '0') {
      setTransaction(item, pay.data.jettonWalletAddress)
    }
  })
}

async function setTransaction(item, jettonWalletAddress) {
  const res = await pay({
    userId: userInfo.value?.id,
    walletAddress: jettonWalletAddress,
    id: item.id
  })

  if (res.code === '0') {
    showSuccessToast({
      message: 'Оплата прошла успешно',
      wordBreak: 'break-word',
    })

    getOrderList()
  }
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

        &:before {
          content: '';
          border-top: 4px solid #F55266;
          position: absolute;
          left: 0;
          right: 0;
        }

        &:after {
          content: '';
          border-top: 4px solid #F55266;
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