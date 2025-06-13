<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and main navigation -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-ukraine-blue rounded-full flex items-center justify-center">
              <i class="fas fa-heart text-white text-sm"></i>
            </div>
            <span class="text-xl font-bold text-ukraine-blue">{{ $t('home.title') }}</span>
          </router-link>
          
          <div class="hidden md:ml-10 md:flex md:space-x-8">
            <router-link 
              v-for="item in mainNavItems" 
              :key="item.name"
              :to="item.to"
              class="text-gray-700 hover:text-ukraine-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-ukraine-blue bg-blue-50': $route.path === item.to }"
            >
              <i :class="item.icon" class="mr-2"></i>
              {{ $t(item.label) }}
            </router-link>
          </div>
        </div>

        <!-- Right side: Language selector, auth -->
        <div class="flex items-center space-x-4">
          <!-- Language selector -->
          <select 
            v-model="currentLocale" 
            @change="changeLanguage"
            class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
          >
            <option value="uk">🇺🇦 Українська</option>
            <option value="en">🇺🇸 English</option>
          </select>

          <!-- Authentication -->
          <div v-if="authStore.user" class="flex items-center space-x-2">
            <span class="text-sm text-gray-700">{{ authStore.user.email }}</span>
            <button 
              @click="logout"
              class="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              {{ $t('nav.logout') }}
            </button>
          </div>
          <div v-else class="flex items-center space-x-2">
            <router-link 
              to="/login"
              class="text-ukraine-blue hover:text-ukraine-blue-light text-sm font-medium"
            >
              {{ $t('nav.login') }}
            </router-link>
            <router-link 
              to="/register"
              class="btn-ukraine text-sm"
            >
              {{ $t('nav.register') }}
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-700 hover:text-ukraine-blue p-2"
          >
            <i class="fas fa-bars"></i>
          </button>
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
          class="block px-3 py-2 text-gray-700 hover:text-ukraine-blue hover:bg-gray-50 rounded-md"
        >
          <i :class="item.icon" class="mr-2"></i>
          {{ $t(item.label) }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'

const { locale } = useI18n()
const authStore = useAuthStore()

const mobileMenuOpen = ref(false)
const currentLocale = ref(locale.value)

const mainNavItems = [
  { name: 'volunteers', to: '/volunteers', label: 'nav.volunteers', icon: 'fas fa-hands-helping' },
  { name: 'needs', to: '/needs', label: 'nav.needs', icon: 'fas fa-list' },
  { name: 'financial', to: '/financial', label: 'nav.financial', icon: 'fas fa-credit-card' },
  { name: 'map', to: '/map', label: 'nav.map', icon: 'fas fa-map-marker-alt' },
  { name: 'blog', to: '/blog', label: 'nav.blog', icon: 'fas fa-comments' },
  { name: 'articles', to: '/articles', label: 'nav.articles', icon: 'fas fa-newspaper' }
]

const changeLanguage = () => {
  locale.value = currentLocale.value
}

const logout = async () => {
  await authStore.signOut()
}
</script>