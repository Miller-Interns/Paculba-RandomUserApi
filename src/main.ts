import './assets/main.css'
// import { Filter } from '@/enum.ts'
// console.log('✅ Successfully imported Filter enum in main.ts:', Filter)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
