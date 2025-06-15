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
  
            <!-- Refresh Button -->
            <div class="flex items-center gap-2">
              <button 
                @click="refreshData"
                :disabled="needsStore.loading"
                class="px-4 py-2 bg-ukraine-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
              >
                <i v-if="!needsStore.loading" class="fas fa-sync-alt"></i>
                <i v-else class="fas fa-spinner fa-spin"></i>
                {{ needsStore.loading ? 'Оновлення...' : 'Оновити' }}
              </button>
            </div>

          </div>
        </div>
  
        <!-- Statistics -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <div v-if="needsStore.loading" class="text-2xl text-gray-400">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div v-else class="text-2xl font-bold text-ukraine-blue">{{ totalNeeds }}</div>
            <div class="text-sm text-gray-600">Всього потреб</div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <div v-if="needsStore.loading" class="text-2xl text-gray-400">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div v-else class="text-2xl font-bold text-red-600">{{ urgentNeeds }}</div>
            <div class="text-sm text-gray-600">Терміново</div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <div v-if="needsStore.loading" class="text-2xl text-gray-400">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div v-else class="text-2xl font-bold text-yellow-600">{{ inProgressNeeds }}</div>
            <div class="text-sm text-gray-600">В процесі</div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 text-center">
            <div v-if="needsStore.loading" class="text-2xl text-gray-400">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div v-else class="text-2xl font-bold text-green-600">{{ fulfilledNeeds }}</div>
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
          <p class="text-gray-500">Спробуйте змінити фільтри пошуку</p>
        </div>
      </div>
  
      
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNeedsStore, type Need } from '@/stores/needs'
import { useRouter } from 'vue-router'
  
  const needsStore = useNeedsStore()
  const router = useRouter()
  
  // Reactive data
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const selectedPriority = ref('')
  const selectedStatus = ref('')
  
  const categories = [
    'medical', 'housing', 'food', 'clothing', 
    'transportation', 'legal', 'psychological', 'education', 'other'
  ]
  

  
    // Computed properties
  const needs = computed(() => needsStore.needs || [])

  const filteredNeeds = computed(() => {
    let filtered = [...needs.value]

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

  const totalNeeds = computed(() => needs.value.length)
  const urgentNeeds = computed(() => needs.value.filter(n => n.priority === 'urgent').length)
  const inProgressNeeds = computed(() => needs.value.filter(n => n.status === 'in-progress').length)
  const fulfilledNeeds = computed(() => needs.value.filter(n => n.status === 'fulfilled').length)
  
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
      other: 'fas fa-heart'
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
  
  const formatDate = (date: Date | any) => {
    if (!date) return '—'
    
    // Обробка Firebase Timestamp
    let dateObj = date
    if (date.toDate && typeof date.toDate === 'function') {
      dateObj = date.toDate()
    } else if (typeof date === 'string') {
      dateObj = new Date(date)
    }
    
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(dateObj)
  }
  
  
  const refreshData = async () => {
    try {
      await needsStore.fetchNeeds()
      console.log('Дані оновлено, потреб завантажено:', needsStore.needs?.length || 0)
    } catch (error) {
      console.error('Помилка оновлення даних:', error)
      alert('Виникла помилка при завантаженні даних з серверу. Спробуйте пізніше.')
    }
  }
  
  const contactPerson = (need: Need) => {
    const message = `Привіт! Я побачив вашу потребу "${need.title}" на платформі "Допомога Україні" і хочу допомогти.`
    const phoneUrl = `tel:${need.contactPhone}`
    const telegramUrl = `https://t.me/${need.contactTelegram.replace('@', '')}`
    
    if (confirm(`Зв'язатися з ${need.contactPerson}?\n\nТелефон: ${need.contactPhone}\nTelegram: ${need.contactTelegram}`)) {
      // User can choose how to contact
      const choice = prompt('Оберіть спосіб зв\'язку:\n1 - Телефон\n2 - Telegram\n\nВведіть 1 або 2:')
      if (choice === '1') {
        window.open(phoneUrl)
      } else if (choice === '2') {
        window.open(telegramUrl)
      }
    }
  }
  
  const viewDetails = (need: Need) => {
    router.push({ name: 'NeedDetail', params: { id: need.id } })
  }
  
  onMounted(async () => {
    try {
      await needsStore.fetchNeeds()
      console.log('Потреби завантажені з Firebase:', needsStore.needs?.length || 0)
    } catch (error) {
      console.error('Помилка завантаження потреб з Firebase:', error)
      alert('Виникла помилка при завантаженні даних з серверу. Спробуйте пізніше.')
    }
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