<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('volunteers.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('volunteers.subtitle') }}</p>
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <div class="text-2xl font-bold text-ukraine-blue">{{ totalVolunteers }}</div>
          <div class="text-sm text-gray-600">Всього волонтерів</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">{{ individualVolunteers }}</div>
          <div class="text-sm text-gray-600">Індивідуальні</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <div class="text-2xl font-bold text-yellow-600">{{ fundsCount }}</div>
          <div class="text-sm text-gray-600">Фонди</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 text-center">
          <div class="text-2xl font-bold text-green-600">{{ rehabilitationCenters }}</div>
          <div class="text-sm text-gray-600">Центри реабілітації</div>
        </div>
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

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex flex-col sm:flex-row gap-4 flex-1">
            <div class="relative flex-1">
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Пошук волонтерів..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
            </div>
            
            <select 
              v-model="selectedType"
              class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
            >
              <option value="">Всі типи</option>
              <option value="volunteer">Волонтери</option>
              <option value="fund">Фонди</option>
              <option value="rehabilitation">Центри реабілітації</option>
            </select>

            <select 
              v-model="selectedLocation"
              class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
            >
              <option value="">Всі міста</option>
              <option v-for="location in uniqueLocations" :key="location" :value="location">
                {{ location }}
              </option>
            </select>

            <select 
              v-model="selectedVerification"
              class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
            >
              <option value="">Всі</option>
              <option value="verified">Верифіковані</option>
              <option value="pending">Очікують верифікації</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Volunteers List -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold">Зареєстровані волонтери та організації</h2>
          <div class="text-sm text-gray-600">
            Знайдено: {{ filteredVolunteers.length }} з {{ mockVolunteers.length }}
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
            class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 card-hover"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center mb-2">
                  <h3 class="font-semibold text-lg text-gray-900">{{ volunteer.name }}</h3>
                  <div v-if="volunteer.verified" class="ml-2">
                    <i class="fas fa-check-circle text-green-500" title="Верифіковано"></i>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-1">{{ volunteer.organization }}</p>
                <div class="flex items-center text-xs text-gray-500">
                  <i class="fas fa-map-marker-alt mr-1"></i>
                  {{ volunteer.location }}
                </div>
              </div>
              <span 
                class="px-3 py-1 text-xs rounded-full font-medium"
                :class="getTypeClass(volunteer.type)"
              >
                {{ $t(`volunteers.types.${volunteer.type}`) }}
              </span>
            </div>

            <p class="text-sm text-gray-700 mb-4 line-clamp-3">{{ volunteer.description }}</p>

            <!-- Specializations -->
            <div v-if="volunteer.specializations && volunteer.specializations.length > 0" class="mb-4">
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="spec in volunteer.specializations.slice(0, 3)" 
                  :key="spec"
                  class="px-2 py-1 bg-ukraine-blue bg-opacity-10 text-ukraine-blue text-xs rounded-full"
                >
                  {{ spec }}
                </span>
                <span 
                  v-if="volunteer.specializations.length > 3"
                  class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  +{{ volunteer.specializations.length - 3 }}
                </span>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="space-y-2 text-sm text-gray-600 mb-4">
              <div class="flex items-center">
                <i class="fas fa-envelope mr-2 text-ukraine-blue"></i>
                <span class="truncate">{{ volunteer.email }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-phone mr-2 text-ukraine-blue"></i>
                {{ volunteer.phone }}
              </div>
              <div v-if="volunteer.website" class="flex items-center">
                <i class="fas fa-globe mr-2 text-ukraine-blue"></i>
                <a :href="volunteer.website" target="_blank" class="text-ukraine-blue hover:underline truncate">
                  {{ volunteer.website }}
                </a>
              </div>
            </div>

            <!-- Rating and Experience -->
            <div class="flex items-center justify-between text-sm mb-4">
              <div v-if="volunteer.rating" class="flex items-center">
                <div class="flex text-yellow-400 mr-1">
                  <i v-for="star in 5" :key="star" 
                     :class="star <= volunteer.rating ? 'fas fa-star' : 'far fa-star'"></i>
                </div>
                <span class="text-gray-600">({{ volunteer.rating }})</span>
              </div>
              <div v-if="volunteer.experience" class="text-gray-600">
                {{ volunteer.experience }} років досвіду
              </div>
            </div>

            <!-- Actions -->
            <div class="flex space-x-2">
              <button 
                @click="contactVolunteer(volunteer)"
                class="flex-1 bg-ukraine-blue text-white py-2 px-4 rounded-md hover:bg-ukraine-blue-light transition-colors text-sm"
              >
                <i class="fas fa-envelope mr-1"></i>
                Зв'язатися
              </button>
              <button 
                @click="viewProfile(volunteer)"
                class="flex-1 border border-ukraine-blue text-ukraine-blue py-2 px-4 rounded-md hover:bg-ukraine-blue hover:text-white transition-colors text-sm"
              >
                <i class="fas fa-user mr-1"></i>
                Профіль
              </button>
            </div>

            <!-- Registration Date -->
            <div class="text-xs text-gray-500 mt-3 text-center">
              Зареєстровано: {{ formatDate(volunteer.createdAt) }}
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!volunteersStore.loading && filteredVolunteers.length === 0" class="text-center py-12">
          <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Волонтерів не знайдено</h3>
          <p class="text-gray-500">Спробуйте змінити фільтри або зареєструйтеся як волонтер</p>
        </div>
      </div>
    </div>

    <!-- Registration Modal -->
    <div 
      v-if="showRegistrationModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeRegistrationModal"
    >
      <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6">
          <h3 class="text-2xl font-semibold mb-6">
            Реєстрація: {{ $t(`volunteers.types.${registrationType}`) }}
          </h3>
          
          <form @submit.prevent="submitRegistration">
            <div class="grid md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ registrationType === 'volunteer' ? 'Ім\'я та прізвище' : 'Назва організації' }} *
                </label>
                <input 
                  v-model="registrationForm.name"
                  type="text" 
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  :placeholder="registrationType === 'volunteer' ? 'Іван Петренко' : 'Назва фонду/організації'"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  v-model="registrationForm.email"
                  type="email" 
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  placeholder="email@example.com"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                <input 
                  v-model="registrationForm.phone"
                  type="tel" 
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  placeholder="+38 (0XX) XXX-XX-XX"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ registrationType === 'volunteer' ? 'Організація (опціонально)' : 'Повна назва організації' }}
                </label>
                <input 
                  v-model="registrationForm.organization"
                  type="text" 
                  :required="registrationType !== 'volunteer'"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  :placeholder="registrationType === 'volunteer' ? 'Назва організації (якщо є)' : 'Повна офіційна назва'"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Місцезнаходження *</label>
                <input 
                  v-model="registrationForm.location"
                  type="text" 
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  placeholder="Місто, область"
                >
              </div>

              <div v-if="registrationType !== 'volunteer'">
                <label class="block text-sm font-medium text-gray-700 mb-1">Веб-сайт</label>
                <input 
                  v-model="registrationForm.website"
                  type="url" 
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  placeholder="https://example.com"
                >
              </div>

              <div v-if="registrationType === 'volunteer'">
                <label class="block text-sm font-medium text-gray-700 mb-1">Досвід (років)</label>
                <input 
                  v-model.number="registrationForm.experience"
                  type="number" 
                  min="0"
                  max="50"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  placeholder="0"
                >
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Опис діяльності *</label>
                <textarea 
                  v-model="registrationForm.description"
                  rows="4"
                  required
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  :placeholder="getDescriptionPlaceholder()"
                ></textarea>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Спеціалізації (через кому)
                </label>
                <input 
                  v-model="registrationForm.specializationsText"
                  type="text" 
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  placeholder="медична допомога, психологічна підтримка, логістика"
                >
              </div>
            </div>

            <div class="flex justify-end space-x-3 mt-6">
              <button 
                type="button"
                @click="closeRegistrationModal"
                class="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {{ $t('common.cancel') }}
              </button>
              <button 
                type="submit"
                class="btn-ukraine"
                :disabled="submitting"
              >
                <i v-if="submitting" class="fas fa-spinner fa-spin mr-2"></i>
                <i v-else class="fas fa-user-plus mr-2"></i>
                {{ submitting ? 'Реєструю...' : $t('common.save') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVolunteersStore, type Volunteer } from '../stores/volunteers'
import { useAuthStore } from '../stores/auth'

const volunteersStore = useVolunteersStore()
const authStore = useAuthStore()

// Reactive data
const showRegistrationModal = ref(false)
const registrationType = ref<'volunteer' | 'fund' | 'rehabilitation'>('volunteer')
const submitting = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedLocation = ref('')
const selectedVerification = ref('')

const registrationForm = ref({
  name: '',
  email: '',
  phone: '',
  organization: '',
  description: '',
  location: '',
  website: '',
  experience: undefined as number | undefined,
  specializationsText: ''
})

// Extended mock data
const mockVolunteers: (Volunteer & { 
  specializations?: string[], 
  rating?: number, 
  experience?: number, 
  website?: string 
})[] = [
  {
    id: '1',
    name: 'Марія Коваленко',
    email: 'maria.kovalenko@email.com',
    phone: '+38 (050) 123-45-67',
    organization: 'Волонтер-медик',
    type: 'volunteer',
    description: 'Медична сестра з 10-річним досвідом. Надаю першу медичну допомогу, консультації з догляду за хворими.',
    location: 'Київ',
    verified: true,
    createdAt: new Date('2024-01-15'),
    specializations: ['медична допомога', 'перша допомога', 'догляд за хворими'],
    rating: 5,
    experience: 10
  },
  {
    id: '2',
    name: 'Фонд "Серце України"',
    email: 'info@heart-ukraine.org',
    phone: '+38 (044) 234-56-78',
    organization: 'Благодійний фонд "Серце України"',
    type: 'fund',
    description: 'Благодійний фонд, що займається допомогою переселенцям, забезпеченням медикаментами та продуктами харчування.',
    location: 'Київ',
    verified: true,
    createdAt: new Date('2024-01-10'),
    website: 'https://heart-ukraine.org',
    specializations: ['фінансова допомога', 'медикаменти', 'продукти харчування'],
    rating: 5
  },
  {
    id: '3',
    name: 'Олександр Петренко',
    email: 'alex.petrenko@email.com',
    phone: '+38 (067) 345-67-89',
    organization: 'Незалежний волонтер',
    type: 'volunteer',
    description: 'Водій-волонтер. Допомагаю з транспортуванням людей та вантажів. Маю власний мікроавтобус.',
    location: 'Львів',
    verified: true,
    createdAt: new Date('2024-01-12'),
    specializations: ['транспорт', 'логістика', 'доставка'],
    rating: 4,
    experience: 3
  },
  {
    id: '4',
    name: 'Центр реабілітації "Надія"',
    email: 'info@nadia-rehab.com',
    phone: '+38 (056) 456-78-90',
    organization: 'Центр реабілітації "Надія"',
    type: 'rehabilitation',
    description: 'Спеціалізований центр реабілітації для військових та цивільних. Фізична та психологічна реабілітація.',
    location: 'Дніпро',
    verified: true,
    createdAt: new Date('2024-01-08'),
    website: 'https://nadia-rehab.com',
    specializations: ['фізична реабілітація', 'психологічна допомога', 'медична реабілітація'],
    rating: 5
  },
  {
    id: '5',
    name: 'Ірина Сидоренко',
    email: 'irina.sydorenko@email.com',
    phone: '+38 (093) 567-89-01',
    organization: 'Психолог-волонтер',
    type: 'volunteer',
    description: 'Практикуючий психолог. Надаю безкоштовні консультації для людей, що пережили травму війни.',
    location: 'Одеса',
    verified: true,
    createdAt: new Date('2024-01-14'),
    specializations: ['психологічна підтримка', 'травма війни', 'консультації'],
    rating: 5,
    experience: 8
  },
  {
    id: '6',
    name: 'Фонд "Допомога дітям"',
    email: 'help@children-fund.org',
    phone: '+38 (032) 678-90-12',
    organization: 'Благодійний фонд "Допомога дітям"',
    type: 'fund',
    description: 'Спеціалізуємося на допомозі дітям-переселенцям. Забезпечуємо одягом, іграшками, навчальними матеріалами.',
    location: 'Львів',
    verified: false,
    createdAt: new Date('2024-01-11'),
    website: 'https://children-fund.org',
    specializations: ['допомога дітям', 'одяг', 'навчальні матеріали', 'іграшки']
  },
  {
    id: '7',
    name: 'Віктор Мельник',
    email: 'viktor.melnyk@email.com',
    phone: '+38 (095) 789-01-23',
    organization: 'IT-волонтер',
    type: 'volunteer',
    description: 'IT-спеціаліст. Допомагаю з налаштуванням комп\'ютерів, навчанням цифровій грамотності.',
    location: 'Харків',
    verified: true,
    createdAt: new Date('2024-01-13'),
    specializations: ['IT-підтримка', 'цифрова грамотність', 'налаштування техніки'],
    rating: 4,
    experience: 5
  },
  {
    id: '8',
    name: 'Анна Шевченко',
    email: 'anna.shevchenko@email.com',
    phone: '+38 (096) 890-12-34',
    organization: 'Юрист-волонтер',
    type: 'volunteer',
    description: 'Юрист з досвідом роботи в сфері соціального права. Надаю безкоштовні юридичні консультації.',
    location: 'Київ',
    verified: true,
    createdAt: new Date('2024-01-09'),
    specializations: ['юридичні консультації', 'соціальне право', 'документообіг'],
    rating: 5,
    experience: 12
  },
  {
    id: '9',
    name: 'Центр "Відновлення"',
    email: 'info@recovery-center.ua',
    phone: '+38 (048) 901-23-45',
    organization: 'Реабілітаційний центр "Відновлення"',
    type: 'rehabilitation',
    description: 'Комплексна реабілітація для постраждалих від війни. Медична, психологічна та соціальна підтримка.',
    location: 'Одеса',
    verified: false,
    createdAt: new Date('2024-01-07'),
    website: 'https://recovery-center.ua',
    specializations: ['комплексна реабілітація', 'медична допомога', 'соціальна адаптація']
  },
  {
    id: '10',
    name: 'Тетяна Гриценко',
    email: 'tetyana.hrytsenko@email.com',
    phone: '+38 (099) 012-34-56',
    organization: 'Вчитель-волонтер',
    type: 'volunteer',
    description: 'Вчитель початкових класів. Допомагаю дітям-переселенцям з навчанням, адаптацією в новій школі.',
    location: 'Вінниця',
    verified: true,
    createdAt: new Date('2024-01-06'),
    specializations: ['освіта', 'робота з дітьми', 'адаптація'],
    rating: 5,
    experience: 15
  },
  {
    id: '11',
    name: 'Сергій Бондаренко',
    email: 'sergiy.bondarenko@email.com',
    phone: '+38 (097) 123-45-67',
    organization: 'Кулінар-волонтер',
    type: 'volunteer',
    description: 'Професійний кухар. Організовую приготування їжі для нужденних, навчаю готувати з обмеженого набору продуктів.',
    location: 'Полтава',
    verified: true,
    createdAt: new Date('2024-01-05'),
    specializations: ['приготування їжі', 'організація харчування', 'кулінарні майстер-класи'],
    rating: 4,
    experience: 7
  },
  {
    id: '12',
    name: 'Фонд "Єдність"',
    email: 'unity@unity-fund.org',
    phone: '+38 (061) 234-56-78',
    organization: 'Благодійний фонд "Єдність"',
    type: 'fund',
    description: 'Міжнародний благодійний фонд. Координуємо допомогу від закордонних партнерів, забезпечуємо гуманітарними вантажами.',
    location: 'Запоріжжя',
    verified: true,
    createdAt: new Date('2024-01-04'),
    website: 'https://unity-fund.org',
    specializations: ['міжнародна допомога', 'гуманітарні вантажі', 'координація'],
    rating: 5
  }
]

// Computed properties
const filteredVolunteers = computed(() => {
  let filtered = [...mockVolunteers]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(volunteer => 
      volunteer.name.toLowerCase().includes(query) ||
      volunteer.organization.toLowerCase().includes(query) ||
      volunteer.description.toLowerCase().includes(query) ||
      volunteer.location.toLowerCase().includes(query) ||
      (volunteer.specializations && volunteer.specializations.some(spec => 
        spec.toLowerCase().includes(query)
      ))
    )
  }

  if (selectedType.value) {
    filtered = filtered.filter(volunteer => volunteer.type === selectedType.value)
  }

  if (selectedLocation.value) {
    filtered = filtered.filter(volunteer => volunteer.location === selectedLocation.value)
  }

  if (selectedVerification.value) {
    if (selectedVerification.value === 'verified') {
      filtered = filtered.filter(volunteer => volunteer.verified)
    } else if (selectedVerification.value === 'pending') {
      filtered = filtered.filter(volunteer => !volunteer.verified)
    }
  }

  return filtered
})

