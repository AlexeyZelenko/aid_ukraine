<template>
      <div>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
        <h2 class="text-base md:text-lg lg:text-2xl font-semibold">Зареєстровані волонтери та організації</h2>
        <div class="text-xs md:text-sm text-gray-600">
          Знайдено: {{ volunteers.length }} з {{ total }}
        </div>
      </div>

      <div v-if="loading" class="text-center py-6 md:py-8">
        <i class="fas fa-spinner fa-spin text-xl md:text-2xl text-ukraine-blue"></i>
        <p class="mt-2 text-sm md:text-base text-gray-600">Завантаження...</p>
      </div>

      <div v-else-if="volunteers.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        <VolunteerCard
          v-for="volunteer in volunteers"
          :key="volunteer.id"
          :volunteer="volunteer"
          @contact="$emit('contact', volunteer)"
          @view-profile="$emit('view-profile', volunteer)"
        />
      </div>

      <div v-else class="text-center py-8 md:py-12">
        <i class="fas fa-search text-4xl md:text-6xl text-gray-300 mb-3 md:mb-4"></i>
        <h3 class="text-lg md:text-xl font-semibold text-gray-600 mb-2">Волонтерів не знайдено</h3>
        <p class="text-sm md:text-base text-gray-500 px-4">Спробуйте змінити фільтри або зареєструйтеся як волонтер</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { ExtendedVolunteer } from '../constants/volunteers'
  import VolunteerCard from './VolunteerCard.vue'
  
  interface Props {
    volunteers: ExtendedVolunteer[]
    loading: boolean
    total: number
  }
  
  defineProps<Props>()
  defineEmits<{
    contact: [volunteer: ExtendedVolunteer]
    'view-profile': [volunteer: ExtendedVolunteer]
  }>()
  </script>