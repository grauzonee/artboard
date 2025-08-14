<script setup lang="ts">
import ScrollableList from "@/components/ScrollableList.vue";
import SingleComment from "@/components/SingleComment.vue";
import { getComments } from "@/helpers/comments.ts";
import { ref, onMounted, provide } from "vue";
import type { CommentFilterData } from "@/helpers/comments.ts";

const baseListRef = ref(null);
const comments = ref([]);

const props = defineProps<{
  filter: CommentFilterData;
}>();

onMounted(async () => {
  await fetchComments();
});

async function fetchComments() {
  try {
    const newCommentsData = await getComments(
      baseListRef.value?.getPage(),
      props.filter,
    );
    if (newCommentsData.docs && newCommentsData.docs.length > 0) {
      comments.value = [...comments.value, ...newCommentsData.docs];
      return newCommentsData.hasNext;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

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
