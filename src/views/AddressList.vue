<template>
  <div class="address-list">
    <NavBar v-if="!showBuy"/>
    <div class="title">Адреса</div>

    <div class="mt-8">
      <template v-if="hasInit && !addressList.length">
        <van-empty :image-size="showBuy ? 110 : 160" :style="showBuy ? 'padding: 0' : ''"
                   description="Адрес не добавлен."/>
      </template>
      <template v-else>
        <div class="address-list-item" v-for="address in addressList" :key="address.id">
          <div class="flex-left">
            <div class="qi mr-10">{{ address.name }} {{ address.phone }}</div>
            <div class="line-under mr-16" @click="gotoUrl(address)">Редактировать</div>
            <div class="line-under" @click="delAddressList(address.id)">Удалить</div>
          </div>

          <ul class="address-ul">
            <li>Город：{{ address.city }}</li>
            <li>Улица：{{ address.street }}</li>
            <li>Номер здания：{{ address.buildingNo }}</li>
            <li>Единица：{{ address.unit }}</li>
            <li>Вызов в здание：{{ address.buildingCall }}</li>
          </ul>

          <van-button v-if="showBuy" :loading="buyLoading" loading-text="Выбрать" class="mt-i-8" type="primary" color="#F55266"
                      @click="buyClick(address)">Выбрать
          </van-button>
        </div>
      </template>
    </div>
    <div class="add-address flex-left" @click="gotoUrl()"><img src="../assets/add.png"/>Добавить адрес</div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {del_address, user_address} from "@/api/api.js";
import {showConfirmDialog, showSuccessToast, showToast} from "vant";
import {useRouter} from "vue-router";
import NavBar from "@/components/NavBar.vue";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";

const props = defineProps({
  showBuy: {
    type: Boolean,
    default: false
  },
  fromParam: {
    type: Object,
    default: () => {
      return {}
    }
  },
  buyLoading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['buyClick'])
const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

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
  showConfirmDialog({
    title: 'Удалить',
    message:
      'Вы уверены, что удалите адрес?',
  }).then(() => {
    del_address(id).then(res => {
      showSuccessToast('Удалить успешно')

      const ind = addressList.value.findIndex(item => item.id === id)
      if (ind > -1) {
        addressList.value.splice(ind, 1)
      }

    }).catch(err => {
      showToast({
        message: err.msg || 'Удаление не удалось',
        wordBreak: 'break-word',
      })
    })
  }).catch(() => {
  });
}

function gotoUrl(detail) {
  if (detail) {
    sessionStorage.setItem('addressDetail', JSON.stringify(detail))
    router.push({name: 'AddressDetail'})
  }

  if (Object.keys(props.fromParam).length) {
    sessionStorage.setItem('fromParam', JSON.stringify(props.fromParam))
  }

  router.push({
    name: 'AddressDetail'
  })
}

function buyClick(address) {
  emits('buyClick', address)
}
</script>

<style scoped lang="scss">
.address-list {
  padding: 20px 24px;

  .mt-i-8 {
    margin-top: 8px !important;
  }

  .title {
    font-size: 32px;
    line-height: 42px;
    font-weight: bold;
  }

  .address-list-item {
    padding: 24px 0px;
    border-bottom: 1px solid #E0E5EB;
    color: #4E5562;

    .qi {
      font-weight: bold;
      color: #181D25;
      font-size: 16px;
    }

    .line-under {
      text-decoration: underline;
      cursor: pointer;
    }

    .address-ul {
      margin-top: 16px;
      list-style: disc;
      margin-left: 22px;

      li {
        line-height: 26px;
      }
    }
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