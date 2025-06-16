<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <!-- Authentication Check -->
      <div v-if="!authStore.user && !authStore.loading" class="text-center mb-8">
        <div class="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-lock text-3xl text-white"></i>
        </div>
        <h1 class="text-3xl font-bold text-red-600 mb-4">Необхідна авторизація</h1>
        <p class="text-gray-600 mb-6">Для реєстрації церкви або релігійної організації потрібно увійти в систему</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/login" 
            class="bg-ukraine-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <i class="fas fa-sign-in-alt mr-2"></i>
            Увійти в систему
          </router-link>
          <router-link 
            to="/register" 
            class="border border-ukraine-blue text-ukraine-blue px-6 py-3 rounded-lg hover:bg-ukraine-blue hover:text-white transition-colors font-medium"
          >
            <i class="fas fa-user-plus mr-2"></i>
            Зареєструватися
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="authStore.loading" class="text-center py-12">
        <i class="fas fa-spinner fa-spin text-4xl text-purple-600 mb-4"></i>
        <p class="text-gray-600">Завантаження...</p>
      </div>

      <!-- Registration Form (only for authenticated users) -->
      <div v-else>
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-church text-3xl text-white"></i>
          </div>
          <h1 class="text-3xl font-bold text-purple-700 mb-2">Реєстрація церкви/релігійної організації</h1>
          <p class="text-gray-600">Долучайтеся до мережі релігійних організацій, які допомагають людям</p>
          
          <!-- User Info -->
          <div class="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p class="text-sm text-green-800">
              <i class="fas fa-user-check mr-2"></i>
              Ви увійшли як: <strong>{{ authStore.user.email }}</strong>
            </p>
          </div>
        </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Назва організації *
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Назва церкви або релігійної організації"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Тип організації *
          </label>
          <select
            v-model="form.organizationType"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="">Оберіть тип організації</option>
            <option value="orthodox">Православна церква</option>
            <option value="catholic">Католицька церква</option>
            <option value="protestant">Протестантська церква</option>
            <option value="baptist">Баптистська церква</option>
            <option value="pentecostal">П'ятидесятницька церква</option>
            <option value="evangelical">Євангельська церква</option>
            <option value="adventist">Адвентистська церква</option>
            <option value="jewish">Іудейська громада</option>
            <option value="muslim">Мусульманська громада</option>
            <option value="other">Інша релігійна організація</option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Контактна особа *
            </label>
            <input
              v-model="form.contactPerson"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Ім'я та прізвище відповідальної особи"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Посада
            </label>
            <input
              v-model="form.position"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Священик, пастор, імам та ін."
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="church@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Телефон *
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="+38 (0XX) XXX-XX-XX"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Адреса *
          </label>
          <input
            v-model="form.address"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Повна адреса організації"
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
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Місто, область"
          />
        </div>

        <!-- Інтерактивна карта для вибору місця -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Оберіть точне розташування на карті
          </label>
          <div class="map-container bg-gray-100 rounded-lg border border-gray-300 overflow-hidden" style="height: 300px;">
            <l-map 
              :zoom="mapZoom" 
              :center="mapCenter" 
              style="height: 100%; width: 100%;"
              @click="onMapClick"
            >
              <l-tile-layer :url="tileUrl" :attribution="tileAttribution" />
              <l-marker 
                v-if="form.latitude && form.longitude" 
                :lat-lng="[form.latitude, form.longitude]"
                :draggable="true"
                @dragend="onMarkerDragEnd"
              >
                <l-popup>
                  {{ form.location || 'Обрана локація' }}<br>
                  Координати: {{ form.latitude?.toFixed(6) }}, {{ form.longitude?.toFixed(6) }}
                </l-popup>
              </l-marker>
            </l-map>
          </div>
          <p class="text-sm text-gray-600 mt-2">
            <i class="fas fa-info-circle mr-1"></i>
            Натисніть на карту щоб обрати точне розташування вашої організації, або перетягніть маркер
          </p>
          
          <!-- Швидкий вибір міст -->
          <div class="mt-3">
            <p class="text-sm font-medium text-gray-700 mb-2">Швидкий вибір великих міст:</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="city in quickCities"
                :key="city.name"
                type="button"
                @click="setCoordinates(city.lat, city.lng, city.name)"
                class="px-3 py-1 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full transition-colors"
              >
                {{ city.name }}
              </button>
            </div>
          </div>

          <!-- Координати -->
          <div v-if="form.latitude && form.longitude" class="mt-3 p-3 bg-purple-50 rounded-lg">
            <p class="text-sm text-purple-700">
              <i class="fas fa-map-marker-alt mr-1"></i>
              <strong>Обрані координати:</strong> {{ form.latitude.toFixed(6) }}, {{ form.longitude.toFixed(6) }}
            </p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Веб-сайт
          </label>
          <input
            v-model="form.website"
            type="url"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="https://church.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Кількість прихожан (приблизно)
          </label>
          <input
            v-model="form.members"
            type="number"
            min="1"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Приблизна кількість активних прихожан"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Досвід соціальної роботи (років)
          </label>
          <input
            v-model="form.experience"
            type="number"
            min="0"
            max="100"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Скільки років організація займається допомогою людям"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Напрямки допомоги
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label v-for="service in availableServices" :key="service" class="flex items-center">
              <input
                type="checkbox"
                :value="service"
                v-model="form.services"
                class="rounded border-gray-300 text-purple-600 focus:ring-purple-600 mr-2"
              />
              <span class="text-sm">{{ service }}</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Про організацію *
          </label>
          <textarea
            v-model="form.description"
            required
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Розкажіть про вашу організацію, її діяльність та як ви допомагаете людям"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Документи та реєстрація
          </label>
          <div class="space-y-3">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="form.hasRegistration"
                class="rounded border-gray-300 text-purple-600 focus:ring-purple-600 mr-3"
              />
              <span class="text-sm">Маємо офіційну реєстрацію як релігійна організація</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="form.hasTaxNumber"
                class="rounded border-gray-300 text-purple-600 focus:ring-purple-600 mr-3"
              />
              <span class="text-sm">Маємо податковий номер</span>
            </label>
          </div>
        </div>

        <div class="bg-purple-50 p-4 rounded-lg">
          <div class="flex items-start">
            <input
              v-model="form.agreeToTerms"
              type="checkbox"
              required
              class="rounded border-gray-300 text-purple-600 focus:ring-purple-600 mr-3 mt-1"
            />
            <div class="text-sm text-gray-700">
              <p>Я погоджуюся з <a href="#" class="text-purple-600 hover:underline">умовами використання</a> та <a href="#" class="text-purple-600 hover:underline">політикою конфіденційності</a>.</p>
              <p class="mt-2">Я підтверджую, що представляю вказану релігійну організацію та маю повноваження для її реєстрації на платформі.</p>
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
            class="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50"
          >
            <i v-if="submitting" class="fas fa-spinner fa-spin mr-2"></i>
            {{ submitting ? 'Відправляємо...' : 'Зареєструватися' }}
          </button>
        </div>
      </form>
      </div> <!-- End of authenticated user section -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVolunteersStore } from '../stores/volunteers'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'
