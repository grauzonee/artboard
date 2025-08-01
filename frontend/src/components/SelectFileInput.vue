<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { ref, inject } from "vue";
import { uploadImage } from "@/helpers/media.ts";
defineProps({
  name: {
    type: String,
    requied: true,
    default: "select-name",
  },
  label: {
    type: String,
    default: "Choose file...",
  },
});
const emit = defineEmits(["imageSelected"]);
const fileInputRef = ref(null);
const fileToUpload = ref(null);
const setError = inject("setError");

function getFileToUpload() {
  return fileToUpload?.value;
}
function setFileToUpload(newValue) {
  fileToUpload.value = newValue;
}
function onFileChange(event) {
  fileToUpload.value = event.target.files[0];
  console.log(fileToUpload.value);
  emit("imageSelected");
}
function triggerFileSelect() {
  fileInputRef.value.click();
}

async function uploadFile() {
  if (!fileToUpload.value) {
    setError?.("Oops, no file selected");
    return false;
  }
  try {
    const responseData = await uploadImage(fileToUpload.value);
    return responseData.path;
  } catch (error) {
    console.log(error);
    return false;
  }
}
defineExpose({
  uploadFile,
  getFileToUpload,
  setFileToUpload,
});
</script>

<template>
  <div>
    <input
      ref="fileInputRef"
      class="hidden"
      type="file"
      @change="onFileChange"
    >
    <BaseButton
      :label="label"
      @click="triggerFileSelect"
    />
  </div>
</template>