const uniqueLocations = computed(() => {
  const locations = mockVolunteers.map(v => v.location)
  return [...new Set(locations)].sort()
})

const totalVolunteers = computed(() => mockVolunteers.length)
const individualVolunteers = computed(() => mockVolunteers.filter(v => v.type === 'volunteer').length)
const fundsCount = computed(() => mockVolunteers.filter(v => v.type === 'fund').length)
const rehabilitationCenters = computed(() => mockVolunteers.filter(v => v.type === 'rehabilitation').length)

// Methods
const getTypeClass = (type: string) => {
  const classes = {
    volunteer: 'bg-blue-100 text-blue-800',
    fund: 'bg-yellow-100 text-yellow-800',
    rehabilitation: 'bg-green-100 text-green-800'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

const getDescriptionPlaceholder = () => {
  const placeholders = {
    volunteer: 'Опишіть ваші навички, досвід та як ви можете допомогти...',
    fund: 'Опишіть діяльність фонду, основні напрямки роботи...',
    rehabilitation: 'Опишіть послуги центру, спеціалізацію, можливості...'
  }
  return placeholders[registrationType.value]
}

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
    location: '',
    website: '',
    experience: undefined,
    specializationsText: ''
  }
}

const closeRegistrationModal = () => {
  showRegistrationModal.value = false
}

