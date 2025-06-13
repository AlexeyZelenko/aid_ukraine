import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import App from './App.vue'
import router from './router'
import './style.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Import translations
import uk from './locales/uk.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'uk',
  fallbackLocale: 'en',
  messages: {
    uk,
    en
  }
})

if (process.env.NODE_ENV === 'development') {
  import('@vue/devtools').then(({ connect })=>{
    connect('ws://localhost:8098')
  })
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(PrimeVue)
app.use(ToastService)

app.mount('#app')