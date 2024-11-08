import './styles/main.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import '@/router/routerAuth'

import {
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
  Field
} from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia())
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

app.mount('#app')
