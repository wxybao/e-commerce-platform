<template>
  <van-config-provider :theme-vars="themeVars">
    <van-tabbar v-model="active" placeholder :border="false" @change="onChange">
      <van-tabbar-item v-for="item in tabs" :key="item.text" :name="item.name">
        <span>{{ item.text }}</span>
        <template #icon="props">
          <component class="text-30" :is="props.active ? item.activeIcon : item.icon"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </van-config-provider>
</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import IconParkSolidHomeTwo from "@/assets/svg/tabbar/IconParkSolidHomeTwo.vue";
import IconParkOutlineHomeTwo from "@/assets/svg/tabbar/IconParkOutlineHomeTwo.vue";
import IconParkOutlineClassroom from "@/assets/svg/tabbar/IconParkOutlineClassroom.vue";
import IconParkSolidClassroom from "@/assets/svg/tabbar/IconParkSolidClassroom.vue";
import IconParkSolidShopping from "@/assets/svg/tabbar/IconParkSolidShopping.vue";
import IconParkOutlineShopping from "@/assets/svg/tabbar/IconParkOutlineShopping.vue";

const active = defineModel()

const tabs = [{
  text: 'Главная',
  name: 'Home',
  icon: IconParkOutlineHomeTwo,
  activeIcon: IconParkSolidHomeTwo
}, {
  text: 'покупок',
  name: 'Cart',
  icon: IconParkOutlineShopping,
  activeIcon: IconParkSolidShopping
}, {
  text: 'Аккаунт',
  name: 'PersonalCenter',
  icon: IconParkOutlineClassroom,
  activeIcon: IconParkSolidClassroom
}]

const themeVars = reactive({
  tabbarHeight: '70px',
  tabbarBackground: '#4c4c4c',
  tabbarItemTextColor: '#A9A9A9',
  'tabbar-item-active-background': '#4c4c4c'
})

const router = useRouter()

function onChange(index) {
  router.replace({name: index})
}
</script>

<style scoped lang="scss">
:deep(.van-tabbar-item) {
  font-size: 15px;
  font-weight: bold;

  .van-tabbar-item__icon svg {
    height: 30px;
  }
}
</style>