<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('articles.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('articles.subtitle') }}</p>
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
      </div>

      <!-- Articles placeholder -->
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <i class="fas fa-newspaper text-6xl text-ukraine-blue mb-6"></i>
        <h2 class="text-2xl font-semibold mb-4">Статті в розробці</h2>
        <p class="text-gray-600 mb-6">
          Тут будуть розміщені корисні статті та матеріали на різні теми,
          пов'язані з допомогою та підтримкою.
        </p>
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Планові розділи:</h3>
          <div class="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div class="bg-gray-50 rounded-lg p-4">
              <i class="fas fa-medkit text-ukraine-blue text-2xl mb-2"></i>
              <h4 class="font-semibold">Медична допомога</h4>
              <p class="text-sm text-gray-600">Поради з надання першої допомоги</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <i class="fas fa-balance-scale text-ukraine-blue text-2xl mb-2"></i>
              <h4 class="font-semibold">Юридична підтримка</h4>
              <p class="text-sm text-gray-600">Права та обов'язки переселенців</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <i class="fas fa-heart text-ukraine-blue text-2xl mb-2"></i>
              <h4 class="font-semibold">Психологічна підтримка</h4>
              <p class="text-sm text-gray-600">Методи подолання стресу</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <i class="fas fa-home text-ukraine-blue text-2xl mb-2"></i>
              <h4 class="font-semibold">Житлові питання</h4>
              <p class="text-sm text-gray-600">Пошук та оформлення житла</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>