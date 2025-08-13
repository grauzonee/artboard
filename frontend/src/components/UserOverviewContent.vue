<script setup lang="ts">
import { ref, onMounted } from "vue";
import BarMenu from "@/components/BarMenu.vue";
import PostsList from "@/components/PostsList.vue";
import { PostFilter as PostFilterData } from "@/types/PostFilter.ts";
import { useRoute } from "vue-router";
import { getCurrentUserId } from "@/helpers/user.ts";

const postFilter = ref(null);

onMounted(async () => {
  const route = useRoute();
  let userId = route.params.id;
  if (userId === "mine") {
    userId = getCurrentUserId();
  }
  postFilter.value = new PostFilterData({
    sortByDesc: "createdAt",
    author: userId,
  });
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
      v-if="barMenuItems.posts.selected && postFilter"
      :post-filter="postFilter"
    />
  </div>
</template>
