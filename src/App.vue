<template>
  <RouterView/>
</template>

<script setup>
if (window.Telegram) {
  window.Telegram.WebApp.disableVerticalSwipes();
  window.Telegram.WebApp.enableClosingConfirmation();
  window.Telegram.WebApp.expand()
}
</script>

<style scoped>
</style>
