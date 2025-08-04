<script setup lang="ts">
import avatar from "@/assets/images/avatar-placeholder.png";
import SingleMaterial from "@/components/SingleMaterial.vue";

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
    class="rounded-lg shadow-sm px-9 py-4 bg-light text-gray-800 glex flex-col items-center cursor-pointer"
  >
    <div class="flex flex-row w-100 items-end gap-2 mb-4">
      <span
        class="rounded-full boder border-gray-800 h-16 w-16 overflow-hidden"
      >
        <img :src="post.author?.avatar ?? avatar" />
      </span>
      <span class="text-base block font-bold mb-3">{{
        post.author.username
      }}</span>
    </div>
    <p class="text-2xl text-primary-violet mb-3 font-bold">
      {{ post.title }}
    </p>
    <div
      class="max-h-64 w-full overflow-hidden flex items-center justify-center"
    >
      <img
        :src="post.imageUrl"
        class="w-full h-full object-cover object-center"
      />
    </div>
    <span class="mb-4 block text-sm">{{ post.content }}</span>
    <div class="flex flex-row justify-between">
      <div class="flex flex-row gap-2 items-center">
        <span class="text-xs text-gray-500 block">
          {{ post.createdAt }}
        </span>

        <SingleMaterial
          v-for="(material, index) in post.materials"
          :key="index"
          class="px-1 text-sm"
          :label="material"
        />
      </div>
      <font-awesome-icon
        class="text-gray-500 hover:text-red-500 cursor-pointer text-xl"
        icon="heart"
      />
    </div>
  </div>
</template>
