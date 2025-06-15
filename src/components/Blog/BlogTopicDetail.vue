<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-lg shadow-sm p-8 animate-pulse">
        <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div class="h-32 bg-gray-200 rounded w-full"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-lg shadow-sm p-8 text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Помилка завантаження</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button 
          @click="loadTopic"
          class="px-4 py-2 bg-ukraine-blue text-white rounded-md hover:bg-blue-700"
        >
          Спробувати знову
        </button>
      </div>

      <!-- Topic Content -->
      <div v-else-if="topic" class="space-y-6">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-gray-600">
          <router-link to="/blog" class="hover:text-ukraine-blue">Блог</router-link>
          <i class="fas fa-chevron-right text-xs"></i>
          <span class="font-medium">{{ topic.title }}</span>
        </nav>

        <!-- Topic Card -->
        <div class="bg-white rounded-lg shadow-sm">
          <!-- Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex items-start gap-3 flex-1">
                <!-- Author Avatar -->
                <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    v-if="topic.authorPhotoURL" 
                    :src="topic.authorPhotoURL" 
                    :alt="topic.authorName"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full bg-ukraine-blue flex items-center justify-center">
                    <i class="fas fa-user text-white"></i>
                  </div>
                </div>

                <!-- Topic Info -->
                <div class="flex-1 min-w-0">
                  <!-- Category Badge -->
                  <div class="flex items-center gap-2 mb-2">
                    <span :class="getCategoryClass(topic.category)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                      <i :class="getCategoryIcon(topic.category)" class="mr-2"></i>
                      {{ getCategoryName(topic.category) }}
                    </span>
                    <span v-if="topic.archived" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                      <i class="fas fa-archive mr-2"></i>
                      Архів
                    </span>
                  </div>

                  <!-- Author and Date -->
                  <div class="flex items-center gap-4 text-sm text-gray-600">
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
                  @click="toggleArchive"
                  :class="[
                    'p-2 rounded-full hover:bg-gray-100 transition-colors',
                    topic.archived ? 'text-green-600' : 'text-gray-400'
                  ]"
                  :title="topic.archived ? 'Відновити тему' : 'Закрити тему'"
                >
                  <i :class="topic.archived ? 'fas fa-undo' : 'fas fa-archive'"></i>
                </button>

                <!-- Share Button -->
                <button
                  @click="shareTopic"
                  class="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400"
                  title="Поділитися"
                >
                  <i class="fas fa-share-alt"></i>
                </button>

                <!-- Delete Button (for topic author) -->
                <button
                  v-if="authStore.user && topic.authorId === authStore.user.uid"
                  @click="deleteTopic"
                  class="p-2 rounded-full hover:bg-red-50 transition-colors text-red-500"
                  title="Видалити тему"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <!-- Title -->
            <h1 class="text-2xl font-bold text-gray-900 mb-4">{{ topic.title }}</h1>

            <!-- Stats -->
            <div class="flex items-center gap-6">
              <!-- Like Button -->
              <button
                @click="toggleLike"
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
                <i class="far fa-comment"></i>
                <span>{{ comments.length }} коментарів</span>
              </div>

              <!-- Views Count -->
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <i class="far fa-eye"></i>
                <span>{{ topic.viewsCount || 0 }} переглядів</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="prose max-w-none text-gray-700 mb-6" style="white-space: pre-wrap;">{{ topic.content }}</div>

            <!-- Tags -->
            <div v-if="topic.tags && topic.tags.length" class="flex flex-wrap gap-2">
              <span
                v-for="tag in topic.tags"
                :key="tag"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-ukraine-blue bg-opacity-10 text-ukraine-blue"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="bg-white rounded-lg shadow-sm">
          <!-- Comments Header -->
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <i class="fas fa-comments text-ukraine-blue"></i>
              Коментарі ({{ comments.length }})
            </h2>
          </div>

          <!-- Comment Form (for authenticated users) -->
          <div v-if="authStore.user && !topic.archived" class="p-6 border-b border-gray-100">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  v-if="authStore.user?.photoURL" 
                  :src="authStore.user.photoURL" 
                  :alt="authStore.user.displayName"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-ukraine-blue flex items-center justify-center">
                  <i class="fas fa-user text-white text-sm"></i>
                </div>
              </div>

              <div class="flex-1">
                <form @submit.prevent="submitComment" class="space-y-3">
                  <textarea
                    v-model="newComment"
                    placeholder="Додайте свій коментар..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ukraine-blue focus:border-transparent resize-none"
                    rows="3"
                    maxlength="500"
                    required
                  ></textarea>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">{{ newComment.length }}/500</span>
                    <button
                      type="submit"
                      :disabled="submittingComment || !newComment.trim()"
                      class="px-4 py-2 bg-ukraine-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      <i v-if="submittingComment" class="fas fa-spinner fa-spin"></i>
                      <i v-else class="fas fa-paper-plane"></i>
                      {{ submittingComment ? 'Відправляється...' : 'Коментувати' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Auth Notice for non-authenticated users -->
          <div v-else-if="!authStore.user" class="p-6 border-b border-gray-100">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-center">
                <i class="fas fa-info-circle text-blue-500 mr-3"></i>
                <div>
                  <p class="text-blue-800 font-medium">Увійдіть в систему щоб коментувати</p>
                  <p class="text-blue-600 text-sm">Приєднуйтесь до обговорення після авторизації</p>
                </div>
                <router-link 
                  to="/login" 
                  class="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Увійти
                </router-link>
              </div>
            </div>
          </div>

          <!-- Archived Notice -->
          <div v-else-if="topic.archived" class="p-6 border-b border-gray-100">
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div class="flex items-center">
                <i class="fas fa-archive text-gray-500 mr-3"></i>
                <div>
                  <p class="text-gray-800 font-medium">Тема архівована</p>
                  <p class="text-gray-600 text-sm">Нові коментарі заборонені для архівних тем</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Comments List -->
          <div class="divide-y divide-gray-100">
            <div v-if="comments.length === 0" class="p-8 text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-comment text-2xl text-gray-400"></i>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Поки що немає коментарів</h3>
              <p class="text-gray-600">
                {{ authStore.user ? 'Будьте першим, хто прокоментує цю тему!' : 'Увійдіть в систему щоб додати перший коментар.' }}
              </p>
            </div>

            <div
              v-for="comment in comments"
              :key="comment.id"
              class="p-6 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    v-if="comment.authorPhotoURL" 
                    :src="comment.authorPhotoURL" 
                    :alt="comment.authorName"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full bg-ukraine-blue flex items-center justify-center">
                    <i class="fas fa-user text-white text-sm"></i>
                  </div>
                </div>

                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-gray-900">{{ comment.authorName }}</span>
                    <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <p class="text-gray-700" style="white-space: pre-wrap;">{{ comment.content }}</p>

                  <!-- Comment Actions -->
                  <div class="flex items-center gap-4 mt-2">
                    <!-- Like Comment -->
                    <button
                      @click="toggleCommentLike(comment)"
                      :disabled="!authStore.user"
                      :class="[
                        'flex items-center gap-1 text-xs transition-colors',
                        comment.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600',
                        !authStore.user && 'opacity-50 cursor-not-allowed'
                      ]"
                    >
                      <i :class="comment.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                      <span>{{ comment.likesCount || 0 }}</span>
                    </button>

                    <!-- Delete Comment (for comment author) -->
                    <button
                      v-if="authStore.user && comment.authorId === authStore.user.uid"
                      @click="deleteComment(comment)"
                      class="text-xs text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <i class="fas fa-trash mr-1"></i>
                      Видалити
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { rtdb } from '@/config/firebase'
import { ref as dbRef, onValue, update, remove, push, get } from 'firebase/database'

// Props and Router
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// State
const loading = ref(true)
const error = ref('')
const topic = ref<any>(null)
const comments = ref<any[]>([])
const newComment = ref('')
const submittingComment = ref(false)

// Computed
const topicId = computed(() => route.params.id as string)

// Methods
const loadTopic = async () => {
  loading.value = true
  error.value = ''
  let hasIncrementedView = false

  try {
    const topicRef = dbRef(rtdb, `topics/${topicId.value}`)
    onValue(topicRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        topic.value = {
          id: topicId.value,
          ...data,
          isLiked: authStore.user && data.likes && data.likes[authStore.user.uid] || false,
          likesCount: data.likes ? Object.keys(data.likes).length : 0
        }
        
        // Increment view count only once when first loading
        if (authStore.user && !hasIncrementedView && loading.value) {
          hasIncrementedView = true
          incrementViewCount()
        }
        
        loading.value = false
      } else {
        error.value = 'Тему не знайдено'
        loading.value = false
      }
    })

    // Load comments
    loadComments()
  } catch (err) {
    error.value = 'Помилка завантаження теми'
    loading.value = false
  }
}

