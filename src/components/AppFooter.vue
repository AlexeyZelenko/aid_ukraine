<template>
  <footer 
    v-if="!isAboutPage" 
    class="bg-gray-800 text-white"
  >
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <!-- <div>
          <h3 class="text-lg sm:text-xl font-semibold mb-4">{{ $t('home.title') }}</h3>
          <p class="text-gray-300 text-sm sm:text-base">
            {{ $t('home.description') }}
          </p>
        </div> -->

        <!-- Quick Links -->
        <!-- <div>
          <h3 class="text-lg sm:text-xl font-semibold mb-4">Швидкі посилання</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <router-link 
                :to="link.to" 
                class="text-gray-300 hover:text-white text-sm sm:text-base transition-colors"
              >
                {{ $t(link.label) }}
              </router-link>
            </li>
          </ul>
        </div> -->

        <!-- Contact -->
        <!-- <div>
          <h3 class="text-lg sm:text-xl font-semibold mb-4">Контакти</h3>
          <ul class="space-y-2 text-sm sm:text-base text-gray-300">
            <li v-for="contact in contacts" :key="contact.type">
              <i :class="contact.icon" class="mr-2"></i>
              {{ contact.value }}
            </li>
          </ul>
        </div> -->

        <!-- Social -->
        <!-- <div>
          <h3 class="text-lg sm:text-xl font-semibold mb-4">Слідкуйте за нами</h3>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              class="text-gray-300 hover:text-white transition-colors"
              :aria-label="social.name"
            >
              <i :class="social.icon" class="text-xl sm:text-2xl"></i>
            </a>
          </div> -->
        <!-- </div> -->
      <!-- </div> -->

      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <div class="ukraine-accent-bar mb-4"></div>
        <p class="text-gray-400 text-xs sm:text-sm">
          © {{ new Date().getFullYear() }} Допомога Україні. Всі права захищені. Разом до перемоги! 🇺🇦
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Страницы, где футер не должен показываться
const hiddenFooterPages = ['/about']

// Проверяем, нужно ли скрыть футер
const isAboutPage = computed(() => hiddenFooterPages.includes(route.path))

// Данные для быстрых ссылок
const quickLinks = [
  { to: '/volunteers', label: 'nav.volunteers' },
  { to: '/needs', label: 'nav.needs' },
  { to: '/financial', label: 'nav.financial' },
  { to: '/map', label: 'nav.map' }
]

// Контактная информация
const contacts = [
  { type: 'email', icon: 'fas fa-envelope', value: 'info@help-ukraine.org' },
  { type: 'phone', icon: 'fas fa-phone', value: '+38 (050) 123-45-67' },
  { type: 'address', icon: 'fas fa-map-marker-alt', value: 'Київ, Україна' }
]

// Социальные сети
const socialLinks = [
  { name: 'Facebook', url: '#', icon: 'fab fa-facebook-f' },
  { name: 'Twitter', url: '#', icon: 'fab fa-twitter' },
  { name: 'Instagram', url: '#', icon: 'fab fa-instagram' },
  { name: 'Telegram', url: '#', icon: 'fab fa-telegram' }
]
</script>