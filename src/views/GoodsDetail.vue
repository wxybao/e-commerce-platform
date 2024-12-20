<template>
  <div class="detail">
    <NavBar/>
    <div class="product-img">
      <van-swipe v-if="productDetail.productImageList && productDetail.productImageList.length"
                 :autoplay="5000">
        <van-swipe-item v-for="(item,index) in productDetail.productImageList" :key="index">
          <img :src="item.imageUrl"/>
        </van-swipe-item>
      </van-swipe>
      <div class="share-icon" @click="shareProduct()">
        <van-icon name="share"/>
      </div>
    </div>

    <div class="product-content">
      <div class="product-name">
        {{ productDetail.name }}
      </div>

      <div class="product-price">${{ productDetail.salePrice }} USDT</div>

      <div class="flex-between mt-20">
        <van-stepper v-model="productNum" :min="1" :max="99" button-size="44px" input-width="70px" integer
                     class="input-stepper"/>
        <van-button class="add-btn" type="primary" :loading="loading" @click="addToCart()">КУПИТЬ СЕЙЧАС</van-button>
      </div>

      <div class="product-desc">{{ productDetail.shortIntro }}</div>
    </div>
    <div class="product-info" v-if="productDetail.introImgList && productDetail.introImgList.length">
      <img v-for="item in productDetail.introImgList" :src="item"/>
    </div>

    <PageFooter/>
  </div>
</template>

<script setup>
import PageFooter from "@/components/PageFooter.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import NavBar from "@/components/NavBar.vue";
import {add_cart, get_cart, product_detail} from "@/api/api.js";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user.js";
import {showFailToast, showSuccessToast} from "vant";

const route = useRoute()
const productId = Number(route.query.id || 0)

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

const productDetail = ref({})
const productNum = ref(1)

const loading = ref(false)

onMounted(() => {
  getProductDetail()
})

async function getProductDetail() {
  try {
    const res = await product_detail(productId)

    if (res.code === '0') {
      productDetail.value = res.data || {}
    }
  } catch (e) {
    showFailToast('Не найден товар')
  }
}

async function addToCart() {
  const cartInfo = await get_cart(userInfo.value?.id)
  let cartList = []
  if (cartInfo.code === '0') {
    cartList = cartInfo.data?.shoppingCartDetailList || []
  }

  const shoppingCartDetail = {
    coverIs: false,
    marketPrice: productDetail.value.salePrice,
    masterImageUrl: productDetail.value.masterImageUrl,
    productId: productId,
    productName: productDetail.value.name,
    productState: productDetail.value.state,
    qty: productNum.value,
    salePrice: productDetail.value.salePrice,
    selectIs: true
  }

  if (cartList.length) {
    const existItem = cartList.find(item => item.productId === productId)
    if (existItem) {
      shoppingCartDetail.coverIs = true
      shoppingCartDetail.qty = productNum.value + existItem.qty
      shoppingCartDetail.selectIs = existItem.selectIs
    }
  }

  loading.value = true

  try {
    const res = await add_cart({
      shoppingCartDetailList: [shoppingCartDetail],
      userId: userInfo.value?.id
    })

    if (res.code === '0') {
      showSuccessToast('Повышенной проходимости gokart')
    }
  } catch (e) {

  } finally {
    loading.value = false
  }
}

// 分享按钮点击
function shareProduct(){
  const url = window.location.href
  window.open(`https://t.me/share/url?url=${url}&text=${productDetail.value.shortIntro}`, '_blank')
}
</script>

<style scoped lang="scss">
.product-img {
  height: 100vw;
  position: relative;

  .van-swipe {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .share-icon {
    background: #F5F5F5;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
}

.product-content {
  padding: 30px 24px;
  background: #FFFFFF;

  .product-name {
    font-size: 28px;
    line-height: 36px;
    font-weight: bold;
  }

  .product-price {
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
    margin-top: 32px;
  }

  :deep(.van-stepper) {
    .van-stepper__minus:before, .van-stepper__plus:before {
      width: 15px;
    }

    .van-stepper__minus:after, .van-stepper__plus:after {
      height: 15px;
    }
  }

  .product-desc {
    line-height: 22px;
    font-weight: bold;
    margin-top: 20px;
  }

  .add-btn {
    width: 155px;
  }
}

.product-info {
  margin-top: 24px;
  background: #F5F7FA;
  padding: 32px 24px;

  img {
    width: 100%;
    object-fit: cover;
  }
}

.title {
  color: #181D25;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
}
</style>