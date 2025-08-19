<script setup lang="ts">
import ScrollableList from "@/components/ScrollableList.vue";
import SinglePost from "@/components/SinglePost.vue";
import { ref, provide } from "vue";
import type { PostFilterData } from "@/helpers/posts.ts";
import { getPosts } from "@/helpers/posts.ts";

const props = defineProps<{ filter: PostFilterData }>();
const baseListRef = ref(null);

async function fetchPosts(page: int | null) {
  try {
    const newPostsData = await getPosts(page, props.filter);
    if (newPostsData.docs && newPostsData.docs.length > 0) {
      return newPostsData;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

provide("loadMoreCallback", fetchPosts);
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
