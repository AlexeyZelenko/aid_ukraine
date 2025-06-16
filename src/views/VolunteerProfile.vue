<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-10 relative">
      <button @click="goBack" class="absolute left-6 top-6 text-ukraine-blue hover:underline flex items-center">
        <i class="fas fa-arrow-left mr-2"></i> Назад до списку волонтерів
      </button>
      <div v-if="volunteer" class="mt-10">
        <div class="flex items-center mb-6">
          <div :class="['w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg mr-6', getTypeClass(volunteer.type)]">
            <i :class="getTypeIcon(volunteer.type)"></i>
          </div>
          <div>
            <h1 class="text-3xl font-extrabold mb-1 text-gray-900">{{ volunteer.name }}</h1>
            <div class="flex space-x-2 mt-1">
              <span :class="['px-3 py-1 rounded-full text-xs font-bold', getTypeClass(volunteer.type)]">
                {{ getTypeLabel(volunteer.type) }}
              </span>
              <span v-if="volunteer.verified" class="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                <i class="fas fa-check-circle mr-1"></i> Верифіковано
              </span>
              <span v-else class="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                <i class="fas fa-clock mr-1"></i> Очікує верифікації
              </span>
            </div>
          </div>
        </div>

        <!-- Кнопки дій -->
        <!-- <div class="mb-8 flex flex-wrap gap-4">
          <button 
            @click="goToFinancialHelp" 
            class="bg-ukraine-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center shadow-md"
          >
            <i class="fas fa-hand-holding-usd mr-2"></i>
            ФІНАНСОВА ДОПОМОГА
          </button>
          <button 
            @click="goToOrganizationProjects" 
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center shadow-md"
          >
            <i class="fas fa-project-diagram mr-2"></i>
            ПРОЄКТИ ОРГАНІЗАЦІЇ
          </button>
        </div> -->

        <div class="mb-6 text-gray-700 text-lg leading-relaxed border-l-4 border-ukraine-blue pl-4 bg-blue-50/50 py-2">
          {{ volunteer.description }}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div class="mb-3 flex items-center text-gray-600">
              <i class="fas fa-users mr-2 text-ukraine-blue"></i>
              <span><strong>Організація:</strong> {{ volunteer.organization }}</span>
            </div>
            <div class="mb-3 flex items-center text-gray-600">
              <i class="fas fa-map-marker-alt mr-2 text-ukraine-blue"></i>
              <span><strong>Місцезнаходження:</strong> {{ volunteer.location }}</span>
            </div>
            <div v-if="volunteer.experience" class="mb-3 flex items-center text-gray-600">
              <i class="fas fa-briefcase mr-2 text-ukraine-blue"></i>
              <span><strong>Досвід:</strong> {{ volunteer.experience }} років</span>
            </div>
            <div v-if="volunteer.rating" class="mb-3 flex items-center text-yellow-500">
              <i class="fas fa-star mr-2"></i>
              <span><strong>Рейтинг:</strong> {{ volunteer.rating }}/5</span>
            </div>
            <div class="mb-3 flex items-center text-gray-600">
              <i class="fas fa-calendar-alt mr-2 text-ukraine-blue"></i>
              <span><strong>Зареєстровано:</strong> {{ formatDate(volunteer.createdAt) }}</span>
            </div>
          </div>
          <div class="bg-yellow-50 rounded-xl p-5 shadow flex flex-col justify-center">
            <div class="font-bold text-lg mb-2 text-yellow-900 flex items-center">
              <i class="fas fa-address-card mr-2"></i> Контакти
            </div>
            <div class="mb-2 flex items-center text-gray-700">
              <i class="fas fa-envelope mr-2 text-yellow-700"></i> {{ volunteer.email }}
            </div>
            <div class="mb-2 flex items-center text-gray-700">
              <i class="fas fa-phone-alt mr-2 text-yellow-700"></i> {{ volunteer.phone }}
            </div>
            <div v-if="volunteer.website" class="mb-2 flex items-center text-gray-700">
              <i class="fas fa-globe mr-2 text-yellow-700"></i>
              <a :href="volunteer.website" target="_blank" class="text-ukraine-blue hover:underline">{{ volunteer.website }}</a>
            </div>
            <div v-if="volunteer.rating" class="mb-2 flex items-center text-gray-700">
              <i class="fas fa-star mr-2 text-yellow-500"></i>
              <span>Рейтинг: {{ volunteer.rating }}/5</span>
            </div>
            <div v-if="volunteer.experience" class="mb-2 flex items-center text-gray-700">
              <i class="fas fa-briefcase mr-2 text-blue-500"></i>
              <span>Досвід: {{ volunteer.experience }} років</span>
            </div>
          </div>
        </div>
        <div v-if="volunteer.specializations && volunteer.specializations.length > 0" class="mb-8">
          <div class="font-semibold mb-2 text-gray-700">Спеціалізації:</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="spec in volunteer.specializations" :key="spec" class="px-3 py-1 bg-ukraine-blue bg-opacity-10 text-white text-xs rounded-full">
              {{ spec }}
            </span>
          </div>
        </div>
        <div class="mb-8">
          <div class="font-semibold mb-2 text-gray-700">Розташування на карті:</div>
          <l-map :zoom="13" :center="locationCoords" style="height: 300px; border-radius: 16px; overflow: hidden;">
            <l-tile-layer :url="tileUrl" :attribution="tileAttribution" />
            <l-marker :lat-lng="locationCoords">
              <l-popup>{{ volunteer.location }}</l-popup>
            </l-marker>
          </l-map>
        </div>
      </div>
      <div v-else-if="loading" class="text-center text-gray-500 py-12">
        <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
        <div>Завантаження...</div>
      </div>
      <div v-else class="text-center text-gray-500 py-12">
        <i class="fas fa-exclamation-triangle text-4xl mb-4 text-red-500"></i>
        <div>Волонтер не знайдений</div>
        <button @click="goBack" class="mt-4 px-4 py-2 bg-ukraine-blue text-white rounded hover:bg-blue-700">
          Повернутися до списку
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVolunteersStore } from '../stores/volunteers'
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix default icon path for leaflet
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const route = useRoute()
const router = useRouter()
const volunteersStore = useVolunteersStore()
const loading = ref(true)

