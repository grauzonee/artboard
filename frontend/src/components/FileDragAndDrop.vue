<script setup lang="ts">
import ContentPanel from "@/components/ContentPanel.vue";
import SelectFileInput from "@/components/SelectFileInput.vue";
import { ref } from "vue";
defineProps({
  name: {
    type: String,
    default: "drag-and-drop",
  },
});
const panelStyles = ref({
  "border-color": "var(--color-light-gray)",
  "border-width": "1px",
});

const selectFileRef = ref(null);

function resetPanelStyles() {
  panelStyles.value = {
    "border-color": "var(--color-light-gray)",
    "border-width": "1px",
  };
}
function onDragOver() {
  panelStyles.value = {
    "border-color": "var(--color-orange)",
    "border-width": "3px",
  };
}
function onDragLeave() {
  resetPanelStyles();
}
function onDrop(event) {
  selectFileRef?.value.setFileToUpload(event.dataTransfer.files[0]);
  resetPanelStyles();
}

async function uploadFile(): Promise<{ name: string; path: string } | null> {
  if (!selectFileRef.value?.uploadFile) return null;

  try {
    return await selectFileRef.value.uploadFile();
  } catch (error) {
    console.error("Single file upload failed:", error);
    return null;
  }
}

defineExpose({ uploadFile, validate: () => selectFileRef.value?.validate() });
</script>
<template>
  <transition name="dragAndDrop">
    <ContentPanel
      class="border-dashed p-8 text-center"
      :style="panelStyles"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
    >
      <p class="text-xl text-gray-600 mb-4">
        Drag & Drop files here or click to select
      </p>
      <p
        v-if="!selectFileRef?.getFileToUpload()"
        class="mb-4 text-gray-600"
      >
        No file selected
      </p>
      <p
        v-if="selectFileRef?.getFileToUpload()"
        class="mb-4 text-gray-600"
      >
        {{ selectFileRef?.getFileToUpload().name.slice(0, 5) }}... file selected
      </p>
      <SelectFileInput
        ref="selectFileRef"
        label="Select file..."
        :name="name"
      />
    </ContentPanel>
  </transition>
</template>
<style scoped>
.dragAndDrop-enter-active {
  transition: 2s ease;
}
</style>
