<template>
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('needs.title') }}</h1>
          <p class="text-xl text-gray-600">{{ $t('needs.subtitle') }}</p>
          <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
        </div>
  
        <!-- Controls -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <!-- Search and Filter -->
            <div class="flex flex-col sm:flex-row gap-4 flex-1">
              <div class="relative flex-1">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="$t('common.search')"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                >
              </div>
              
              <select 
                v-model="selectedCategory"
                class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
                <option value="">{{ $t('common.all') }}</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ $t(`needs.categories.${category}`) }}
                </option>
              </select>
  
              <select 
                v-model="selectedPriority"
                class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
                <option value="">Всі пріоритети</option>
                <option value="urgent">Терміново</option>
                <option value="high">Високий</option>
                <option value="medium">Середній</option>
                <option value="low">Низький</option>
              </select>
  
              <select 
                v-model="selectedStatus"
                class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
              >
                <option value="">Всі статуси</option>
                <option value="open">Відкрито</option>
                <option value="in-progress">В процесі</option>
                <option value="fulfilled">Виконано</option>
              </select>
            </div>
  
            <!-- Add Need Button -->
            <button 
              @click="openAddModal"
              class="btn-ukraine whitespace-nowrap"
            >
              <i class="fas fa-plus mr-2"></i>
              {{ $t('needs.addNeed') }}
            </button>
          </div>
        </div>
  
        <!-- Statistics -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <div class="text-2xl font-bold text-ukraine-blue">{{ totalNeeds }}</div>
            <div class="text-sm text-gray-600">Всього потреб</div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <div class="text-2xl font-bold text-red-600">{{ urgentNeeds }}</div>
            <div class="text-sm text-gray-600">Терміново</div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <div class="text-2xl font-bold text-yellow-600">{{ inProgressNeeds }}</div>
            <div class="text-sm text-gray-600">В процесі</div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <div class="text-2xl font-bold text-green-600">{{ fulfilledNeeds }}</div>
            <div class="text-sm text-gray-600">Виконано</div>
          </div>
        </div>
  
        <!-- Loading State -->
        <div v-if="needsStore.loading" class="text-center py-12">
          <i class="fas fa-spinner fa-spin text-4xl text-ukraine-blue mb-4"></i>
          <p class="text-gray-600">{{ $t('common.loading') }}</p>
        </div>
  
        <!-- Needs Grid -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="need in filteredNeeds" 
            :key="need.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
          >
            <!-- Priority Badge -->
            <div class="relative">
              <div 
                class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                :class="getPriorityClass(need.priority)"
              >
                {{ getPriorityLabel(need.priority) }}
              </div>
              
              <!-- Category Icon -->
              <div class="p-6 pb-4">
                <div class="flex items-start justify-between mb-4">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center"
                       :class="getCategoryIconBg(need.category)">
                    <i :class="getCategoryIcon(need.category)" class="text-xl text-white"></i>
                  </div>
                  <span 
                    class="px-2 py-1 text-xs rounded-full"
                    :class="getStatusClass(need.status)"
                  >
                    {{ getStatusLabel(need.status) }}
                  </span>
                </div>
  
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ need.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ need.description }}</p>
  
                <!-- Details -->
                <div class="space-y-2 text-sm text-gray-600 mb-4">
                  <div class="flex items-center">
                    <i class="fas fa-map-marker-alt mr-2 text-ukraine-blue"></i>
                    {{ need.location }}
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-user mr-2 text-ukraine-blue"></i>
                    {{ need.contactPerson }}
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-phone mr-2 text-ukraine-blue"></i>
                    {{ need.contactPhone }}
                  </div>
                  <div v-if="need.quantity" class="flex items-center">
                    <i class="fas fa-hashtag mr-2 text-ukraine-blue"></i>
                    Кількість: {{ need.quantity }}
                  </div>
                </div>
  
                <!-- Category -->
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">
                    {{ $t(`needs.categories.${need.category}`) }}
                  </span>
                  <span class="text-xs text-gray-500">
                    {{ formatDate(need.createdAt) }}
                  </span>
                </div>
              </div>
            </div>
  
            <!-- Actions -->
            <div class="px-6 pb-6">
              <div class="flex space-x-2">
                <button 
                  @click="contactPerson(need)"
                  class="flex-1 bg-ukraine-blue text-white py-2 px-4 rounded-md hover:bg-ukraine-blue-light transition-colors text-sm"
                >
                  <i class="fas fa-phone mr-1"></i>
                  Зв'язатися
                </button>
                <button 
                  @click="viewDetails(need)"
                  class="flex-1 border border-ukraine-blue text-ukraine-blue py-2 px-4 rounded-md hover:bg-ukraine-blue hover:text-white transition-colors text-sm"
                >
                  <i class="fas fa-eye mr-1"></i>
                  Деталі
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Empty State -->
        <div v-if="!needsStore.loading && filteredNeeds.length === 0" class="text-center py-12">
          <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Потреби не знайдено</h3>
          <p class="text-gray-500">Спробуйте змінити фільтри або додайте нову потребу</p>
        </div>
      </div>
  
      <!-- Add Need Modal -->
      <div 
        v-if="showAddModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="closeAddModal"
      >
        <div class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" @click.stop>
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-6">{{ $t('needs.addNeed') }}</h3>
            
            <form @submit.prevent="submitNeed">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Назва потреби *</label>
                  <input 
                    v-model="needForm.title"
                    type="text" 
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                    placeholder="Коротко опишіть потребу"
                  >
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Категорія *</label>
                  <select 
                    v-model="needForm.category"
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  >
                    <option value="">Оберіть категорію</option>
                    <option v-for="category in categories" :key="category" :value="category">
                      {{ $t(`needs.categories.${category}`) }}
                    </option>
                  </select>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Пріоритет *</label>
                  <select 
                    v-model="needForm.priority"
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                  >
                    <option value="low">Низький</option>
                    <option value="medium">Середній</option>
                    <option value="high">Високий</option>
                    <option value="urgent">Терміново</option>
                  </select>
                </div>
  
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Опис *</label>
                  <textarea 
                    v-model="needForm.description"
                    rows="4"
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                    placeholder="Детальний опис потреби"
                  ></textarea>
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Місцезнаходження *</label>
                  <input 
                    v-model="needForm.location"
                    type="text" 
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                    placeholder="Місто, адреса"
                  >
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Кількість (опціонально)</label>
                  <input 
                    v-model.number="needForm.quantity"
                    type="number" 
                    min="1"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                    placeholder="Кількість одиниць"
                  >
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Контактна особа *</label>
                  <input 
                    v-model="needForm.contactPerson"
                    type="text" 
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                    placeholder="Ім'я та прізвище"
                  >
                </div>
  
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                  <input 
                    v-model="needForm.contactPhone"
                    type="tel" 
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                    placeholder="+38 (0XX) XXX-XX-XX"
                  >
                </div>
  
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input 
                    v-model="needForm.contactEmail"
                    type="email" 
                    required
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ukraine-blue"
                    placeholder="email@example.com"
                  >
                </div>
              </div>
  
              <div class="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  @click="closeAddModal"
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
                  <i v-else class="fas fa-plus mr-2"></i>
                  {{ submitting ? 'Додаю...' : $t('common.save') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useNeedsStore } from '@/stores/needs'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const toast = useToast()
  
  const needsStore = useNeedsStore()
  const authStore = useAuthStore()
  const router = useRouter()
  
  // Reactive data
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const selectedPriority = ref('')
  const selectedStatus = ref('')
  const showAddModal = ref(false)
  const submitting = ref(false)
  
  const categories = [
    'medical', 'housing', 'food', 'clothing', 
    'transportation', 'legal', 'psychological', 'education', 'other'
  ]
  
  const needForm = ref({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as Need['priority'],
    location: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    quantity: undefined as number | undefined
  })
  
  // Mock data for demonstration
  const mockNeeds: Need[] = [
    {
      id: '1',
      title: 'Медикаменти для діабетиків',
      description: 'Потрібен інсулін та тест-смужки для глюкометра. Людина переселенець, втратила доступ до звичних ліків.',
      category: 'medical',
      priority: 'urgent',
      location: 'Київ, Печерський район',
      contactPerson: 'Марія Петренко',
      contactPhone: '+38 (050) 123-45-67',
      contactEmail: 'maria.petrenko@email.com',
      quantity: 2,
      status: 'open',
      createdBy: 'user1',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Тимчасове житло для сім\'ї з дітьми',
      description: 'Сім\'я з двома малими дітьми потребує тимчасового житла. Готові допомагати по господарству.',
      category: 'housing',
      priority: 'high',
      location: 'Львів',
      contactPerson: 'Олександр Коваленко',
      contactPhone: '+38 (067) 234-56-78',
      contactEmail: 'alex.kovalenko@email.com',
      status: 'in-progress',
      createdBy: 'user2',
      createdAt: new Date('2024-01-14')
    },
    {
      id: '3',
      title: 'Продукти харчування',
      description: 'Потрібні продукти першої необхідності: крупи, консерви, дитяче харчування.',
      category: 'food',
      priority: 'medium',
      location: 'Одеса, Приморський район',
      contactPerson: 'Ірина Сидоренко',
      contactPhone: '+38 (093) 345-67-89',
      contactEmail: 'irina.sydorenko@email.com',
      quantity: 10,
      status: 'open',
      createdBy: 'user3',
      createdAt: new Date('2024-01-13')
    },
    {
      id: '4',
      title: 'Зимовий одяг для дітей',
      description: 'Потрібен теплий одяг для дітей віком 5-10 років. Куртки, штани, взуття.',
      category: 'clothing',
      priority: 'high',
      location: 'Харків',
      contactPerson: 'Віктор Мельник',
      contactPhone: '+38 (095) 456-78-90',
      contactEmail: 'viktor.melnyk@email.com',
      quantity: 5,
      status: 'open',
      createdBy: 'user4',
      createdAt: new Date('2024-01-12')
    },
    {
      id: '5',
      title: 'Транспорт до лікарні',
      description: 'Потрібен транспорт для регулярних поїздок до лікарні на процедури.',
      category: 'transportation',
      priority: 'medium',
      location: 'Дніпро',
      contactPerson: 'Анна Шевченко',
      contactPhone: '+38 (096) 567-89-01',
      contactEmail: 'anna.shevchenko@email.com',
      status: 'fulfilled',
      createdBy: 'user5',
      createdAt: new Date('2024-01-11')
    },
    {
      id: '6',
      title: 'Юридична консультація',
      description: 'Потрібна допомога з оформленням документів переселенця та соціальних виплат.',
      category: 'legal',
      priority: 'medium',
      location: 'Київ, Подільський район',
      contactPerson: 'Сергій Бондаренко',
      contactPhone: '+38 (097) 678-90-12',
      contactEmail: 'sergiy.bondarenko@email.com',
      status: 'open',
      createdBy: 'user6',
      createdAt: new Date('2024-01-10')
    },
    {
      id: '7',
      title: 'Психологічна підтримка',
      description: 'Потрібна психологічна допомога для подолання травми війни.',
      category: 'psychological',
      priority: 'high',
      location: 'Львів, Галицький район',
      contactPerson: 'Оксана Ткаченко',
      contactPhone: '+38 (098) 789-01-23',
      contactEmail: 'oksana.tkachenko@email.com',
      status: 'in-progress',
      createdBy: 'user7',
      createdAt: new Date('2024-01-09')
    },
    {
      id: '8',
      title: 'Навчальні матеріали для дітей',
      description: 'Потрібні підручники та зошити для дітей шкільного віку.',
      category: 'education',
      priority: 'low',
      location: 'Вінниця',
      contactPerson: 'Тетяна Гриценко',
      contactPhone: '+38 (099) 890-12-34',
      contactEmail: 'tetyana.hrytsenko@email.com',
      quantity: 15,
      status: 'open',
      createdBy: 'user8',
      createdAt: new Date('2024-01-08')
    }
  ]
  
  // Computed properties
  const filteredNeeds = computed(() => {
    let filtered = [...mockNeeds]
  
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(need => 
        need.title.toLowerCase().includes(query) ||
        need.description.toLowerCase().includes(query) ||
        need.location.toLowerCase().includes(query) ||
        need.contactPerson.toLowerCase().includes(query)
      )
    }
  
    if (selectedCategory.value) {
      filtered = filtered.filter(need => need.category === selectedCategory.value)
    }
  
    if (selectedPriority.value) {
      filtered = filtered.filter(need => need.priority === selectedPriority.value)
    }
  
    if (selectedStatus.value) {
      filtered = filtered.filter(need => need.status === selectedStatus.value)
    }
  
    return filtered
  })
  
  const totalNeeds = computed(() => mockNeeds.length)
  const urgentNeeds = computed(() => mockNeeds.filter(n => n.priority === 'urgent').length)
  const inProgressNeeds = computed(() => mockNeeds.filter(n => n.status === 'in-progress').length)
  const fulfilledNeeds = computed(() => mockNeeds.filter(n => n.status === 'fulfilled').length)
  
  // Methods
  const getPriorityClass = (priority: string) => {
    const classes = {
      urgent: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    return classes[priority as keyof typeof classes] || 'bg-gray-100 text-gray-800'
  }
  
  const getPriorityLabel = (priority: string) => {
    const labels = {
      urgent: 'Терміново',
      high: 'Високий',
      medium: 'Середній',
      low: 'Низький'
    }
    return labels[priority as keyof typeof labels] || priority
  }
  
  const getStatusClass = (status: string) => {
    const classes = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      fulfilled: 'bg-green-100 text-green-800'
    }
    return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
  }
  
  const getStatusLabel = (status: string) => {
    const labels = {
      open: 'Відкрито',
      'in-progress': 'В процесі',
      fulfilled: 'Виконано'
    }
    return labels[status as keyof typeof labels] || status
  }
  
  const getCategoryIcon = (category: string) => {
    const icons = {
      medical: 'fas fa-plus-circle',
      housing: 'fas fa-home',
      food: 'fas fa-utensils',
      clothing: 'fas fa-tshirt',
      transportation: 'fas fa-car',
      legal: 'fas fa-balance-scale',
      psychological: 'fas fa-heart',
      education: 'fas fa-graduation-cap',
      other: 'fas fa-question-circle'
    }
    return icons[category as keyof typeof icons] || 'fas fa-circle'
  }
  
  const getCategoryIconBg = (category: string) => {
    const colors = {
      medical: 'bg-red-500',
      housing: 'bg-blue-500',
      food: 'bg-green-500',
      clothing: 'bg-purple-500',
      transportation: 'bg-yellow-500',
      legal: 'bg-indigo-500',
      psychological: 'bg-pink-500',
      education: 'bg-teal-500',
      other: 'bg-gray-500'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500'
  }
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }
  
  const openAddModal = () => {
    if (!authStore.user) {
      toast.add({ severity: 'warn', summary: 'Попередження', detail: 'Для додавання потреби необхідно увійти в систему', life: 3000 })
      return
    }
    showAddModal.value = true
  }
  
  const closeAddModal = () => {
    showAddModal.value = false
    needForm.value = {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      location: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: '',
      quantity: undefined
    }
  }
  
  const submitNeed = async () => {
    if (!authStore.user) {
      toast.add({ severity: 'warn', summary: 'Попередження', detail: 'Необхідно увійти в систему', life: 3000 })
      return
    }
  
    submitting.value = true
  
    const needData = {
      ...needForm.value,
      createdBy: authStore.user.uid
    }
  
    const result = await needsStore.addNeed(needData)
  
    if (result.success) {
      closeAddModal()
      await needsStore.fetchNeeds()
      toast.add({ severity: 'success', summary: 'Успіх', detail: 'Потребу успішно додано!', life: 3000 })
    } else {
      toast.add({ severity: 'error', summary: 'Помилка', detail: 'Помилка при додаванні потреби. Спробуйте пізніше.', life: 3000 })
    }
  
    submitting.value = false
  }
  
  const contactPerson = (need: Need) => {
    const message = `Привіт! Я побачив вашу потребу "${need.title}" на платформі "Допомога Україні" і хочу допомогти.`
    const phoneUrl = `tel:${need.contactPhone}`
    const emailUrl = `mailto:${need.contactEmail}?subject=Допомога з "${need.title}"&body=${encodeURIComponent(message)}`
    
    if (confirm(`Зв'язатися з ${need.contactPerson}?\n\nТелефон: ${need.contactPhone}\nEmail: ${need.contactEmail}`)) {
      // User can choose how to contact
      const choice = prompt('Оберіть спосіб зв\'язку:\n1 - Телефон\n2 - Email\n\nВведіть 1 або 2:')
      if (choice === '1') {
        window.open(phoneUrl)
      } else if (choice === '2') {
        window.open(emailUrl)
      }
    }
  }
  
  const viewDetails = (need: Need) => {
    router.push({ name: 'NeedDetail', params: { id: need.id } })
  }
  
  onMounted(() => {
    // In a real app, this would fetch from Firebase
    // needsStore.fetchNeeds()
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