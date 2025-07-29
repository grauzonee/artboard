<script setup lang="ts">
import { defineProps } from "vue";
import avatar from "@/assets/images/avatar-placeholder.png";

defineProps({
  url: {
    type: String,
    default: null,
  },
});
</script>
<template>
  <div class="user-avatar">
    <span
      class="rounded-full h-full w-full bg-gray-200 block border border-primary-violet overflow-hidden"
    >
      <img :src="url ?? avatar">
    </span>
  </div>
</template>
