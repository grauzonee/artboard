<script setup lang="ts">
import Post from "@/components/Post.vue";
import { inject, onMounted } from "vue";

const setMainStyle = inject("setMainStyle");

onMounted(() => {
  setMainStyle?.({
    overflow: "hidden",
  });
});
</script>
<template>
  <div class="posts-page h-full">
    <div class="flex gap-5 h-[calc(100%-1rem)]">
      <div class="w-1/6 h-full p-4 bg-gray-100 text-black">Filters</div>
      <div class="w-2/3 h-full overflow-auto flex flex-col gap-5 no-scrollbar">
        <Post />
        <Post />
      </div>
      <div class="w-1/4 p-4 bg-gray-100 text-black overflow-hidden">
        My posts
      </div>
    </div>
  </div>
</template>
<style scoped></style>
