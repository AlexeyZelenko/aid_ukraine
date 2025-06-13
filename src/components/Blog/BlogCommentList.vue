<template>
  <div class="bg-white p-6 rounded-lg shadow-md mt-6">
    <h3 class="text-xl font-semibold text-ukraine-blue mb-4">Коментарі</h3>
    <div v-if="comments.length === 0" class="text-gray-600 text-center py-4">
      <p>Наразі немає коментарів. Будьте першим, хто залишить коментар!</p>
    </div>
    <div v-else>
      <div v-for="comment in comments" :key="comment.id" class="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
        <p class="text-gray-700 mb-2">{{ comment.content }}</p>
        <div class="text-sm text-gray-500 flex justify-between items-center">
          <span>Автор: {{ comment.authorName }}</span>
          <span>Опубліковано: {{ formatDate(comment.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { rtdb } from '@/config/firebase'
import { ref as dbRef, onValue, off } from 'firebase/database'

const props = defineProps({
  topicId: {
    type: String,
    required: true
  }
})

interface Comment {
  id: string;
  content: string;
  createdAt: number;
  authorId: string;
  authorName: string;
}

const comments = ref<Comment[]>([])

onMounted(() => {
  const commentsRef = dbRef(rtdb, `topics/${props.topicId}/comments`)
  onValue(commentsRef, (snapshot) => {
    const data = snapshot.val()
    const loadedComments: Comment[] = []
    for (let id in data) {
      loadedComments.push({
        id: id,
        ...data[id]
      })
    }
    comments.value = loadedComments.sort((a, b) => b.createdAt - a.createdAt) // Sort by creation time
  })

  // Clean up listener on component unmount
  // return () => {
  //   off(commentsRef)
  // }
})

const formatDate = (timestamp: number) => {
  if (!timestamp) return 'Невідомо'
  const date = new Date(timestamp)
  return date.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
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