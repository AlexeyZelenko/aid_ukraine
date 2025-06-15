<template>
    <div class="bg-white rounded-lg shadow-lg p-6 ukraine-border card-hover">
      <div class="flex flex-col justify-between h-full text-center">
        <div 
          class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          :class="[type.bgColor]"
        >
          <i :class="[type.icon, 'text-2xl', type.textColor]"></i>
        </div>
        <h3 class="text-xl font-semibold mb-3">{{ $t(type.titleKey) }}</h3>
        <p class="text-gray-600 mb-4">{{ type.description }}</p>
        <!-- <button 
          @click="$emit('register', type.id)"
          class="btn-ukraine w-full"
        >
          Зареєструватися
        </button> -->
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