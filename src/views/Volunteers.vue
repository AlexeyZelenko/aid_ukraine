<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('volunteers.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('volunteers.subtitle') }}</p>
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
      </div>

      <!-- Volunteer Types -->
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover">
          <div class="text-center">
            <div class="w-16 h-16 bg-ukraine-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-hand-heart text-2xl text-white"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('volunteers.types.volunteer') }}</h3>
            <p class="text-gray-600 mb-4">Індивідуальні волонтери, готові допомагати у різних сферах</p>
            <button 
              @click="openRegistrationModal('volunteer')"
              class="btn-ukraine w-full"
            >
              Зареєструватися
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover">
          <div class="text-center">
            <div class="w-16 h-16 bg-ukraine-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-building text-2xl text-ukraine-blue"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('volunteers.types.fund') }}</h3>
            <p class="text-gray-600 mb-4">Благодійні фонди та організації</p>
            <button 
              @click="openRegistrationModal('fund')"
              class="btn-ukraine w-full"
            >
              Зареєструватися
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover">
          <div class="text-center">
            <div class="w-16 h-16 bg-ukraine-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-hospital text-2xl text-white"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('volunteers.types.rehabilitation') }}</h3>
            <p class="text-gray-600 mb-4">Центри реабілітації та медичні заклади</p>
            <button 
              @click="openRegistrationModal('rehabilitation')"
              class="btn-ukraine w-full"
            >
              Зареєструватися
            </button>
          </div>
        </div>
      </div>

      <!-- Volunteers List -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold">Зареєстровані волонтери та організації</h2>
          <div class="flex space-x-4">
            <select v-model="selectedType" class="border border-gray-300 rounded-md px-3 py-2">
              <option value="">Всі типи</option>
              <option value="volunteer">Волонтери</option>
              <option value="fund">Фонди</option>
              <option value="rehabilitation">Центри реабілітації</option>
            </select>
          </div>
        </div>

        <div v-if="volunteersStore.loading" class="text-center py-8">
          <i class="fas fa-spinner fa-spin text-2xl text-ukraine-blue"></i>
          <p class="mt-2 text-gray-600">{{ $t('common.loading') }}</p>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="volunteer in filteredVolunteers" 
            :key="volunteer.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-semibold text-lg">{{ volunteer.name }}</h3>
                <p class="text-sm text-gray-600">{{ volunteer.organization }}</p>
              </div>
              <span 
                class="px-2 py-1 text-xs rounded-full"
                :class="{
                  'bg-blue-100 text-blue-800': volunteer.type === 'volunteer',
                  'bg-yellow-100 text-yellow-800': volunteer.type === 'fund',
                  'bg-green-100 text-green-800': volunteer.type === 'rehabilitation'
                }"
              >
                {{ $t(`volunteers.types.${volunteer.type}`) }}
              </span>
            </div>
            <p class="text-sm text-gray-700 mb-3">{{ volunteer.description }}</p>
            <div class="flex items-center text-sm text-gray-600">
              <i class="fas fa-map-marker-alt mr-1"></i>
              {{ volunteer.location }}
            </div>
            <div v-if="volunteer.verified" class="flex items-center mt-2 text-green-600 text-sm">
              <i class="fas fa-check-circle mr-1"></i>
              Верифіковано
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Registration Modal -->
    <div 
      v-if="showRegistrationModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeRegistrationModal"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" @click.stop>
        <h3 class="text-xl font-semibold mb-4">
          Реєстрація: {{ $t(`volunteers.types.${registrationType}`) }}
        </h3>
        
        <form @submit.prevent="submitRegistration">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Назва/Ім'я</label>
              <input 
                v-model="registrationForm.name"
                type="text" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                v-model="registrationForm.email"
                type="email" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <input 
                v-model="registrationForm.phone"
                type="tel" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Організація</label>
              <input 
                v-model="registrationForm.organization"
                type="text" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Опис діяльності</label>
              <textarea 
                v-model="registrationForm.description"
                rows="3"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Місцезнаходження</label>
              <input 
                v-model="registrationForm.location"
                type="text" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              @click="closeRegistrationModal"
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {{ $t('common.cancel') }}
            </button>
            <button 
              type="submit"
              class="btn-ukraine"
              :disabled="submitting"
            >
              <i v-if="submitting" class="fas fa-spinner fa-spin mr-2"></i>
              {{ $t('common.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVolunteersStore, type Volunteer } from '../stores/volunteers'

const volunteersStore = useVolunteersStore()

const showRegistrationModal = ref(false)
const registrationType = ref<'volunteer' | 'fund' | 'rehabilitation'>('volunteer')
const submitting = ref(false)
const selectedType = ref('')

const registrationForm = ref({
  name: '',
  email: '',
  phone: '',
  organization: '',
  description: '',
  location: ''
})

const filteredVolunteers = computed(() => {
  if (!selectedType.value) return volunteersStore.volunteers
  return volunteersStore.volunteers.filter(v => v.type === selectedType.value)
})

const openRegistrationModal = (type: 'volunteer' | 'fund' | 'rehabilitation') => {
  registrationType.value = type
  showRegistrationModal.value = true
  // Reset form
  registrationForm.value = {
    name: '',
    email: '',
    phone: '',
    organization: '',
    description: '',
    location: ''
  }
}

const closeRegistrationModal = () => {
  showRegistrationModal.value = false
}

const submitRegistration = async () => {
  submitting.value = true
  
  const volunteerData = {
    ...registrationForm.value,
    type: registrationType.value
  }

  const result = await volunteersStore.addVolunteer(volunteerData)
  
  if (result.success) {
    closeRegistrationModal()
    await volunteersStore.fetchVolunteers()
  } else {
    alert('Помилка при реєстрації. Спробуйте пізніше.')
  }
  
  submitting.value = false
}

onMounted(() => {
  volunteersStore.fetchVolunteers()
})
</script>