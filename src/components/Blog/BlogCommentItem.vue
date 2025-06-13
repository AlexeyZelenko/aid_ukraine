<template>
  <div :class="['comment-item', { 'ml-8 mt-4 p-4 bg-gray-50 rounded-lg': comment.parentCommentId }]">
    <p class="text-gray-700 mb-2">{{ comment.content }}</p>
    <div class="text-sm text-gray-500 flex justify-between items-center">
      <span>Автор: {{ comment.authorName }}</span>
      <span>Опубліковано: {{ formatDate(comment.createdAt) }}</span>
      <button @click="emit('reply', comment.id)" class="text-blue-500 hover:underline text-sm">Відповісти</button>
    </div>
    <div v-if="comment.replies && comment.replies.length > 0" class="replies-container">
      <BlogCommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        @reply="emit('reply', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Comment {
  id: string;
  content: string;
  createdAt: number;
  authorId: string;
  authorName: string;
  parentCommentId?: string;
  replies?: Comment[];
}

const props = defineProps({
  comment: {
    type: Object as () => Comment,
    required: true,
  },
});

const emit = defineEmits(['reply']);

const formatDate = (timestamp: number) => {
  if (!timestamp) return 'Невідомо';
  const date = new Date(timestamp);
  return date.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
.comment-item {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
.comment-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}
</style>