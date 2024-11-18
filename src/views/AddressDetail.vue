<template>
  <div class="address-detail">
    <NavBar/>
    <div class="title">Добавить адрес</div>

    <div class="map" id="map"></div>

    <van-form class="address-form" label-align="top" @submit="onSubmit" scroll-to-error>
      <van-field
        v-model="form.city"
        name="Город"
        label="Город"
        @blur="addressChange()"
        :rules="[{ required: true, message: 'Пожалуйста, заполните.' }]"
      />
      <van-field
        v-model="form.street"
        name="Улица"
        label="Улица"
        @blur="addressChange()"
        :rules="[{ required: true, message: 'Пожалуйста, заполните.' }]"
      />
      <van-field
        v-model="form.buildingNo"
        name="Номер здания"
        label="Номер здания"
        @blur="addressChange()"
        :rules="[{ required: true, message: 'Пожалуйста, заполните.' }]"
      />
      <div class="flex-left" style="gap: 24px">
        <van-field
          v-model="form.unit"
          name="Квартира"
          label="Квартира"
          :rules="[{ required: true, message: 'Пожалуйста, заполните.' }]"
        />
        <van-field
          v-model="form.buildingCall"
          name="Вызов в здание"
          label="Вызов в здание"
          :rules="[{ required: true, message: 'Пожалуйста, заполните.' }]"
        />
        <van-field
          v-model="form.floor"
          name="Этаж"
          label="Этаж"
          :rules="[{ required: true, message: 'Пожалуйста, заполните.' }]"
        />
      </div>

      <van-field
        v-model="form.name"
        name="Имя"
        label="Имя"
        :rules="[{ required: true, message: 'Пожалуйста, заполните.' }]"
      />
      <van-field
        v-model="form.phone"
        name="Телефон"
        label="Телефон"
        :rules="[{ required: true, message: 'Пожалуйста, заполните.' }]"
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
import {load} from "@2gis/mapgl";

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
  initMap()
});

onBeforeUnmount(() => {
  sessionStorage.removeItem('fromParam')

  if (map) {
    map.destroy()
  }
  if (marker) {
    marker.destroy()
  }
})

// 初始化地图
let map = null
let marker = null
const apiKey = '0f9177b1-b5b0-4a7d-bb1e-8a58b780a6c2';

// 初始化地图
async function initMap() {
  const mapglAPI = await load()
  let defaultCenter = [37.6173, 55.7558]
  map = new mapglAPI.Map('map', {
    center: defaultCenter,// 莫斯科
    zoom: 13,
    key: apiKey,
    lang: "ru",
  });

  map.on("click", handleMapClick)

  marker = new mapgl.Marker(map, {
    coordinates: defaultCenter
  });

  if (!navigator.geolocation) {
    // showToast('Геолокация не поддерживается в вашем браузере')
    return
  }

  // 浏览器读取位置获取当前地址信息
  navigator.geolocation.getCurrentPosition(async position => {
    const {latitude, longitude} = position.coords;
    const center = [longitude, latitude];

    map.setCenter(center)

    marker.setCoordinates(center)
  }, error => {
    // showToast('Не удалось определить ваше местонахождение')
  })

}

// 地图点击事件处理函数
const handleMapClick = (event) => {
  const coordinates = event.lngLat; // 获取点击的经纬度 [经度, 纬度]

  // 更新或创建标记
  if (!marker) {
    marker = new mapgl.Marker(map, {coordinates});
  } else {
    marker.setCoordinates(coordinates);
  }

  // 获取地址信息
  fetchLocationDetailsOrCoordinates(coordinates).then(address => {

  });
};

// 获取经纬度或者地址信息的函数
const fetchLocationDetailsOrCoordinates = async (param) => {
  if (!param) {
    return null
  }
  let url = null

  // 如果param是字符串则是获取坐标
  if (typeof param === 'string') {
    url = `https://catalog.api.2gis.com/3.0/items/geocode?q=${encodeURIComponent(param)}&key=${apiKey}`
  } else {
    const [lng, lat] = param;
    url = `https://catalog.api.2gis.com/3.0/items/geocode?lon=${lng}&lat=${lat}&key=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.result && data.result.items.length > 0) {
      console.log(data.result)
      if (typeof param === 'string') {
        const {lat, lon} = data.result.items[0].point;
        return {lat, lon};
      } else {
        const address = data.result.items[0].full_name;
        return address;
      }
    } else {
      return null
    }
  } catch (error) {
    return null
  }
};

// 地址改变时需要联动地图
function addressChange() {
  let address = `${form.value.city}|${form.value.street}|${form.value.buildingNo}|${form.value.unit}|${form.value.buildingCall}|${form.value.floor}`

  // 把|换成，并且去除连续的，以及开头结尾的，
  address = address.replace(/\|/g, '，').replace(/，{2,}/g, '，').replace(/^，|，$/g, '')


  console.log(address)
  if (!address) {
    return
  }
  fetchLocationDetailsOrCoordinates(address).then((coords) => {
    if (coords) {
      const center = [coords.lon, coords.lat]
      map.setCenter(center)
      marker.setCoordinates(center)
    }
  });
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