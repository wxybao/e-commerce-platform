<template>
  <div class="address-list">
    <NavBar/>
    <div class="page-title">Адреса</div>

    <div class="mt-8">
      <template v-if="hasInit && !addressList.length">
        <van-empty :image-size="160" description="Адрес не добавлен."/>
      </template>
      <template v-else>
        <AddressItem @click="chooseAddress(address)" v-for="address in addressList" :address="address" :key="address.id" @del="delAddressList"/>
      </template>
    </div>
    <div class="add-address flex-left" @click="gotoUrl()"><img src="../assets/add.png"/>Добавить адрес</div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {user_address} from "@/api/api.js";
import {showToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import NavBar from "@/components/NavBar.vue";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";
import AddressItem from "@/components/AddressItem.vue";

const route = useRoute()
const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

const from = route.query?.from || ''

const router = useRouter()
const hasInit = ref(false)
const addressList = ref([])
const pageIndex = 0

onMounted(() => {
  getAddressList()
})

function getAddressList() {
  user_address({
    limit: 100,
    offset: pageIndex,
    userId: userInfo.value?.id || 0
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
  sessionStorage.removeItem('addressDetail')
  router.push({
    name: 'AddressDetail'
  })
}

function chooseAddress(detail) {
  if(from){
    router.push({
      name: 'OrderConfirm',
      query: {
        addressId: detail.id
      }
    })
  }
}
</script>

<style scoped lang="scss">
.address-list {
  padding: 20px 24px;

  .mt-i-8 {
    margin-top: 8px !important;
  }

  :deep(.address-list-item) {
    padding: 24px 0;
    border-bottom: 1px solid #E0E5EB;
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