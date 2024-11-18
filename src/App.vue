<template>
  <RouterView/>
</template>

<script setup>
window.Telegram.WebApp.disableVerticalSwipes();
window.Telegram.WebApp.enableClosingConfirmation();
window.Telegram.WebApp.expand()
</script>

<style scoped>
</style>
