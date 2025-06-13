<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <div v-if="topic">
      <h1 class="text-3xl font-bold text-ukraine-blue mb-4">{{ topic.title }}</h1>
      <p class="text-gray-700 mb-4">{{ topic.content }}</p>
      <div class="text-sm text-gray-500 flex justify-between items-center mb-6">
        <span>Автор: {{ topic.authorName }}</span>
        <span>Опубліковано: {{ formatDate(topic.createdAt) }}</span>
      </div>

      <BlogCommentList :topicId="topicId" />
      <BlogCommentForm :topicId="topicId" />
    </div>
    <div v-else class="text-center py-8">
      <p class="text-gray-600">Завантаження теми або тема не знайдена...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { rtdb } from '@/config/firebase'
import { ref as dbRef, onValue, off } from 'firebase/database'
import BlogCommentList from './BlogCommentList.vue'
import BlogCommentForm from './BlogCommentForm.vue'

interface Topic {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  authorId: string;
  authorName: string;
}

const route = useRoute()
const topicId = ref<string | string[]>(route.params.id)
const topic = ref<Topic | null>(null)

const fetchTopic = (id: string) => {
  const topicRef = dbRef(rtdb, `topics/${id}`)
  onValue(topicRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      topic.value = { id: id, ...data }
    } else {
      topic.value = null
    }
  })
}

onMounted(() => {
  if (typeof topicId.value === 'string') {
    fetchTopic(topicId.value)
  }
})

watch(() => route.params.id, (newId) => {
  if (typeof newId === 'string') {
    topicId.value = newId
    fetchTopic(newId)
  }
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