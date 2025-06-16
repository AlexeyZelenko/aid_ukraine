<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('map.title') }}</h1>
        <!-- <p class="text-xl text-gray-600">{{ $t('map.subtitle') }}</p> -->
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
      </div>
    </div>

        <!-- Volunteer Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold mb-4 text-center">Фільтр волонтерів</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input type="checkbox" v-model="volunteerFilters.volunteer" class="mr-3">
            <span class="flex items-center">
              <i class="fas fa-user text-blue-600 mr-2"></i>
              Волонтери
            </span>
          </label>
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input type="checkbox" v-model="volunteerFilters.fund" class="mr-3">
            <span class="flex items-center">
              <i class="fas fa-building text-yellow-600 mr-2"></i>
              Фонди
            </span>
          </label>
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input type="checkbox" v-model="volunteerFilters.rehabilitation" class="mr-3">
            <span class="flex items-center">
              <i class="fas fa-hospital text-green-600 mr-2"></i>
              Реабілітація
            </span>
          </label>
          <label class="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input type="checkbox" v-model="volunteerFilters.church" class="mr-3">
            <span class="flex items-center">
              <i class="fas fa-church text-purple-600 mr-2"></i>
              Церкви
            </span>
          </label>
        </div>
        <div class="text-center mt-4">
          <span class="text-sm text-gray-600">
            Показано волонтерів на карті: <strong>{{ filteredVolunteers.length }}</strong>
          </span>
        </div>
      </div>
    </div>

    <!-- Map Container -->
    <div class="h-[600px] relative">
          <LMap ref="map" :zoom="zoom" :center="[49.444433, 32.059767]" :use-global-leaflet="false">
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="<a href=&quot;https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors"
            ></LTileLayer>
            
            <!-- Volunteers Markers -->
            <LMarker
              v-for="volunteer in filteredVolunteers"
              :key="`volunteer-${volunteer.id}`"
              :lat-lng="[volunteer.latitude, volunteer.longitude]"
            >
              <LIcon :icon-url="getVolunteerIconUrl(volunteer.type)" :icon-size="[32, 32]" />
              <LPopup>
                <div class="min-w-[200px]">
                  <div class="font-bold text-lg mb-2">{{ volunteer.name }}</div>
                  <div class="text-sm text-gray-600 mb-1">{{ volunteer.organization }}</div>
                  <div class="text-sm text-gray-600 mb-2">
                    <i class="fas fa-map-marker-alt mr-1"></i>
                    {{ volunteer.location }}
                  </div>
                  <div class="text-sm mb-2">{{ volunteer.description }}</div>
                  <div class="text-sm text-gray-600 mb-2">
                    <i class="fas fa-phone mr-1"></i>
                    {{ volunteer.phone }}
                  </div>
                  <div class="text-sm text-gray-600 mb-2">
                    <i class="fas fa-envelope mr-1"></i>
                    {{ volunteer.email }}
                  </div>
                  <div class="flex items-center justify-between">
                    <span 
                      class="px-2 py-1 text-xs rounded-full font-medium"
                      :class="getVolunteerTypeClass(volunteer.type)"
                    >
                      {{ getVolunteerTypeLabel(volunteer.type) }}
                    </span>
                    <div v-if="volunteer.verified" class="text-green-500">
                      <i class="fas fa-check-circle" title="Верифіковано"></i>
                    </div>
                  </div>
                </div>
              </LPopup>
            </LMarker>
          </LMap>
      </div>

    <!-- Volunteers List -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6 text-center">Волонтери на карті</h2>
          
          <div class="grid gap-4">
            <div 
              v-for="volunteer in volunteersWithCoordinates" 
              :key="volunteer.id"
              class="bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <div class="flex items-center mb-1">
                    <h3 class="font-semibold text-lg">{{ volunteer.name }}</h3>
                    <div v-if="volunteer.verified" class="ml-2">
                      <i class="fas fa-check-circle text-green-500" title="Верифіковано"></i>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600">{{ volunteer.organization }}</p>
                </div>
                <span 
                  class="px-3 py-1 text-xs rounded-full font-medium"
                  :class="getVolunteerTypeClass(volunteer.type)"
                >
                  {{ getVolunteerTypeLabel(volunteer.type) }}
                </span>
              </div>
              
              <p class="text-gray-600 mb-4 text-sm">{{ volunteer.description }}</p>
              
              <div class="space-y-2 text-sm text-gray-600 mb-4">
                <div class="flex items-center">
                  <i class="fas fa-map-marker-alt mr-2 text-ukraine-blue"></i>
                  {{ volunteer.location }}
                </div>
                <div class="flex items-center">
                  <i class="fas fa-phone mr-2 text-ukraine-blue"></i>
                  {{ volunteer.phone }}
                </div>
                <div class="flex items-center">
                  <i class="fas fa-envelope mr-2 text-ukraine-blue"></i>
                  {{ volunteer.email }}
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <div class="text-xs text-gray-500">
                  Зареєстровано: {{ formatDate(volunteer.createdAt) }}
                </div>
                <button 
                  @click="showVolunteerOnMap(volunteer)"
                  class="text-ukraine-blue hover:text-ukraine-blue-light text-sm"
                >
                  <i class="fas fa-map mr-1"></i>
                  Показати на карті
                </button>
              </div>
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
import { useVolunteersStore, type Volunteer } from '../stores/volunteers';
import { useToast } from 'primevue/usetoast';
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
const volunteersStore = useVolunteersStore();
const toast = useToast();

