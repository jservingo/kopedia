import './assets/main.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle' 
import alertify from 'alertifyjs/build/alertify.min.js' 

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
