<template>
    <div class="space-y-4">
      <!-- Search Bar - Full width on mobile -->
      <div class="relative">
        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input
          :value="search"
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Пошук волонтерів..."
          class="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ukraine-blue text-sm md:text-base"
        >
      </div>
      
      <!-- Filters Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <select 
          :value="type"
          @change="$emit('update:type', ($event.target as HTMLSelectElement).value)"
          class="border border-gray-300 rounded-md px-3 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-ukraine-blue text-sm md:text-base"
        >
          <option value="">Всі типи</option>
          <option value="volunteer">Волонтери</option>
          <option value="fund">Фонди</option>
          <option value="rehabilitation">Центри реабілітації</option>
          <option value="church">Церкви</option>
        </select>
  
        <select 
          :value="location"
          @change="$emit('update:location', ($event.target as HTMLSelectElement).value)"
          class="border border-gray-300 rounded-md px-3 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-ukraine-blue text-sm md:text-base"
        >
          <option value="">Всі міста</option>
          <option v-for="loc in locations" :key="loc" :value="loc">
            {{ loc }}
          </option>
        </select>
  
        <select 
          :value="verification"
          @change="$emit('update:verification', ($event.target as HTMLSelectElement).value)"
          class="border border-gray-300 rounded-md px-3 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-ukraine-blue text-sm md:text-base"
        >
          <option value="">Всі</option>
          <option value="verified">Верифіковані</option>
          <option value="pending">Очікують верифікації</option>
        </select>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    interface Props {
    search: string
    type: string
    location: string
    verification: string
    dataSource: string
    locations: string[]
  }

  defineProps<Props>()
  defineEmits<{
    'update:search': [value: string]
    'update:type': [value: string]
    'update:location': [value: string]
    'update:verification': [value: string]
    'update:dataSource': [value: string]
  }>()
  </script>