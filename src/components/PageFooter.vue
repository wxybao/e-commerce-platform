<template>
  <div class="page-footer">
    <div class="text-23 title">{{ info.bottomTitle }}</div>
    <div class="mt-12 color2" style="line-height: 1.8" v-html="info.bottomText"></div>

    <div class="line"></div>

    <div class="text-12">
      <span class="color1">Copyright © 2025</span>
      <span class="color2"> TG E-Commerce</span>
    </div>
  </div>
</template>

<script setup>
import {shop_info} from "@/api/api.js";
import {onMounted, ref} from "vue";

const info = ref({})
onMounted(() => {
  getInit()
})

async function getInit() {
  const res = await shop_info()

  if (res.code === '0') {
    info.value = res.data || {}
    if(info.value.bottomText){
      info.value.bottomText = info.value.bottomText.replace(/\n/g, '<br/>')
    }
  }
}
</script>

<style scoped lang="scss">
.page-footer {
  color: #FFFFFF;
  background: #222934;
  padding: 48px 16px 24px 16px;
  text-align: center;

  .title {
    font-weight: bold;
  }

  .color1 {
    color: #CAD0D9;
    font-weight: 300;
  }

  .color2 {
    color: #E0E5EB;
    font-weight: 500;
  }

  .line {
    border-bottom: 1px solid #333D4C;
    margin: 49px 0;
  }
}
</style>