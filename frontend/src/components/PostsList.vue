<script setup lang="ts">
import ScrollableList from "@/components/ScrollableList.vue";
import SinglePost from "@/components/SinglePost.vue";
import { ref, onMounted, provide } from "vue";
import type { PostFilterData } from "@/helpers/posts.ts";
import { getPosts } from "@/helpers/posts.ts";
import { getCurrentUserId } from "@/helpers/user.ts";
import { useRoute } from "vue-router";

const props = defineProps<{ filter: PostFilterData }>();
const canEdit = ref(false);
const baseListRef = ref(null);

let userId = null;

onMounted(async () => {
  await setPosts();
});

async function setPosts() {
  const route = useRoute();
  userId = route.params.id;
  canEdit.value = getCurrentUserId() === userId;
  if (userId === "mine") {
    userId = getCurrentUserId();
    canEdit.value = true;
  }
  await fetchPosts(1);
}

async function fetchPosts(page: int | null) {
  try {
    const newPostsData = await getPosts(page, props.filter);
    if (newPostsData.docs && newPostsData.docs.length > 0) {
      posts.value = [...posts.value, ...newPostsData.docs];
      return newPostsData.hasNext;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function refreshFeed(page: number | null) {
  posts.value = [];
  if (page != null) baseListRef.value?.setPage(page);
  await fetchPosts(baseListRef.value?.getPage(), props.filter);
}

const posts = ref([]);
provide("loadMoreCallback", fetchPosts);
defineExpose({ refreshFeed });
</script>
<template>
  <ScrollableList ref="baseListRef">
    <template v-if="posts.length > 0">
      <SinglePost
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        :can-edit="canEdit"
        @post-deleted="refreshFeed"
        @post-updated="refreshFeed"
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
