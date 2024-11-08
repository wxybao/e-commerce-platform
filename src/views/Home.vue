<template>
  <div class="home">
    <div class="home-content">
      <van-swipe class="swipe" :autoplay="3000">
        <van-swipe-item>
          <img src="../assets/banner-1.png"/>
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/banner-2.png"/>
        </van-swipe-item>
      </van-swipe>

      <div class="title mt-25">Премиальное качество по доступным ценам - откройте для себя несравненные возможности в
        мире картинга.
      </div>

      <div class="flex">
        <div class="flex-1 mr-8 goods-card" @click="gotoDetail()">
          <div class="img-box"><img src="@/assets/goods-1.png"/></div>
          <div class="goods-title">Повышенной<br/>проходимости<br/>gokart</div>
          <div class="goods-price">$599.00 USDT</div>
          <div class="goods-price-line">$649.0 USDT</div>
        </div>
        <div class="flex-1 goods-card">
          <div class="img-box"><img src="@/assets/goods-2.png"/></div>
          <div class="goods-title">Повышенной<br/>проходимости<br/>gokart (pro)</div>
          <div class="goods-price">$875.00 USDT</div>
          <div class="goods-price-line">$920.00 USDT</div>
        </div>
      </div>

      <div class="mt-23">
        <img width="100%" src="@/assets/home-1.png"/>
      </div>

      <div class="mt-20 flex-center">
        <img width="64" src="@/assets/home-2.png"/>
      </div>

      <div class="title mt-24">Почему выбирают нас</div>
      <div class="desc mt-15">Миссия Redrocketkarting - предлагать высококачественные и доступные внедорожные картинги
        каждому водителю. Не все картинги стоят дорого, и они не ограничиваются только ровными трассами. Мы надеемся,
        что каждый, кто интересуется картингом, сможет легко его приобрести.
      </div>
      <div class="title mt-20">Прямые продажи с завода, гарантия качества.</div>

      <van-collapse class="collapse" v-model="activeCollapse" :border="false">
        <van-collapse-item v-for="item in collapseList" :key="item.title" :title="item.title" :name="item.name">
          <div class="collapse-text-box">
            <div class="collapse-text-box-title" v-if="item.secondTitle">{{ item.secondTitle }}</div>
            <div class="collapse-text-box-desc">{{ item.desc }}</div>

            <van-swipe class="collapse-text-box-swipe" :autoplay="5000">
              <van-swipe-item v-for="swip in item.swipeList" :key="swip.title">
                <div class="flex-left">
                  <div class="collapse-text-box-swipe-img"></div>
                  <div class="collapse-text-box-swipe-title">{{ swip.title }}</div>
                </div>
                <div class="collapse-text-box-swipe-desc">
                  {{ swip.desc }}
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
        </van-collapse-item>
      </van-collapse>

      <div class="last-content">
        <div class="last-content-item" v-for="(item,index) in lastList" :key="index">
          <div class="flex-center img-box"><img :src="getImageUrl(item.src)"/></div>
          <div class="last-content-item-title">{{ item.title }}</div>
          <div class="last-content-item-desc">{{ item.desc }}</div>
        </div>
      </div>

    </div>
    <PageFooter/>
    <TabBar v-model="activeTab"/>
  </div>

</template>

<script setup>
import PageFooter from "@/components/PageFooter.vue";
import TabBar from "@/components/TabBar.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const activeTab = ref('home')

const activeCollapse = ref([])

