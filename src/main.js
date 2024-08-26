//fukuvb7569@sandbox.com
//111111
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// // //引入初始化样式
// import 'element-plus/dist/index.css'
// import '@/styles/element/index.scss'  // 先引入自定义样式
import '@/styles/common.scss'

import App from './App.vue'
import router from './router'
//引入懒加载指令插件并注册
import { lazyPlugin } from "@/directives/index"
import { componentPlugin } from "@/components/index"


import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')