const loadComments = () => {
  const commentsRef = dbRef(rtdb, 'comments')
  onValue(commentsRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      comments.value = Object.keys(data)
        .map(id => ({
          id,
          ...data[id],
          isLiked: authStore.user && data[id].likes && data[id].likes[authStore.user.uid] || false,
          likesCount: data[id].likes ? Object.keys(data[id].likes).length : 0
        }))
        .filter(comment => comment.topicId === topicId.value)
        .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))
    } else {
      comments.value = []
    }
  })
}

const incrementViewCount = async () => {
  if (!topic.value || !authStore.user) return

  try {
    // Check if user has already viewed this topic
    const viewRef = dbRef(rtdb, `topics/${topicId.value}/views/${authStore.user.uid}`)
    const viewSnapshot = await get(viewRef)
    
    // Only increment if user hasn't viewed this topic before
    if (!viewSnapshot.exists()) {
      await update(viewRef, {
        userId: authStore.user.uid,
        viewedAt: Date.now()
      })

      // Update view count only for new views
      const topicRef = dbRef(rtdb, `topics/${topicId.value}`)
      const currentViews = topic.value.viewsCount || 0
      await update(topicRef, {
        viewsCount: currentViews + 1
      })
    }
  } catch (error) {
    console.error('Error incrementing view count:', error)
  }
}

