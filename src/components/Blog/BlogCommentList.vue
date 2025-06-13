<template>
  <div class="bg-white p-6 rounded-lg shadow-md mt-6">
    <h3 class="text-xl font-semibold text-ukraine-blue mb-4">Коментарі</h3>
    <div v-if="comments.length === 0" class="text-gray-600 text-center py-4">
      <p>Наразі немає коментарів. Будьте першим, хто залишить коментар!</p>
    </div>
    <div v-else>
      <div v-for="comment in topLevelComments" :key="comment.id" class="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
        <BlogCommentItem :comment="comment" @reply="replyToComment" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { rtdb } from '@/config/firebase'
import { ref as dbRef, onValue, off } from 'firebase/database'
import BlogCommentItem from './BlogCommentItem.vue'

const props = defineProps({
  topicId: {
    type: String,
    required: true
  }
})

interface Comment {
  id: string;
  content: string;
  createdAt: number;
  authorId: string;
  authorName: string;
  parentCommentId?: string;
  replies?: Comment[];
}

const comments = ref<Comment[]>([])
const topLevelComments = ref<Comment[]>([])

const buildCommentTree = (comments: Comment[]) => {
  const commentMap: { [key: string]: Comment } = {};
  comments.forEach(comment => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  const tree: Comment[] = [];
  comments.forEach(comment => {
    if (comment.parentCommentId && commentMap[comment.parentCommentId]) {
      commentMap[comment.parentCommentId].replies?.push(commentMap[comment.id]);
    } else {
      tree.push(commentMap[comment.id]);
    }
  });

  // Sort top-level comments and their replies by creation time
  tree.sort((a, b) => b.createdAt - a.createdAt);
  tree.forEach(comment => {
    comment.replies?.sort((a, b) => a.createdAt - b.createdAt);
  });

  return tree;
};

onMounted(() => {
  const commentsRef = dbRef(rtdb, `topics/${props.topicId}/comments`)
  onValue(commentsRef, (snapshot) => {
    const data = snapshot.val()
    const loadedComments: Comment[] = []
    for (let id in data) {
      loadedComments.push({
        id: id,
        ...data[id]
      })
    }
    comments.value = loadedComments;
    topLevelComments.value = buildCommentTree(loadedComments);
  })

  // Clean up listener on component unmount
  // return () => {
  //   off(commentsRef)
  // }
})

const emit = defineEmits(['reply']);

const replyToComment = (commentId: string) => {
  emit('reply', commentId);
};

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