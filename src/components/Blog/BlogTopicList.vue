<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-ukraine-blue mb-4">Актуальні теми</h2>
    <div v-if="topics.length === 0" class="text-gray-600 text-center py-8">
      <p>Наразі немає активних тем для обговорення. Будьте першим, хто створить нову тему!</p>
    </div>
    <div v-else>
      <div v-for="topic in topics" :key="topic.id" class="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
        <h3 class="text-xl font-bold text-gray-800 mb-2">{{ topic.title }}</h3>
        <p class="text-gray-700 mb-2">{{ topic.content }}</p>
        <div class="text-sm text-gray-500 flex justify-between items-center">
          <span>Автор: {{ topic.authorName }}</span>
          <span>Опубліковано: {{ formatDate(topic.createdAt) }}</span>
        </div>
        <!-- Placeholder for comments and other features -->
        <button
          @click="viewTopic(topic.id)"
          class="mt-4 bg-ukraine-blue hover:bg-ukraine-yellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          Переглянути та коментувати
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { rtdb } from '@/config/firebase'
import { ref as dbRef, onValue, off } from 'firebase/database'

const router = useRouter()

interface Topic {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  authorId: string;
  authorName: string;
}

const topics = ref<Topic[]>([])

onMounted(() => {
  const topicsRef = dbRef(rtdb, 'topics')
  onValue(topicsRef, (snapshot) => {
    const data = snapshot.val()
    const loadedTopics: Topic[] = []
    for (let id in data) {
      loadedTopics.push({
        id: id,
        ...data[id]
      })
    }
    topics.value = loadedTopics.sort((a, b) => b.createdAt - a.createdAt) // Sort by creation time
  })

  // Clean up listener on component unmount
  // return () => {
  //   off(topicsRef)
  // }
})

const formatDate = (timestamp: number) => {
  if (!timestamp) return 'Невідомо'
  const date = new Date(timestamp)
  return date.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const viewTopic = (topicId: string) => {
  // Implement navigation to a detailed topic view or open a modal
  console.log('View topic:', topicId)
  router.push({ name: 'blog-detail', params: { id: topicId } })
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