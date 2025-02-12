import './assets/main.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js' 
import alertify from 'alertifyjs/build/alertify.min.js' 
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

function onMathJaxReady() {
    const el = document.getElementById("elementId");
    renderByMathjax(el);
}
  
initMathJax({}, onMathJaxReady);

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(MathJax)

app.mount('#app')
