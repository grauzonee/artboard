<script setup lang="ts">
import ContentPanel from "@/components/ContentPanel.vue";
import { ref, defineExpose } from "vue";

const show = ref(false);

function toggleWidget() {
  show.value = !show.value;
}

defineExpose({ toggleWidget });
</script>
<template>
  <div
    v-if="show"
    class="absolute top-0 left-0 right-0 bottom-0 bg-gray-700/60 flex justify-center py-10"
  >
    <ContentPanel class="h-50 w-1/2 p-3">
      <div class="w-fill text-right pointer">
        <font-awesome-icon
          icon="xmark"
          class="h-5 text-gray-500"
          @click="toggleWidget"
        />
      </div>
      <slot />
    </ContentPanel>
  </div>
</template>
