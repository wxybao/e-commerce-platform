<template>
  <div class="address-list">
    <div class="title">Адреса</div>

    <div class="mt-8">
      <template v-if="hasInit && !addressList.length">
        <van-empty description="Адрес не добавлен."/>
      </template>
      <template v-else>
        <AddressItem fromPage="AddressList" v-for="(item, index) in addressList" :key="index" :address="item" @del="delAddressList">
        </AddressItem>
      </template>
    </div>
    <div class="add-address flex-left" @click="gotoUrl()"><img src="../assets/add.png"/>Добавить адрес</div>
  </div>
</template>

<script setup>
import AddressItem from "@/components/AddressItem.vue";
import {onMounted, ref} from "vue";
import {user_address} from "@/api/api.js";
import {showToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter()
const hasInit = ref(false)
const addressList = ref([])
const pageIndex = 1

onMounted(() => {
  getAddressList()
})

function getAddressList() {
  user_address({
    limit: 100,
    offset: pageIndex,
    userId: '1'
  }).then(res => {
    if (res.code === "0") {
      addressList.value = res.data || []
    }
  }).catch(err => {
    showToast({
      message: err.msg,
      wordBreak: 'break-word',
    })
  }).finally(() => {
    hasInit.value = true
  })
}

function delAddressList(id) {
  const ind = addressList.value.findIndex(item => item.id === id)
  if (ind > -1) {
    addressList.value.splice(ind, 1)
  }
}

function gotoUrl() {
  router.push({
    name: 'AddressDetail',
    query:{
      from: 'AddressList'
    }
  })
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