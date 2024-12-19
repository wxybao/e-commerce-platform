<template>
  <div class="address-list-item" :key="address.id">
    <div class="flex-left">
      <div class="qi mr-10">{{ address.name }} {{ address.phone }}</div>
      <template v-if="!onlyShow">
        <div class="line-under mr-16" @click="gotoUrl(address)">Редактировать</div>
        <div class="line-under" @click="delAddressList(address.id)">Удалить</div>
      </template>
    </div>

    <ul class="address-ul">
      <li>Город：{{ address.city }}</li>
      <li>Улица：{{ address.street }}</li>
      <li>Номер здания：{{ address.buildingNo }}</li>
      <li>Единица：{{ address.unit }}</li>
      <li>Вызов в здание：{{ address.buildingCall }}</li>
    </ul>
  </div>
</template>

<script setup>
import {showConfirmDialog, showSuccessToast, showToast} from "vant";
import {del_address} from "@/api/api.js";
import {useRouter} from "vue-router";

const emits = defineEmits(['del'])

const props = defineProps({
  onlyShow: {
    type: Boolean,
    default: false
  },
  address: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const router = useRouter()

function delAddressList(id) {
  showConfirmDialog({
    title: 'Удалить',
    message:
      'Вы уверены, что удалите адрес?',
  }).then(() => {
    del_address(id).then(res => {
      showSuccessToast('Удалить успешно')

      emits('del', id)
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
  if (!detail) {
    return
  }

  sessionStorage.setItem('addressDetail', JSON.stringify(detail))
  router.push({
    name: 'AddressDetail'
  })
}
</script>

<style scoped lang="scss">
.address-list-item {
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
</style>