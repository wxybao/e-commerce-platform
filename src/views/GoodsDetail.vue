<template>
  <div class="detail">
    <NavBar/>
    <div class="product-content">
      <div class="product-img">
        <template v-if="productId === 1"><img src="../assets/goods-1.png"/></template>
        <template v-else><img src="../assets/goods-2.png"/></template>
      </div>
      <div class="product-name">
        {{ productId === 1 ? 'Повышенной проходимости gokart' : 'Повышенной проходимости gokart (pro)' }}
      </div>

      <div class="mt-30">
        <div class="flex-left">
          <span class="font-bold">Color：</span>
          <span class="color-4E5562">{{ colors[activeColor].name }}</span>
        </div>
        <div class="color-list">
          <div class="color-list-item" :class="{active: index === activeColor}"
               v-for="(item, index) in colors" :key="index" :style="{'--color': item.color}"
               @click="activeColor = index"></div>
        </div>
      </div>

      <div class="product-price">${{ productId === 1 ? '599.00' : '875.00' }} USDT</div>

      <div class="flex-between mt-20">
        <van-stepper v-model="productNum" :min="1" :max="99" button-size="44px" input-width="70px" integer
                     class="mr-20 input-stepper"/>
        <van-button type="primary" color="#F55266" @click="showAddress()">КУПИТЬ СЕЙЧАС</van-button>
      </div>

      <div class="product-desc">Время транспортировки составляет approximately 15-20 дней.</div>
    </div>

    <div class="desc-content">
      <div class="content-box">
        <div class="content-box-wrapper" v-for="(item, index) in descList" :key="index">
          <div class="content-box-title">{{ item.title }}</div>
          <div class="content-box-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>

    <div class="collapse-content">
      <van-collapse class="collapse" v-model="activeCollapse" :border="false">
        <van-collapse-item v-for="item in collapseList" :key="item.title" :title="item.title" :name="item.name">
          <div class="collapse-text-box">
            <div class="collapse-text-box-bg">
              <div v-if="item.name === '1'">
                <div class="collapse-text-box-img mr-i-0 height-full">
                  <img src="../assets/collapse-1-1.png"/>
                </div>
                <div class="collapse-text-box-desc font-bold">90cc двухтактный двигатель, обеспечивающий 2.5 лошадиные
                  силы и способный развивать максимальную скорость до 45 км/ч. Вы можете настроить его, установив ваш
                  предпочтительный двигатель.
                </div>
              </div>

              <div v-if="item.name === '2'">
                <div class="collapse-text-box-img mr-i-0 height-full">
                  <img src="../assets/collapse-2-1.png"/>
                </div>
                <div class="collapse-text-box-desc font-bold">Улучшенная передняя подвеска без труда поглощает каждую
                  неровность, обеспечивая стабильную и захватывающую поездку по любой местности.
                </div>
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="title">Время транспортировки составляет около  15-20 дней.</div>

    <div class="collapse-content">
      <van-collapse class="collapse" v-model="activeCollapse2" :border="false">
        <van-collapse-item v-for="item in collapseList2" :key="item.title" :title="item.title" :name="item.name">
          <div class="collapse-text-box">
            <div class="collapse-text-box-bg">
              <div class="">Добро пожаловать на</div>
              <a href="https://www.rocketkarting.com">www.rocketkarting.com</a>
              <div class="collapse-text-box-img">
                <img src="../assets/collapse-3-1.png"/>
              </div>
              <div class="collapse-text-box-desc">
                На обширной местности каждый любитель приключений мечтает о картинге, который не ограничен гладкими
                трассами. И так появился Off-Road Pioneer — бренд, посвященный предоставлению всем незабываемого
                внедорожного опыта.
              </div>

              <div class="collapse-text-box-img">
                <img src="../assets/collapse-3-2.png"/>
              </div>
              <div class="collapse-text-box-desc">
                Наша история началась с группы инженеров и дизайнеров, увлеченных внедорожьем. Они были недовольны
                традиционными картингами, которые могли работать только на специализированных трассах и не могли
                удовлетворить потребности настоящих искателей приключений. Они решили создать транспортное средство,
                способное покорять любую местность — будь то грязные тропы, каменистые участки или обширные песчаные
                дюны.
              </div>
              <div class="collapse-text-box-img">
                <img src="../assets/collapse-3-3.png"/>
              </div>
              <div class="collapse-text-box-desc">
                В Off-Road Kart мы верим, что настоящее приключение означает бесстрашное преодоление всех трудностей.
                Именно поэтому наши картинги отличаются инновационным дизайном и прочными материалами, что гарантирует,
                что, независимо от того, что вас ждет впереди, вы будете уверенно справляться с любыми препятствиями.
                Независимо от того, пересекаете ли вы леса или исследуете дикую природу, наши картинги обеспечивают
                неповторимое удовольствие от вождения.
              </div>
              <div class="collapse-text-box-img">
                <img src="../assets/collapse-3-4.png"/>
              </div>
              <div class="collapse-text-box-desc">
                Мы также стремимся сделать высококачественные внедорожные картинги доступными по самым разумным ценам.
                Будучи прямым производителем, мы исключаем посредников и передаем экономию вам, обеспечивая наилучшее
                соотношение цены и качества. Кроме того, мы предлагаем настраиваемые двигатели, что позволяет вам
                адаптировать транспортное средство под ваши потребности и стиль вождения, раскрывая ваше полное
                стремление к скорости и мощи.
              </div>
              <div class="collapse-text-box-img">
                <img src="../assets/collapse-3-5.png"/>
              </div>
              <div class="collapse-text-box-desc">
                Каждый картинг Off-Road Kart воплощает нашу страсть к внедорожью и нашу преданность приключениям.
                Независимо от того, являетесь ли вы любителем острых ощущений или предпочитаете размеренную езду, мы
                надеемся, что вы найдете ту свободу и волнение, которых жаждете, с нашими картингами. Присоединяйтесь к
                нам в бесстрашном путешествии и начните свою собственную легенду приключений.
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <PageFooter/>

    <van-popup v-model:show="popupVisible" round position="bottom" :z-index="2"
               :style="{ height: '50%' }" class="popup-box">
      <div class="top-line"></div>

      <AddressList :fromParam="{name: 'GoodsDetail',query:{id: productId}}" show-buy
                   @buy-click="buyProduct"/>
    </van-popup>
  </div>
