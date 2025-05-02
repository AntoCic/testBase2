import { createApp } from 'vue'
import App from './App.vue'
import './style/general.scss'
import * as bootstrap from 'bootstrap'
import { router } from './router'
import { $s } from './stores/store.js'
import { $toast } from './stores/toast.js'
import { $loading } from './stores/loading.js'
import $u from './utility.js'

const app = createApp(App)
app.use(router)
app.config.globalProperties.$s = $s;
app.config.globalProperties.$u = $u;
app.config.globalProperties.$loading = $loading;
app.config.globalProperties.$toast = $toast;

app.mount('#app')

// eliminina lo starter-loader che mostra che il sito si sta montando
document.getElementsByClassName('starter-loader')?.[0].remove();