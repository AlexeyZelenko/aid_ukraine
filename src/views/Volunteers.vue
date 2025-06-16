<template>
  <div class="min-h-screen bg-gray-50 py-6 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="text-center mb-8 md:mb-12">
        <h1 class="text-2xl md:text-4xl font-bold text-ukraine-blue mb-2 md:mb-4">{{ $t('volunteers.title') }}</h1>
        <p class="text-lg md:text-xl text-gray-600">{{ $t('volunteers.subtitle') }}</p>
        <div class="ukraine-accent-bar w-16 md:w-24 mx-auto mt-4 md:mt-6"></div>
      </header>

      <!-- Statistics -->
      <section class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
        <StatCard 
          v-for="stat in statistics" 
          :key="stat.label"
          :value="stat.value"
          :label="stat.label"
          :color="stat.color"
        />
      </section>

      <!-- Volunteer Types -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
        <VolunteerTypeCard
          v-for="type in volunteerTypes"
          :key="type.id"
          :type="type"
          @register="openRegistrationModal"
        />
      </section>

      <!-- Search and Filters -->
      <section class="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8">
        <SearchFilters
          v-model:search="searchQuery"
          v-model:type="selectedType"
          v-model:location="selectedLocation"
          v-model:verification="selectedVerification"
          :locations="uniqueLocations"
        />
      </section>

      <!-- Volunteers List -->
      <section class="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <div class="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 class="text-lg font-semibold text-gray-900">Список волонтерів</h3>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div class="text-sm text-gray-600 order-2 sm:order-1">
              Всього: {{ volunteers.filter(v => v.verified === true).length }}
            </div>
            <button
              @click="refreshData"
              :disabled="volunteersStore.loading"
              class="px-3 py-2 text-sm bg-ukraine-blue text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto justify-center"
            >
              <svg v-if="!volunteersStore.loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a7.646 7.646 0 110 15.292V12"></path>
              </svg>
              {{ volunteersStore.loading ? 'Завантаження...' : 'Оновити' }}
            </button>
          </div>
        </div>
        <VolunteersList
          :volunteers="filteredVolunteers"
          :loading="volunteersStore.loading"
          :total="volunteers.filter(v => v.verified === true).length"
          @contact="contactVolunteer"
          @view-profile="viewProfile"
        />
      </section>
    </div>

    <!-- Registration Modal -->
    <RegistrationModal
      v-if="showRegistrationModal"
      :type="registrationType"
      :submitting="submitting"
      @close="closeRegistrationModal"
      @submit="submitRegistration"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVolunteersStore, type Volunteer } from '../stores/volunteers'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { VOLUNTEER_TYPES } from '../constants/volunteers'
import StatCard from '@/components/StatCard.vue'
import VolunteerTypeCard from '@/components/Volunteers/VolunteerTypeCard.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import VolunteersList from '@/components/Volunteers/VolunteersList.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'

const toast = useToast()
const router = useRouter()
const volunteersStore = useVolunteersStore()
const authStore = useAuthStore()

// Reactive data
const showRegistrationModal = ref(false)
const registrationType = ref<'volunteer' | 'fund' | 'rehabilitation' | 'church'>('volunteer')
const submitting = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedLocation = ref('')
const selectedVerification = ref('')

// Constants
const volunteerTypes = VOLUNTEER_TYPES

// Computed properties
const volunteers = computed(() => {
  // Отримуємо всіх волонтерів для внутрішньої логіки (статистика, локації)
  return volunteersStore.volunteers || []
})

const filteredVolunteers = computed(() => {
  return volunteers.value.filter(volunteer => {
    // Показуємо тільки верифікованих волонтерів
    const isVerified = volunteer.verified === true

    const matchesSearch = !searchQuery.value || 
      volunteer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      volunteer.organization.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      volunteer.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      volunteer.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      volunteer.specializations?.some(spec => 
        spec.toLowerCase().includes(searchQuery.value.toLowerCase())
      )

    const matchesType = !selectedType.value || volunteer.type === selectedType.value
    const matchesLocation = !selectedLocation.value || volunteer.location === selectedLocation.value
    const matchesVerification = !selectedVerification.value || 
      (selectedVerification.value === 'verified' && volunteer.verified) ||
      (selectedVerification.value === 'pending' && !volunteer.verified)

    return isVerified && matchesSearch && matchesType && matchesLocation && matchesVerification
  }).reverse()
})