import { db } from '../config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
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

const router = useRouter()
const volunteersStore = useVolunteersStore()
const authStore = useAuthStore()
const toast = useToast()

const submitting = ref(false)

// Карта: центр України за замовчуванням (Київ)
const mapZoom = ref(6)
const mapCenter = ref([49.0, 32.0]) // Центр України
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const form = ref({
  name: '',
  organizationType: '',
  contactPerson: '',
  position: '',
  email: '',
  phone: '',
  address: '',
  location: '',
  latitude: null as number | null,
  longitude: null as number | null,
  website: '',
  members: 0,
  experience: 0,
  services: [] as string[],
  description: '',
  hasRegistration: false,
  hasTaxNumber: false,
  agreeToTerms: false
})

// Швидкий вибір основних міст України
const quickCities = [
  { name: 'Київ', lat: 50.4501, lng: 30.5234 },
  { name: 'Харків', lat: 49.9935, lng: 36.2304 },
  { name: 'Одеса', lat: 46.4825, lng: 30.7233 },
  { name: 'Дніпро', lat: 48.4647, lng: 35.0462 },
  { name: 'Донецьк', lat: 48.0159, lng: 37.8028 },
  { name: 'Запоріжжя', lat: 47.8388, lng: 35.1396 },
  { name: 'Львів', lat: 49.8397, lng: 24.0297 },
  { name: 'Кривий Ріг', lat: 47.9077, lng: 33.3847 },
  { name: 'Миколаїв', lat: 46.9659, lng: 31.9974 },
  { name: 'Маріуполь', lat: 47.0971, lng: 37.5407 },
  { name: 'Луганськ', lat: 48.5740, lng: 39.3078 },
  { name: 'Вінниця', lat: 49.2331, lng: 28.4682 },
  { name: 'Макіївка', lat: 48.0470, lng: 37.9577 },
  { name: 'Севастополь', lat: 44.6166, lng: 33.5254 },
  { name: 'Сімферополь', lat: 44.9520, lng: 34.1022 },
  { name: 'Херсон', lat: 46.6354, lng: 32.6169 },
  { name: 'Полтава', lat: 49.5882, lng: 34.5514 },
  { name: 'Чернігів', lat: 51.4982, lng: 31.2893 },
  { name: 'Черкаси', lat: 49.4445, lng: 32.0597 },
  { name: 'Житомир', lat: 50.2649, lng: 28.6767 },
  { name: 'Суми', lat: 50.9077, lng: 34.7981 },
  { name: 'Хмельницький', lat: 49.4229, lng: 26.9871 }
]

