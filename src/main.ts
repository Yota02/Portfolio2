import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import fr from './locales/fr.json'
import en from './locales/en.json'
import de from './locales/de.json'
import jp from './locales/jp.json'
import zh from './locales/zh.json'
import ru from './locales/ru.json'
import it from './locales/it.json'
import es from './locales/es.json'

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages: {
    fr, en, de, jp, zh, ru, it, es
  }
})

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')
