import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import BigElement from 'big-element';
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(BigElement)
app.mount('#app')
