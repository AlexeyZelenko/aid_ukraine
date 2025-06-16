<template>
    <div class="bg-white rounded-lg shadow p-3 md:p-4 text-center">
      <div class="text-lg md:text-2xl font-bold" :class="`text-${color}`">{{ value }}</div>
      <div class="text-xs md:text-sm text-gray-600 leading-tight">{{ label }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    value: number
    label: string
    color: string
  }
  
  defineProps<Props>()
  </script>