<script setup lang="ts">
import ContentPanel from "@/components/ContentPanel.vue";
import UserAvatarField from "@/components/UserAvatarField.vue";

defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <ContentPanel
    v-if="comment"
    class="p-3 flex flex-col shadow shadow-md gap-3"
  >
    <div class="flex flex-row justify-start gap-3 items-center">
      <UserAvatarField
        class="h-10 w-10"
        :url="comment.author.imageUrl"
      />
      <p class="block font-bold">
        {{ comment.author.username }}
      </p>
    </div>
    <p class="h4">
      {{ comment.content }}
    </p>
    <p class="text-xs text-gray-500">
      {{ comment.createdAt }}
    </p>
  </ContentPanel>
</template>
