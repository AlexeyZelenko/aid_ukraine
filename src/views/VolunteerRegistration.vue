<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-ukraine-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-heart text-3xl text-white"></i>
        </div>
        <h1 class="text-3xl font-bold text-ukraine-blue mb-2">Реєстрація волонтера</h1>
        <p class="text-gray-600">Долучайтеся до спільноти волонтерів та допомагайте тим, хто цього потребує</p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Ім'я та прізвище *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
              placeholder="Введіть ваше повне ім'я"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Телефон *
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
              placeholder="+38 (0XX) XXX-XX-XX"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Місцезнаходження *
            </label>
            <input
              v-model="form.location"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
              placeholder="Місто, область"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Організація (за наявності)
          </label>
          <input
            v-model="form.organization"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
            placeholder="Назва організації або 'Індивідуальний волонтер'"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Досвід роботи (років)
          </label>
          <input
            v-model="form.experience"
            type="number"
            min="0"
            max="50"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
            placeholder="Кількість років досвіду"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Спеціалізації
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label v-for="spec in availableSpecializations" :key="spec" class="flex items-center">
              <input
                type="checkbox"
                :value="spec"
                v-model="form.specializations"
                class="rounded border-gray-300 text-ukraine-blue focus:ring-ukraine-blue mr-2"
              />
              <span class="text-sm">{{ spec }}</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Веб-сайт (за наявності)
          </label>
          <input
            v-model="form.website"
            type="url"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Про себе *
          </label>
          <textarea
            v-model="form.description"
            required
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
            placeholder="Розкажіть про себе, ваші мотиви та в чому ви можете допомогти"
          ></textarea>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg">
          <div class="flex items-start">
            <input
              v-model="form.agreeToTerms"
              type="checkbox"
              required
              class="rounded border-gray-300 text-ukraine-blue focus:ring-ukraine-blue mr-3 mt-1"
            />
            <div class="text-sm text-gray-700">
              <p>Я погоджуюся з <a href="#" class="text-ukraine-blue hover:underline">умовами використання</a> та <a href="#" class="text-ukraine-blue hover:underline">політикою конфіденційності</a>.</p>
              <p class="mt-2">Я підтверджую, що вся надана інформація є достовірною.</p>
            </div>
          </div>
        </div>

        <div class="flex space-x-4">
          <button
            type="button"
            @click="$router.go(-1)"
            class="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Скасувати
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="flex-1 bg-ukraine-blue text-white py-3 px-6 rounded-lg hover:bg-ukraine-blue-light transition-colors font-medium disabled:opacity-50"
          >
            <i v-if="submitting" class="fas fa-spinner fa-spin mr-2"></i>
            {{ submitting ? 'Відправляємо...' : 'Зареєструватися' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVolunteersStore } from '../stores/volunteers'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const volunteersStore = useVolunteersStore()
const toast = useToast()

const submitting = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  organization: 'Індивідуальний волонтер',
  experience: 0,
  specializations: [] as string[],
  website: '',
  description: '',
  agreeToTerms: false
})

const availableSpecializations = [
  'Медична допомога',
  'Психологічна підтримка',
  'Евакуація',
  'Транспорт',
  'Перекладач',
  'Юридична допомога',
  'Соціальна робота',
  'Гуманітарна допомога',
  'Освіта',
  'Реабілітація',
  'Технічна підтримка',
  'Харчування',
  'Інше'
]

const submitForm = async () => {
  if (!form.value.agreeToTerms) {
    toast.add({
      severity: 'warn',
      summary: 'Увага',
      detail: 'Будь ласка, погодьтеся з умовами використання',
      life: 3000
    })
    return
  }

  submitting.value = true

  try {
    const volunteerData = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      location: form.value.location,
      organization: form.value.organization || 'Індивідуальний волонтер',
      type: 'volunteer' as const,
      experience: form.value.experience || 0,
      specializations: form.value.specializations,
      website: form.value.website,
      description: form.value.description,
      verified: false,
      createdAt: new Date()
    }

    await volunteersStore.addVolunteer(volunteerData)

    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: 'Заявка на реєстрацію волонтера успішно подана! Очікуйте на верифікацію.',
      life: 5000
    })

    router.push('/volunteers')
  } catch (error) {
    console.error('Помилка реєстрації:', error)
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Виникла помилка при реєстрації. Спробуйте ще раз.',
      life: 5000
    })
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.text-ukraine-blue {
  color: #0057B8;
}
.bg-ukraine-blue {
  background-color: #0057B8;
}
.bg-ukraine-blue-light {
  background-color: #1e6bb8;
}
</style> 