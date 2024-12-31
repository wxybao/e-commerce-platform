<template>
  <div class="home">
    <div class="home-content">
      <van-swipe class="swipe" :autoplay="3000">
        <van-swipe-item v-for="item in topProducts" :key="item.id" @click="gotoDetail(item.id)">
          <img :src="item.masterImageUrl"/>
        </van-swipe-item>
      </van-swipe>

      <div class="title mt-25">{{ pageInfo.topDesc }}</div>

      <van-row :gutter="[16, 16]" class="mt-20">
        <van-col span="12" v-for="item in productList" :key="item.id">
          <div class="flex-1 goods-card" @click="gotoDetail(item.id)">
            <div class="img-box"><img :src="item.masterImageUrl"/></div>
            <div class="goods-title overflowText">{{ item.name }}</div>
            <div class="goods-price">${{ item.salePrice }} USDT</div>
            <div class="goods-price-line">${{ item.marketPrice }} USDT</div>
            <van-button class="buy-btn" type="primary">Купить</van-button>
          </div>
        </van-col>
      </van-row>

      <div class="home-img" v-if="pageInfo.introImgUrlList && pageInfo.introImgUrlList.length">
        <img v-for="item in pageInfo.introImgUrlList" :src="item"/>
      </div>

    </div>
    <PageFooter/>
    <TabBar v-model="activeTab"/>
  </div>

</template>

<script setup>
import PageFooter from "@/components/PageFooter.vue";
import TabBar from "@/components/TabBar.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {product_list, shop_info} from "@/api/api.js";

const router = useRouter()

const activeTab = ref('Home')
const pageInfo = ref({})
const productList = ref([])
const topProducts = ref([])

onMounted(() => {
  getInit()
  getProducts()
})

async function getInit() {
  const res = await shop_info()

  if (res.code === '0') {
    pageInfo.value = res.data || {}
  }
}

async function getProducts() {
  topProducts.value = []
  productList.value = []

  const res = await product_list({
    limit: 1000,
    offset: 0
  })

  if (res.code === '0') {
    const products = res.data || []
    products.forEach(item => {
      if (item.topIs) {
        topProducts.value.push(item)
      } else {
        productList.value.push(item)
      }
    })

    topProducts.value.sort((a, b) => b.sort - a.sort)
    productList.value.sort((a, b) => b.sort - a.sort)
  }
}

function gotoDetail(id) {
  router.push({
    name: 'GoodsDetail',
    query: {
      id
    }
  })
}
</script>

<style scoped lang="scss">
.home {
  &-content {
    padding: 24px 16px;

    :deep(.van-swipe__indicator) {
      background: #222934;
    }

    .swipe {
      border-radius: 12px;
      overflow: hidden;

      img {
        width: 100%;
        height: calc(100vw - 32px);
        object-fit: cover;
      }

      .text-desc {
        color: #FFF;
        text-align: center;
        font-size: 32px;
        font-weight: 600;
        line-height: 41px;
        position: absolute;
        top: 32px;
        left: 0;
        right: 0;
        z-index: 2;
      }

      :deep(.van-swipe__indicators) {
        transform: scale(2) translate(-50%);
      }
    }

    .title {
      font-weight: bold;
      font-size: 20px;
      line-height: 27px;
      text-align: center;
    }

    .product-box {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .goods-card {
      padding: 0 8px;
      padding-bottom: 16px;
      border-radius: 8px;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.10);

      .img-box {
        padding: 16px 8px;

        img {
          height: calc((100vw - 32px - 16px) / 2 - 32px);
          max-width: 100%;
          margin: 0 auto;
        }
      }

      .goods-title {
        line-height: 20px;
      }

      .goods-price {
        font-size: 19px;
        line-height: 27px;
        margin-top: 8px;
        font-weight: bold;
      }

      .goods-price-line {
        color: #9CA3AF;
        text-decoration: line-through;
        line-height: 22px;
        font-size: 14px;
      }

      .buy-btn {
        width: 98px;
        margin-top: 5px;
        height: 40px;
      }
    }

    .home-img {
      margin-top: 20px;

      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>