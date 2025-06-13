<template>
  <div class="bg-white p-6 rounded-lg shadow-md mt-6">
    <h3 class="text-xl font-semibold text-ukraine-blue mb-4">Додати коментар</h3>
    <form @submit.prevent="submitComment">
      <div class="mb-4">
        <label for="commentContent" class="block text-gray-700 text-sm font-bold mb-2">Ваш коментар:</label>
        <textarea
          id="commentContent"
          v-model="comment.content"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          placeholder="Введіть ваш коментар"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-ukraine-blue hover:bg-ukraine-yellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
      >
        Опублікувати коментар
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useToast } from 'primevue/usetoast'
import { rtdb } from '@/config/firebase'
import { push, ref as dbRef, serverTimestamp } from 'firebase/database'

const toast = useToast()

const props = defineProps({
  topicId: {
    type: String,
    required: true
  }
})

interface Comment {
  content: string;
  createdAt: any;
  authorId: string; // Placeholder for user ID
  authorName: string; // Placeholder for user name
}

const comment = ref<Comment>({
  content: '',
  createdAt: null,
  authorId: 'anonymous',
  authorName: 'Анонім'
})

const submitComment = async () => {
  try {
    // In a real app, you'd get the current user's ID and name
    comment.value.createdAt = serverTimestamp()
    await push(dbRef(rtdb, `topics/${props.topicId}/comments`), comment.value)
    comment.value.content = ''
    toast.add({ severity: 'success', summary: 'Успіх', detail: 'Коментар успішно опубліковано!', life: 3000 })
  } catch (error) {
    console.error('Помилка при публікації коментаря:', error)
    toast.add({ severity: 'error', summary: 'Помилка', detail: 'Не вдалося опублікувати коментар. Спробуйте ще раз.', life: 3000 })
  }
}
</script>

<style scoped>
.ukraine-blue {
  background-color: #0057B8; /* Ukrainian Blue */
}
.ukraine-yellow {
  background-color: #FFDD00; /* Ukrainian Yellow */
}
</style>