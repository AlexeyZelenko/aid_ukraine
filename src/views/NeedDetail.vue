<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-10 relative">
      <!-- Navigation -->
      <div class="absolute left-6 top-6 flex items-center space-x-3">
        <button @click="goBack" class="text-ukraine-blue hover:underline flex items-center text-sm">
          <i class="fas fa-arrow-left mr-2"></i> Назад до списку потреб
        </button>
        <span class="text-gray-400">|</span>
        <button 
          @click="loadNeedData" 
          :disabled="loading"
          class="text-ukraine-blue hover:underline flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
          <i v-else class="fas fa-sync-alt mr-2"></i>
          {{ loading ? 'Оновлення...' : 'Оновити' }}
        </button>
      </div>

      <!-- Breadcrumbs -->
      <div v-if="need" class="mt-16 mb-6 text-sm text-gray-500">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <button @click="goBack" class="text-ukraine-blue hover:underline">
                Потреби
              </button>
            </li>
            <li>
              <div class="flex items-center">
                <i class="fas fa-chevron-right text-gray-400 mx-2"></i>
                <span class="text-gray-700 truncate max-w-xs">{{ need.title }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <!-- Error State -->
      <div v-if="error" class="mt-10 text-center py-12">
        <i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">{{ error }}</h3>
        <div class="flex justify-center space-x-4">
          <button 
            @click="loadNeedData" 
            class="px-4 py-2 bg-ukraine-blue text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <i class="fas fa-sync-alt mr-2"></i>
            Спробувати знову
          </button>
          <button 
            @click="goBack" 
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Назад до списку
          </button>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="need" class="mt-2">
        <div class="flex items-center mb-6">
          <div :class="['w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg mr-6', getCategoryIconBg(need.category)]">
            <i :class="getCategoryIcon(need.category)" class="text-white"></i>
          </div>
          <div>
            <h1 class="text-3xl font-extrabold mb-1 text-gray-900">{{ need.title }}</h1>
            <div class="flex flex-wrap gap-2 mt-1">
              <span :class="['px-3 py-1 rounded-full text-xs font-bold', getPriorityClass(need.priority)]">
                <i class="fas fa-bolt mr-1"></i>{{ getPriorityLabel(need.priority) }}
              </span>
              <span :class="['px-3 py-1 rounded-full text-xs font-bold', getStatusClass(need.status)]">
                <i class="fas fa-info-circle mr-1"></i>{{ getStatusLabel(need.status) }}
              </span>
              <span v-if="need.verified" class="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                <i class="fas fa-check-circle mr-1"></i>Верифіковано
              </span>
            </div>
          </div>
        </div>
        <div class="mb-6 text-gray-700 text-lg leading-relaxed border-l-4 border-ukraine-blue pl-4 bg-blue-50/50 py-2">
          {{ need.description }}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div class="mb-3 flex items-center text-gray-600">
              <i class="fas fa-map-marker-alt mr-2 text-ukraine-blue"></i>
              <span><strong>Місцезнаходження:</strong> {{ need.location }}</span>
            </div>
            <div class="mb-3 flex items-center text-gray-600">
              <i class="fas fa-hashtag mr-2 text-ukraine-blue"></i>
              <span><strong>Кількість:</strong> {{ need.quantity || '—' }}</span>
            </div>
            <div class="mb-3 flex items-center text-gray-600">
              <i class="fas fa-calendar-alt mr-2 text-ukraine-blue"></i>
              <span><strong>Створено:</strong> {{ formatDate(need.createdAt) }}</span>
            </div>
            <!-- Інформація про організацію/волонтера -->
            <div v-if="need.organizationName || need.volunteerName" class="mb-3 flex items-center text-gray-600">
              <i :class="need.createdByType === 'organization' ? 'fas fa-building' : 'fas fa-users'" class="mr-2 text-ukraine-blue"></i>
              <span><strong>{{ need.createdByType === 'organization' ? 'Організація:' : 'Волонтер:' }}</strong></span>
              <span class="ml-1 text-ukraine-blue font-semibold">{{ need.organizationName || need.volunteerName }}</span>
            </div>
          </div>
          <div class="bg-yellow-50 rounded-xl p-5 shadow flex flex-col justify-center">
            <div class="font-bold text-lg mb-2 text-yellow-900 flex items-center">
              <i class="fas fa-user mr-2"></i> Контактна особа
            </div>
            <div class="mb-2 flex items-center text-gray-700">
              <i class="fas fa-user-circle mr-2 text-yellow-700"></i> {{ need.contactPerson }}
            </div>
            <div class="mb-2 flex items-center text-gray-700">
              <i class="fas fa-phone-alt mr-2 text-yellow-700"></i> {{ need.contactPhone }}
            </div>
            <div class="mb-2 flex items-center text-gray-700">
              <i class="fab fa-telegram mr-2 text-yellow-700"></i> {{ need.contactTelegram }}
            </div>
            <div class="space-y-2">
              <button class="w-full bg-ukraine-blue hover:bg-ukraine-yellow text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center text-base shadow" @click="contactPerson(need)">
                <i class="fas fa-hands-helping mr-2"></i> Зв'язатися
              </button>
              <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded transition duration-300 flex items-center justify-center text-sm" @click="shareNeed(need)">
                <i class="fas fa-share-alt mr-2"></i> Поділитися
              </button>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4 mt-8">
          <span class="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            Категорія: {{ getCategoryLabel(need.category) }}
          </span>
        </div>
      </div>
      <!-- Loading State -->
      <div v-else class="text-center text-gray-500 py-12">
        <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
        <div>Завантаження потреби...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNeedsStore, type Need } from '@/stores/needs'

