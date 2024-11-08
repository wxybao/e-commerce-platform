<template>
  <div class="address-list">
    <div class="title">Адреса</div>

    <div class="mt-8">
      <AddressItem v-for="(item, index) in addressList" :key="index" @click="gotoUrl(item.id)">
      </AddressItem>
    </div>
    <div class="add-address flex-left" @click="gotoUrl()"><img src="../assets/add.png"/>Добавить адрес</div>
  </div>
</template>

<script setup>
import AddressItem from "@/components/AddressItem.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const addressList = ref([1, 2])

function gotoUrl() {
  router.push({name: 'AddressDetail', params: {id: 1}})
}
</script>

<style scoped lang="scss">
.address-list {
  padding: 20px 24px;

  .title {
    font-size: 32px;
    line-height: 42px;
    font-weight: bold;
  }

  .add-address {
    color: #222934;
    margin-top: 34px;

    img {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
}
</style>