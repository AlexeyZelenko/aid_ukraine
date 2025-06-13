<template>
  <footer class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('home.title') }}</h3>
          <p class="text-gray-300 text-sm">
            {{ $t('home.description') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Швидкі посилання</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/volunteers" class="text-gray-300 hover:text-white text-sm">
                {{ $t('nav.volunteers') }}
              </router-link>
            </li>
            <li>
              <router-link to="/needs" class="text-gray-300 hover:text-white text-sm">
                {{ $t('nav.needs') }}
              </router-link>
            </li>
            <li>
              <router-link to="/financial" class="text-gray-300 hover:text-white text-sm">
                {{ $t('nav.financial') }}
              </router-link>
            </li>
            <li>
              <router-link to="/map" class="text-gray-300 hover:text-white text-sm">
                {{ $t('nav.map') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Контакти</h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>
              <i class="fas fa-envelope mr-2"></i>
              info@help-ukraine.org
            </li>
            <li>
              <i class="fas fa-phone mr-2"></i>
              +38 (050) 123-45-67
            </li>
            <li>
              <i class="fas fa-map-marker-alt mr-2"></i>
              Київ, Україна
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Слідкуйте за нами</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-white">
              <i class="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white">
              <i class="fab fa-telegram text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <div class="ukraine-accent-bar mb-4"></div>
        <p class="text-gray-400 text-sm">
          © 2024 Допомога Україні. Всі права захищені. Разом до перемоги! 🇺🇦
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>