const needsStore = useNeedsStore()
const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref<string | null>(null)

// Отримання потреби за ID
const need = computed(() => {
  const id = route.params.id as string
  return needsStore.needs?.find(n => n.id === id) || null
})

const goBack = () => {
  router.push({ name: 'needs' })
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
  
  return dateObj.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })
}

const getPriorityClass = (priority: string) => {
  const classes: Record<string, string> = {
    urgent: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  }
  return classes[priority] || 'bg-gray-100 text-gray-800'
}
const getPriorityLabel = (priority: string) => {
  const labels: Record<string, string> = {
    urgent: 'Терміново',
    high: 'Високий',
    medium: 'Середній',
    low: 'Низький'
  }
  return labels[priority] || priority
}
const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    open: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    fulfilled: 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    open: 'Відкрито',
    'in-progress': 'В процесі',
    fulfilled: 'Виконано'
  }
  return labels[status] || status
}
const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
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
  return icons[category] || 'fas fa-circle'
}
const getCategoryIconBg = (category: string) => {
  const colors: Record<string, string> = {
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
  return colors[category] || 'bg-gray-500'
}
const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    medical: 'Медична допомога',
    housing: 'Житло',
    food: 'Продукти харчування',
    clothing: 'Одяг',
    transportation: 'Транспорт',
    legal: 'Юридична допомога',
    psychological: 'Психологічна підтримка',
    education: 'Освіта',
    other: 'Інше'
  }
  return labels[category] || category
}

const contactPerson = (need: Need) => {
  const message = `Привіт! Я побачив вашу потребу "${need.title}" на платформі "Допомога Україні" і хочу допомогти.`
  const phoneUrl = `tel:${need.contactPhone}`
  const telegramUrl = `https://t.me/${need.contactTelegram.replace('@', '')}`
  
  if (confirm(`Зв'язатися з ${need.contactPerson}?

Телефон: ${need.contactPhone}
Telegram: ${need.contactTelegram}`)) {
    const choice = prompt('Оберіть спосіб зв\'язку:\n1 - Телефон\n2 - Telegram\n\nВведіть 1 або 2:')
    if (choice === '1') {
      window.open(phoneUrl)
    } else if (choice === '2') {
      window.open(telegramUrl)
    }
  }
}

const shareNeed = (need: Need) => {
  const url = window.location.href
  copyToClipboard(url)
}

const copyToClipboard = (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    // Сучасний API для безпечних контекстів (HTTPS)
    navigator.clipboard.writeText(text).then(() => {
      showSuccessMessage()
    }).catch(() => {
      fallbackCopy(text)
    })
  } else {
    // Fallback для старих браузерів або HTTP
    fallbackCopy(text)
  }
}

const fallbackCopy = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  try {
    document.execCommand('copy')
    showSuccessMessage()
  } catch (error) {
    console.error('Помилка копіювання:', error)
    alert('Не вдалося скопіювати посилання. Скопіюйте його вручну: ' + text)
  }
  
  document.body.removeChild(textArea)
}

const showSuccessMessage = () => {
  // Створюємо стильне повідомлення замість звичайного alert
  const notification = document.createElement('div')
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideIn 0.3s ease-out;
    ">
      <i class="fas fa-check-circle"></i>
      Посилання успішно скопійовано!
    </div>
    <style>
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    </style>
  `
  
  document.body.appendChild(notification)
  
  // Видаляємо повідомлення через 3 секунди
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse'
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

const loadNeedData = async () => {
  const id = route.params.id as string
  
  try {
    loading.value = true
    error.value = null
    
    // Спочатку перевіряємо, чи є потреба в кеші
    const cachedNeed = needsStore.needs?.find(n => n.id === id)
    
    if (cachedNeed) {
      // Якщо знайдено в кеші, завершуємо
      console.log('Потребу знайдено в кеші')
      return
    }
    
    // Якщо потреби ще не завантажені, завантажуємо їх
    if (!needsStore.needs || needsStore.needs.length === 0) {
      console.log('Завантажуємо всі потреби...')
      await needsStore.fetchNeeds()
    }
    
    // Перевіряємо знову після завантаження всіх потреб
    const foundNeed = needsStore.needs?.find(n => n.id === id)
    if (foundNeed) {
      console.log('Потребу знайдено після завантаження всіх потреб')
      return
    }
    
    // Якщо все ще не знайдено, пробуємо завантажити конкретну потребу
    console.log('Завантажуємо конкретну потребу за ID...')
    const needData = await needsStore.getNeedById(id)
    if (!needData) {
      error.value = 'Потребу не знайдено'
      return
    }
    
    console.log('Потребу успішно завантажено за ID')
    
  } catch (err) {
    console.error('Помилка завантаження потреби:', err)
    error.value = 'Виникла помилка при завантаженні даних. Спробуйте пізніше.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadNeedData()
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