<template>
  <div class="min-h-screen bg-gray-50 py-6 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8 md:mb-12">
        <h1 class="text-2xl md:text-4xl font-bold text-ukraine-blue mb-2 md:mb-4">{{ $t('blog.title') }}</h1>
        <p class="text-lg md:text-xl text-gray-600">{{ $t('blog.subtitle') }}</p>
        <div class="ukraine-accent-bar w-16 md:w-24 mx-auto mt-4 md:mt-6"></div>
        
        <!-- Statistics Bar -->
        <div v-if="!statsLoading" class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8 max-w-4xl mx-auto">
          <div class="bg-white rounded-lg p-3 md:p-4 shadow-sm">
            <div class="text-lg md:text-2xl font-bold text-ukraine-blue">{{ totalTopics }}</div>
            <div class="text-xs md:text-sm text-gray-600">Всього тем</div>
          </div>
          <div class="bg-white rounded-lg p-3 md:p-4 shadow-sm">
            <div class="text-lg md:text-2xl font-bold text-green-600">{{ activeTopics }}</div>
            <div class="text-xs md:text-sm text-gray-600">Активних</div>
          </div>
          <div class="bg-white rounded-lg p-3 md:p-4 shadow-sm">
            <div class="text-lg md:text-2xl font-bold text-gray-600">{{ archivedTopics }}</div>
            <div class="text-xs md:text-sm text-gray-600">В архіві</div>
          </div>
          <div class="bg-white rounded-lg p-3 md:p-4 shadow-sm">
            <div class="text-lg md:text-2xl font-bold text-blue-600">{{ totalComments }}</div>
            <div class="text-xs md:text-sm text-gray-600">Коментарів</div>
          </div>
        </div>
      </div>

      <!-- Authentication Notice -->
      <div v-if="!authStore.user" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 md:mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex items-start gap-3 flex-1">
            <i class="fas fa-info-circle text-blue-500 mt-1 flex-shrink-0"></i>
            <div>
              <p class="text-blue-800 font-medium text-sm md:text-base">Увійдіть в систему для участі в обговореннях</p>
              <p class="text-blue-600 text-xs md:text-sm mt-1">Щоб створювати теми та коментувати, потрібно авторизуватися</p>
            </div>
          </div>
          <router-link to="/login" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm text-center">
            Увійти
          </router-link>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Topics List -->
        <div class="lg:col-span-2 space-y-4 lg:space-y-6">
          <!-- Filters and Tabs -->
          <div class="bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <!-- Topic Type Tabs - Always at top -->
            <div class="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-4">
              <button 
                @click="currentView = 'active'"
                :class="[
                  'flex-1 px-2 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors text-center',
                  currentView === 'active' 
                    ? 'bg-ukraine-blue text-white shadow-sm' 
                    : 'text-gray-700 hover:text-ukraine-blue'
                ]"
              >
                <i class="fas fa-fire mr-1 md:mr-2"></i>
                <span class="hidden sm:inline">Активні</span>
                <span class="sm:hidden">Акт.</span>
                ({{ activeTopics }})
              </button>
              <button 
                @click="currentView = 'archived'"
                :class="[
                  'flex-1 px-2 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors text-center',
                  currentView === 'archived' 
                    ? 'bg-ukraine-blue text-white shadow-sm' 
                    : 'text-gray-700 hover:text-ukraine-blue'
                ]"
              >
                <i class="fas fa-archive mr-1 md:mr-2"></i>
                <span class="hidden sm:inline">Архів</span>
                <span class="sm:hidden">Арх.</span>
                ({{ archivedTopics }})
              </button>
            </div>

            <!-- Search and Controls -->
            <div class="flex flex-col sm:flex-row gap-3 mb-4">
              <!-- Search -->
              <div class="relative flex-1">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Пошук тем..."
                  class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
                >
              </div>
              
              <!-- Controls Row -->
              <div class="flex gap-2">
                <!-- View Mode Toggle -->
                <div class="flex items-center bg-gray-100 rounded-lg p-1">
                  <button 
                    @click="viewMode = 'full'"
                    :class="[
                      'px-2 md:px-3 py-1 rounded-md text-sm font-medium transition-colors',
                      viewMode === 'full' 
                        ? 'bg-white text-ukraine-blue shadow-sm' 
                        : 'text-gray-600 hover:text-ukraine-blue'
                    ]"
                    title="Повне відображення"
                  >
                    <i class="fas fa-th-large"></i>
                  </button>
                  <button 
                    @click="viewMode = 'compact'"
                    :class="[
                      'px-2 md:px-3 py-1 rounded-md text-sm font-medium transition-colors',
                      viewMode === 'compact' 
                        ? 'bg-white text-ukraine-blue shadow-sm' 
                        : 'text-gray-600 hover:text-ukraine-blue'
                    ]"
                    title="Компактне відображення"
                  >
                    <i class="fas fa-list"></i>
                  </button>
                </div>
                
                <!-- Sort -->
                <select 
                  v-model="sortBy"
                  class="border border-gray-300 rounded-md px-2 md:px-3 py-2 text-xs md:text-sm focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
                >
                  <option value="newest">Найновіші</option>
                  <option value="oldest">Найстарші</option>
                  <option value="mostComments">Коментарі</option>
                  <option value="mostLikes">Лайки</option>
                </select>
              </div>
            </div>

            <!-- Category Filter -->
            <div class="border-t border-gray-200 pt-4">
              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <span class="text-sm font-medium text-gray-700 flex-shrink-0">Категорії:</span>
                <div class="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                  <button
                    @click="selectedCategory = 'all'"
                    :class="[
                      'px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap',
                      selectedCategory === 'all'
                        ? 'bg-ukraine-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ]"
                  >
                    <i class="fas fa-layer-group mr-1"></i>
                    <span class="hidden sm:inline">Всі</span>
                    <span class="sm:hidden">Всі</span>
                    ({{ getCategoryCount('all') }})
                  </button>
                  <button
                    @click="selectedCategory = 'general'"
                    :class="[
                      'px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap',
                      selectedCategory === 'general'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    ]"
                  >
                    <i class="fas fa-comments mr-1"></i>
                    <span class="hidden sm:inline">Загальне</span>
                    <span class="sm:hidden">Заг.</span>
                    ({{ getCategoryCount('general') }})
                  </button>
                  <button
                    @click="selectedCategory = 'help'"
                    :class="[
                      'px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap',
                      selectedCategory === 'help'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    ]"
                  >
                    <i class="fas fa-hands-helping mr-1"></i>
                    <span class="hidden sm:inline">Допомога</span>
                    <span class="sm:hidden">Доп.</span>
                    ({{ getCategoryCount('help') }})
                  </button>
                  <button
                    @click="selectedCategory = 'news'"
                    :class="[
                      'px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap',
                      selectedCategory === 'news'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    ]"
                  >
                    <i class="fas fa-newspaper mr-1"></i>
                    <span class="hidden sm:inline">Новини</span>
                    <span class="sm:hidden">Нов.</span>
                    ({{ getCategoryCount('news') }})
                  </button>
                  <button
                    @click="selectedCategory = 'ideas'"
                    :class="[
                      'px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap',
                      selectedCategory === 'ideas'
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                    ]"
                  >
                    <i class="fas fa-lightbulb mr-1"></i>
                    <span class="hidden sm:inline">Ідеї</span>
                    <span class="sm:hidden">Ідеї</span>
                    ({{ getCategoryCount('ideas') }})
                  </button>
                  <button
                    @click="selectedCategory = 'questions'"
                    :class="[
                      'px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap',
                      selectedCategory === 'questions'
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                    ]"
                  >
                    <i class="fas fa-question-circle mr-1"></i>
                    <span class="hidden sm:inline">Питання</span>
                    <span class="sm:hidden">Пит.</span>
                    ({{ getCategoryCount('questions') }})
                  </button>
                  <button
                    @click="selectedCategory = 'announcements'"
                    :class="[
                      'px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap',
                      selectedCategory === 'announcements'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    ]"
                  >
                    <i class="fas fa-bullhorn mr-1"></i>
                    <span class="hidden sm:inline">Оголошення</span>
                    <span class="sm:hidden">Огол.</span>
                    ({{ getCategoryCount('announcements') }})
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Topics List Component -->
          <BlogTopicList 
            :view="currentView"
            :search-query="searchQuery"
            :sort-by="sortBy"
            :view-mode="viewMode"
            :selected-category="selectedCategory"
            @update-stats="updateStats"
          />
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-4 lg:space-y-6 order-first lg:order-last">
          <!-- Mobile: Create Topic Button -->
          <div v-if="authStore.user" class="lg:hidden">
            <button
              @click="showMobileCreateForm = true"
              class="w-full bg-ukraine-blue text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <i class="fas fa-plus"></i>
              <span>Створити нову тему</span>
            </button>
          </div>

          <!-- Desktop: Create Topic Form -->
          <div class="hidden lg:block">
            <BlogTopicForm v-if="authStore.user" @topic-created="refreshTopics" />
          </div>

          <!-- Mobile: Compact Cards Row -->
          <div class="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- User Info Card (if authenticated) -->
            <div v-if="authStore.user" class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="text-base font-semibold text-gray-900 mb-3">Ваша активність</h3>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Тем:</span>
                  <span class="font-medium">{{ userTopics }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Коментарів:</span>
                  <span class="font-medium">{{ userComments }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Лайків:</span>
                  <span class="font-medium">{{ userLikes }}</span>
                </div>
              </div>
            </div>

            <!-- Popular Topics - Mobile Compact -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="text-base font-semibold text-gray-900 mb-3">
                <i class="fas fa-trending-up mr-2 text-orange-500"></i>
                Популярні
              </h3>
              <div class="space-y-2">
                <div v-for="topic in popularTopics.slice(0, 3)" :key="topic.id" class="flex items-start gap-2">
                  <div class="flex-shrink-0 w-6 h-6 bg-ukraine-blue rounded-full flex items-center justify-center">
                    <i class="fas fa-comment text-white text-xs"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <router-link 
                      :to="{ name: 'blog-detail', params: { id: topic.id } }"
                      class="text-xs font-medium text-gray-900 hover:text-ukraine-blue line-clamp-2"
                    >
                      {{ topic.title }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop: Full Sidebar -->
          <div class="hidden lg:block space-y-6">
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

          <!-- Mobile: Guidelines at bottom -->
          <div class="lg:hidden bg-gradient-to-r from-ukraine-blue to-blue-600 rounded-lg shadow-sm p-4 text-white">
            <h3 class="text-base font-semibold mb-3">
              <i class="fas fa-info-circle mr-2"></i>
              Правила спільноти
            </h3>
            <ul class="space-y-2 text-xs">
              <li class="flex items-start gap-2">
                <i class="fas fa-check-circle mt-0.5 text-ukraine-yellow flex-shrink-0"></i>
                <span>Будьте ввічливими та поважайте думки інших</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check-circle mt-0.5 text-ukraine-yellow flex-shrink-0"></i>
                <span>Використовуйте описові заголовки для тем</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile: Create Topic Modal -->
    <div 
      v-if="showMobileCreateForm" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4 lg:hidden"
      @click="closeMobileCreateForm"
    >
      <div 
        class="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-ukraine-blue rounded-full flex items-center justify-center">
              <i class="fas fa-plus text-white text-sm"></i>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Створити нову тему</h3>
              <p class="text-sm text-gray-600">Поділіться своїми думками</p>
            </div>
          </div>
          <button
            @click="closeMobileCreateForm"
            class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="overflow-y-auto max-h-[calc(90vh-80px)]">
          <MobileTopicForm @topic-created="onMobileTopicCreated" @cancel="closeMobileCreateForm" />
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
import MobileTopicForm from '@/components/Blog/MobileTopicForm.vue'

// Stores
const authStore = useAuthStore()

// State
const statsLoading = ref(true)
const currentView = ref<'active' | 'archived'>('active')
const searchQuery = ref('')
const sortBy = ref('newest')
const viewMode = ref<'full' | 'compact'>('compact')
const selectedCategory = ref('all')
const showMobileCreateForm = ref(false)

// Data
const topics = ref<any[]>([])
const comments = ref<any[]>([])

// Statistics
const totalTopics = computed(() => topics.value.length)
const activeTopics = computed(() => topics.value.filter(t => !t.archived).length)
const archivedTopics = computed(() => topics.value.filter(t => t.archived).length)
const totalComments = computed(() => comments.value.length)

// Category statistics
const getCategoryCount = (category: string) => {
  if (category === 'all') return totalTopics.value
  return topics.value.filter(t => t.category === category && !t.archived).length
}

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

// Mobile modal methods
const closeMobileCreateForm = () => {
  showMobileCreateForm.value = false
}

const onMobileTopicCreated = () => {
  showMobileCreateForm.value = false
  refreshTopics()
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