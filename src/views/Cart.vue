<template>
  <div class="cart">
    <div class="page-title">покупок</div>

    <div class="product-list">
      <div class="product-item flex-left" :class="{disabled: item.productState > 1}"
           v-for="(item, index) in productList" :key="index">
        <van-checkbox v-model="item.coverIs" :key="item.productId" :disabled="item.productState > 1"
                      @change="checkedResultChange">
        </van-checkbox>
        <div class="product-img">
          <img src="../assets/goods-1.png"/>
          <span class="disabled-mask" v-if="item.productState > 1">
            снять с продажи
          </span>
        </div>
        <div class="product-info flex-1">
          <div class="name overflowText-2">{{ item.productName }}</div>
          <van-stepper :disabled="item.productState > 1" v-model="item.qty" :min="1" :max="99" button-size="24px" input-width="50px" integer/>
          <div class="name price">${{ item.salePrice }} USDT</div>
        </div>
      </div>
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
import {computed, ref} from "vue";
import {showToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter()
const activeTab = ref('Cart')

const productList = ref([{
  coverIs: true,
  productId: 1,
  masterImageUrl: '',
  marketPrice: 500,
  productName: 'Повышенной gokart',
  productState: 1,
  qty: 2,
  salePrice: 600
}, {
  coverIs: false,
  productId: 2,
  masterImageUrl: '',
  marketPrice: 300,
  productName: 'Повышенной2 gokart',
  productState: 2,
  qty: 1,
  salePrice: 400
}, {
  coverIs: false,
  productId: 3,
  masterImageUrl: '',
  marketPrice: 300,
  productName: 'Повышенной3 gokart',
  productState: 1,
  qty: 1,
  salePrice: 400
}])

const isCheckAll = ref(false)
const isIndeterminate = ref(false)

// 计算总价
const totalPrice = computed(() => {
  return productList.value.filter(item => item.coverIs && item.productState === 1)
    .reduce((acc, item) => acc + item.salePrice * Math.min(item.qty, 99), 0)
})

// 全选/反选
const checkAllChange = (val) => {
  if (val) {
    productList.value.forEach(item => item.coverIs = true)
  } else {
    productList.value.forEach(item => item.coverIs = false)
  }
  isIndeterminate.value = false
}

// 选中状态
const checkedResultChange = () => {
  const allCount = productList.value.filter(item => item.productState === 1).length
  const checkedCount = productList.value.filter(item => item.coverIs && item.productState === 1).length

  isCheckAll.value = checkedCount === allCount
  isIndeterminate.value = checkedCount > 0 && checkedCount < allCount
}

// 订单确认
const orderConfirm = () => {
  const checkedProduct = productList.value.filter(item => item.coverIs && item.productState === 1)

  if (!checkedProduct.length) {
    showToast({
      message: 'Пожалуйста, выберите хотя бы один товар.',
      wordBreak: 'break-word',
    })
    return
  }

  // 缓存已经选择的商品信息
  localStorage.setItem('ec-checkedProduct', JSON.stringify(checkedProduct))
  router.push({
    name: 'OrderConfirm'
  })
}
</script>

<style scoped lang="scss">
.cart {
  padding: 20px 24px;
  padding-bottom: 0;
  position: relative;

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