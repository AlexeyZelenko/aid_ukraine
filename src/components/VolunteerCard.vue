<template>
    <div class="flex flex-col justify-between border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 card-hover">
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
          {{ getTypeLabel(volunteer.type) }}
        </span>
      </div>
  
      <p class="text-sm text-gray-700 mb-4 line-clamp-3">{{ volunteer.description }}</p>
  
      <!-- Specializations -->
      <div v-if="volunteer.specializations?.length" class="mb-4">
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
          @click="$emit('contact')"
          class="flex-1 bg-ukraine-blue text-white py-2 px-4 rounded-md hover:bg-ukraine-blue-light transition-colors text-sm"
        >
          <i class="fas fa-envelope mr-1"></i>
          Зв'язатися
        </button>
        <button 
          @click="$emit('view-profile')"
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
</template>
  
<script setup lang="ts">
  import type { ExtendedVolunteer } from '../constants/volunteers'
  import { TYPE_COLORS } from '../constants/volunteers'
  
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