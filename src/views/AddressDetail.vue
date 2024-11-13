<template>
  <div class="address-detail">
    <NavBar/>
    <div class="title">Добавить адрес</div>

    <div class="map" id="map">

    </div>

    <van-form class="address-form" label-align="top" @submit="onSubmit" scroll-to-error>
      <van-field
        v-model="form.city"
        name="Город"
        label="Город"
        :rules="[{ required: true, message: 'Заполните имя пользователя.' }]"
      />
      <van-field
        v-model="form.street"
        name="Улица"
        label="Улица"
        :rules="[{ required: true, message: 'Заполните улицу, пожалуйста.' }]"
      />
      <van-field
        v-model="form.buildingNo"
        name="Номер здания"
        label="Номер здания"
        :rules="[{ required: true, message: 'Пожалуйста, заполните номер здания.' }]"
      />
      <div class="flex-left" style="gap: 24px">
        <van-field
          v-model="form.unit"
          name="Квартира"
          label="Квартира"
          :rules="[{ required: true, message: 'Пожалуйста, заполните номер здания.' }]"
        />
        <van-field
          v-model="form.buildingCall"
          name="Вызов в здание"
          label="Вызов в здание"
          :rules="[{ required: true, message: 'Пожалуйста, заполните номер здания.' }]"
        />
        <van-field
          v-model="form.floor"
          name="Этаж"
          label="Этаж"
          :rules="[{ required: true, message: 'Пожалуйста, заполните номер здания.' }]"
        />
      </div>

      <van-field
        v-model="form.name"
        name="Имя"
        label="Имя"
        :rules="[{ required: true, message: 'Пожалуйста, заполните номер здания.' }]"
      />
      <van-field
        v-model="form.phone"
        name="Телефон"
        label="Телефон"
        :rules="[{ required: true, message: 'Пожалуйста, заполните номер здания.' }]"
      />

      <div class="flex-left">
        <van-button type="primary" color="#F55266" native-type="submit">Выбрать</van-button>
        <van-button class="close-btn" type="primary" color="#EEF1F6" @click="cancel()">Закрыть</van-button>
      </div>
    </van-form>

  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {insert_address, upd_address} from "@/api/api.js";
import {showToast} from "vant";
import {useRouter} from "vue-router";
import NavBar from "@/components/NavBar.vue";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";

const router = useRouter()
const detail = sessionStorage.getItem('addressDetail') || ''

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

const form = ref({
  id: 0,
  userId: userInfo.value?.id,
  city: '',
  street: '',
  buildingCall: '',
  buildingNo: '',
  floor: '',
  name: '',
  phone: '',
  unit: ''
})

if (detail) {
  form.value = JSON.parse(detail)
  sessionStorage.removeItem('addressDetail')
}

onMounted(() => {
  // initMap()
});

onBeforeUnmount(() => {
  sessionStorage.removeItem('fromParam')
})


async function initMap() {
  // The `ymaps3.ready` promise will be resolved when all the API components are loaded
  await ymaps3.ready;

  const {YMap, YMapDefaultSchemeLayer} = ymaps3;

  // Map creation
  const map = new YMap(
    // Pass the link to the HTMLElement of the container
    document.getElementById('map'),

    // Pass the initialization parameters
    {
      location: {
        // The map center coordinates
        center: [25.229762, 55.289311],

        // Zoom level
        zoom: 10
      }
    }
  );

  // Add a layer to display the schematic map
  map.addChild(new YMapDefaultSchemeLayer());
}


function cancel() {
  const fromParam = sessionStorage.getItem('fromParam')
  let fromInfo = {
    name: 'AddressList',
    query: {}
  }
  if (fromParam) {
    fromInfo = JSON.parse(fromParam)
    sessionStorage.setItem('fromAddress', 1)
  }
  console.log(fromInfo)
  router.replace({
    name: fromInfo.name,
    query: fromInfo.query
  })
}

const onSubmit = (values) => {
  if (form.value.id) {
    upd_address(form.value).then(res => {
      if (res.code === "0") {
        cancel()
      }
    }).catch(err => {
      showToast({
        message: err.msg || 'провал',
        wordBreak: 'break-word',
      })
    })
  } else {
    insert_address(form.value).then(res => {
      if (res.code === "0") {
        cancel()
      }
    }).catch(err => {
      showToast({
        message: err.msg || 'провал',
        wordBreak: 'break-word',
      })
    })
  }
};
</script>

<style scoped lang="scss">
.address-detail {
  padding: 20px 24px;

  .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }

  .map {
    height: 200px;
    margin-top: 24px;
    background: #D9D9D9;
  }

  .address-form {
    margin-top: 24px;

    :deep(.van-cell) {
      padding: 0;
      margin-bottom: 24px;

      .van-field__label {
        color: #181D25;
        margin-bottom: 8px;
      }

      .van-field__body {
        border: 1px solid #CAD0D9;
        border-radius: 8px;
        height: 40px;
        padding: 0 10px;
      }
    }

    .close-btn {
      margin-left: 16px;
      color: #333D4C !important;
    }
  }
}
</style>