<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-ukraine-blue mb-4">{{ $t('blog.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('blog.subtitle') }}</p>
        <div class="ukraine-accent-bar w-24 mx-auto mt-6"></div>
      </div>

      <!-- Blog placeholder -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <BlogTopicList />
        </div>
        <div class="md:col-span-1">
          <BlogTopicForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlogTopicForm from '@/components/Blog/BlogTopicForm.vue'
import BlogTopicList from '@/components/Blog/BlogTopicList.vue'
</script>