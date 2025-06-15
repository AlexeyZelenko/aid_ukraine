<template>
  <div class="space-y-4">
    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div class="flex-1">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div class="h-20 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredTopics.length === 0" class="bg-white rounded-lg shadow-sm p-8 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-comments text-2xl text-gray-400"></i>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ view === 'active' ? 'Немає активних тем' : 'Немає архівних тем' }}
      </h3>
      <p class="text-gray-600 mb-4">
        {{ view === 'active' 
          ? 'Будьте першим, хто створить нову тему для обговорення!' 
          : 'Поки що немає закритих тем.'
        }}
      </p>
      <router-link 
        v-if="view === 'active' && authStore.user"
        to="/blog"
        class="inline-flex items-center gap-2 px-4 py-2 bg-ukraine-blue text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <i class="fas fa-plus"></i>
        Створити тему
      </router-link>
    </div>

    <!-- Topics List -->
    <div v-else class="space-y-4">
      <div 
        v-for="topic in filteredTopics" 
        :key="topic.id" 
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <!-- Topic Header -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-3 flex-1">
                             <!-- Author Avatar -->
               <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-ukraine-blue to-blue-600 flex items-center justify-center">
                 <img 
                   v-if="topic.authorPhotoURL" 
                   :src="topic.authorPhotoURL" 
                   :alt="topic.authorName"
                   class="w-full h-full object-cover"
                   @error="handleImageError"
                 />
                 <i v-else class="fas fa-user text-white text-sm"></i>
               </div>

              <!-- Topic Info -->
              <div class="flex-1 min-w-0">
                <!-- Category Badge -->
                <div class="flex items-center gap-2 mb-2">
                  <span :class="getCategoryClass(topic.category)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                    <i :class="getCategoryIcon(topic.category)" class="mr-1"></i>
                    {{ getCategoryName(topic.category) }}
                  </span>
                  <span v-if="topic.archived" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    <i class="fas fa-archive mr-1"></i>
                    Архів
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 flex items-center gap-2">
                  <span>{{ topic.title }}</span>
                  <span 
                    v-if="(topic.commentsCount || 0) > 0"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-ukraine-blue text-white"
                  >
                    {{ topic.commentsCount }}
                  </span>
                </h3>

                <!-- Author and Date -->
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="font-medium">{{ topic.authorName }}</span>
                  <span>•</span>
                  <span>{{ formatDate(topic.createdAt) }}</span>
                </div>
              </div>
            </div>

            <!-- Topic Actions -->
            <div class="flex items-center gap-2">
              <!-- Archive/Unarchive Button (for topic author) -->
              <button
                v-if="authStore.user && topic.authorId === authStore.user.uid"
                @click="toggleArchive(topic)"
                :class="[
                  'p-2 rounded-full hover:bg-gray-100 transition-colors',
                  topic.archived ? 'text-green-600' : 'text-gray-400'
                ]"
                :title="topic.archived ? 'Відновити тему' : 'Закрити тему'"
              >
                <i :class="topic.archived ? 'fas fa-undo' : 'fas fa-archive'"></i>
              </button>

              <!-- More Options -->
              <div class="relative">
                <button
                  @click="toggleMenu(topic.id)"
                  data-dropdown-trigger
                  class="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400"
                >
                  <i class="fas fa-ellipsis-h"></i>
                </button>
                
                <!-- Dropdown Menu -->
                <div
                  v-if="activeMenu === topic.id"
                  data-dropdown-menu
                  class="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200"
                >
                  <button
                    @click="shareTopic(topic)"
                    class="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <i class="fas fa-share-alt"></i>
                    Поділитися
                  </button>
                  <button
                    v-if="authStore.user && topic.authorId === authStore.user.uid"
                    @click="toggleArchive(topic)"
                    class="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <i :class="topic.archived ? 'fas fa-undo' : 'fas fa-archive'"></i>
                    {{ topic.archived ? 'Відновити з архіву' : 'Додати в архів' }}
                  </button>
                  <button
                    v-if="authStore.user && topic.authorId === authStore.user.uid"
                    @click="deleteTopic(topic)"
                    class="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                  >
                    <i class="fas fa-trash"></i>
                    Видалити назавжди
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Topic Content -->
        <div class="p-6">
          <!-- Content Preview -->
          <p class="text-gray-700 mb-4 line-clamp-3">
            {{ topic.content }}
          </p>

          <!-- Tags -->
          <div v-if="topic.tags && topic.tags.length" class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in topic.tags"
              :key="tag"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-ukraine-blue bg-opacity-10 text-ukraine-blue"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Topic Stats and Actions -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <!-- Like Button -->
              <button
                @click="toggleLike(topic)"
                :disabled="!authStore.user"
                :class="[
                  'flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors',
                  topic.isLiked 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100',
                  !authStore.user && 'opacity-50 cursor-not-allowed'
                ]"
              >
                <i :class="topic.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                <span>{{ topic.likesCount || 0 }}</span>
              </button>

              <!-- Comments Count -->
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <i :class="[
                  (topic.commentsCount || 0) > 0 ? 'fas fa-comment text-ukraine-blue' : 'far fa-comment'
                ]"></i>
                <span :class="[
                  (topic.commentsCount || 0) > 0 ? 'font-medium text-ukraine-blue' : ''
                ]">
                  {{ topic.commentsCount || 0 }} {{ getCommentsText(topic.commentsCount || 0) }}
                </span>
              </div>

              <!-- Views Count -->
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <i class="far fa-eye"></i>
                <span>{{ topic.viewsCount || 0 }}</span>
              </div>
            </div>

            <!-- View Topic Button -->
            <router-link
              :to="{ name: 'blog-detail', params: { id: topic.id } }"
              class="inline-flex items-center gap-2 px-4 py-2 bg-ukraine-blue text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <i class="fas fa-external-link-alt"></i>
              {{ (topic.commentsCount || 0) > 0 ? 'Читати обговорення' : 'Розпочати обговорення' }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && !loading" class="text-center pt-4">
      <button
        @click="loadMore"
        class="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        Завантажити більше
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { rtdb } from '@/config/firebase'
import { ref as dbRef, onValue, update, remove } from 'firebase/database'

// Props
const props = defineProps<{
  view: 'active' | 'archived'
  searchQuery: string
  sortBy: string
}>()

// Emits
const emit = defineEmits<{
  updateStats: []
}>()

// Store and Router
const authStore = useAuthStore()
const router = useRouter()

// State
const loading = ref(true)
const topics = ref<any[]>([])
const activeMenu = ref<string | null>(null)
const hasMore = ref(false)
const page = ref(1)
const pageSize = 10

// Computed
const filteredTopics = computed(() => {
  let filtered = topics.value.filter(topic => {
    // Filter by view (active/archived)
    const matchesView = props.view === 'active' ? !topic.archived : topic.archived
    
    // Filter by search query
    const matchesSearch = !props.searchQuery || 
      topic.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      topic.content.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      (topic.tags && topic.tags.some((tag: string) => tag.toLowerCase().includes(props.searchQuery.toLowerCase())))

    return matchesView && matchesSearch
  })

  // Sort topics
  switch (props.sortBy) {
    case 'oldest':
      filtered.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))
      break
    case 'mostComments':
      filtered.sort((a, b) => (b.commentsCount || 0) - (a.commentsCount || 0))
      break
    case 'mostLikes':
      filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
      break
    default: // newest
      filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  }

  return filtered.slice(0, page.value * pageSize)
})

