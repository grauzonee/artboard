<script setup lang="ts">
import BaseWidget from "@/components/BaseWidget.vue";
import CommentsList from "@/components/CommentsList.vue";
import NewCommentForm from "@/components/NewCommentForm.vue";
import { ref, watch } from "vue";
import type { CommentFilterData } from "@/helpers/comments.ts";

const widgetRef = ref(null);
const commentsListRef = ref(null);
const props = defineProps({
  post: {
    type: Object,
    default: null,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});
const commentsFilter = ref<CommentFilterData | null>();
watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      commentsFilter.value = {
        limit: "10",
        sortByDesc: "createdAt",
        post: newPost.id,
      };
    } else {
      commentsFilter.value = null;
    }
  },
);

async function onCommentAdded() {
  await commentsListRef.value?.refreshFeed(1);
}

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
    <div class="comments-block px-4 mt-4">
      <NewCommentForm
        class="my-3"
        :post-id="post.id"
        @comment-added="onCommentAdded"
      />
      <CommentsList
        v-if="commentsFilter"
        ref="commentsListRef"
        class="max-h-64"
        :filter="commentsFilter"
      />
    </div>
  </BaseWidget>
</template>