const collapseList = ref([
  {
    name: '1',
    title: 'Безопасность превыше всего',
    secondTitle: '',
    desc: 'When it comes to off-road driving, safety is paramount. At RocketKarting, we believe that adventure and safety go hand in hand. That’s why we’ve designed our all-terrain go-karts with a host of advanced safety features to ensure that every ride is as secure as it is thrilling. In this blog post, we’ll dive into the key safety elements that make RocketKarting go-karts the safest choice for off-road enthusiasts.',
    swipeList: [{
      title: 'Усиленные каркасы безопасности',
      desc: 'Одна из самых важных функций безопасности в любом внедорожном транспортном средстве — это каркас безопасности, и RocketKarting уделяет этому элементу особое внимание. Наши картинги оснащены усиленными каркасами, которые обеспечивают надежную защиту в случае опрокидывания. Эти каркасы спроектированы для поглощения удара и защиты водителя, гарантируя вашу безопасность даже в сложных условиях вождения.',
    }]
  }, {
    name: '2',
    title: 'Безграничные возможности персонализации',
    secondTitle: 'Безграничные возможности персонализации:',
    desc: 'Одна из самых захватывающих особенностей владения внедорожным картом RocketKarting — это возможность настроить его по своему вкусу. В отличие от многих стандартных внедорожных транспортных средств, RocketKarting предлагает широкий спектр вариантов настройки, которые позволяют создать карт, который будет по-настоящему вашим. В этом блоге мы рассмотрим различные способы, которыми вы можете персонализировать свой карт RocketKarting, чтобы он идеально соответствовал вашему духу приключений.',
    swipeList: [{
      title: 'Двигатель и производительность',
      desc: 'Когда дело доходит до внедорожного вождения, двигатель является сердцем вашего транспортного средства. RocketKarting предлагает несколько вариантов двигателей, которые соответствуют различным требованиям к производительности. Если вы ищете мощный двигатель, способный преодолевать крутые подъемы, или более экономичный вариант для длительных приключений, у нас есть что предложить. Вы можете выбрать двигатель, который соответствует вашему стилю вождения и типам местности, которые вы планируете покорить.',
    }]
  }, {
    name: '3',
    title: 'Абсолютный внедорожный опыт',
    secondTitle: ' почему картинги RocketKarting лидируют в своем классе',
    desc: 'Когда речь идет о внедорожных приключениях, правильный транспорт играет ключевую роль. Внедорожные картинги RocketKarting созданы для искателей острых ощущений, которые жаждут приключений и требуют высокой производительности. Вот почему наши картинги являются идеальным выбором для любителей внедорожья.',
    swipeList: [{
      title: 'Непревзойденная прочность',
      desc: 'Одной из ключевых особенностей, которая выделяет RocketKarting, является прочность наших картингов. Изготовленные из высококачественных материалов, эти транспортные средства созданы для того, чтобы выдерживать самые суровые условия. Независимо от того, мчитесь ли вы по грязным тропам, преодолеваете каменистую местность или катаетесь по песчаным дюнам, картинги RocketKarting способны справиться с любыми трудностями. Укреплённая рама и надежные системы подвески гарантируют, что ваш картинг останется в отличном состоянии даже после бесчисленных приключений.',
    }]
  }])

const lastList = ref([
  {
    src: '../assets/home-last-1.png',
    title: 'Бесплатная доставка по воздуху',
    desc: 'Бесплатная доставка по всем заказам'
  },
  {
    src: '../assets/home-last-2.png',
    title: '100% гарантия оплаты',
    desc: 'Мы обеспечиваем безопасную оплату с помощью PEV.'
  },
  {
    src: '../assets/home-last-3.png',
    title: 'Мы гарантируем безопасную оплату с PEV',
    desc: 'Просто верните его в течение 30 дней для обмена.'
  },
  {
    src: '../assets/home-last-4.png',
    title: 'Поддержка 24/7',
    desc: 'Свяжитесь с нами 24 часа в сутки, 7 дней в неделю'
  },
])

function getImageUrl(url) {
  return new URL(url, import.meta.url).href;
}

function gotoDetail() {
  router.push({
    name: 'GoodsDetail'
  })
}
</script>

<style scoped lang="scss">
.home {
  &-content {
    padding: 24px 16px;

    :deep(.van-swipe__indicator) {
      background: #222934;
    }

    .swipe {
      border-radius: 12px;
      overflow: hidden;

      img {
        width: 100%;
      }

      :deep(.van-swipe__indicators) {
        transform: scale(2) translate(-50%);
      }
    }

    .title {
      font-weight: bold;
      font-size: 20px;
      line-height: 27px;
      text-align: center;
    }

    .desc {
      color: #4E5562;
      line-height: 22px;
      padding: 0 8px;
    }

    .goods-card {
      padding: 0 8px;

      .img-box {
        padding: 16px;

        img {
          width: 100%;
        }
      }

      .goods-title {
        line-height: 20px;
      }

      .goods-price {
        font-size: 20px;
        line-height: 27px;
        margin-top: 8px;
        font-weight: bold;
      }

      .goods-price-line {
        color: #9CA3AF;
        text-decoration: line-through;
        line-height: 22px;
      }
    }

    .collapse {
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

        &-title {
          font-size: 25px;
          line-height: 31px;
          text-align: center;
          margin-bottom: 24px;
          color: #181D25;
          font-weight: bold;
        }

        &-desc {
          color: #4E5562;
          line-height: 22px;
        }

        &-swipe {
          margin-top: 24px;
          background: #FFFFFF;
          font-size: 16px;
          width: 100%;

          :deep(.van-swipe-item) {
            padding: 24px;
          }

          &-img {
            background: #EDEDED;
            width: 80px;
            height: 80px;
            margin-right: 12px;
          }

          &-title {
            font-weight: bold;
            line-height: 24px;
            color: #181D25;
            flex: 1;
          }

          &-desc {
            color: #4E5562;
            line-height: 24px;
            margin-top: 12px;
          }
        }
      }
    }

    .last-content {
      margin-top: 44px;
      display: grid;
      gap: 24px;
      grid-template-columns: repeat(2, 1fr);

      &-item {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        .img-box {
          width: 86px;
          height: 86px;
          background: #F5F7FA;
          border-radius: 50%;

          img {
            width: 32px;
            height: 32px;
          }
        }

        &-title {
          font-size: 16px;
          line-height: 24px;
          font-weight: bold;
          margin-top: 16px;
        }

        &-desc {
          color: #4E5562;
          line-height: 22px;
        }
      }
    }
  }
}
</style>