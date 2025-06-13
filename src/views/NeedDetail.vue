<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-10 relative">
      <button @click="goBack" class="absolute left-6 top-6 text-ukraine-blue hover:underline flex items-center">
        <i class="fas fa-arrow-left mr-2"></i> Назад до списку потреб
      </button>
      <div v-if="need" class="mt-10">
        <div class="flex items-center mb-6">
          <div :class="['w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg mr-6', getCategoryIconBg(need.category)]">
            <i :class="getCategoryIcon(need.category)" class="text-white"></i>
          </div>
          <div>
            <h1 class="text-3xl font-extrabold mb-1 text-gray-900">{{ need.title }}</h1>
            <div class="flex space-x-2 mt-1">
              <span :class="['px-3 py-1 rounded-full text-xs font-bold', getPriorityClass(need.priority)]">
                <i class="fas fa-bolt mr-1"></i>{{ getPriorityLabel(need.priority) }}
              </span>
              <span :class="['px-3 py-1 rounded-full text-xs font-bold', getStatusClass(need.status)]">
                <i class="fas fa-info-circle mr-1"></i>{{ getStatusLabel(need.status) }}
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
              <i class="fas fa-envelope mr-2 text-yellow-700"></i> {{ need.contactEmail }}
            </div>
            <button class="mt-4 bg-ukraine-blue hover:bg-ukraine-yellow text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center text-base shadow" @click="contactPerson(need)">
              <i class="fas fa-hands-helping mr-2"></i> Зв'язатися
            </button>
          </div>
        </div>
        <div class="flex items-center space-x-4 mt-8">
          <span class="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            Категорія: {{ getCategoryLabel(need.category) }}
          </span>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-12">
        <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
        <div>Завантаження...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Мок-данные, как в Needs.vue
const mockNeeds = [
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
  // ... (другие объекты как в Needs.vue)
]

const route = useRoute()
const router = useRouter()
const need = ref<any>(null)

const goBack = () => {
  router.push({ name: 'needs' })
}

const formatDate = (date: Date) => {
  if (!date) return '—'
  const d = new Date(date)
  return d.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })
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
    other: 'fas fa-question-circle'
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

const contactPerson = (need: any) => {
  const message = `Привіт! Я побачив вашу потребу "${need.title}" на платформі "Допомога Україні" і хочу допомогти.`
  const phoneUrl = `tel:${need.contactPhone}`
  const emailUrl = `mailto:${need.contactEmail}?subject=Допомога з "${need.title}"&body=${encodeURIComponent(message)}`
  if (confirm(`Зв'язатися з ${need.contactPerson}?

Телефон: ${need.contactPhone}
Email: ${need.contactEmail}`)) {
    const choice = prompt('Оберіть спосіб зв\'язку:\n1 - Телефон\n2 - Email\n\nВведіть 1 або 2:')
    if (choice === '1') {
      window.open(phoneUrl)
    } else if (choice === '2') {
      window.open(emailUrl)
    }
  }
}

onMounted(() => {
  const id = route.params.id
  need.value = mockNeeds.find(n => n.id === id)
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