import './styles/main.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'
import '@/router/routerAuth'

import {
  Locale,
  Button,
  Tabbar,
  TabbarItem,
  ConfigProvider,
  Swipe,
  SwipeItem,
  Collapse,
  CollapseItem,
  Stepper,
  Popup,
  Image as VanImage,
  Col,
  Row,
  Form,
  Field,
  Toast,
  Empty,
  Dialog
} from 'vant'
import 'vant/lib/index.css'
import RU from 'vant/es/locale/lang/ru-RU';
Locale.use('ru-RU', RU);

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)

app.use(router)

app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)
app.use(ConfigProvider)
app.use(Swipe)
app.use(SwipeItem)
app.use(Collapse)
app.use(CollapseItem)
app.use(Stepper)
app.use(Popup)
app.use(VanImage)
app.use(Col)
app.use(Row)
app.use(Form)
app.use(Field)
app.use(Toast)
app.use(Empty)
app.use(Dialog)

app.mount('#app')