// Отримуємо волонтера з store або завантажуємо його
const volunteer = computed(() => {
  const id = route.params.id as string
  return volunteersStore.volunteers?.find(v => v.id === id) || null
})

// Координати для карти
const locationCoords = computed<[number, number]>(() => {
  if (volunteer.value?.latitude && volunteer.value?.longitude) {
    return [volunteer.value.latitude, volunteer.value.longitude]
  }
  return [49.444433, 32.059767] // Координати по замовчуванню (Черкаси)
})

const goBack = () => {
  router.push({ name: 'volunteers' })
}

// Новые функции навигации
const goToFinancialHelp = () => {
  router.push('/financial')
}

const goToOrganizationProjects = () => {
  // Переход на страницу проектов конкретной организации
  router.push(`/organization-projects/${volunteer.value.id}`)
}

const formatDate = (date: Date) => {
  if (!date) return '—'
  const d = new Date(date)
  return d.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })
}

const getTypeClass = (type: string) => {
  const classes: Record<string, string> = {
    volunteer: 'bg-blue-100 text-blue-800',
    fund: 'bg-yellow-100 text-yellow-800',
    rehabilitation: 'bg-green-100 text-green-800',
    church: 'bg-purple-100 text-purple-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}
const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    volunteer: 'Волонтер',
    fund: 'Фонд',
    rehabilitation: 'Центр реабілітації',
    church: 'Церква/релігійна громада'
  }
  return labels[type] || type
}
const getTypeIcon = (type: string) => {
  const icons: Record<string, string> = {
    volunteer: 'fas fa-hand-heart',
    fund: 'fas fa-building',
    rehabilitation: 'fas fa-hospital',
    church: 'fas fa-church'
  }
  return icons[type] || 'fas fa-user'
}

onMounted(async () => {
  loading.value = true
  
  try {
    // Якщо дані ще не завантажені, завантажуємо їх
    if (!volunteersStore.volunteers || volunteersStore.volunteers.length === 0) {
      await volunteersStore.fetchVolunteers()
    }
    
    // Перевіряємо чи існує волонтер з таким ID
    const id = route.params.id as string
    const volunteerExists = volunteersStore.volunteers?.find(v => v.id === id)
    
    if (!volunteerExists) {
      console.warn(`Волонтер з ID ${id} не знайдений`)
      // Можна перенаправити назад або показати помилку
      router.push({ name: 'volunteers' })
      return
    }
    
  } catch (error) {
    console.error('Помилка завантаження даних волонтера:', error)
    // Можна показати повідомлення про помилку
    router.push({ name: 'volunteers' })
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.text-ukraine-blue {
  color: #0057B8;
}
.bg-ukraine-blue {
  background-color: #0057B8;
}
.bg-ukraine-yellow {
  background-color: #FFDD00;
  color: #0057B8;
}
.card-shadow {
  box-shadow: 0 8px 32px 0 rgba(0,87,184,0.15);
}
</style>