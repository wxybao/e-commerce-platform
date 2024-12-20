<template>
  <div class="confirm-order">
    <NavBar/>

    <div class="flex-between" @click="changeAddress()">
      <AddressItem v-if="address" only-show :address="address"/>
      <div class="change-arrow flex-center">
        <van-icon name="arrow"/>
      </div>
    </div>

    <div class="product-list mt-40">
      <div class="product-item flex-left" v-for="item in products">
        <div class="product-img">
          <img src="../assets/goods-1.png"/>
        </div>
        <div class="product-info flex-1">
          <div class="name overflowText-2">{{ item.productName }}</div>
          <div class="flex-between">
            <div class="name price">${{ item.salePrice }} USDT</div>
            <div class="num">×{{ item.qty }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="send-money-box">
      <div class="send-money">почтовый сбор：$160.00 USDT</div>
      <div class="send-msg flex-left" @click="contact()">
        <span>Вам необходимо обратиться в службу поддержки для изменения почтового сбора</span>
        <div class="right-arrow flex-center">
          <van-icon name="down"/>
        </div>
      </div>
    </div>

    <div class="pay-type-box">
      <van-radio-group v-model="payType">
        <van-radio class="pay-item" name="TonWallet" label-position="left">
          <div class="flex-left">
            <img class="pay-logo" src="../assets/TonWalletLogo.png"/>
            <span class="ml-20">Ton Wallet</span>
          </div>
        </van-radio>
        <van-radio disabled class="pay-item" name="TonCryptoBot" label-position="left">
          <div class="flex-left">
            <img class="pay-logo" src="../assets/TonCryptoBotLogo.png"/>
            <span class="ml-20">Ton Crypto Bot</span>
          </div>
        </van-radio>
      </van-radio-group>
    </div>

    <div class="bottom-money flex-between">
      <span>итого：${{ totalPrice }} USDT</span>
      <van-button class="ok-btn" type="primary" @click="orderConfirm()">расчет</van-button>
    </div>
  </div>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {save_order, user_address, wallet_address} from "@/api/api.js";
import {showToast} from "vant";
import AddressItem from "@/components/AddressItem.vue";
import tonConnectUI from "@/ton/index.js";
import NavBar from "@/components/NavBar.vue";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

const router = useRouter()
const route = useRoute()
const checkedProductObj = localStorage.getItem('ec-checkedProduct')

const products = ref([])
const address = ref({})
const addressId = Number(route.query.addressId || 0)

const payType = ref('TonWallet')

// 计算总价
const totalPrice = ref(0)

const loading = ref(false)

onMounted(() => {
  if (!checkedProductObj) {
    router.replace({
      name: 'Cart'
    })
    return
  }

  const checkedProduct = JSON.parse(checkedProductObj)
  if (!checkedProduct.length) {
    router.replace({
      name: 'Cart'
    })
    return
  }

  products.value = checkedProduct
  totalPrice.value = products.value.reduce((acc, item) => acc + item.salePrice * item.qty, 0)

  getAddressList()
})

function getAddressList() {
  user_address({
    limit: 100,
    offset: 0,
    userId: userInfo.value?.id || 0
  }).then(res => {
    if (res.code === "0") {
      const addressList = res.data || []
      if (addressList.length) {
        if (addressId) {
          address.value = addressList.find(item => item.id === addressId)
        } else {
          address.value = addressList[0]
        }
      }
    }
  }).catch(err => {
    showToast({
      message: err.msg,
      wordBreak: 'break-word',
    })
  })
}

// 切换地址
function changeAddress() {
  router.push({
    name: 'AddressList',
    query: {
      from: 'ConfirmOrder'
    }
  })
}

function contact() {
  window.open('https://t.me/RedRocketSupport', '_blank')
}

async function orderConfirm() {
  const currentIsConnectedStatus = tonConnectUI.connected;

  if (currentIsConnectedStatus) {
    await setTransaction()
  } else {
    try {
      const res = await tonConnectUI.openModal()

      const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
        if (wallet && tonConnectUI.connected) {
          wallet_address({
            walletAddress: wallet.account.address,
            id: userInfo.value?.id
          })

          setTransaction()

          unsubscribe()
        }
      });
    } catch (e) {
      console.log(e)
    } finally {
    }
  }
}

