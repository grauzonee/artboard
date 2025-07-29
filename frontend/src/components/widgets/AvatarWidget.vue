<script setup lang="ts">
import BaseWidget from "@/components/BaseWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import { ref } from "vue";
import avatar from "@/assets/images/avatar-placeholder.png";
import { uploadImage } from "@/helpers/media.ts";
const emit = defineEmits(["imageUpdated"]);
const widgetRef = ref(null);
const inputRef = ref(null);
defineProps({
  url: {
    type: String,
    default: null,
  },
});
function triggerInput() {
  inputRef.value.click();
}
async function handleFileChange(event) {
  try {
    const responseData = await uploadImage(event.target.files[0]);
    console.log(responseData);
    emit("imageUpdated", responseData.path);
  } catch (error) {
    console.log(error);
  }
}
defineExpose({
  widgetRef,
});
</script>

<template>
  <BaseWidget ref="widgetRef">
    <div class="w-full aspect-square bg-gray-400 rounded mb-4 overflow-hidden">
      <img
        class="w-full"
        :src="url ?? avatar"
      >
    </div>
    <input
      ref="inputRef"
      type="file"
      class="hidden"
      @change="handleFileChange"
    >
    <BaseButton
      label="Change"
      @click="triggerInput"
    />
  </BaseWidget>
</template>
