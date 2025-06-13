<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('blog.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('blog.subtitle') }}</p>
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
      </div>

      <!-- Blog placeholder -->
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <i class="fas fa-comments text-6xl text-ukraine-blue mb-6"></i>
        <h2 class="text-2xl font-semibold mb-4">Блог в розробці</h2>
        <p class="text-gray-600 mb-6">
          Незабаром тут буде повноцінний блог з можливістю створення тем для обговорення,
          коментування та спільного вирішення проблем.
        </p>
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Що буде доступно:</h3>
          <ul class="text-left max-w-md mx-auto space-y-2 text-gray-600">
            <li class="flex items-center">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Створення тем для обговорення
            </li>
            <li class="flex items-center">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Коментування та відповіді
            </li>
            <li class="flex items-center">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Категорії та теги
            </li>
            <li class="flex items-center">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Система рейтингу
            </li>
            <li class="flex items-center">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Модерація контенту
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>