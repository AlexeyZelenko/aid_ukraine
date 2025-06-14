<template>
    <div class="bg-white rounded-lg shadow p-4 text-center">
      <div class="text-2xl font-bold" :class="`text-${color}`">{{ value }}</div>
      <div class="text-sm text-gray-600">{{ label }}</div>
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