<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="flex items-center justify-between h-14 md:h-16">
        <!-- Логотип -->
        <router-link to="/" class="flex items-center space-x-2 flex-shrink-0">
          <div class="w-8 h-8 bg-ukraine-blue rounded-full flex items-center justify-center">
            <i class="fas fa-heart text-white text-sm"></i>
          </div>
          <span class="text-lg sm:text-xl font-bold text-ukraine-blue">{{ $t('home.title') }}</span>
        </router-link>

        <!-- Desktop: компактное меню -->
        <div class="hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-2xl">
          <router-link
            v-for="item in mainNavItems"
            :key="item.name"
            :to="item.to"
            class="text-gray-700 hover:text-ukraine-blue hover:bg-gray-50 px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
            active-class="text-ukraine-blue bg-ukraine-blue/10"
          >
            <i :class="item.icon" class="mr-1 text-xs"></i>
            {{ $t(item.label) }}
          </router-link>
        </div>

        <!-- Desktop: язык и кнопки справа -->
        <div class="hidden md:flex items-center gap-3">
          <select 
            v-model="currentLocale" 
            @change="changeLanguage"
            class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ukraine-blue w-32 md:w-auto"
          >
            <option value="uk">🇺🇦 Українська</option>
            <option value="en">🇺🇸 English</option>
          </select>
          <div v-if="authStore.user" class="flex items-center gap-2">
            <router-link
              v-if="authStore.user.uid === '5C4AFwtxF1TpyQEdGXEKPfDk2K73'"
              to="/admin"
              class="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium px-2 py-1"
            >
              Admin Panel
            </router-link>
            <span class="text-xs sm:text-sm text-gray-700 truncate max-w-[120px]">{{ authStore.user.email }}</span>
            <button 
              @click="logout"
              class="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium px-2 py-1"
            >
              {{ $t('nav.logout') }}
            </button>
          </div>
          <div v-else class="flex items-center gap-2">
            <router-link 
              to="/login"
              class="text-ukraine-blue hover:text-ukraine-blue-light text-xs sm:text-sm font-medium px-2 py-1"
            >
              {{ $t('nav.login') }}
            </router-link>
            <router-link 
              to="/register"
              class="btn-ukraine text-xs sm:text-sm px-3 py-1 min-h-[36px]"
            >
              {{ $t('nav.register') }}
            </router-link>
          </div>
        </div>

        <!-- Tablet: кнопка меню -->
        <div class="md:hidden lg:hidden flex items-center justify-end ml-2">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-700 hover:text-ukraine-blue p-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
          >
            <i class="fas fa-bars"></i>
          </button>
        </div>

        <!-- Medium screens: выпадающее меню -->
        <div class="hidden md:block lg:hidden relative">
          <button
            @click="desktopMenuOpen = !desktopMenuOpen"
            class="text-gray-700 hover:text-ukraine-blue p-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue rounded-md"
          >
            <i class="fas fa-bars"></i>
          </button>
          
          <!-- Dropdown menu -->
          <div v-if="desktopMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div class="py-1">
              <router-link
                v-for="item in mainNavItems"
                :key="item.name"
                :to="item.to"
                @click="desktopMenuOpen = false"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-ukraine-blue"
                active-class="text-ukraine-blue bg-ukraine-blue/10"
              >
                <i :class="item.icon" class="mr-2 text-xs"></i>
                {{ $t(item.label) }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in mainNavItems"
          :key="item.name"
          :to="item.to"
          @click="mobileMenuOpen = false"
          class="block px-3 py-3 text-gray-700 hover:text-ukraine-blue hover:bg-gray-50 rounded-md text-base"
          active-class="text-ukraine-blue bg-ukraine-blue/10"
        >
          <i :class="item.icon" class="mr-2"></i>
          {{ $t(item.label) }}
        </router-link>
        <!-- Язык и кнопки на мобильных -->
        <div class="mt-4 flex flex-col gap-2 border-t pt-4">
          <select 
            v-model="currentLocale" 
            @change="changeLanguage"
            class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ukraine-blue w-full"
          >
            <option value="uk">🇺🇦 Українська</option>
            <option value="en">🇺🇸 English</option>
          </select>
          <div v-if="authStore.user" class="flex items-center gap-2">
            <router-link
              v-if="authStore.user.uid === '5C4AFwtxF1TpyQEdGXEKPfDk2K73'"
              to="/admin"
              class="text-blue-600 hover:text-blue-700 text-xs font-medium px-2 py-1 w-full text-center"
            >
              Admin Panel
            </router-link>
            <span class="text-xs text-gray-700 truncate max-w-[120px]">{{ authStore.user.email }}</span>
            <button 
              @click="logout"
              class="text-red-600 hover:text-red-700 text-xs font-medium px-2 py-1"
            >
              {{ $t('nav.logout') }}
            </button>
          </div>
          <div v-else class="flex items-center gap-2">
            <router-link 
              to="/login"
              class="text-ukraine-blue hover:text-ukraine-blue-light text-xs font-medium px-2 py-1 w-full text-center"
            >
              {{ $t('nav.login') }}
            </router-link>
            <router-link 
              to="/register"
              class="btn-ukraine text-xs px-3 py-1 min-h-[36px] w-full text-center"
            >
              {{ $t('nav.register') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'

const { locale } = useI18n()
const authStore = useAuthStore()

const mobileMenuOpen = ref(false)
const desktopMenuOpen = ref(false)
const currentLocale = ref(locale.value)

const mainNavItems = [
  { name: 'volunteers', to: '/volunteers', label: 'nav.volunteers', icon: 'fas fa-hands-helping' },
  { name: 'needs', to: '/needs', label: 'nav.needs', icon: 'fas fa-list' },
  // { name: 'financial', to: '/financial', label: 'nav.financial', icon: 'fas fa-credit-card' },
  // { name: 'map', to: '/map', label: 'nav.map', icon: 'fas fa-map-marker-alt' },
  { name: 'blog', to: '/blog', label: 'nav.blog', icon: 'fas fa-comments' },
  // { name: 'articles', to: '/articles', label: 'nav.articles', icon: 'fas fa-newspaper' },
  { name: 'about', to: '/about', label: 'nav.about', icon: 'fas fa-info-circle' }  
]

const changeLanguage = () => {
  locale.value = currentLocale.value
}

const logout = async () => {
  await authStore.signOut()
}

// Закрытие выпадающего меню при клике вне его
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    desktopMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>