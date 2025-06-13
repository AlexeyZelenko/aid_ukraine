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
          <LMap ref="map" :zoom="zoom" :center="[50.4501, 30.5234]" :use-global-leaflet="false">
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="<a href=&quot;https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors"
            ></LTileLayer>
            <LMarker
              v-for="point in filteredHelpPoints"
              :key="point.id"
              :lat-lng="[point.latitude, point.longitude]"
            >
              <LIcon :icon-url="getPointIconUrl(point.type)" :icon-size="[32, 32]" />
              <LPopup>
                <div class="font-bold">{{ point.title }}</div>
                <div>{{ point.description }}</div>
                <div>{{ point.address }}</div>
                <div>{{ point.phone }}</div>
                <div>{{ point.hours }}</div>
              </LPopup>
            </LMarker>
          </LMap>
      
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
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

interface HelpPoint {
  id: number;
  title: string;
  type: 'medical' | 'food' | 'shelter' | 'transport';
  description: string;
  address: string;
  phone: string;
  hours: string;
  status: 'active' | 'urgent' | 'inactive';
  latitude: number;
  longitude: number;
}

const { t } = useI18n();

const zoom = ref(10);

const showAddModal = ref(false);
const map = ref<any>(null)

const filters = reactive({
  medical: true,
  food: true,
  shelter: true,
  transport: true
})

const pointForm = ref({
  title: '',
  type: 'medical',
  description: '',
  address: '',
  phone: '',
  hours: '',
  latitude: 0,
  longitude: 0,
});

// Mock data for demonstration
const helpPoints = ref([
  {
    id: 1,
    title: 'Медичний пункт №1',
    type: 'medical',
    description: 'Надання першої медичної допомоги та консультацій.',
    address: 'Вул. Хрещатик, 24, Київ',
    phone: '+380 44 123 4567',
    hours: 'Пн-Пт 9:00-18:00',
    status: 'active',
    latitude: 50.4501,
    longitude: 30.5234,
  },
  {
    id: 2,
    title: 'Їдальня "Надія"',
    type: 'food',
    description: 'Гарячі обіди для всіх, хто потребує.',
    address: 'Пр. Перемоги, 10, Київ',
    phone: '+380 44 765 4321',
    hours: 'Щодня 12:00-15:00',
    status: 'urgent',
    latitude: 50.4601,
    longitude: 30.5334,
  },
  {
    id: 3,
    title: 'Притулок "Затишок"',
    type: 'shelter',
    description: 'Тимчасове житло для переселенців.',
    address: 'Вул. Мечникова, 5, Київ',
    phone: '+380 44 987 6543',
    hours: 'Цілодобово',
    status: 'active',
    latitude: 50.4401,
    longitude: 30.5134,
  },
  {
    id: 4,
    title: 'Транспортний хаб "Єдність"',
    type: 'transport',
    description: 'Допомога з транспортуванням до безпечних регіонів.',
    address: 'Залізничний вокзал, Київ',
    phone: '+380 44 234 5678',
    hours: 'Пн-Нд 8:00-20:00',
    status: 'inactive',
    latitude: 50.4701,
    longitude: 30.5434,
  },
]);

function addHelpPoint() {
  showAddModal.value = true;
  // Optionally, get current map center for new point default coordinates
  // if (map.value) {
  //   const center = map.value.leafletObject.getCenter();
  //   pointForm.value.latitude = center.lat;
  //   pointForm.value.longitude = center.lng;
  // }
}

function closeAddModal() {
  showAddModal.value = false;
  resetForm();
}

const submitHelpPoint = () => {
  const newPoint: HelpPoint = {
    id: helpPoints.value.length + 1,
    title: pointForm.value.title,
    type: pointForm.value.type as 'medical' | 'food' | 'shelter' | 'transport',
    description: pointForm.value.description,
    address: pointForm.value.address,
    phone: pointForm.value.phone,
    hours: pointForm.value.hours,
    status: 'active',
    latitude: pointForm.value.latitude,
    longitude: pointForm.value.longitude,
  };
  helpPoints.value.push(newPoint);
  closeAddModal();
};

const resetForm = () => {
  pointForm.value = {
    title: '',
    type: 'medical',
    description: '',
    address: '',
    phone: '',
    hours: '',
    latitude: 0,
    longitude: 0,
  };
};

function getPointIconUrl(type: string) {
  // You would typically have different icons for different types
  // For simplicity, using a generic marker icon here.
  // In a real app, you'd import specific icon images.
  switch (type) {
    case 'medical':
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
    case 'food':
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
    case 'shelter':
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png';
    case 'transport':
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png';
    default:
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png';
  }
}

function getPointIcon(type: string) {
  switch (type) {
    case 'medical':
      return 'fas fa-plus-circle';
    case 'food':
      return 'fas fa-utensils';
    case 'shelter':
      return 'fas fa-home';
    case 'transport':
      return 'fas fa-car';
    default:
      return 'fas fa-info-circle';
  }
}

function getPointColor(type: string) {
  switch (type) {
    case 'medical':
      return '#ef4444'; // red-500
    case 'food':
      return '#22c55e'; // green-500
    case 'shelter':
      return '#3b82f6'; // blue-500
    case 'transport':
      return '#eab308'; // yellow-500
    default:
      return '#6b7280'; // gray-500
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'active':
      return 'Активна';
    case 'urgent':
      return 'Термінова';
    case 'inactive':
      return 'Неактивна';
    default:
      return '';
  }
}



function showOnMap(point: any) {
  if (map.value) {
    map.value.leafletObject.setView([point.latitude, point.longitude], 14); // Center map and set zoom
  }
}

watch(filters, () => {
  // This would update map markers based on filters
  console.log('Filters updated:', filters)
}, { deep: true })

onMounted(() => {
  // Map initialization is handled by Vue Leaflet's LMap component
})
</script>