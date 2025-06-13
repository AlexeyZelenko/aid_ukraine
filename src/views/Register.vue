<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-ukraine-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-heart text-2xl text-white"></i>
        </div>
        <h2 class="text-3xl font-bold text-ukraine-blue">Реєстрація</h2>
        <p class="mt-2 text-gray-600">Приєднуйтесь до нашої спільноти</p>
      </div>

      <form @submit.prevent="handleRegister" class="bg-white rounded-lg shadow-lg p-8">
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
              minlength="6"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue focus:border-ukraine-blue"
              placeholder="Мінімум 6 символів"
            >
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Підтвердження паролю
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue focus:border-ukraine-blue"
              placeholder="Повторіть пароль"
            >
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-ukraine-blue focus:ring-ukraine-blue border-gray-300 rounded"
            >
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              Я погоджуюсь з <a href="#" class="text-ukraine-blue hover:text-ukraine-blue-light">умовами використання</a>
            </label>
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
            <i v-else class="fas fa-user-plus mr-2"></i>
            {{ loading ? 'Реєструю...' : 'Зареєструватися' }}
          </button>
        </div>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Вже маєте акаунт?
            <router-link to="/login" class="text-ukraine-blue hover:text-ukraine-blue-light font-medium">
              Увійти
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
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Паролі не співпадають'
    return
  }

  loading.value = true
  error.value = ''

  const result = await authStore.register(form.value.email, form.value.password)

  if (result.success) {
    router.push('/')
  } else {
    error.value = 'Помилка при реєстрації. Спробуйте пізніше.'
  }

  loading.value = false
}
</script>