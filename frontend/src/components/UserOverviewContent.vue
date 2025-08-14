<script setup lang="ts">
import { ref, onMounted } from "vue";
import BarMenu from "@/components/BarMenu.vue";
import PostsList from "@/components/PostsList.vue";
import CommentsList from "@/components/CommentsList.vue";
import { useRoute } from "vue-router";
import { getCurrentUserId } from "@/helpers/user.ts";
import type { PostFilterData } from "@/helpers/user.ts";

const filters = ref<Array<PostFilterData>>({ posts: {}, comments: {} });

onMounted(async () => {
  const route = useRoute();
  let userId = route.params.id;
  if (userId === "mine") {
    userId = getCurrentUserId();
  }
  filters.value.posts = {
    sortByDesc: "createdAt",
    author: userId,
    limit: "10",
  };
  filters.value.comments = {
    sortByDesc: "createdAt",
    author: userId,
    limit: "10",
  };
});

const barMenuItems = ref({
  posts: { label: "Posts", selected: false },
  comments: { label: "Comments", selected: false },
  likes: { label: "Likes", selected: false },
});

function onBarMenuItemSelected(index) {
  Object.values(barMenuItems.value).forEach((item) => (item.selected = false));
  barMenuItems.value[index].selected = true;
}
</script>

<template>
  <div class="flex flex-col w-full">
    <BarMenu
      :items="barMenuItems"
      class="mb-5"
      @item-selected="onBarMenuItemSelected"
    />
    <PostsList
      v-if="barMenuItems.posts.selected && filters.posts"
      :filter="filters.posts"
    />
    <CommentsList
      v-if="barMenuItems.comments.selected && filters.comments"
      :filter="filters.comments"
    />
  </div>
</template>
