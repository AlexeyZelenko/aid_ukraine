<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('blog.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('blog.subtitle') }}</p>
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
        
        <!-- Statistics Bar -->
        <div v-if="!statsLoading" class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <div class="text-2xl font-bold text-ukraine-blue">{{ totalTopics }}</div>
            <div class="text-sm text-gray-600">Всього тем</div>
          </div>
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <div class="text-2xl font-bold text-green-600">{{ activeTopics }}</div>
            <div class="text-sm text-gray-600">Активних</div>
          </div>
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <div class="text-2xl font-bold text-gray-600">{{ archivedTopics }}</div>
            <div class="text-sm text-gray-600">В архіві</div>
          </div>
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <div class="text-2xl font-bold text-blue-600">{{ totalComments }}</div>
            <div class="text-sm text-gray-600">Коментарів</div>
          </div>
        </div>
      </div>

      <!-- Authentication Notice -->
      <div v-if="!authStore.user" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div class="flex items-center">
          <i class="fas fa-info-circle text-blue-500 mr-3"></i>
          <div>
            <p class="text-blue-800 font-medium">Увійдіть в систему для участі в обговореннях</p>
            <p class="text-blue-600 text-sm">Щоб створювати теми та коментувати, потрібно авторизуватися</p>
          </div>
          <router-link to="/login" class="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Увійти
          </router-link>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Topics List -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Filters and Tabs -->
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <!-- Topic Type Tabs -->
              <div class="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button 
                  @click="currentView = 'active'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    currentView === 'active' 
                      ? 'bg-ukraine-blue text-white shadow-sm' 
                      : 'text-gray-700 hover:text-ukraine-blue'
                  ]"
                >
                  <i class="fas fa-fire mr-2"></i>
                  Активні ({{ activeTopics }})
                </button>
                <button 
                  @click="currentView = 'archived'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    currentView === 'archived' 
                      ? 'bg-ukraine-blue text-white shadow-sm' 
                      : 'text-gray-700 hover:text-ukraine-blue'
                  ]"
                >
                  <i class="fas fa-archive mr-2"></i>
                  Архів ({{ archivedTopics }})
                </button>
              </div>

              <!-- Search and Sort -->
              <div class="flex items-center gap-3">
                <div class="relative">
                  <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    v-model="searchQuery"
                    type="text" 
                    placeholder="Пошук тем..."
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
                  >
                </div>
                <select 
                  v-model="sortBy"
                  class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
                >
                  <option value="newest">Найновіші</option>
                  <option value="oldest">Найстарші</option>
                  <option value="mostComments">Найбільше коментарів</option>
                  <option value="mostLikes">Найбільше лайків</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Topics List Component -->
          <BlogTopicList 
            :view="currentView"
            :search-query="searchQuery"
            :sort-by="sortBy"
            @update-stats="updateStats"
          />
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Create Topic Form -->
          <BlogTopicForm v-if="authStore.user" @topic-created="refreshTopics" />

          <!-- User Info Card (if authenticated) -->
          <div v-if="authStore.user" class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Ваша активність</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Створено тем:</span>
                <span class="font-medium">{{ userTopics }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Коментарів:</span>
                <span class="font-medium">{{ userComments }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Отримано лайків:</span>
                <span class="font-medium">{{ userLikes }}</span>
              </div>
            </div>
          </div>

          <!-- Popular Topics -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              <i class="fas fa-trending-up mr-2 text-orange-500"></i>
              Популярні теми
            </h3>
            <div class="space-y-3">
              <div v-for="topic in popularTopics" :key="topic.id" class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 bg-ukraine-blue rounded-full flex items-center justify-center">
                  <i class="fas fa-comment text-white text-xs"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <router-link 
                    :to="{ name: 'blog-detail', params: { id: topic.id } }"
                    class="text-sm font-medium text-gray-900 hover:text-ukraine-blue line-clamp-2"
                  >
                    {{ topic.title }}
                  </router-link>
                  <p class="text-xs text-gray-500 mt-1">{{ topic.commentsCount || 0 }} {{ getCommentsText(topic.commentsCount || 0) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Guidelines -->
          <div class="bg-gradient-to-r from-ukraine-blue to-blue-600 rounded-lg shadow-sm p-6 text-white">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-info-circle mr-2"></i>
              Правила спільноти
            </h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <i class="fas fa-check-circle mt-0.5 text-ukraine-yellow"></i>
                <span>Будьте ввічливими та поважайте думки інших</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check-circle mt-0.5 text-ukraine-yellow"></i>
                <span>Використовуйте описові заголовки для тем</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check-circle mt-0.5 text-ukraine-yellow"></i>
                <span>Не публікуйте спам або нерелевантний контент</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check-circle mt-0.5 text-ukraine-yellow"></i>
                <span>Закривайте теми, коли питання вирішено</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { rtdb } from '@/config/firebase'
import { ref as dbRef, onValue } from 'firebase/database'
import BlogTopicForm from '@/components/Blog/BlogTopicForm.vue'
import BlogTopicList from '@/components/Blog/BlogTopicList.vue'

// Stores
const authStore = useAuthStore()

// State
const statsLoading = ref(true)
const currentView = ref<'active' | 'archived'>('active')
const searchQuery = ref('')
const sortBy = ref('newest')

// Data
const topics = ref<any[]>([])
const comments = ref<any[]>([])

// Statistics
const totalTopics = computed(() => topics.value.length)
const activeTopics = computed(() => topics.value.filter(t => !t.archived).length)
const archivedTopics = computed(() => topics.value.filter(t => t.archived).length)
const totalComments = computed(() => comments.value.length)

// User statistics
const userTopics = computed(() => {
  if (!authStore.user) return 0
  return topics.value.filter(t => t.authorId === authStore.user?.uid).length
})

const userComments = computed(() => {
  if (!authStore.user) return 0
  return comments.value.filter(c => c.authorId === authStore.user?.uid).length
})

const userLikes = computed(() => {
  if (!authStore.user) return 0
  return topics.value
    .filter(t => t.authorId === authStore.user?.uid)
    .reduce((total, topic) => total + (topic.likesCount || 0), 0)
})

// Popular topics (top 5 by comments)
const popularTopics = computed(() => {
  return [...topics.value]
    .filter(t => !t.archived)
    .sort((a, b) => (b.commentsCount || 0) - (a.commentsCount || 0))
    .slice(0, 5)
})

// Methods
const loadTopics = () => {
  const topicsRef = dbRef(rtdb, 'topics')
  onValue(topicsRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      topics.value = Object.keys(data).map(id => ({
        id,
        ...data[id],
        commentsCount: 0, // Will be calculated from comments
        likesCount: data[id].likes ? Object.keys(data[id].likes).length : 0
      }))
    } else {
      topics.value = []
    }
    
    // Load comments count for each topic
    loadCommentsStats()
  })
}

const loadCommentsStats = () => {
  const commentsRef = dbRef(rtdb, 'comments')
  onValue(commentsRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      comments.value = Object.keys(data).map(id => ({
        id,
        ...data[id]
      }))
      
      // Update comments count for topics
      topics.value.forEach(topic => {
        topic.commentsCount = comments.value.filter(c => c.topicId === topic.id).length
      })
    } else {
      comments.value = []
      // Reset comments count if no comments
      topics.value.forEach(topic => {
        topic.commentsCount = 0
      })
    }
    
    statsLoading.value = false
  })
}

const updateStats = () => {
  loadTopics()
}

const refreshTopics = () => {
  loadTopics()
}

const getCommentsText = (count: number) => {
  if (count === 0) return 'коментарів'
  if (count === 1) return 'коментар'
  if (count >= 2 && count <= 4) return 'коментарі'
  return 'коментарів'
}

// Lifecycle
onMounted(() => {
  loadTopics()
})
</script>

<style scoped>
.ukraine-accent-bar {
  height: 4px;
  background: linear-gradient(90deg, #0057B8 0%, #FFDD00 100%);
  border-radius: 2px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>