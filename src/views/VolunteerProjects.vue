<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12">
      <div class="max-w-6xl mx-auto px-6">
        <!-- Header -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <button @click="goBack" class="text-ukraine-blue hover:underline flex items-center mb-6">
            <i class="fas fa-arrow-left mr-2"></i> Назад до деталей організації
          </button>
          
          <div v-if="organization" class="flex items-center">
            <div :class="['w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg mr-6', getTypeClass(organization.type)]">
              <i :class="getTypeIcon(organization.type)"></i>
            </div>
            <div>
              <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Проєкти організації</h1>
              <h2 class="text-2xl text-ukraine-blue font-semibold">{{ organization.name }}</h2>
              <p class="text-gray-600 mt-1">{{ organization.location }}</p>
            </div>
          </div>
        </div>
  
        <!-- Projects Grid -->
        <div v-if="projects && projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
            @click="goToProject(project.id)"
          >
            <!-- Project Image -->
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="project.photos[0]" 
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              >
              <div class="absolute top-4 right-4">
                <span :class="['px-3 py-1 rounded-full text-xs font-bold', getStatusClass(project.status)]">
                  {{ getStatusLabel(project.status) }}
                </span>
              </div>
            </div>
  
            <!-- Project Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{{ project.title }}</h3>
              
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ project.shortDescription }}</p>
              
              <!-- Progress Bar -->
              <div v-if="project.targetAmount" class="mb-4">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Зібрано</span>
                  <span>{{ formatMoney(project.raisedAmount) }} / {{ formatMoney(project.targetAmount) }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-ukraine-blue h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${Math.min((project.raisedAmount / project.targetAmount) * 100, 100)}%` }"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                  {{ Math.round((project.raisedAmount / project.targetAmount) * 100) }}% завершено
                </div>
              </div>
  
              <!-- Project Details -->
              <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div class="flex items-center">
                  <i class="fas fa-calendar mr-1"></i>
                  {{ formatDate(project.startDate) }}
                </div>
                <div class="flex items-center">
                  <i class="fas fa-users mr-1"></i>
                  {{ project.beneficiaries }}+ людей
                </div>
              </div>
  
              <!-- Tags -->
              <div class="flex flex-wrap gap-1 mb-4">
                <span 
                  v-for="tag in project.tags.slice(0, 2)" 
                  :key="tag"
                  class="px-2 py-1 bg-blue-50 text-ukraine-blue text-xs rounded-full"
                >
                  {{ tag }}
                </span>
                <span v-if="project.tags.length > 2" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{{ project.tags.length - 2 }}
                </span>
              </div>
  
              <!-- Action Button -->
              <button class="w-full bg-ukraine-blue hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Детальніше про проєкт
              </button>
            </div>
          </div>
        </div>
  
        <!-- Empty State -->
        <div v-else-if="organization" class="bg-white rounded-2xl shadow-lg p-12 text-center">
          <i class="fas fa-project-diagram text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Поки що немає проєктів</h3>
          <p class="text-gray-500">Організація ще не додала жодного проєкту</p>
        </div>
  
        <!-- Loading State -->
        <div v-else class="text-center py-12">
          <i class="fas fa-spinner fa-spin text-4xl text-ukraine-blue mb-4"></i>
          <div class="text-gray-600">Завантаження проєктів...</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const organization = ref<any>(null)
  const projects = ref<any[]>([])
  
  // Mock data - в реальному додатку це буде завантажуватися з API
  const mockOrganizations = [
    {
      id: '1',
      name: 'Фонд "Сила Доброти"',
      type: 'fund',
      location: 'Черкаси'
    },
    {
      id: '2',
      name: 'Центр реабілітації "Надія"',
      type: 'rehabilitation',
      location: 'Медведівка'
    },
    {
      id: '3',
      name: 'Блага вість',
      type: 'church',
      location: 'Черкаси'
    }
  ]
  
  const mockProjects = [
    {
      id: '1',
      organizationId: '1',
      title: 'Допомога переселенцям з Донецької області',
      shortDescription: 'Збираємо кошти на першочергові потреби для родин переселенців: продукти харчування, медикаменти, засоби гігієни та тимчасове житло.',
      photos: [
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop'
      ],
      status: 'active',
      targetAmount: 500000,
      raisedAmount: 324000,
      startDate: new Date('2024-02-01'),
      beneficiaries: 150,
      tags: ['переселенці', 'гуманітарна допомога', 'продукти']
    },
    {
      id: '2',
      organizationId: '1',
      title: 'Шкільне приладдя для дітей',
      shortDescription: 'Забезпечуємо дітей з малозабезпечених родин необхідними шкільними приладдями, підручниками та канцелярським приладдям.',
      photos: [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400&h=300&fit=crop'
      ],
      status: 'completed',
      targetAmount: 200000,
      raisedAmount: 200000,
      startDate: new Date('2024-01-15'),
      beneficiaries: 200,
      tags: ['діти', 'освіта', 'шкільне приладдя']
    },
    {
      id: '3',
      organizationId: '2',
      title: 'Реабілітаційне обладнання для військових',
      shortDescription: 'Придбання сучасного реабілітаційного обладнання для відновлення військовослужбовців після поранень.',
      photos: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
      ],
      status: 'active',
      targetAmount: 800000,
      raisedAmount: 450000,
      startDate: new Date('2024-03-01'),
      beneficiaries: 100,
      tags: ['реабілітація', 'військові', 'обладнання']
    },
    {
      id: '4',
      organizationId: '3',
      title: 'Благодійна їдальня для потребуючих',
      shortDescription: 'Організація безкоштовних обідів для малозабезпечених сімей, пенсіонерів та переселенців.',
      photos: [
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop'
      ],
      status: 'active',
      targetAmount: 300000,
      raisedAmount: 180000,
      startDate: new Date('2024-02-15'),
      beneficiaries: 250,
      tags: ['їжа', 'соціальна допомога', 'щоденна підтримка']
    }
  ]
  
  const goBack = () => {
    router.back()
  }
  
  const goToProject = (projectId: string) => {
    router.push(`/project/${projectId}`)
  }
  
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0
    }).format(amount)
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uk-UA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
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
  
  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      volunteer: 'fas fa-hand-heart',
      fund: 'fas fa-building',
      rehabilitation: 'fas fa-hospital',
      church: 'fas fa-church'
    }
    return icons[type] || 'fas fa-user'
  }
  
  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      paused: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
  }
  
  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: 'Активний',
      completed: 'Завершений',
      paused: 'Призупинений',
      cancelled: 'Скасований'
    }
    return labels[status] || status
  }
  
  onMounted(() => {
    const organizationId = route.params.id as string
    organization.value = mockOrganizations.find(org => org.id === organizationId)
    projects.value = mockProjects.filter(project => project.organizationId === organizationId)
  })
  </script>
  
  <style scoped>
  .text-ukraine-blue {
    color: #0057B8;
  }
  .bg-ukraine-blue {
    background-color: #0057B8;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>