// Methods
const loadTopics = () => {
  loading.value = true
  const topicsRef = dbRef(rtdb, 'topics')
  
  onValue(topicsRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      topics.value = Object.keys(data).map(id => ({
        id,
        ...data[id],
        isLiked: authStore.user && data[id].likes && data[id].likes[authStore.user.uid] || false,
        commentsCount: 0, // Will be updated from comments
        likesCount: data[id].likes ? Object.keys(data[id].likes).length : 0
      }))
    } else {
      topics.value = []
    }
    
    // Load comments to update counts
    loadCommentsCount()
    
    loading.value = false
    emit('updateStats')
  })
}

const loadCommentsCount = () => {
  const commentsRef = dbRef(rtdb, 'comments')
  onValue(commentsRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      const comments = Object.keys(data).map(id => ({
        id,
        ...data[id]
      }))
      
      // Update comments count for each topic
      topics.value.forEach(topic => {
        topic.commentsCount = comments.filter(comment => comment.topicId === topic.id).length
      })
    } else {
      // Reset comments count if no comments
      topics.value.forEach(topic => {
        topic.commentsCount = 0
      })
    }
    
    emit('updateStats')
  })
}

const toggleArchive = async (topic: any) => {
  if (!authStore.user || topic.authorId !== authStore.user.uid) return

  closeMenu()

  try {
    const topicRef = dbRef(rtdb, `topics/${topic.id}`)
    await update(topicRef, {
      archived: !topic.archived,
      archivedAt: !topic.archived ? Date.now() : null
    })
    
    const action = topic.archived ? 'відновлено з архіву' : 'додано в архів'
    showNotification(`Тему ${action}!`)
  } catch (error) {
    console.error('Error toggling archive status:', error)
    showNotification('Помилка при зміні статусу теми')
  }
}