const uniqueLocations = computed(() => {
  // Враховуємо тільки верифікованих волонтерів для списку локацій
  const verifiedVolunteers = volunteers.value.filter(v => v.verified === true)
  const locations = new Set(verifiedVolunteers.map(v => v.location))
  return Array.from(locations).sort()
})

const statistics = computed(() => {
  // Враховуємо тільки верифікованих волонтерів у статистиці
  const verifiedVolunteers = volunteers.value.filter(v => v.verified === true)
  
  return [
    { value: verifiedVolunteers.length, label: 'Всього волонтерів', color: 'ukraine-blue' },
    { value: verifiedVolunteers.filter(v => v.type === 'volunteer').length, label: 'Індивідуальні', color: 'blue-600' },
    { value: verifiedVolunteers.filter(v => v.type === 'fund').length, label: 'Фонди', color: 'yellow-600' },
    { value: verifiedVolunteers.filter(v => v.type === 'rehabilitation').length, label: 'Центри реабілітації', color: 'green-600' },
    { value: verifiedVolunteers.filter(v => v.type === 'church').length, label: 'Церкви', color: 'red-600' }
  ]
})

// Methods
const openRegistrationModal = (type: 'volunteer' | 'fund' | 'rehabilitation' | 'church') => {
  // Перенаправляємо на відповідні сторінки реєстрації
  if (type === 'volunteer') {
    router.push('/volunteer-registration')
  } else if (type === 'church') {
    router.push('/church-registration')
  } else {
    // Для інших типів показуємо повідомлення, що реєстрація недоступна
    toast.add({
      severity: 'info',
      summary: 'Інформація',
      detail: 'Реєстрація для цього типу організації наразі недоступна. Доступна реєстрація тільки для волонтерів та церков.',
      life: 5000
    })
  }
}

const closeRegistrationModal = () => {
  showRegistrationModal.value = false
}

const submitRegistration = async (formData: any) => {
  submitting.value = true
  
  const volunteerData = {
    ...formData,
    type: registrationType.value,
    specializations: formData.specializationsText
      ? formData.specializationsText.split(',').map((s: string) => s.trim())
      : []
  }

  delete volunteerData.specializationsText

  const result = await volunteersStore.addVolunteer(volunteerData)
  
  if (result.success) {
    closeRegistrationModal()
    
    // Оновлюємо список волонтерів після успішного додавання
    await volunteersStore.fetchVolunteers()
    
    toast.add({ 
      severity: 'success', 
      summary: 'Успіх', 
      detail: 'Реєстрацію успішно подано! Очікуйте на верифікацію.', 
      life: 3000 
    })
  } else {
    toast.add({ 
      severity: 'error', 
      summary: 'Помилка', 
      detail: 'Помилка при реєстрації. Спробуйте пізніше.', 
      life: 3000 
    })
  }
  
  submitting.value = false
}

const contactVolunteer = (volunteer: Volunteer) => {
  const message = `Привіт! Я знайшов ваш профіль на платформі "Допомога Україні" і хотів би обговорити можливість співпраці.`
  const emailUrl = `mailto:${volunteer.email}?subject=Співпраця через платформу "Допомога Україні"&body=${encodeURIComponent(message)}`
  
  if (confirm(`Зв'язатися з ${volunteer.name}?\n\nEmail: ${volunteer.email}\nТелефон: ${volunteer.phone}`)) {
    window.open(emailUrl)
  }
}

const viewProfile = (volunteer: Volunteer) => {
  router.push({ name: 'VolunteerProfile', params: { id: volunteer.id } })
}

const refreshData = async () => {
  try {
    await volunteersStore.fetchVolunteers()
    toast.add({ 
      severity: 'success', 
      summary: 'Успіх', 
      detail: 'Дані успішно оновлено!', 
      life: 2000 
    })
  } catch (error) {
    console.error('Помилка оновлення даних:', error)
    toast.add({ 
      severity: 'error', 
      summary: 'Помилка', 
      detail: 'Не вдалося оновити дані з Firebase.', 
      life: 3000 
    })
  }
}

onMounted(async () => {
  // Завантажуємо волонтерів з Firebase
  try {
    await volunteersStore.fetchVolunteers()
    console.log('Волонтери завантажені з Firebase:', volunteersStore.volunteers.length)
  } catch (error) {
    console.error('Помилка завантаження волонтерів з Firebase:', error)
    toast.add({ 
      severity: 'error', 
      summary: 'Помилка', 
      detail: 'Не вдалося завантажити дані з Firebase.', 
      life: 5000 
    })
  }
})
</script>