const submitRegistration = async () => {
  submitting.value = true
  
  const volunteerData = {
    ...registrationForm.value,
    type: registrationType.value,
    specializations: registrationForm.value.specializationsText
      ? registrationForm.value.specializationsText.split(',').map(s => s.trim())
      : []
  }

  // Remove specializationsText from the data
  delete (volunteerData as any).specializationsText

  const result = await volunteersStore.addVolunteer(volunteerData)
  
  if (result.success) {
    closeRegistrationModal()
    await volunteersStore.fetchVolunteers()
    alert('Реєстрацію успішно подано! Очікуйте на верифікацію.')
  } else {
    alert('Помилка при реєстрації. Спробуйте пізніше.')
  }
  
  submitting.value = false
}

const contactVolunteer = (volunteer: any) => {
  const message = `Привіт! Я знайшов ваш профіль на платформі "Допомога Україні" і хотів би обговорити можливість співпраці.`
  const emailUrl = `mailto:${volunteer.email}?subject=Співпраця через платформу "Допомога Україні"&body=${encodeURIComponent(message)}`
  
  if (confirm(`Зв'язатися з ${volunteer.name}?\n\nEmail: ${volunteer.email}\nТелефон: ${volunteer.phone}`)) {
    window.open(emailUrl)
  }
}