const availableServices = [
  'Духовна підтримка',
  'Консультування',
  'Матеріальна допомога',
  'Харчування',
  'Одяг',
  'Тимчасове житло',
  'Медична допомога',
  'Психологічна допомога',
  'Освітні програми',
  'Дитячі програми',
  'Програми для літніх людей',
  'Реабілітація',
  'Соціальна адаптація',
  'Юридична допомога'
]

// Методи для роботи з картою
const onMapClick = (e: any) => {
  form.value.latitude = e.latlng.lat
  form.value.longitude = e.latlng.lng
  console.log('Обрано координати:', e.latlng.lat, e.latlng.lng)
}

const onMarkerDragEnd = (e: any) => {
  form.value.latitude = e.target.getLatLng().lat
  form.value.longitude = e.target.getLatLng().lng
  console.log('Маркер переміщено:', e.target.getLatLng().lat, e.target.getLatLng().lng)
}

const setCoordinates = (lat: number, lng: number, cityName: string) => {
  form.value.latitude = lat
  form.value.longitude = lng
  mapCenter.value = [lat, lng]
  mapZoom.value = 12 // Збільшуємо масштаб для конкретного міста
  console.log(`Встановлено координати для ${cityName}:`, lat, lng)
}

const submitForm = async () => {
  // Перевірка авторизації
  if (!authStore.user) {
    toast.add({
      severity: 'error',
      summary: 'Помилка',
      detail: 'Для реєстрації церкви потрібно увійти в систему',
      life: 3000
    })
    return
  }

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
    // Дані для збереження в Firebase
    const churchData = {
      // Основна інформація
      name: form.value.name,
      organizationType: form.value.organizationType,
      contactPerson: form.value.contactPerson,
      position: form.value.position || '',
      email: form.value.email,
      phone: form.value.phone,
      address: form.value.address,
      location: form.value.location,
      website: form.value.website || '',
      
      // Координати
      latitude: form.value.latitude,
      longitude: form.value.longitude,
      
      // Додаткова інформація
      members: form.value.members || 0,
      experience: form.value.experience || 0,
      services: form.value.services,
      description: form.value.description,
      
      // Документи
      hasRegistration: form.value.hasRegistration,
      hasTaxNumber: form.value.hasTaxNumber,
      
      // Системні поля
      userId: authStore.user.uid,
      userEmail: authStore.user.email,
      status: 'pending', // pending, approved, rejected
      verified: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      
      // Тип запису
      type: 'church'
    }

    // Збереження в Firebase Firestore
    const docRef = await addDoc(collection(db, 'churches'), churchData)
    console.log('Церква зареєстрована з ID:', docRef.id)

    // Також додаємо в volunteers store для сумісності
    const volunteerData = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      location: form.value.location,
      organization: form.value.name,
      type: 'church' as const,
      experience: form.value.experience || 0,
      specializations: form.value.services,
      website: form.value.website,
      description: `${form.value.description}\n\nТип організації: ${getOrganizationTypeLabel(form.value.organizationType)}\nКонтактна особа: ${form.value.contactPerson}${form.value.position ? ` (${form.value.position})` : ''}\nАдреса: ${form.value.address}${form.value.members > 0 ? `\nКількість прихожан: ${form.value.members}` : ''}`,
      verified: false,
      createdAt: new Date(),
      latitude: form.value.latitude,
      longitude: form.value.longitude,
      organizationType: form.value.organizationType,
      contactPerson: form.value.contactPerson,
      position: form.value.position,
      address: form.value.address,
      members: form.value.members,
      hasRegistration: form.value.hasRegistration,
      hasTaxNumber: form.value.hasTaxNumber,
      userId: authStore.user.uid,
      firebaseId: docRef.id
    }

    await volunteersStore.addVolunteer(volunteerData)

    toast.add({
      severity: 'success',
      summary: 'Успіх',
      detail: 'Заявка на реєстрацію релігійної організації успішно подана! Очікуйте на верифікацію.',
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

const getOrganizationTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    orthodox: 'Православна церква',
    catholic: 'Католицька церква',
    protestant: 'Протестантська церква',
    baptist: 'Баптистська церква',
    pentecostal: 'П\'ятидесятницька церква',
    evangelical: 'Євангельська церква',
    adventist: 'Адвентистська церква',
    jewish: 'Іудейська громада',
    muslim: 'Мусульманська громада',
    other: 'Інша релігійна організація'
  }
  return labels[type] || type
}
</script>

<style scoped>
.text-purple-600 {
  color: #9333ea;
}
.text-purple-700 {
  color: #7c3aed;
}
.bg-purple-600 {
  background-color: #9333ea;
}
.bg-purple-700 {
  background-color: #7c3aed;
}
.focus\:ring-purple-600:focus {
  --tw-ring-color: #9333ea;
}
</style>
