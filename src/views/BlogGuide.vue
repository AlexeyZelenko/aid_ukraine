<template>
  <div class="min-h-screen bg-gray-50 py-6 md:py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="text-center mb-8 md:mb-12">
        <h1 class="text-2xl md:text-4xl font-bold text-ukraine-blue mb-2 md:mb-4">
          💬 Як користуватися блогом
        </h1>
        <p class="text-lg md:text-xl text-gray-600">
          Повна інструкція для роботи з блогом платформи "Допомога Україні"
        </p>
        <div class="ukraine-accent-bar w-16 md:w-24 mx-auto mt-4 md:mt-6"></div>
      </header>

      <!-- Navigation -->
      <div class="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8">
        <div class="flex flex-col sm:flex-row gap-3">
          <router-link 
            to="/blog" 
            class="flex-1 bg-ukraine-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center"
          >
            ← Повернутися до блогу
          </router-link>
          <button 
            @click="scrollToSection('create')"
            class="flex-1 border border-ukraine-blue text-ukraine-blue py-2 px-4 rounded-md hover:bg-ukraine-blue hover:text-white transition-colors text-center"
          >
            Як створити тему
          </button>
          <button 
            @click="scrollToSection('search')"
            class="flex-1 border border-ukraine-blue text-ukraine-blue py-2 px-4 rounded-md hover:bg-ukraine-blue hover:text-white transition-colors text-center"
          >
            Як знайти тему
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-lg shadow-lg p-4 md:p-8">
        <!-- What is Blog -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            🎯 Що таке блог на нашій платформі?
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Блог - це розділ для обговорення актуальних тем, обміну досвідом та координації волонтерської діяльності. 
            Тут можна створювати теми, коментувати, ставити лайки та знаходити корисну інформацію.
          </p>
        </section>

        <!-- How to Create Topic -->
        <section id="create" class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            📝 Як створити нову тему для обговорення
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Desktop -->
            <div class="bg-blue-50 rounded-lg p-4 md:p-6">
              <h3 class="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <i class="fas fa-desktop mr-2"></i>
                На комп'ютері (десктоп):
              </h3>
              <ol class="space-y-2 text-gray-700">
                <li><strong>1.</strong> Перейдіть на сторінку "Блог" в головному меню</li>
                <li><strong>2.</strong> Знайдіть форму справа - "Створити нову тему"</li>
                <li><strong>3.</strong> Заповніть поля:
                  <ul class="ml-4 mt-2 space-y-1 text-sm">
                    <li>• <strong>Заголовок</strong> - коротка назва теми</li>
                    <li>• <strong>Категорія</strong> - оберіть найбільш підходящу</li>
                    <li>• <strong>Теги</strong> - ключові слова через кому</li>
                    <li>• <strong>Зміст</strong> - детальний опис теми</li>
                  </ul>
                </li>
                <li><strong>4.</strong> Натисніть "Опублікувати"</li>
              </ol>
            </div>

            <!-- Mobile -->
            <div class="bg-green-50 rounded-lg p-4 md:p-6">
              <h3 class="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <i class="fas fa-mobile-alt mr-2"></i>
                На мобільному телефоні:
              </h3>
              <ol class="space-y-2 text-gray-700">
                <li><strong>1.</strong> Перейдіть на сторінку "Блог"</li>
                <li><strong>2.</strong> Натисніть синю кнопку "Створити нову тему" вгорі екрану</li>
                <li><strong>3.</strong> У модальному вікні заповніть всі поля (так само як на комп'ютері)</li>
                <li><strong>4.</strong> Натисніть "Опублікувати"</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- Categories -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            📂 Категорії тем
          </h2>
          <p class="text-gray-700 mb-4">Оберіть правильну категорію для вашої теми:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-blue-50 rounded-lg p-4">
              <h4 class="font-semibold text-blue-800 mb-2">🔵 Загальні</h4>
              <p class="text-sm text-gray-600">Загальні питання та обговорення</p>
            </div>
            <div class="bg-red-50 rounded-lg p-4">
              <h4 class="font-semibold text-red-800 mb-2">🆘 Допомога</h4>
              <p class="text-sm text-gray-600">Запити та пропозиції допомоги</p>
            </div>
            <div class="bg-purple-50 rounded-lg p-4">
              <h4 class="font-semibold text-purple-800 mb-2">📋 Координація</h4>
              <p class="text-sm text-gray-600">Організаційні питання, планування</p>
            </div>
            <div class="bg-green-50 rounded-lg p-4">
              <h4 class="font-semibold text-green-800 mb-2">📚 Ресурси</h4>
              <p class="text-sm text-gray-600">Обмін корисними ресурсами</p>
            </div>
            <div class="bg-yellow-50 rounded-lg p-4">
              <h4 class="font-semibold text-yellow-800 mb-2">📰 Новини</h4>
              <p class="text-sm text-gray-600">Актуальні новини та оновлення</p>
            </div>
          </div>
        </section>

        <!-- How to Find -->
        <section id="search" class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            🔍 Як знайти потрібну тему
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Пошук:</h3>
              <ul class="space-y-2 text-gray-700">
                <li>• Введіть ключові слова в поле пошуку вгорі</li>
                <li>• Пошук працює по заголовку, змісту та тегах</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Фільтри:</h3>
              <ul class="space-y-2 text-gray-700">
                <li>• <strong>Активні/Архівні</strong> - перемикайтеся між вкладками</li>
                <li>• <strong>Категорії</strong> - фільтруйте за категоріями</li>
                <li>• <strong>Сортування:</strong> Найновіші, За коментарями, За лайками</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Interaction -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            💬 Як взаємодіяти з темами
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center bg-red-50 rounded-lg p-4">
              <div class="text-3xl mb-2">❤️</div>
              <h4 class="font-semibold text-red-800 mb-2">Лайки</h4>
              <p class="text-sm text-gray-600">Натисніть на іконку серця під темою. Лайк показує, що тема корисна.</p>
            </div>
            
            <div class="text-center bg-blue-50 rounded-lg p-4">
              <div class="text-3xl mb-2">💬</div>
              <h4 class="font-semibold text-blue-800 mb-2">Коментарі</h4>
              <p class="text-sm text-gray-600">Натисніть "Коментувати", напишіть відповідь та натисніть "Відправити".</p>
            </div>
            
            <div class="text-center bg-green-50 rounded-lg p-4">
              <div class="text-3xl mb-2">📤</div>
              <h4 class="font-semibold text-green-800 mb-2">Поділитися</h4>
              <p class="text-sm text-gray-600">Натисніть кнопку "Поділитися" та скопіюйте посилання.</p>
            </div>
          </div>
        </section>

        <!-- Tips -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            ✅ Поради для ефективного використання
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-green-50 rounded-lg p-4 md:p-6">
              <h3 class="text-lg font-semibold text-green-800 mb-3">При створенні теми:</h3>
              <ul class="space-y-2 text-gray-700">
                <li>• Пишіть зрозумілі заголовки</li>
                <li>• Додавайте деталі - чим більше інформації, тим краще</li>
                <li>• Використовуйте правильні категорії</li>
                <li>• Додавайте теги - ключові слова для кращого пошуку</li>
              </ul>
            </div>
            
            <div class="bg-blue-50 rounded-lg p-4 md:p-6">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">При коментуванні:</h3>
              <ul class="space-y-2 text-gray-700">
                <li>• Будьте ввічливими та конструктивними</li>
                <li>• Надавайте корисну інформацію або поради</li>
                <li>• Ставте запитання, якщо щось незрозуміло</li>
                <li>• Дякуйте за допомогу</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Examples -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            🆘 Приклади корисних тем
          </h2>
          
          <div class="space-y-6">
            <div class="border border-gray-200 rounded-lg p-4 md:p-6">
              <h4 class="font-semibold text-red-600 mb-2">Запит на допомогу:</h4>
              <div class="bg-gray-50 rounded p-3 text-sm">
                <p><strong>Заголовок:</strong> "Потрібна допомога з перевезенням речей у Львові"</p>
                <p><strong>Категорія:</strong> Допомога</p>
                <p><strong>Теги:</strong> Львів, перевезення, терміново</p>
                <p><strong>Зміст:</strong> Детальний опис ситуації, що саме потрібно, контакти</p>
              </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 md:p-6">
              <h4 class="font-semibold text-green-600 mb-2">Пропозиція допомоги:</h4>
              <div class="bg-gray-50 rounded p-3 text-sm">
                <p><strong>Заголовок:</strong> "Надаю безкоштовні юридичні консультації онлайн"</p>
                <p><strong>Категорія:</strong> Ресурси</p>
                <p><strong>Теги:</strong> юрист, консультації, безкоштовно</p>
                <p><strong>Зміст:</strong> Опис послуг, як зв'язатися, графік роботи</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Mobile Features -->
        <section class="mb-8 md:mb-12">
          <h2 class="text-xl md:text-2xl font-bold text-ukraine-blue mb-4 border-l-4 border-ukraine-blue pl-4">
            📱 Особливості мобільної версії
          </h2>
          
          <div class="bg-blue-50 rounded-lg p-4 md:p-6">
            <ul class="space-y-2 text-gray-700">
              <li>• <strong>Компактний вигляд</strong> - теми відображаються у зручному форматі</li>
              <li>• <strong>Швидке створення</strong> - кнопка "Створити тему" завжди доступна</li>
              <li>• <strong>Зручна навігація</strong> - всі функції адаптовані під сенсорний екран</li>
              <li>• <strong>Швидкий пошук</strong> - легко знайти потрібну інформацію</li>
            </ul>
          </div>
        </section>

        <!-- Final Message -->
        <section class="text-center bg-gradient-to-r from-blue-500 to-yellow-400 text-white rounded-lg p-6 md:p-8">
          <h2 class="text-xl md:text-2xl font-bold mb-4">🇺🇦 Пам'ятайте</h2>
          <p class="text-lg mb-4">
            Блог - це спільний простір для допомоги один одному. Кожна тема, коментар або лайк можуть допомогти 
            комусь знайти потрібну інформацію або отримати допомогу.
          </p>
          <p class="text-xl font-bold">Разом ми сильніші! 💪</p>
        </section>
      </div>

      <!-- Back to Blog Button -->
      <div class="text-center mt-6 md:mt-8">
        <router-link 
          to="/blog" 
          class="inline-flex items-center bg-ukraine-blue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Повернутися до блогу
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
  document.title = 'Як користуватися блогом - Допомога Україні'
})
</script>

<style scoped>
.ukraine-accent-bar {
  height: 4px;
  background: linear-gradient(to right, #0057b7, #ffd700);
  border-radius: 2px;
}
</style> 