const toggleLike = async (topic: any) => {
  if (!authStore.user) return

  try {
    const likeRef = dbRef(rtdb, `topics/${topic.id}/likes/${authStore.user.uid}`)
    if (topic.isLiked) {
      await remove(likeRef)
    } else {
      await update(likeRef, {
        userId: authStore.user.uid,
        userName: authStore.user.displayName || 'Користувач',
        createdAt: Date.now()
      })
    }
  } catch (error) {
    console.error('Error toggling like:', error)
  }
}

const deleteTopic = async (topic: any) => {
  if (!authStore.user || topic.authorId !== authStore.user.uid) return

  closeMenu()

  if (confirm('Ви впевнені, що хочете видалити цю тему назавжди? Цю дію неможливо скасувати.')) {
    try {
      const topicRef = dbRef(rtdb, `topics/${topic.id}`)
      await remove(topicRef)
      
      // Also delete associated comments
      const commentsRef = dbRef(rtdb, `comments`)
      // You might want to implement cascade delete for comments
      
      showNotification('Тему видалено назавжди!')
    } catch (error) {
      console.error('Error deleting topic:', error)
      showNotification('Помилка при видаленні теми')
    }
  }
}

const shareTopic = async (topic: any) => {
  const url = `${window.location.origin}/blog/${topic.id}`
  
  closeMenu()
  
  try {
    await navigator.clipboard.writeText(url)
    showNotification('Посилання скопійовано в буфер обміну!')
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    showNotification('Помилка при копіюванні посилання')
  }
}

const toggleMenu = (topicId: string) => {
  activeMenu.value = activeMenu.value === topicId ? null : topicId
}

const closeMenu = () => {
  activeMenu.value = null
}

const loadMore = () => {
  page.value++
}

const formatDate = (timestamp: number | any) => {
  if (!timestamp) return 'Невідомо'
  
  let date: Date
  if (typeof timestamp === 'object' && timestamp.seconds) {
    // Firebase Timestamp
    date = new Date(timestamp.seconds * 1000)
  } else if (typeof timestamp === 'number') {
    date = new Date(timestamp)
  } else {
    return 'Невідомо'
  }
  
  return date.toLocaleDateString('uk-UA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const getCategoryName = (category: string) => {
  const categories: Record<string, string> = {
    general: 'Загальне',
    help: 'Допомога',
    news: 'Новини',
    ideas: 'Ідеї',
    questions: 'Питання',
    announcements: 'Оголошення'
  }
  return categories[category] || 'Загальне'
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    general: 'fas fa-comments',
    help: 'fas fa-hands-helping',
    news: 'fas fa-newspaper',
    ideas: 'fas fa-lightbulb',
    questions: 'fas fa-question-circle',
    announcements: 'fas fa-bullhorn'
  }
  return icons[category] || 'fas fa-comments'
}

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    general: 'bg-blue-100 text-blue-800',
    help: 'bg-green-100 text-green-800',
    news: 'bg-yellow-100 text-yellow-800',
    ideas: 'bg-purple-100 text-purple-800',
    questions: 'bg-orange-100 text-orange-800',
    announcements: 'bg-red-100 text-red-800'
  }
  return classes[category] || 'bg-blue-100 text-blue-800'
}

const getCommentsText = (count: number) => {
  if (count === 0) return 'коментарів'
  if (count === 1) return 'коментар'
  if (count >= 2 && count <= 4) return 'коментарі'
  return 'коментарів'
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

const showNotification = (message: string) => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full'
  notification.textContent = message
  
  document.body.appendChild(notification)
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full')
  }, 100)
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full')
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Watchers
watch([() => props.view, () => props.searchQuery, () => props.sortBy], () => {
  page.value = 1
})



// Lifecycle
onMounted(() => {
  loadTopics()
  
  // Add global click listener to close menu
  document.addEventListener('click', handleGlobalClick)
})

// Handle global clicks to close menu
const handleGlobalClick = (event: Event) => {
  const target = event.target as HTMLElement
  // Close menu if click is outside the dropdown menu area
  if (!target.closest('[data-dropdown-menu]') && !target.closest('[data-dropdown-trigger]')) {
    activeMenu.value = null
  }
}

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>