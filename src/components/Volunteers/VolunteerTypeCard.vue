<template>
    <div class="bg-white rounded-lg shadow-lg p-4 md:p-6 ukraine-border card-hover">
      <div class="flex flex-col justify-between h-full text-center">
        <div 
          class="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
          :class="[type.bgColor]"
        >
          <i :class="[type.icon, 'text-xl md:text-2xl', type.textColor]"></i>
        </div>
        <h3 class="text-lg md:text-xl font-semibold mb-2 md:mb-3">{{ $t(type.titleKey) }}</h3>
        <p class="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-tight">{{ type.description }}</p>
        
        <!-- Показуємо кнопку реєстрації тільки для волонтерів та церков -->
        <button 
          v-if="type.id === 'volunteer' || type.id === 'church'"
          @click="$emit('register', type.id)"
          class="btn-ukraine w-full text-sm md:text-base py-2 md:py-3"
        >
          Зареєструватися
        </button>

        <!-- Для інших типів показуємо повідомлення -->
        <div 
          v-else
          class="bg-gray-100 text-gray-600 py-2 px-3 md:px-4 rounded-md text-xs md:text-sm leading-tight"
        >
          Реєстрація наразі недоступна
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface VolunteerType {
    id: string
    icon: string
    bgColor: string
    textColor: string
    titleKey: string
    description: string
  }
  
  interface Props {
    type: VolunteerType
  }
  
  defineProps<Props>()
  defineEmits<{
    register: [type: string]
  }>()
  </script>