const viewProfile = (volunteer: any) => {
  let profileInfo = `Профіль: ${volunteer.name}\n\n`
  profileInfo += `Організація: ${volunteer.organization}\n`
  profileInfo += `Тип: ${volunteer.type}\n`
  profileInfo += `Місцезнаходження: ${volunteer.location}\n`
  profileInfo += `Опис: ${volunteer.description}\n`
  
  if (volunteer.specializations && volunteer.specializations.length > 0) {
    profileInfo += `\nСпеціалізації: ${volunteer.specializations.join(', ')}\n`
  }
  
  if (volunteer.experience) {
    profileInfo += `Досвід: ${volunteer.experience} років\n`
  }
  
  if (volunteer.rating) {
    profileInfo += `Рейтинг: ${volunteer.rating}/5\n`
  }
  
  if (volunteer.website) {
    profileInfo += `Веб-сайт: ${volunteer.website}\n`
  }
  
  profileInfo += `\nКонтакти:\nEmail: ${volunteer.email}\nТелефон: ${volunteer.phone}`
  profileInfo += `\n\nЗареєстровано: ${formatDate(volunteer.createdAt)}`
  profileInfo += `\nСтатус: ${volunteer.verified ? 'Верифіковано ✓' : 'Очікує верифікації'}`
  
  alert(profileInfo)
}

onMounted(() => {
  // In a real app, this would fetch from Firebase
  // volunteersStore.fetchVolunteers()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>