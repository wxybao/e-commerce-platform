<template>
  <van-nav-bar
    title=""
    left-text=""
    left-arrow
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onClickLeft"
  />
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const onClickLeft = () => router.back()
</script>

<style scoped lang="scss">

</style>