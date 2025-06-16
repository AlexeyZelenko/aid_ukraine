<template>
  <form @submit.prevent="submitTopic" class="p-4 space-y-4">
    <!-- Topic Category -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <i class="fas fa-tag mr-2 text-ukraine-blue"></i>
        Категорія
      </label>
      <select 
        v-model="topic.category"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
        required
      >
        <option value="">Оберіть категорію</option>
        <option value="general">Загальне обговорення</option>
        <option value="help">Допомога та підтримка</option>
        <option value="news">Новини</option>
        <option value="ideas">Ідеї та пропозиції</option>
        <option value="questions">Питання</option>
        <option value="announcements">Оголошення</option>
      </select>
    </div>

    <!-- Title -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <i class="fas fa-heading mr-2 text-ukraine-blue"></i>
        Заголовок теми *
      </label>
      <input
        type="text"
        v-model="topic.title"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
        placeholder="Введіть описовий заголовок теми..."
        required
        maxlength="100"
      />
      <div class="mt-1 text-right">
        <span class="text-xs text-gray-500">{{ topic.title.length }}/100</span>
      </div>
    </div>

    <!-- Content -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <i class="fas fa-align-left mr-2 text-ukraine-blue"></i>
        Зміст теми *
      </label>
      <textarea
        v-model="topic.content"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
        rows="4"
        placeholder="Детально опишіть тему для обговорення..."
        required
        maxlength="1000"
      ></textarea>
      <div class="mt-1 text-right">
        <span class="text-xs text-gray-500">{{ topic.content.length }}/1000</span>
      </div>
    </div>

    <!-- Tags -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        <i class="fas fa-hashtag mr-2 text-ukraine-blue"></i>
        Теги (опціонально)
      </label>
      <div class="flex items-center gap-2 mb-2">
        <input
          type="text"
          v-model="newTag"
          @keydown.enter.prevent="addTag"
          class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-ukraine-blue focus:border-transparent"
          placeholder="Додайте тег та натисніть Enter"
          maxlength="20"
        />
        <button
          type="button"
          @click="addTag"
          class="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          <i class="fas fa-plus text-sm"></i>
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tag, index) in topic.tags"
          :key="index"
          class="inline-flex items-center gap-1 px-2 py-1 bg-ukraine-blue bg-opacity-10 text-ukraine-blue rounded-full text-xs"
        >
          #{{ tag }}
          <button
            type="button"
            @click="removeTag(index)"
            class="text-ukraine-blue hover:text-red-500 transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-200 gap-3">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <div class="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-ukraine-blue to-blue-600 flex items-center justify-center">
          <img 
            v-if="authStore.user?.photoURL" 
            :src="authStore.user.photoURL" 
            :alt="authStore.user.displayName"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <i v-else class="fas fa-user text-white text-xs"></i>
        </div>
        <span class="hidden sm:inline">{{ authStore.user?.displayName || 'Користувач' }}</span>
      </div>
      
      <div class="flex gap-2">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Скасувати
        </button>
        <button
          type="submit"
          :disabled="submitting || !topic.title.trim() || !topic.content.trim()"
          class="px-4 py-2 text-sm bg-ukraine-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-paper-plane"></i>
          <span class="hidden sm:inline">{{ submitting ? 'Публікується...' : 'Опублікувати' }}</span>
          <span class="sm:hidden">{{ submitting ? '...' : 'OK' }}</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { rtdb } from '@/config/firebase'
import { push, ref as dbRef, serverTimestamp } from 'firebase/database'

// Emits
const emit = defineEmits<{
  topicCreated: []
  cancel: []
}>()

// Store
const authStore = useAuthStore()

// State
const submitting = ref(false)
const newTag = ref('')

interface Topic {
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: any
  authorId: string
  authorName: string
  authorEmail: string
  archived: boolean
  commentsCount: number
  likesCount: number
}

const topic = ref<Topic>({
  title: '',
  content: '',
  category: '',
  tags: [],
  createdAt: null,
  authorId: authStore.user?.uid || '',
  authorName: authStore.user?.displayName || 'Користувач',
  authorEmail: authStore.user?.email || '',
  archived: false,
  commentsCount: 0,
  likesCount: 0
})

// Methods
const addTag = () => {
  const tag = newTag.value.trim().toLowerCase()
  if (tag && !topic.value.tags.includes(tag) && topic.value.tags.length < 5) {
    topic.value.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  topic.value.tags.splice(index, 1)
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

const submitTopic = async () => {
  if (submitting.value) return
  
  // Validation
  if (!topic.value.title.trim() || !topic.value.content.trim() || !topic.value.category) {
    return
  }

  submitting.value = true

  try {
    // Prepare topic data
    const topicData = {
      ...topic.value,
      title: topic.value.title.trim(),
      content: topic.value.content.trim(),
      createdAt: serverTimestamp(),
      authorId: authStore.user?.uid || '',
      authorName: authStore.user?.displayName || 'Користувач',
      authorEmail: authStore.user?.email || '',
      archived: false,
      commentsCount: 0,
      likesCount: 0
    }

    // Save to Firebase
    await push(dbRef(rtdb, 'topics'), topicData)

    // Reset form
    topic.value = {
      title: '',
      content: '',
      category: '',
      tags: [],
      createdAt: null,
      authorId: authStore.user?.uid || '',
      authorName: authStore.user?.displayName || 'Користувач',
      authorEmail: authStore.user?.email || '',
      archived: false,
      commentsCount: 0,
      likesCount: 0
    }

    // Emit success event
    emit('topicCreated')

  } catch (error) {
    console.error('Error creating topic:', error)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.ukraine-blue {
  background-color: #0057B8;
}
</style> 