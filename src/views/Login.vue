<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-ukraine-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-heart text-2xl text-white"></i>
        </div>
        <h2 class="text-3xl font-bold text-ukraine-blue">Вхід до системи</h2>
        <p class="mt-2 text-gray-600">Увійдіть, щоб продовжити допомагати</p>
      </div>

      <form @submit.prevent="handleLogin" class="bg-white rounded-lg shadow-lg p-8">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email адреса
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue focus:border-ukraine-blue"
              placeholder="Введіть ваш email"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue focus:border-ukraine-blue"
              placeholder="Введіть ваш пароль"
            >
          </div>

          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn-ukraine w-full py-3"
          >
            <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-sign-in-alt mr-2"></i>
            {{ loading ? 'Входжу...' : 'Увійти' }}
          </button>
        </div>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Немає акаунту?
            <router-link to="/register" class="text-ukraine-blue hover:text-ukraine-blue-light font-medium">
              Зареєструватися
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  const result = await authStore.login(form.value.email, form.value.password)

  if (result.success) {
    router.push('/')
  } else {
    error.value = 'Невірний email або пароль'
  }

  loading.value = false
}
</script>