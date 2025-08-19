<script setup lang="ts">
import ScrollableList from "@/components/ScrollableList.vue";
import SinglePost from "@/components/SinglePost.vue";
import { ref, provide } from "vue";
import { getLikedPosts } from "@/helpers/likes.ts";
import type { PostFilterData } from "@/helpers/posts.ts";

const props = defineProps<{ filter: PostFilterData }>();
const baseListRef = ref(null);
async function fetchLikes(page: number | null) {
  try {
    const newLikesData = await getLikedPosts(page, props.filter);
    if (newLikesData.docs && newLikesData.docs.length > 0) {
      return newLikesData;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

provide("loadMoreCallback", fetchLikes);
defineExpose({
  refreshFeed: async (newPage) => await baseListRef.value?.refreshFeed(newPage),
});
</script>
<template>
  <ScrollableList ref="baseListRef">
    <template v-if="baseListRef && baseListRef.getItems().length > 0">
      <SinglePost
        v-for="(post, index) in baseListRef.getItems()"
        :key="index"
        :post="post"
        @post-deleted="
          () => {
            baseListRef.refreshFeed();
          }
        "
        @post-updated="
          () => {
            baseListRef.refreshFeed();
          }
        "
      />
    </template>
    <div
      v-else
      class="flex-1"
    >
      <p>Loading...</p>
    </div>
  </ScrollableList>
</template>
