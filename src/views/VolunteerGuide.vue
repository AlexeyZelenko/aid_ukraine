<template>
  <div class="min-h-screen bg-gray-50 py-6 md:py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="text-center mb-8 md:mb-12">
        <h1 class="text-2xl md:text-4xl font-bold text-ukraine-blue mb-2 md:mb-4">
          🤝 Як стати волонтером
        </h1>
        <p class="text-lg md:text-xl text-gray-600">
          Повна інструкція для тих, хто хоче допомагати людям
        </p>
        <div class="ukraine-accent-bar w-16 md:w-24 mx-auto mt-4 md:mt-6"></div>
      </header>

      <!-- Navigation -->
      <div class="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8">
        <div class="flex flex-col sm:flex-row gap-3">
          <router-link 
            to="/volunteers" 
            class="flex-1 bg-ukraine-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center"
          >
            ← Переглянути волонтерів
          </router-link>
          <button 
            @click="scrollToSection('become')"
            class="flex-1 border border-ukraine-blue text-ukraine-blue py-2 px-4 rounded-md hover:bg-ukraine-blue hover:text-white transition-colors text-center"
          >
            Як стати волонтером
          </button>
          <button 
            @click="scrollToSection('find')"
            class="flex-1 border border-ukraine-blue text-ukraine-blue py-2 px-4 rounded-md hover:bg-ukraine-blue hover:text-white transition-colors text-center"
          >
            Де знайти волонтерів
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-lg shadow-lg p-4 md:p-8">
        <!-- What is Volunteering -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            💡 Що таке волонтерство?
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Волонтерство - це добровільна безоплатна діяльність, спрямована на допомогу людям, громадам та суспільству. 
            Волонтери надають свій час, знання та навички для вирішення соціальних проблем та підтримки тих, хто цього потребує.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="bg-blue-50 rounded-lg p-4 text-center">
              <div class="text-3xl mb-2">❤️</div>
              <h4 class="font-semibold text-blue-800 mb-2">Допомога людям</h4>
              <p class="text-sm text-gray-600">Підтримка тих, хто потребує допомоги в складні часи</p>
            </div>
            
            <div class="bg-green-50 rounded-lg p-4 text-center">
              <div class="text-3xl mb-2">🌱</div>
              <h4 class="font-semibold text-green-800 mb-2">Особистий розвиток</h4>
              <p class="text-sm text-gray-600">Отримання нових навичок та досвіду</p>
            </div>
            
            <div class="bg-purple-50 rounded-lg p-4 text-center">
              <div class="text-3xl mb-2">🤝</div>
              <h4 class="font-semibold text-purple-800 mb-2">Спільнота</h4>
              <p class="text-sm text-gray-600">Знайомство з однодумцями та створення зв'язків</p>
            </div>
          </div>
        </section>

        <!-- How to Become Volunteer -->
        <section id="become" class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            📝 Як стати індивідуальним волонтером
          </h2>
          
          <div class="space-y-6">
            <!-- Step 1 -->
            <div class="flex gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-ukraine-blue text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Реєстрація на платформі</h3>
                <p class="text-gray-600 mb-3">
                  Створіть обліковий запис на нашій платформі, щоб мати доступ до всіх функцій.
                </p>
                <div class="flex gap-2">
                  <router-link 
                    to="/register" 
                    class="bg-ukraine-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Зареєструватися
                  </router-link>
                  <router-link 
                    to="/login" 
                    class="border border-ukraine-blue text-ukraine-blue px-4 py-2 rounded-md hover:bg-ukraine-blue hover:text-white transition-colors text-sm"
                  >
                    Увійти
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-ukraine-blue text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Заповнення профілю волонтера</h3>
                <p class="text-gray-600 mb-3">
                  Створіть детальний профіль, вказавши свої навички, досвід та напрямки, в яких хочете допомагати.
                </p>
                <router-link 
                  to="/volunteer-registration" 
                  class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm inline-block"
                >
                  Створити профіль волонтера
                </router-link>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-ukraine-blue text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Пошук можливостей для допомоги</h3>
                <p class="text-gray-600 mb-3">
                  Переглядайте активні потреби та проєкти, де потрібна ваша допомога.
                </p>
                <div class="flex gap-2">
                  <router-link 
                    to="/needs" 
                    class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                  >
                    Переглянути потреби
                  </router-link>
                  <router-link 
                    to="/blog" 
                    class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
                  >
                    Обговорення в блозі
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-ukraine-blue text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Початок волонтерської діяльності</h3>
                <p class="text-gray-600">
                  Зв'яжіться з організаціями або людьми, які потребують допомоги, та почніть свою волонтерську діяльність.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Types of Volunteering -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            🎯 Напрямки волонтерської діяльності
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
              <h4 class="font-semibold text-red-800 mb-2">🆘 Гуманітарна допомога</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Збір та розподіл гуманітарної допомоги</li>
                <li>• Допомога переселенцям</li>
                <li>• Підтримка малозабезпечених сімей</li>
              </ul>
            </div>

            <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 class="font-semibold text-blue-800 mb-2">🏥 Медична допомога</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Медичне волонтерство</li>
                <li>• Психологічна підтримка</li>
                <li>• Догляд за хворими</li>
              </ul>
            </div>

            <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <h4 class="font-semibold text-green-800 mb-2">📚 Освіта та навчання</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Репетиторство</li>
                <li>• Мовні курси</li>
                <li>• Комп'ютерна грамотність</li>
              </ul>
            </div>

            <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <h4 class="font-semibold text-purple-800 mb-2">👥 Соціальна робота</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Робота з дітьми</li>
                <li>• Допомога літнім людям</li>
                <li>• Підтримка людей з інвалідністю</li>
              </ul>
            </div>

            <div class="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h4 class="font-semibold text-yellow-800 mb-2">💼 Професійні навички</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Юридичні консультації</li>
                <li>• IT підтримка</li>
                <li>• Бухгалтерські послуги</li>
              </ul>
            </div>

            <div class="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
              <h4 class="font-semibold text-orange-800 mb-2">🚚 Логістика</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Транспортні послуги</li>
                <li>• Доставка допомоги</li>
                <li>• Організація заходів</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Where to Find Volunteers -->
        <section id="find" class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            🔍 Де знайти волонтерів для вашої організації
          </h2>
          
          <div class="space-y-6">
            <!-- Platform -->
            <div class="bg-blue-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <i class="fas fa-globe mr-2"></i>
                На нашій платформі
              </h3>
              <p class="text-gray-700 mb-4">
                Використовуйте наші інструменти для пошуку волонтерів та координації діяльності:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium text-gray-800 mb-2">📋 Розділ "Волонтери"</h4>
                  <p class="text-sm text-gray-600 mb-2">Переглядайте профілі зареєстрованих волонтерів</p>
                  <router-link 
                    to="/volunteers" 
                    class="text-ukraine-blue hover:underline text-sm"
                  >
                    Переглянути волонтерів →
                  </router-link>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800 mb-2">📝 Розділ "Потреби"</h4>
                  <p class="text-sm text-gray-600 mb-2">Публікуйте свої потреби в допомозі</p>
                  <router-link 
                    to="/needs" 
                    class="text-ukraine-blue hover:underline text-sm"
                  >
                    Додати потребу →
                  </router-link>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800 mb-2">💬 Блог</h4>
                  <p class="text-sm text-gray-600 mb-2">Створюйте теми для обговорення та координації</p>
                  <router-link 
                    to="/blog" 
                    class="text-ukraine-blue hover:underline text-sm"
                  >
                    Перейти до блогу →
                  </router-link>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800 mb-2">🗺️ Карта</h4>
                  <p class="text-sm text-gray-600 mb-2">Знаходьте волонтерів поблизу</p>
                  <router-link 
                    to="/map" 
                    class="text-ukraine-blue hover:underline text-sm"
                  >
                    Відкрити карту →
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="bg-green-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <i class="fas fa-share-alt mr-2"></i>
                Соціальні мережі та онлайн спільноти
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium text-gray-800 mb-2">Facebook</h4>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li>• Волонтерські групи міст</li>
                    <li>• Тематичні спільноти</li>
                    <li>• Сторінки НГО</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800 mb-2">Telegram</h4>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li>• Волонтерські чати</li>
                    <li>• Канали координації</li>
                    <li>• Регіональні групи</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Organizations -->
            <div class="bg-purple-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                <i class="fas fa-building mr-2"></i>
                Волонтерські організації та центри
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium text-gray-800 mb-2">Національні організації</h4>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li>• Червоний Хрест України</li>
                    <li>• Карітас України</li>
                    <li>• Народна Допомога</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800 mb-2">Місцеві центри</h4>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li>• Волонтерські центри міст</li>
                    <li>• Молодіжні організації</li>
                    <li>• Релігійні громади</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tips for Organizations -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            💡 Поради для організацій
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-green-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-green-800 mb-3">Як залучити волонтерів:</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-green-600 mt-1"></i>
                  <span>Чітко описуйте завдання та очікування</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-green-600 mt-1"></i>
                  <span>Пропонуйте гнучкий графік роботи</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-green-600 mt-1"></i>
                  <span>Забезпечуйте навчання та підтримку</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check-circle text-green-600 mt-1"></i>
                  <span>Визнавайте та цінуйте внесок волонтерів</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-blue-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">Як утримати волонтерів:</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <i class="fas fa-heart text-blue-600 mt-1"></i>
                  <span>Створюйте дружню атмосферу в команді</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-heart text-blue-600 mt-1"></i>
                  <span>Надавайте можливості для розвитку</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-heart text-blue-600 mt-1"></i>
                  <span>Регулярно спілкуйтеся та отримуйте зворотний зв'язок</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-heart text-blue-600 mt-1"></i>
                  <span>Організовуйте заходи для волонтерів</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Benefits of Volunteering -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            🌟 Переваги волонтерства
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="text-center bg-red-50 rounded-lg p-6">
              <div class="text-4xl mb-3">💪</div>
              <h4 class="font-semibold text-red-800 mb-2">Особистий розвиток</h4>
              <p class="text-sm text-gray-600">Розвиток навичок, впевненості в собі та лідерських якостей</p>
            </div>
            
            <div class="text-center bg-blue-50 rounded-lg p-6">
              <div class="text-4xl mb-3">🤝</div>
              <h4 class="font-semibold text-blue-800 mb-2">Нові знайомства</h4>
              <p class="text-sm text-gray-600">Знайомство з однодумцями та створення міцних дружніх зв'язків</p>
            </div>
            
            <div class="text-center bg-green-50 rounded-lg p-6">
              <div class="text-4xl mb-3">📈</div>
              <h4 class="font-semibold text-green-800 mb-2">Кар'єрні можливості</h4>
              <p class="text-sm text-gray-600">Отримання досвіду та контактів для професійного зростання</p>
            </div>
            
            <div class="text-center bg-purple-50 rounded-lg p-6">
              <div class="text-4xl mb-3">😊</div>
              <h4 class="font-semibold text-purple-800 mb-2">Задоволення</h4>
              <p class="text-sm text-gray-600">Відчуття корисності та задоволення від допомоги іншим</p>
            </div>
            
            <div class="text-center bg-yellow-50 rounded-lg p-6">
              <div class="text-4xl mb-3">🎯</div>
              <h4 class="font-semibold text-yellow-800 mb-2">Нові навички</h4>
              <p class="text-sm text-gray-600">Освоєння нових професійних та життєвих навичок</p>
            </div>
            
            <div class="text-center bg-orange-50 rounded-lg p-6">
              <div class="text-4xl mb-3">🌍</div>
              <h4 class="font-semibold text-orange-800 mb-2">Вплив на суспільство</h4>
              <p class="text-sm text-gray-600">Реальний внесок у покращення життя людей та громади</p>
            </div>
          </div>
        </section>

        <!-- Final Message -->
        <section class="text-center bg-gradient-to-r from-blue-500 to-yellow-400 text-white rounded-lg p-6 md:p-8">
          <h2 class="text-xl md:text-2xl font-bold mb-4">🇺🇦 Разом ми можемо більше!</h2>
          <p class="text-lg mb-6">
            Кожен внесок важливий. Незалежно від того, скільки часу ви можете приділити - година на тиждень 
            чи кілька днів на місяць - ваша допомога має значення.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
              to="/volunteer-registration" 
              class="bg-white text-ukraine-blue px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              <i class="fas fa-user-plus mr-2"></i>
              Стати волонтером
            </router-link>
            <router-link 
              to="/volunteers" 
              class="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-ukraine-blue transition-colors font-semibold"
            >
              <i class="fas fa-search mr-2"></i>
              Знайти волонтерів
            </router-link>
          </div>
        </section>
      </div>

      <!-- Back Button -->
      <div class="text-center mt-6 md:mt-8">
        <router-link 
          to="/blog-guide" 
          class="inline-flex items-center bg-ukraine-blue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Повернутися до інструкції блогу
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Scroll to section function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Set page title
onMounted(() => {
  document.title = 'Як стати волонтером - Допомога Україні'
})
</script>

<style scoped>
.ukraine-accent-bar {
  height: 4px;
  background: linear-gradient(to right, #0057b7, #ffd700);
  border-radius: 2px;
}
</style> 