</template>

<script setup>
import PageFooter from "@/components/PageFooter.vue";
import {onMounted, ref} from "vue";
import AddressList from "@/views/AddressList.vue";
import {useRoute} from "vue-router";
import NavBar from "@/components/NavBar.vue";
import tonConnectUI from "@/ton/index.js";
import {save_order, wallet_address} from "@/api/api.js";
import {showToast} from "vant";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";

const route = useRoute()
const productId = Number(route.query.id || 0)

const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)

const from = sessionStorage.getItem('fromAddress') || ''

const activeColor = ref(0)

const productNum = ref(1)

let colors = []
if (productId === 1) {
  colors = [{
    color: '#5A7AA1',
    name: 'Blue',
  }]
} else {
  colors = [{
    color: '#EE7976',
    name: 'Red',
  }]
}

const descList = [
  {
    title: 'Максимальная скорость и мощность:',
    desc: 'достигает до 25 миль в час с двигателем 90cc двухтактного типа, обеспечивающим 2.5 лошадиные силы.'
  },
  {
    title: 'Грузоподъемность:',
    desc: 'поддерживает до 150 кг, что позволяет перевозить двух взрослых.'
  },
  {
    title: 'Настройка:',
    desc: 'возможность установки вашего предпочтительного двигателя.'
  },
  {
    title: 'Современная подвеска:',
    desc: 'способна справляться с спусками по лестнице.'
  },
  {
    title: 'Универсальная местность:',
    desc: 'идеальна для горных троп, лесных дорожек, травянистых полей и грязевых участков.'
  },
  {
    title: 'Ручной запуск:',
    desc: 'добавляет элемент элегантности.'
  },
  {
    title: 'Топливная эффективность:',
    desc: '1 доллар топлива хватает на 3 часа поездки.'
  }
]

const activeCollapse = ref([])
const activeCollapse2 = ref([])
const collapseList = [
  {
    title: 'Съемный двигатель',
    name: '1'
  },
  {
    title: 'Шесть систем подвески',
    name: '2'
  }
]
const collapseList2 = [
  {
    title: 'О нас',
    name: '3'
  },
]

const popupVisible = ref(false)

onMounted(() => {
  if (from) {
    sessionStorage.removeItem('fromAddress')
    showAddress()
  }
})

function showAddress() {
  popupVisible.value = true
}

async function buyProduct(address) {
  const currentIsConnectedStatus = tonConnectUI.connected;

  if (currentIsConnectedStatus) {
    setTransaction(address)
  } else {
    try {
      const res = await tonConnectUI.openModal()

      const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
        if (wallet && tonConnectUI.connected) {
          wallet_address({
            walletAddress: wallet.account.address,
            id: userInfo.value?.id
          })

          setTransaction(address)

          unsubscribe()
        }
      });
    } catch (e) {
      console.log(e)
    }
  }
}

