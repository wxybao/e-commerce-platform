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
const onClickLeft = () => history.back()
</script>

<style scoped lang="scss">

</style>