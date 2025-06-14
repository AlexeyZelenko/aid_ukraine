<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('volunteers.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('volunteers.subtitle') }}</p>
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
      </header>

      <!-- Statistics -->
      <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard 
          v-for="stat in statistics" 
          :key="stat.label"
          :value="stat.value"
          :label="stat.label"
          :color="stat.color"
        />
      </section>

      <!-- Volunteer Types -->
      <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <VolunteerTypeCard
          v-for="type in volunteerTypes"
          :key="type.id"
          :type="type"
          @register="openRegistrationModal"
        />
      </section>

      <!-- Search and Filters -->
      <section class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <SearchFilters
          v-model:search="searchQuery"
          v-model:type="selectedType"
          v-model:location="selectedLocation"
          v-model:verification="selectedVerification"
          :locations="uniqueLocations"
        />
      </section>

      <!-- Volunteers List -->
      <section class="bg-white rounded-lg shadow-lg p-6">
        <VolunteersList
          :volunteers="filteredVolunteers"
          :loading="volunteersStore.loading"
          :total="mockVolunteers.length"
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
import { MOCK_VOLUNTEERS, VOLUNTEER_TYPES } from '../constants/volunteers'
import StatCard from '@/components/StatCard.vue'
import VolunteerTypeCard from '@/components/VolunteerTypeCard.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import VolunteersList from '@/components/VolunteersList.vue'
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
const mockVolunteers = MOCK_VOLUNTEERS
const volunteerTypes = VOLUNTEER_TYPES

// Computed properties
const filteredVolunteers = computed(() => {
  return mockVolunteers.filter(volunteer => {
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

    return matchesSearch && matchesType && matchesLocation && matchesVerification
  })
})

const uniqueLocations = computed(() => {
  const locations = new Set(mockVolunteers.map(v => v.location))
  return Array.from(locations).sort()
})

const statistics = computed(() => [
  { value: mockVolunteers.length, label: 'Всього волонтерів', color: 'ukraine-blue' },
  { value: mockVolunteers.filter(v => v.type === 'volunteer').length, label: 'Індивідуальні', color: 'blue-600' },
  { value: mockVolunteers.filter(v => v.type === 'fund').length, label: 'Фонди', color: 'yellow-600' },
  { value: mockVolunteers.filter(v => v.type === 'rehabilitation').length, label: 'Центри реабілітації', color: 'green-600' }
])

// Methods
const openRegistrationModal = (type: 'volunteer' | 'fund' | 'rehabilitation' | 'church') => {
  registrationType.value = type
  showRegistrationModal.value = true
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

onMounted(() => {
  // In a real app, this would fetch from Firebase
  // volunteersStore.fetchVolunteers()
})
</script>