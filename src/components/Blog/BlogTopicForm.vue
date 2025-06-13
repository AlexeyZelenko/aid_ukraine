<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 class="text-2xl font-semibold text-ukraine-blue mb-4">Створити нову тему</h2>
    <form @submit.prevent="submitTopic">
      <div class="mb-4">
        <label for="topicTitle" class="block text-gray-700 text-sm font-bold mb-2">Заголовок теми:</label>
        <input
          type="text"
          id="topicTitle"
          v-model="topic.title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Введіть заголовок теми"
          required
        />
      </div>
      <div class="mb-4">
        <label for="topicContent" class="block text-gray-700 text-sm font-bold mb-2">Зміст теми:</label>
        <textarea
          id="topicContent"
          v-model="topic.content"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          placeholder="Введіть зміст теми"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-ukraine-blue hover:bg-ukraine-yellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
      >
        Опублікувати тему
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { rtdb } from '@/config/firebase'
import { push, ref as dbRef, serverTimestamp } from 'firebase/database'

interface Topic {
  title: string;
  content: string;
  createdAt: any;
  authorId: string; // Placeholder for user ID
  authorName: string; // Placeholder for user name
}

const topic = ref<Topic>({
  title: '',
  content: '',
  createdAt: null,
  authorId: 'anonymous',
  authorName: 'Анонім'
})

const submitTopic = async () => {
  console.log('Спроба опублікувати тему:', topic.value);

  // 1. Перевірка наявності даних
  if (!topic.value.title || topic.value.title.trim() === '') {
    toast.add({ severity: 'warn', summary: 'Попередження', detail: 'Будь ласка, введіть заголовок теми.', life: 3000 });
    console.warn('Публікація скасована: відсутній заголовок.');
    return; // Зупиняємо виконання функції
  }

  if (!topic.value.content || topic.value.content.trim() === '') {
    toast.add({ severity: 'warn', summary: 'Попередження', detail: 'Будь ласка, введіть зміст теми.', life: 3000 });
    console.warn('Публікація скасована: відсутній зміст.');
    return; // Зупиняємо виконання функції
  }

  // Обрізаємо пробіли з початку та кінця, щоб уникнути порожніх рядків
  topic.value.title = topic.value.title.trim();
  topic.value.content = topic.value.content.trim();


  try {
    // 2. Додавання відмітки часу створення
    topic.value.createdAt = serverTimestamp();
    console.log('Дані для відправки:', topic.value);

    // 3. Відправка до Firebase Realtime Database
    const newTopicRef = await push(dbRef(rtdb, 'topics'), topic.value);
    console.log('Тему успішно опубліковано в Firebase!');
    console.log('Ідентифікатор нової теми:', newTopicRef.key); // ID нової теми

    // 4. Очищення форми після успішної публікації
    topic.value.title = '';
    topic.value.content = '';

    // 5. Повідомлення користувача про успіх
    toast.add({ severity: 'success', summary: 'Успіх', detail: 'Тему успішно опубліковано!', life: 3000 });

  } catch (error) {
    // 6. Обробка помилок Firebase та інших можливих помилок
    console.error('Помилка при публікації теми:', error);

    let errorMessage = 'Не вдалося опублікувати тему. Спробуйте ще раз.';

    // Приклад розширеної обробки помилок Firebase
    if (error.code) {
      switch (error.code) {
        case 'PERMISSION_DENIED':
          errorMessage = 'Відмовлено у доступі. Можливо, у вас недостатньо прав для публікації.';
          break;
        case 'NETWORK_REQUEST_FAILED':
          errorMessage = 'Проблема з мережею. Перевірте ваше підключення до Інтернету.';
          break;
        // Додайте інші коди помилок Firebase, які ви хочете обробляти
        default:
          errorMessage = `Помилка: ${error.message || error.code}`;
          break;
      }
    } else if (error.message) {
      errorMessage = `Помилка: ${error.message}`;
    }

    toast.add({ severity: 'error', summary: 'Помилка', detail: errorMessage, life: 3000 });
  }
};
</script>

<style scoped>
.ukraine-blue {
  background-color: #0057B8; /* Ukrainian Blue */
}
.ukraine-yellow {
  background-color: #FFDD00; /* Ukrainian Yellow */
}
</style>