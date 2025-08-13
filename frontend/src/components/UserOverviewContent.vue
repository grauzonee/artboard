<script setup lang="ts">
import { ref } from "vue";
import BarMenu from "@/components/BarMenu.vue";
import PostsList from "@/components/PostsList.vue";

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
    <PostsList v-if="barMenuItems.posts.selected" />
  </div>
</template>
