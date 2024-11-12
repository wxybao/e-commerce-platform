<template>
  <div class="address-list-item">
    <div class="flex-left">
      <div class="qi mr-10">Qi {{ address.phone }}</div>
      <div class="line-under mr-16" @click="gotoUrl(address)">Редактировать</div>
      <div class="line-under" @click="delAddress(address.id)">Удалить</div>
    </div>

    <ul class="address-ul">
      <li>Город：{{ address.city }}</li>
      <li>Улица：{{ address.street }}</li>
      <li>Номер здания：{{ address.buildingNo }}</li>
      <li>Единица：{{ address.unit }}</li>
      <li> Вызов в здание：{{ address.buildingCall }}</li>
    </ul>

    <slot v-if="$slots.footer" name="footer"></slot>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {del_address} from "@/api/api.js";
import {showConfirmDialog, showSuccessToast, showToast} from "vant";

const emit = defineEmits(['del'])
const props = defineProps({
  address: {
    type: Object,
    default: () => {
      return {}
    }
  },
  fromPage: {
    type: String,
    default: 'AddressList'
  }
})

const router = useRouter()

function gotoUrl() {
  sessionStorage.setItem('addressDetail', JSON.stringify(props.address))
  router.push({name: 'AddressDetail', query: {from: props.fromPage}})
}

function delAddress(id) {
  showConfirmDialog({
    title: 'Удалить',
    message:
      'Вы уверены, что удалите адрес?',
  }).then(() => {
    del_address(id).then(res => {
      showSuccessToast('Удалить успешно')
      emit('del', id)
    }).catch(err => {
      showToast({
        message: err.msg || 'Удаление не удалось',
        wordBreak: 'break-word',
      })
    })
  }).catch(() => {
  });
}
</script>

<style scoped lang="scss">
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
</style>