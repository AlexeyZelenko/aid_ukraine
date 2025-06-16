<template>
    <div class="flex flex-col justify-between border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition-all duration-300 card-hover">
      <div class="flex items-start justify-between mb-3 md:mb-4">
        <div class="flex-1 min-w-0">
          <div class="flex items-center mb-2 flex-wrap gap-1">
            <h3 class="font-semibold text-base md:text-lg text-gray-900 truncate">{{ volunteer.name }}</h3>
            <div v-if="volunteer.verified" class="flex-shrink-0">
              <i class="fas fa-check-circle text-green-500 text-sm" title="Верифіковано"></i>
            </div>
            <!-- Індикатор джерела даних -->
            <div v-if="volunteer.dataSource" class="flex-shrink-0">
              <span 
                :class="volunteer.dataSource === 'firebase' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
                class="px-1.5 py-0.5 text-xs rounded-full font-medium"
                :title="volunteer.dataSource === 'firebase' ? 'Дані з Firebase' : 'Мокові дані'"
              >
                {{ volunteer.dataSource === 'firebase' ? 'FB' : 'Mock' }}
              </span>
            </div>
          </div>
          <p class="text-xs md:text-sm text-gray-600 mb-1 truncate">{{ volunteer.organization }}</p>
          <div class="flex items-center text-xs text-gray-500">
            <i class="fas fa-map-marker-alt mr-1 flex-shrink-0"></i>
            <span class="truncate">{{ volunteer.location }}</span>
          </div>
        </div>
        <span 
          class="px-2 md:px-3 py-1 text-xs rounded-full font-medium flex-shrink-0 ml-2"
          :class="getTypeClass(volunteer.type)"
        >
          {{ getTypeLabel(volunteer.type) }}
        </span>
      </div>
  
            <p class="text-xs md:text-sm text-gray-700 mb-3 md:mb-4 line-clamp-3">{{ volunteer.description }}</p>

      <!-- Specializations -->
      <div v-if="volunteer.specializations?.length" class="mb-3 md:mb-4">
        <div class="flex flex-wrap gap-1">
          <span 
            v-for="spec in volunteer.specializations.slice(0, 2)" 
            :key="spec"
            class="px-2 py-1 bg-ukraine-blue bg-opacity-10 text-ukraine-blue text-xs rounded-full"
          >
            {{ spec }}
          </span>
          <span 
            v-if="volunteer.specializations.length > 2"
            class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            +{{ volunteer.specializations.length - 2 }}
          </span>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
        <div class="flex items-center min-w-0">
          <i class="fas fa-envelope mr-2 text-ukraine-blue flex-shrink-0"></i>
          <span class="truncate">{{ volunteer.email }}</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-phone mr-2 text-ukraine-blue flex-shrink-0"></i>
          <span class="truncate">{{ volunteer.phone }}</span>
        </div>
        <div v-if="volunteer.website" class="flex items-center min-w-0">
          <i class="fas fa-globe mr-2 text-ukraine-blue flex-shrink-0"></i>
          <a :href="volunteer.website" target="_blank" class="text-ukraine-blue hover:underline truncate">
            {{ volunteer.website }}
          </a>
        </div>
      </div>
  
            <!-- Rating and Experience -->
      <div class="flex items-center justify-between text-xs md:text-sm mb-3 md:mb-4">
        <div v-if="volunteer.rating" class="flex items-center">
          <div class="flex text-yellow-400 mr-1">
            <i v-for="star in 5" :key="star" 
               :class="star <= volunteer.rating ? 'fas fa-star' : 'far fa-star'"
               class="text-xs"></i>
          </div>
          <span class="text-gray-600">({{ volunteer.rating }})</span>
        </div>
        <div v-if="volunteer.experience" class="text-gray-600 text-right">
          {{ volunteer.experience }} років досвіду
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button 
          @click="$emit('contact')"
          class="flex-1 bg-ukraine-blue text-white py-2 px-3 md:px-4 rounded-md hover:bg-ukraine-blue-light transition-colors text-xs md:text-sm"
        >
          <i class="fas fa-envelope mr-1"></i>
          <span class="hidden sm:inline">Зв'язатися</span>
          <span class="sm:hidden">Контакт</span>
        </button>
        <button 
          @click="$emit('view-profile')"
          class="flex-1 border border-ukraine-blue text-ukraine-blue py-2 px-3 md:px-4 rounded-md hover:bg-ukraine-blue hover:text-white transition-colors text-xs md:text-sm"
        >
          <i class="fas fa-user mr-1"></i>
          Профіль
        </button>
      </div>

      <!-- Registration Date -->
      <div class="text-xs text-gray-500 mt-2 md:mt-3 text-center">
        Зареєстровано: {{ formatDate(volunteer.createdAt) }}
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import type { ExtendedVolunteer } from '../../constants/volunteers'
  import { TYPE_COLORS } from '../../constants/volunteers'
  
  interface Props {
    volunteer: ExtendedVolunteer
  }
  
  defineProps<Props>()
  defineEmits<{
    contact: []
    'view-profile': []
  }>()
  
  const getTypeClass = (type: string) => {
    return TYPE_COLORS[type as keyof typeof TYPE_COLORS] || 'bg-gray-100 text-gray-800'
  }
  
  const getTypeLabel = (type: string) => {
    const labels = {
      volunteer: 'Волонтер',
      fund: 'Фонд',
      rehabilitation: 'Реабілітація',
      church: 'Церква'
    }
    return labels[type as keyof typeof labels] || type
  }
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }
</script>
  
<style scoped>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>