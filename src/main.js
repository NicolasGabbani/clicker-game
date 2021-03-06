import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'
import Particles from "particles.vue3"
import VueTippy from 'vue-tippy'
import App from './App.vue'

createApp(App).use(VueCookies).use(Particles).use(VueTippy).mount('#app')
