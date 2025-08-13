<script setup lang="ts">
import ScrollableList from "@/components/ScrollableList.vue";
import SingleComment from "@/components/SingleComment.vue";
import { ref, onMounted, provide } from "vue";

const baseListRef = ref(null);
const comments = ref([]);

onMounted(async () => {
  await setComments();
});
defineProps({
  filter: {
    required: true,
    type: Object,
  },
});

async function setComments() {
  comments.value = [
    {
      id: 1,
      author: {
        username: "GG",
        avatar:
          "http://localhost:3000/uploads/68600b2321b078541b943d5d/1754315894632-7c94cec780e171cbcac050d10e8baf0b.jpg",
      },
      content: "First comment",
      createdAt: "8/10/2025",
    },
    {
      id: 2,
      author: { username: "GG", avatar: null },
      content: "Second comment",
      createdAt: "8/10/2025",
    },
  ];
}
async function fetchComments() {}

provide("loadMoreCallback", fetchComments);
</script>
<template>
  <ScrollableList ref="baseListRef">
    <SingleComment
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
    />
  </ScrollableList>
</template>
