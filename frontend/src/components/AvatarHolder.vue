<script setup lang="ts">
import avatar from "@/assets/images/avatar-placeholder.png";

defineProps({
  url: {
    type: String,
    default: null,
  },
});
</script>
<template>
  <div class="mx-auto aspect-square bg-gray-400 rounded mb-4 overflow-hidden">
    <img
      class="object-cover object-center h-full w-full rounded-sm"
      :src="url ?? avatar"
    />
  </div>
</template>
