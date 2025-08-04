<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { ref, inject } from "vue";
import { uploadImage } from "@/helpers/media.ts";
import { FormError } from "@/types/FormError.ts";

const props = defineProps({
  name: {
    type: String,
    requied: true,
    default: "select-name",
  },
  label: {
    type: String,
    default: "Choose file...",
  },
  required: {
    type: Boolean,
    default: true,
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
  const newFile = event.target.files[0];
  const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const extension = newFile.name.split(".").pop().toLowerCase();
  if (!validExtensions.includes(extension)) {
    const formError = new FormError(["Invalid extension"]);
    setError?.(formError);
    return;
  }
  fileToUpload.value = newFile;
  emit("imageSelected");
}
function triggerFileSelect() {
  fileInputRef.value.click();
}

async function uploadFile() {
  if (!fileToUpload.value) {
    if (props.required) {
      const formError = new FormError(["No file selected"]);
      setError?.(formError);
    }
    return false;
  }
  try {
    const responseData = await uploadImage(fileToUpload.value);
    return { name: props.name, url: responseData.path };
  } catch (error) {
    console.log(error);
    return false;
  }
}

function validate() {
  if (!fileToUpload.value) {
    if (!props.required) {
      return true;
    }
    return "Please select a file";
  }
  const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const extension = fileToUpload.value.name.split(".").pop().toLowerCase();
  if (!validExtensions.includes(extension)) {
    return "Invalid extension";
  }
  return true;
}
defineExpose({
  uploadFile,
  getFileToUpload,
  setFileToUpload,
  validate,
});
</script>

<template>
  <div>
    <input
      ref="fileInputRef"
      class="hidden"
      type="file"
      @change="onFileChange"
    />
    <BaseButton :label="label" @click="triggerFileSelect" />
  </div>
</template>