const zoom = ref(10);
const showAddModal = ref(false);
const map = ref<any>(null);

const volunteerFilters = reactive({
  volunteer: true,
  fund: true,
  rehabilitation: true,
  church: true
});

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

// Computed properties
const volunteersWithCoordinates = computed(() => {
  return volunteersStore.volunteers.filter(volunteer => 
    volunteer.latitude && volunteer.longitude && 
    !isNaN(volunteer.latitude) && !isNaN(volunteer.longitude)
  );
});

const filteredVolunteers = computed(() => {
  return volunteersWithCoordinates.value.filter(volunteer => {
    return volunteerFilters[volunteer.type as keyof typeof volunteerFilters];
  });
});

// Functions
function addHelpPoint() {
  showAddModal.value = true;
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

function getVolunteerIconUrl(type: string) {
  switch (type) {
    case 'volunteer':
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png';
    case 'fund':
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png';
    case 'rehabilitation':
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
    case 'church':
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png';
    default:
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png';
  }
}

function getVolunteerTypeClass(type: string) {
  switch (type) {
    case 'volunteer':
      return 'bg-blue-100 text-blue-800';
    case 'fund':
      return 'bg-yellow-100 text-yellow-800';
    case 'rehabilitation':
      return 'bg-green-100 text-green-800';
    case 'church':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getVolunteerTypeLabel(type: string) {
  switch (type) {
    case 'volunteer':
      return 'Волонтер';
    case 'fund':
      return 'Фонд';
    case 'rehabilitation':
      return 'Реабілітація';
    case 'church':
      return 'Церква';
    default:
      return 'Невідомо';
  }
}

function showVolunteerOnMap(volunteer: Volunteer) {
  if (map.value && volunteer.latitude && volunteer.longitude) {
    map.value.leafletObject.setView([volunteer.latitude, volunteer.longitude], 14);
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

watch(volunteerFilters, () => {
  console.log('Volunteer filters updated:', volunteerFilters);
}, { deep: true });

onMounted(async () => {
  try {
    await volunteersStore.fetchVolunteers();
    console.log('Волонтери завантажені для карти:', volunteersStore.volunteers.length);
    console.log('Волонтери з координатами:', volunteersWithCoordinates.value.length);
  } catch (error) {
    console.error('Помилка завантаження волонтерів для карти:', error);
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Не вдалося завантажити волонтерів для карти.',
      life: 3000
    });
  }
});
</script>