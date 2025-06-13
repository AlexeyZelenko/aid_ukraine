<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('map.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('map.subtitle') }}</p>
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
      </div>
    </div>

    <!-- Map Container -->
    <div class="h-[600px] relative">
      <div id="map" class="w-full h-full"></div>
      
      <!-- Map Controls -->
      <div class="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10">
        <div class="space-y-3">
          <button 
            @click="addHelpPoint"
            class="btn-ukraine w-full text-sm"
          >
            <i class="fas fa-plus mr-2"></i>
            Додати точку допомоги
          </button>
          
          <div class="border-t pt-3">
            <h4 class="font-semibold text-sm mb-2">Фільтри:</h4>
            <div class="space-y-2">
              <label class="flex items-center text-sm">
                <input type="checkbox" v-model="filters.medical" class="mr-2">
                <span class="flex items-center">
                  <i class="fas fa-plus-circle text-red-500 mr-1"></i>
                  Медична допомога
                </span>
              </label>
              <label class="flex items-center text-sm">
                <input type="checkbox" v-model="filters.food" class="mr-2">
                <span class="flex items-center">
                  <i class="fas fa-utensils text-green-500 mr-1"></i>
                  Їжа
                </span>
              </label>
              <label class="flex items-center text-sm">
                <input type="checkbox" v-model="filters.shelter" class="mr-2">
                <span class="flex items-center">
                  <i class="fas fa-home text-blue-500 mr-1"></i>
                  Притулок
                </span>
              </label>
              <label class="flex items-center text-sm">
                <input type="checkbox" v-model="filters.transport" class="mr-2">
                <span class="flex items-center">
                  <i class="fas fa-car text-yellow-500 mr-1"></i>
                  Транспорт
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Help Points List -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-2xl font-semibold mb-6">Точки допомоги</h2>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="point in helpPoints" 
          :key="point.id"
          class="bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover"
        >
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-semibold text-lg">{{ point.title }}</h3>
            <i 
              :class="getPointIcon(point.type)" 
              :style="{ color: getPointColor(point.type) }"
              class="text-xl"
            ></i>
          </div>
          
          <p class="text-gray-600 mb-4">{{ point.description }}</p>
          
          <div class="space-y-2 text-sm text-gray-600 mb-4">
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt mr-2 text-ukraine-blue"></i>
              {{ point.address }}
            </div>
            <div class="flex items-center">
              <i class="fas fa-phone mr-2 text-ukraine-blue"></i>
              {{ point.phone }}
            </div>
            <div class="flex items-center">
              <i class="fas fa-clock mr-2 text-ukraine-blue"></i>
              {{ point.hours }}
            </div>
          </div>
          
          <div class="flex justify-between items-center">
            <span 
              class="px-3 py-1 text-xs rounded-full"
              :class="{
                'bg-green-100 text-green-800': point.status === 'active',
                'bg-red-100 text-red-800': point.status === 'urgent',
                'bg-gray-100 text-gray-800': point.status === 'inactive'
              }"
            >
              {{ getStatusLabel(point.status) }}
            </span>
            <button 
              @click="showOnMap(point)"
              class="text-ukraine-blue hover:text-ukraine-blue-light text-sm"
            >
              <i class="fas fa-map mr-1"></i>
              Показати на карті
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Point Modal -->
    <div 
      v-if="showAddModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeAddModal"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" @click.stop>
        <h3 class="text-xl font-semibold mb-4">Додати точку допомоги</h3>
        
        <form @submit.prevent="submitHelpPoint">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Назва</label>
              <input 
                v-model="pointForm.title"
                type="text" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Тип допомоги</label>
              <select 
                v-model="pointForm.type"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
                <option value="medical">Медична допомога</option>
                <option value="food">Їжа</option>
                <option value="shelter">Притулок</option>
                <option value="transport">Транспорт</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Опис</label>
              <textarea 
                v-model="pointForm.description"
                rows="3"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Адреса</label>
              <input 
                v-model="pointForm.address"
                type="text" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <input 
                v-model="pointForm.phone"
                type="tel" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Години роботи</label>
              <input 
                v-model="pointForm.hours"
                type="text" 
                placeholder="Пн-Пт 9:00-18:00"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              @click="closeAddModal"
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {{ $t('common.cancel') }}
            </button>
            <button 
              type="submit"
              class="btn-ukraine"
            >
              {{ $t('common.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'

interface HelpPoint {
  id: string
  title: string
  type: 'medical' | 'food' | 'shelter' | 'transport'
  description: string
  address: string
  phone: string
  hours: string
  lat: number
  lng: number
  status: 'active' | 'urgent' | 'inactive'
}

const showAddModal = ref(false)
const map = ref<any>(null)

const filters = reactive({
  medical: true,
  food: true,
  shelter: true,
  transport: true
})

const pointForm = ref({
  title: '',
  type: 'medical' as HelpPoint['type'],
  description: '',
  address: '',
  phone: '',
  hours: ''
})

// Mock data for demonstration
const helpPoints = ref<HelpPoint[]>([
  {
    id: '1',
    title: 'Медичний центр "Надія"',
    type: 'medical',
    description: 'Безкоштовна медична допомога для переселенців',
    address: 'вул. Хрещатик, 1, Київ',
    phone: '+38 (044) 123-45-67',
    hours: 'Пн-Нд 8:00-20:00',
    lat: 50.4501,
    lng: 30.5234,
    status: 'active'
  },
  {
    id: '2',
    title: 'Центр харчування',
    type: 'food',
    description: 'Гарячі обіди для нужденних',
    address: 'вул. Володимирська, 10, Київ',
    phone: '+38 (044) 234-56-78',
    hours: 'Пн-Пт 12:00-15:00',
    lat: 50.4503,
    lng: 30.5237,
    status: 'active'
  },
  {
    id: '3',
    title: 'Тимчасове житло',
    type: 'shelter',
    description: 'Тимчасове розміщення для переселенців',
    address: 'вул. Грушевського, 5, Київ',
    phone: '+38 (044) 345-67-89',
    hours: 'Цілодобово',
    lat: 50.4499,
    lng: 30.5240,
    status: 'urgent'
  }
])

const getPointIcon = (type: string) => {
  const icons = {
    medical: 'fas fa-plus-circle',
    food: 'fas fa-utensils',
    shelter: 'fas fa-home',
    transport: 'fas fa-car'
  }
  return icons[type as keyof typeof icons] || 'fas fa-map-marker-alt'
}

const getPointColor = (type: string) => {
  const colors = {
    medical: '#ef4444',
    food: '#22c55e',
    shelter: '#3b82f6',
    transport: '#eab308'
  }
  return colors[type as keyof typeof colors] || '#6b7280'
}

const getStatusLabel = (status: string) => {
  const labels = {
    active: 'Активна',
    urgent: 'Терміново',
    inactive: 'Неактивна'
  }
  return labels[status as keyof typeof labels] || status
}

const initMap = () => {
  // This would initialize a real map (Leaflet, Google Maps, etc.)
  // For now, it's just a placeholder
  console.log('Map initialized')
}

const addHelpPoint = () => {
  showAddModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
  pointForm.value = {
    title: '',
    type: 'medical',
    description: '',
    address: '',
    phone: '',
    hours: ''
  }
}

const submitHelpPoint = () => {
  // In a real app, this would save to Firebase
  const newPoint: HelpPoint = {
    id: Date.now().toString(),
    ...pointForm.value,
    lat: 50.4501 + Math.random() * 0.01,
    lng: 30.5234 + Math.random() * 0.01,
    status: 'active'
  }
  
  helpPoints.value.push(newPoint)
  closeAddModal()
}

const showOnMap = (point: HelpPoint) => {
  // This would center the map on the point
  console.log('Showing point on map:', point)
}

watch(filters, () => {
  // This would update map markers based on filters
  console.log('Filters updated:', filters)
}, { deep: true })

onMounted(() => {
  initMap()
})
</script>