<template>
  <div>
    <!-- Hero Section -->
    <section class="relative ukraine-gradient py-12 sm:py-20">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-2xl sm:text-4xl md:text-6xl font-bold text-ukraine-blue mb-4 sm:mb-6">
            {{ $t('home.title') }}
          </h1>
          <p class="text-base sm:text-xl md:text-2xl text-gray-700 mb-4 sm:mb-8 max-w-3xl mx-auto">
            {{ $t('home.subtitle') }}
          </p>
          <p class="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-12 max-w-2xl mx-auto">
            {{ $t('home.description') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <router-link to="/register" class="btn-ukraine text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              <i class="fas fa-heart mr-2"></i>
              {{ $t('home.joinUs') }}
            </router-link>
            <button class="btn-ukraine text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white text-ukraine-blue border-2 border-ukraine-blue hover:bg-ukraine-blue hover:text-white">
              <i class="fas fa-info-circle mr-2"></i>
              {{ $t('home.learnMore') }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Ukrainian flag decoration -->
      <div class="absolute bottom-0 left-0 right-0">
        <div class="h-2 bg-ukraine-blue"></div>
        <div class="h-2 bg-ukraine-yellow"></div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 sm:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="text-center mb-8 sm:mb-16">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Як ми допомагаємо</h2>
          <p class="text-base sm:text-lg text-gray-600">Наша платформа об'єднує всіх, хто потребує допомоги та готовий її надати</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div class="text-center card-hover p-4 sm:p-6 bg-gray-50 rounded-lg">
            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-ukraine-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-hands-helping text-xl sm:text-2xl text-white"></i>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{{ $t('nav.volunteers') }}</h3>
            <p class="text-gray-600 text-sm sm:text-base">Реєстрація волонтерів, фондів та центрів реабілітації для координації допомоги</p>
          </div>

          <div class="text-center card-hover p-4 sm:p-6 bg-gray-50 rounded-lg">
            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-ukraine-yellow rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-list text-xl sm:text-2xl text-ukraine-blue"></i>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{{ $t('nav.needs') }}</h3>
            <p class="text-gray-600 text-sm sm:text-base">Каталог актуальних потреб за категоріями з можливістю додавання запитів</p>
          </div>

          <div class="text-center card-hover p-4 sm:p-6 bg-gray-50 rounded-lg">
            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-ukraine-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-map-marker-alt text-xl sm:text-2xl text-white"></i>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{{ $t('nav.map') }}</h3>
            <p class="text-gray-600 text-sm sm:text-base">Інтерактивна карта для позначення місць, де потрібна допомога</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-12 sm:py-20 ukraine-gradient">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
          <div>
            <div class="text-2xl sm:text-4xl font-bold text-ukraine-blue mb-1 sm:mb-2">1,250+</div>
            <div class="text-gray-700 text-xs sm:text-base">Волонтерів</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-bold text-ukraine-blue mb-1 sm:mb-2">850+</div>
            <div class="text-gray-700 text-xs sm:text-base">Виконаних запитів</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-bold text-ukraine-blue mb-1 sm:mb-2">45+</div>
            <div class="text-gray-700 text-xs sm:text-base">Міст</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-bold text-ukraine-blue mb-1 sm:mb-2">24/7</div>
            <div class="text-gray-700 text-xs sm:text-base">Підтримка</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-12 sm:py-20 bg-ukraine-blue">
      <div class="max-w-4xl mx-auto text-center px-2 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
          Приєднуйтесь до нашої спільноти
        </h2>
        <p class="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8">
          Разом ми можемо більше! Станьте частиною команди, яка допомагає відновлювати Україну.
        </p>
        <router-link 
          to="/register" 
          class="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-ukraine-yellow text-ukraine-blue font-bold rounded-lg hover:bg-yellow-300 transition-colors text-base sm:text-lg"
        >
          <i class="fas fa-users mr-3"></i>
          Стати частиною команди
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>