<script setup lang="ts">
import avatar from "@/assets/images/avatar-placeholder.png";

defineProps({
  post: {
    type: Object,
    default: null,
  },
});
</script>
<template>
  <div
    v-if="post"
    class="rounded-lg shadow-sm px-9 py-4 bg-light text-gray-800 glex flex-col items-center"
  >
    <div class="flex flex-row w-100 items-end gap-2 mb-4">
      <span
        class="rounded-full boder border-gray-800 h-16 w-16 overflow-hidden"
      >
        <img :src="post.author?.avatar ?? avatar">
      </span>
      <span class="text-base block font-bold mb-3">{{
        post.author.username
      }}</span>
    </div>
    <p class="text-2xl text-primary-violet mb-3 font-bold">
      {{ post.title }}
    </p>
    <span class="mb-2 block px-5">
      <img :src="post.imageUrl">
    </span>
    <span class="mb-3 text-sm">{{ post.description }}</span>
    <div class="flex flex-row justify-between">
      <span class="text-xs text-gray-500 block">{{ post.createdAt }}</span>
      <font-awesome-icon
        class="text-gray-500 hover:text-red-500 cursor-pointer text-xl"
        icon="heart"
      />
    </div>
  </div>
</template>
