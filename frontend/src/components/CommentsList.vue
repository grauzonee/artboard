<script setup lang="ts">
import ScrollableList from "@/components/ScrollableList.vue";
import SingleComment from "@/components/SingleComment.vue";
import { getComments } from "@/helpers/comments.ts";
import { ref, provide } from "vue";
import type { CommentFilterData } from "@/helpers/comments.ts";

const baseListRef = ref(null);

const props = defineProps<{
  filter: CommentFilterData;
}>();

async function fetchComments(page: number | null) {
  try {
    const newCommentsData = await getComments(page, props.filter);
    if (newCommentsData.docs) {
      return newCommentsData;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

provide("loadMoreCallback", fetchComments);
defineExpose({
  refreshFeed: async (newPage) => await baseListRef.value?.refreshFeed(newPage),
});
</script>
<template>
  <ScrollableList ref="baseListRef">
    <template v-if="baseListRef && baseListRef.getItems().length > 0">
      <SingleComment
        v-for="(comment, index) in baseListRef.getItems()"
        :key="index"
        :comment="comment"
      />
    </template>
  </ScrollableList>
</template>
