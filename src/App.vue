<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Ukraine accent bar -->
    <div class="ukraine-accent-bar"></div>
    
    <!-- Navigation -->
    <AppNavigation />
    
    <!-- Toast for PrimeVue notifications -->
    <Toast />

    <!-- Main content -->
    <main>
      <router-view />
    </main>
    
    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import AppNavigation from './components/AppNavigation.vue'
import AppFooter from './components/AppFooter.vue'
import Toast from 'primevue/toast'

const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})
</script>