<script setup lang="ts">
import BaseWidget from "@/components/BaseWidget.vue";
import CommentsList from "@/components/CommentsList.vue";
import { ref } from "vue";

const widgetRef = ref(null);
defineProps({
  post: {
    type: Object,
    default: null,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});
defineExpose({
  toggleWidget: () => widgetRef.value?.toggleWidget(),
});
</script>
<template>
  <BaseWidget
    v-if="post"
    ref="widgetRef"
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
    <span class="mb-4 block text-sm">{{ post.content }}</span>
    <div class="flex flex-row justify-between">
      <div class="flex flex-row gap-2 items-center">
        <span class="text-xs text-gray-500 block">
          {{ post.createdAt }}
        </span>
      </div>
      <font-awesome-icon
        class="text-gray-500 hover:text-red-500 cursor-pointer text-xl"
        icon="heart"
      />
    </div>
    <CommentsList />
  </BaseWidget>
</template>