function convertImageUrlToBase64(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); // 处理跨域问题
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    img.onerror = function (error) {
      reject(error);
    };
    img.src = url;
  });
}

async function setTransaction(address) {
  const currentAccount = tonConnectUI.account;
  const tonAddress = currentAccount?.address

  const img = await convertImageUrlToBase64(new URL(`../assets/goods-${productId}.png`, import.meta.url).href)

  save_order({
    walletAddress: tonAddress,
    "color": colors[activeColor.value].name,
    "image": img,
    "price": productId === 1 ? 599.00 : 875.00,
    "productName": productId === 1 ? 'Повышенной проходимости gokart' : 'Повышенной проходимости gokart (pro)',
    "qty": productNum.value,
    "userAddressId": address.id,
    "userId": userInfo.value?.id
  }).then(async res => {
    if (res.code === '0') {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: res.data.jettonWalletAddress,
            amount: "50000000",
            payload: res.data.idBase64
          }
        ]
      }

      try {
        const result = await tonConnectUI.sendTransaction(transaction);
      } catch (e) {
        console.error(e);
      }
    }
  }).catch(err => {
    showToast({
      message: err.msg,
      wordBreak: 'break-word',
    })
  })
}

</script>

<style scoped lang="scss">
.color-4E5562 {
  color: #4E5562;
}

.mr-i-0 {
  margin-top: 0 !important;
}

.product-content {
  padding: 30px 24px;
  background: #FFFFFF;

  .product-img {
    padding: 10px 0;
    height: 314px;

    img {
      margin: 0 auto;
      max-height: 314px;
    }
  }

  .product-name {
    font-size: 28px;
    line-height: 36px;
    font-weight: bold;
  }

  .color-list {
    display: flex;
    align-items: center;
    margin-top: 12px;
    gap: 18px;

    .color-list-item {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      position: relative;
      border: 1px solid transparent;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--color);
        transform: translate(-50%, -50%);
      }

      &.active {
        border: 1px solid var(--color);
      }
    }
  }

  .product-price {
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
    margin-top: 32px;
  }

  :deep(.van-stepper) {
    .van-stepper__minus:before, .van-stepper__plus:before {
      width: 15px;
    }

    .van-stepper__minus:after, .van-stepper__plus:after {
      height: 15px;
    }
  }

  .product-desc {
    line-height: 22px;
    font-weight: bold;
    margin-top: 20px;
  }
}

.desc-content {
  background: #F5F7FA;
  padding: 32px 24px;

  .content-box {
    background: #FFFFFF;
    padding: 24px;
    border-radius: 12px;

    .content-box-wrapper {
      &:not(:last-child) {
        margin-bottom: 35px;
      }

      .content-box-title {
        font-size: 16px;
        line-height: 24px;
        font-weight: bold;
      }

      .content-box-desc {
        line-height: 22px;
        color: #4E5562;
        margin-top: 6px;
      }
    }
  }
}

.title {
  color: #181D25;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
}

.collapse-content {
  background: #FFFFFF;
  padding: 20px 16px;

  :deep(.van-collapse-item) {
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      top: unset;
      bottom: 0;
      right: 0;
      left: 0;
      border-top: 1px solid #c9c9c9;
      transform: scaleY(.5);
    }

    .van-cell {
      padding: 16px 0;
      color: inherit;

      .van-cell__title {
        font-weight: bold;
        font-size: 16px;
      }

      .van-cell__right-icon {
        color: inherit;
      }
    }
  }

  :deep(.van-collapse-item__content) {
    padding: 0;
  }

  .collapse-text-box {
    background: #F5F7FA;
    padding: 32px 16px;

    &-bg {
      background: #FFFFFF;
      padding: 24px;
      color: #4E5562;
      font-size: 16px;
      border-radius: 12px;

      a {
        color: #4E5562;
        text-decoration: underline;
      }
    }

    &-img {
      width: 100%;
      height: 197px;
      margin-top: 12px;
      background: #EDEDED;
      object-fit: cover;

      &.height-full {
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-desc {
      margin-top: 12px;
    }
  }
}

.popup-box {
  padding: 15px 10px 10px 10px;

  .top-line {
    background: #FFFFFF;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    top: calc(50% + 5px);
    width: 50px;
    margin: 0 auto;
    border-bottom: 5px solid #222324;
    border-radius: 3px;
  }
}
</style>