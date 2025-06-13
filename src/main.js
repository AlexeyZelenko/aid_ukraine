import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import './style.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
// Import translations
import uk from './locales/uk.json';
import en from './locales/en.json';
var i18n = createI18n({
    legacy: false,
    locale: 'uk',
    fallbackLocale: 'en',
    messages: {
        uk: uk,
        en: en
    }
});
var app = createApp(App);
var pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(i18n);
app.use(PrimeVue);
app.mount('#app');
