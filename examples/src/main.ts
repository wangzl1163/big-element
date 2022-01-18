import { createApp } from 'vue'
import Router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import BigElement from 'big-element';
import 'big-element/packages/Theme/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(Router)
app.use(ElementPlus)
app.use(BigElement)
app.mount('#app')
