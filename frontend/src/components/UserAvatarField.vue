<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  url: {
    type: String,
    default: "url",
  },
});
</script>
<template>
  <div class="user-avatar">
    <span
      class="rounded-full h-full w-full bg-gray-200 block border border-primary-violet"
    />
  </div>
</template>
