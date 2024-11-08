<template>
  <van-config-provider :theme-vars="themeVars">
    <van-tabbar v-model="active" placeholder :border="false" @change="onChange">
      <van-tabbar-item name="home">
        <span>Дом</span>
        <template #icon="props">
          <template v-if="props.active">
            <img src="../assets/tabbar-home-active.png"/>
          </template>
          <template v-else>
            <img src="../assets/tabbar-home.png"/>
          </template>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="person">
        <span>Аккаунт</span>
        <template #icon="props">
          <template v-if="props.active">
            <img src="../assets/tabbar-user-active.png"/>
          </template>
          <template v-else>
            <img src="../assets/tabbar-user.png"/>
          </template>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </van-config-provider>
</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";

const active = defineModel()

const themeVars = reactive({
  tabbarHeight: '70px',
  tabbarBackground: '#121212',
  tabbarItemTextColor: '#A9A9A9',
  tabbarItemActiveColor: '#F26F3F',
  'tabbar-item-active-background': '#121212'
})

const router = useRouter()

function onChange(index) {
  if (index === 'home') {
    router.replace({name: 'Home'})
  } else {
    router.replace({name: 'PersonalCenter'})
  }
}
</script>

<style scoped lang="scss">
:deep(.van-tabbar-item) {
  font-size: 15px;
  font-weight: bold;

  .van-tabbar-item__icon img {
    height: 30px;
  }
}
</style>