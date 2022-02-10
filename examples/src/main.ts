import { createApp } from 'vue'
import Router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import BigElement from 'big-element';
import 'big-element/packages/Theme/index.css'
import config from './config';
import App from './App.vue'

const app = createApp(App)

app.use(Router)
app.use(ElementPlus, {
	locale: zhCn,
 })
app.use(BigElement)
app.use(config)

app.mount('#app')