const toggleArchive = async () => {
  if (!authStore.user || !topic.value || topic.value.authorId !== authStore.user.uid) return

  try {
    const topicRef = dbRef(rtdb, `topics/${topicId.value}`)
    await update(topicRef, {
      archived: !topic.value.archived,
      archivedAt: !topic.value.archived ? Date.now() : null
    })
    
    const action = topic.value.archived ? 'відновлено з архіву' : 'додано в архів'
    showNotification(`Тему ${action}!`)
  } catch (error) {
    console.error('Error toggling archive status:', error)
    showNotification('Помилка при зміні статусу теми')
  }
}

const toggleLike = async () => {
  if (!authStore.user || !topic.value) return

  try {
    const likeRef = dbRef(rtdb, `topics/${topicId.value}/likes/${authStore.user.uid}`)
    if (topic.value.isLiked) {
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

const deleteTopic = async () => {
  if (!authStore.user || !topic.value || topic.value.authorId !== authStore.user.uid) return

  if (confirm('Ви впевнені, що хочете видалити цю тему? Цю дію неможливо скасувати.')) {
    try {
      // Delete topic
      const topicRef = dbRef(rtdb, `topics/${topicId.value}`)
      await remove(topicRef)

      // Delete associated comments
      for (const comment of comments.value) {
        const commentRef = dbRef(rtdb, `comments/${comment.id}`)
        await remove(commentRef)
      }

      // Navigate back to blog
      router.push('/blog')
    } catch (error) {
      console.error('Error deleting topic:', error)
    }
  }
}

const shareTopic = async () => {
  const url = window.location.href
  
  try {
    await navigator.clipboard.writeText(url)
    showNotification('Посилання скопійовано в буфер обміну!')
  } catch (error) {
    console.error('Error copying to clipboard:', error)
  }
}

const submitComment = async () => {
  if (!authStore.user || !newComment.value.trim() || submittingComment.value) return

  submittingComment.value = true

  try {
    const commentData = {
      topicId: topicId.value,
      content: newComment.value.trim(),
      authorId: authStore.user.uid,
      authorName: authStore.user.displayName || 'Користувач',
      authorEmail: authStore.user.email || '',
      authorPhotoURL: authStore.user.photoURL || '',
      createdAt: Date.now(),
      likesCount: 0
    }

    await push(dbRef(rtdb, 'comments'), commentData)
    newComment.value = ''
  } catch (error) {
    console.error('Error submitting comment:', error)
  } finally {
    submittingComment.value = false
  }
}

const toggleCommentLike = async (comment: any) => {
  if (!authStore.user || !comment) return

  try {
    const likeRef = dbRef(rtdb, `comments/${comment.id}/likes/${authStore.user.uid}`)
    if (comment.isLiked) {
      await remove(likeRef)
    } else {
      await update(likeRef, {
        userId: authStore.user.uid,
        userName: authStore.user.displayName || 'Користувач',
        createdAt: Date.now()
      })
    }
  } catch (error) {
    console.error('Error toggling comment like:', error)
  }
}

const deleteComment = async (comment: any) => {
  if (!authStore.user || comment.authorId !== authStore.user.uid) return

  if (confirm('Ви впевнені, що хочете видалити цей коментар?')) {
    try {
      const commentRef = dbRef(rtdb, `comments/${comment.id}`)
      await remove(commentRef)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }
}

const formatDate = (timestamp: number | any) => {
  if (!timestamp) return 'Невідомо'
  
  let date: Date
  if (typeof timestamp === 'object' && timestamp.seconds) {
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
    general: 'Загальне обговорення',
    help: 'Допомога та підтримка',
    news: 'Новини',
    ideas: 'Ідеї та пропозиції',
    questions: 'Питання',
    announcements: 'Оголошення'
  }
  return categories[category] || 'Загальне обговорення'
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

const showNotification = (message: string) => {
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full'
  notification.textContent = message
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.classList.remove('translate-x-full')
  }, 100)
  
  setTimeout(() => {
    notification.classList.add('translate-x-full')
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Lifecycle
onMounted(() => {
  loadTopic()
})
</script>

<style scoped>
.prose {
  line-height: 1.75;
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