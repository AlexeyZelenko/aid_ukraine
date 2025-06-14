<template>
  <div class="pdf-viewer-container bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Header с информацией о документе -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="bg-white/20 p-2 rounded-lg">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-lg">{{ documentTitle }}</h3>
          <p class="text-blue-100 text-sm">{{ $t('document.viewerDescription') }}</p>
        </div>
      </div>
      
      <!-- Кнопки действий -->
      <div class="flex items-center space-x-2">
        <button
          @click="toggleFullscreen"
          class="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-200 group"
          :title="$t('document.fullscreen')"
        >
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <button
          @click="downloadDocument"
          class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          <span>{{ $t('document.download') }}</span>
        </button>
      </div>
    </div>

    <!-- PDF Viewer -->
    <div class="relative">
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
        <div class="flex flex-col items-center space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="text-gray-600">{{ $t('document.loading') }}</p>
        </div>
      </div>
      
      <iframe
        ref="pdfFrame"
        :src="documentSrc"
        width="100%"
        :height="viewerHeight"
        style="border: none;"
        :title="documentTitle"
        @load="handleIframeLoad"
        @error="handleIframeError"
        class="transition-opacity duration-300"
        :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
      ></iframe>
      
      <!-- Fallback для ошибок загрузки -->
      <div v-if="hasError" class="flex flex-col items-center justify-center p-12 bg-gray-50">
        <div class="text-red-500 mb-4">
          <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">{{ $t('document.errorTitle') }}</h3>
        <p class="text-gray-600 text-center mb-6">{{ $t('document.errorMessage') }}</p>
        <button
          @click="downloadDocument"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          <span>{{ $t('document.downloadAlternative') }}</span>
        </button>
      </div>
    </div>

    <!-- Footer с дополнительной информацией -->
    <div class="bg-gray-50 px-4 py-3 border-t flex items-center justify-between text-sm text-gray-600">
      <div class="flex items-center space-x-4">
        <span class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          <span>{{ $t('document.lastUpdated') }}: {{ lastUpdated }}</span>
        </span>
        <span class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 11-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <span>{{ fileSize }}</span>
        </span>
      </div>
      
      <div class="flex items-center space-x-2">
        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">PDF</span>
        <span class="text-xs">{{ currentLanguage.toUpperCase() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

// Reactive references
const documentSrc = ref('/help_website_presentation_ua.pdf')
const isLoading = ref(true)
const hasError = ref(false)
const pdfFrame = ref<HTMLIFrameElement>()
const viewerHeight = ref('700px')

// Computed properties
const currentLanguage = computed(() => locale.value)

const documentTitle = computed(() => {
  const titles: Record<string, string> = {
    ua: 'Презентація сайту допомоги',
    en: 'Humanitarian Aid Website Presentation',
    ru: 'Презентация сайта помощи'
  }
  return titles[locale.value] || titles.ua
})

const lastUpdated = computed(() => {
  const dates: Record<string, string> = {
    ua: '15 червня 2024',
    en: 'June 15, 2024',
    ru: '15 июня 2024'
  }
  return dates[locale.value] || dates.ua
})

const fileSize = computed(() => {
  const sizes: Record<string, string> = {
    ua: '2.3 МБ',
    en: '2.3 MB',
    ru: '2.3 МБ'
  }
  return sizes[locale.value] || sizes.ua
})

// Methods
const downloadDocument = () => {
  const link = document.createElement('a')
  link.href = documentSrc.value
  link.download = documentTitle.value + '.pdf'
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Analytics event (опционально)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download', {
      'event_category': 'PDF',
      'event_label': documentTitle.value
    })
  }
}

const toggleFullscreen = () => {
  if (pdfFrame.value) {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      pdfFrame.value.requestFullscreen()
    }
  }
}

const handleIframeLoad = () => {
  isLoading.value = false
  hasError.value = false
}

const handleIframeError = () => {
  isLoading.value = false
  hasError.value = true
}

// Watchers
watch(locale, (newLocale) => {
  isLoading.value = true
  hasError.value = false
  
  const documentMap: Record<string, string> = {
    en: '/humanitarian_aid_website_en.pdf',
    ru: '/help_website_presentation_ru.pdf',
    ua: '/help_website_presentation_ua.pdf'
  }
  
  documentSrc.value = documentMap[newLocale] || documentMap.ua
})

// Responsive height adjustment
const updateViewerHeight = () => {
  if (window.innerWidth < 768) {
    viewerHeight.value = '500px'
  } else if (window.innerWidth < 1024) {
    viewerHeight.value = '600px'
  } else {
    viewerHeight.value = '700px'
  }
}

onMounted(() => {
  updateViewerHeight()
  window.addEventListener('resize', updateViewerHeight)
})

// Cleanup
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewerHeight)
})
</script>

<style scoped>
.pdf-viewer-container {
  min-height: 600px;
}

@media (max-width: 768px) {
  .pdf-viewer-container {
    margin: 0 -1rem;
    border-radius: 0;
  }
}

/* Анимация для кнопки скачивания */
@keyframes pulse-green {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
}

.animate-pulse-green {
  animation: pulse-green 2s infinite;
}
</style>