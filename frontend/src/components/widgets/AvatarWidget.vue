<script setup lang="ts">
import BaseWidget from "@/components/BaseWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import { ref } from "vue";

const widgetRef = ref(null);

defineExpose({
  widgetRef,
});
</script>

<template>
  <BaseWidget ref="widgetRef">
    <div class="w-full aspect-square bg-gray-400 rounded mb-4" />
    <BaseButton label="Change" />
  </BaseWidget>
</template>