async function setTransaction() {
  loading.value = true

  const currentAccount = tonConnectUI.account;
  const tonAddress = currentAccount?.address

  const saleOrderDetailList = products.value.map(item => {
    return {
      price: item.salePrice,
      productId: item.productId,
      qty: item.qty
    }
  })
  save_order({
    saleOrderDetailList: saleOrderDetailList,
    walletAddress: tonAddress,
    userAddressId: address.value.id,
    userId: userInfo.value?.id
  }).then(async res => {
    if (res.code === '0') {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: res.data.jettonWalletAddress,
            amount: "50000000",
            payload: res.data.idBase64
          }
        ]
      }

      try {
        const result = await tonConnectUI.sendTransaction(transaction);

        if (result.boc) {
          showToast({
            message: 'Оплата успешно произведена, ожидается подтверждение получения на блокчейне.',
            wordBreak: 'normal',
            duration: 5000
          })

          setTimeout(() => {
            router.push({
              name: 'OrderList'
            })
          }, 5000)
        }
        // const someTxData = await myAppExplorerService.getTransaction(result.boc);
        // alert('Transaction was sent successfully', someTxData);
      } catch (e) {
        console.error(e);
      }
    }
  }).catch(err => {
    if (err && err.msg) {
      showToast({
        message: err.msg,
        wordBreak: 'break-word',
      })
    }
  }).finally(() => {
    loading.value = false
  })
}
</script>

<style scoped lang="scss">
.confirm-order {
  padding: 24px;
  padding-bottom: 70px;
  position: relative;

  .change-arrow {
    margin-left: 20px;
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: #f5f5f5;
  }

  .product-list {
    .product-item {
      padding: 20px 0;
      gap: 20px;

      &:not(:last-child) {
        border-bottom: 1px solid #E0E5EB;
      }

      .product-img {
        width: 80px;
        height: 80px;

        img {
          width: 80px;
          height: 80px;
        }
      }

      .product-info {
        color: #181D25;

        .name {
          font-size: 16px;
          font-weight: 600;
          line-height: 20px;
          height: 40px;
        }

        .num {
          color: #A9A9A9;
          font-size: 16px;
          font-weight: 600;
          margin-top: 8px;
        }

        .price {
          margin-top: 8px;
          height: inherit;
        }
      }
    }
  }

  .send-money-box {
    padding: 24px 0;
    margin-top: 20px;

    .send-money {
      color: #181D25;
      font-size: 16px;
      font-weight: 600;
    }

    .send-msg {
      background-color: #FEEEF0;
      margin-top: 8px;
      padding: 8px 10px;
      color: #F53F3F;
      line-height: 20px;

      .right-arrow {
        flex-shrink: 0;
        margin-left: 8px;
        border-radius: 8px;
        background: #F55266;
        rotate: -90deg;
        width: 40px;
        height: 40px;
        color: #FFFFFF;
        font-size: 24px;
      }
    }
  }

  .pay-type-box {
    margin-top: 20px;

    .pay-item {
      gap: 20px;
      padding: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #181D25;
      font-weight: bold;

      &:not(:last-child) {
        border-bottom: 1px solid #E0E5EB;
      }

      .pay-logo {
        width: 40px;
        height: 40px;
      }
    }
  }

  .bottom-money {
    background-color: #FFFFFF;
    z-index: 2;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.10);
    padding: 15px 24px;
    font-weight: 600;

    .ok-btn {
      height: 40px;
    }
  }
}
</style>