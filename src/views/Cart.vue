<template>
  <div class="cart">
    <div class="page-title">покупок</div>

    <div class="product-list">
      <template v-if="productList.length">
        <van-swipe-cell v-for="(item, index) in productList" :key="index">
          <div class="product-item flex-left" :class="{disabled: item.productState !== 'ONLINE'}">
            <van-checkbox v-model="item.selectIs" :key="item.productId" :disabled="item.productState !== 'ONLINE'"
                          @change="checkedResultChange(item)">
            </van-checkbox>
            <div class="product-img">
              <img :src="item.masterImageUrl"/>
              <span class="disabled-mask" v-if="item.productState !== 'ONLINE'">
              снять с продажи
            </span>
            </div>
            <div class="product-info flex-1">
              <div class="name overflowText-2">{{ item.productName }}</div>
              <van-stepper v-model="item.qty" :min="1" :max="99"
                           button-size="24px" :disabled="item.productState !== 'ONLINE'"
                           input-width="50px" integer @change="productNumChange(item)"/>
              <div class="name price">${{ item.salePrice }} USDT</div>
            </div>
          </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="delProduct(item)"/>
          </template>
        </van-swipe-cell>
      </template>
      <template v-else>
        <van-empty description="Нет данных">
          <van-button type="primary" class="bottom-button" @click="goHome()">Добавить</van-button>
        </van-empty>
      </template>
    </div>

    <div class="price-box flex-left">
      <van-checkbox style="align-self: flex-start" v-model="isCheckAll" :indeterminate="isIndeterminate"
                    @change="checkAllChange">
      </van-checkbox>
      <div class="flex-1 ml-10">
        <div @click="checkAllChange(!isCheckAll)">выбрать все</div>
        <div>итого：${{ totalPrice }} USDT</div>
      </div>
      <van-button class="ok-btn ml-20" type="primary" @click="orderConfirm()">расчет</van-button>
    </div>
    <TabBar v-model="activeTab"/>
  </div>
</template>

<script setup>
import TabBar from "@/components/TabBar.vue";
import {computed, onMounted, ref} from "vue";
import {showConfirmDialog, showSuccessToast, showToast} from "vant";
import {useRouter} from "vue-router";
import {add_cart, del_cart_product, get_cart, save_order, user_address} from "@/api/api.js";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";
import {deepClone} from "@/utils/common.js";

const router = useRouter()
const activeTab = ref('Cart')

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

const productList = ref([])

const isCheckAll = ref(false)
const isIndeterminate = ref(false)

// 计算总价
const totalPrice = computed(() => {
  return productList.value.filter(item => item.selectIs && item.productState === 'ONLINE')
    .reduce((acc, item) => acc + item.salePrice * Math.min(item.qty, 99), 0)
})

onMounted(() => {
  getCart()
})

async function getCart() {
  const res = await get_cart(userInfo.value?.id)
  if (res.code === '0') {
    productList.value = res.data?.shoppingCartDetailList || []
  }
}

// 全选/反选
const checkAllChange = (val) => {
  if (val) {
    productList.value.forEach(item => item.selectIs = true)
  } else {
    productList.value.forEach(item => item.selectIs = false)
  }
  isIndeterminate.value = false

  const products = deepClone(productList.value)
  productNumChange(products)
}

// 选中状态
const checkedResultChange = (product) => {
  const allCount = productList.value.filter(item => item.productState === 'ONLINE').length
  const checkedCount = productList.value.filter(item => item.selectIs && item.productState === 'ONLINE').length

  isCheckAll.value = checkedCount === allCount
  isIndeterminate.value = checkedCount > 0 && checkedCount < allCount

  productNumChange(product)
}

async function delProduct(item) {
  const res = await del_cart_product({
    shoppingCartDetailList: [item],
    userId: userInfo.value?.id
  })

  if (res.code === '0') {
    showSuccessToast('Удалить успешно')
    const index = productList.value.findIndex(i => i.productId === item.productId)
    if (index !== -1) {
      productList.value.splice(index, 1)
    }
  }
}

// 数量修改
function productNumChange(item) {
  const detail = deepClone(item)
  changeCart([detail])
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// 购物车商品数量修改
const changeCart = debounce((shoppingCartDetailList) => {
  shoppingCartDetailList.forEach(item => item.coverIs = true)
  return add_cart({
    shoppingCartDetailList: shoppingCartDetailList,
    userId: userInfo.value?.id
  })
}, 1000)

// 订单确认
const orderConfirm = async () => {
  const checkedProduct = productList.value.filter(item => item.selectIs && item.productState === 'ONLINE')

  if (!checkedProduct.length) {
    showToast({
      message: 'Пожалуйста, выберите хотя бы один товар.',
      wordBreak: 'break-word',
    })
    return
  }

  // 查询地址信息
  const addressRes = await user_address({
    limit: 100,
    offset: 0,
    userId: userInfo.value?.id || 0
  })
  if (addressRes.code !== '0' || !addressRes.data || !addressRes.data.length) {
    showConfirmDialog({
      title: 'Адрес',
      message:
        'Сначала создайте адрес.',
    }).then(() => {
      router.push({
        name: 'AddressList'
      })
    }).catch(() => {});
    return
  }

  const addressId = addressRes.data[0].id
  // 创建订单
  const saleOrderDetailList = checkedProduct.map(item => {
    return {
      price: item.salePrice,
      productId: item.productId,
      qty: item.qty
    }
  })
  save_order({
    saleOrderDetailList: saleOrderDetailList,
    walletAddress: '',
    userAddressId: addressId,
    userId: userInfo.value?.id
  }).then(async res => {
    if (res.code === '0') {
      const orderId = res.data.id
      router.push({
        name: 'OrderConfirm',
        query:{
          orderId: orderId
        }
      })
    }
  })
}

function goHome() {
  router.replace({
    name: 'Home'
  })
}
</script>

<style scoped lang="scss">
.cart {
  padding: 20px 24px;
  padding-bottom: 0;
  position: relative;

  .delete-button {
    height: 100%;
  }

  .product-list {
    margin-top: 4px;
    height: calc(100vh - 70px - 70px - 42px - 20px - 10px);
    overflow-y: auto;
    overflow-x: hidden;

    .product-item {
      padding: 20px 0;
      gap: 20px;

      &:not(:last-child) {
        border-bottom: 1px solid #E0E5EB;
      }

      &.disabled {
        .product-info {
          color: #A9A9A9;
        }

        .product-img {
          position: relative;
          border-radius: 50%;
          overflow: hidden;

          .disabled-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(245, 245, 245, 0.80);
            display: flex;
            align-items: center;
            text-align: center;
            border-radius: 50%;
            overflow: hidden;
            font-size: 12px;
            color: #797979;
          }
        }
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

  .price-box {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -5px;
    height: 70px;
    z-index: 2;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.10);
    padding: 16px 24px;

    .ok-btn {
      height: 40px;
    }
  }
}
</style>