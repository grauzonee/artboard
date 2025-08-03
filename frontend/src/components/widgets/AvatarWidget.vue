<script setup lang="ts">
import BaseWidget from "@/components/BaseWidget.vue";
import { ref } from "vue";
import avatar from "@/assets/images/avatar-placeholder.png";
import BaseForm from "@/components/BaseForm.vue";

const emit = defineEmits(["imageUpdated"]);
const widgetRef = ref(null);
const formRef = ref(null);
const inputs = {
  avatar: {
    name: "avatar",
    type: "file",
    label: "Change",
  },
};

async function onImageSelected(name) {
  if (name === "avatar") {
    const urls = await formRef.value.getFiles();
    console.log(urls);
    if (!urls[0]) {
      formRef.value.setError(["We could not upload the image :("]);
      return;
    }
    emit("imageUpdated", urls[0]);
  }
}
defineProps({
  url: {
    type: String,
    default: null,
  },
});

defineExpose({
  widgetRef,
  toggleWidget: () => widgetRef.value?.toggleWidget(),
});
</script>

<template>
  <BaseWidget ref="widgetRef">
    <div
      class="h-2/3 max-w-full mx-auto aspect-square bg-gray-400 rounded mb-4 overflow-hidden"
    >
      <img
        class="object-cover object-center h-auto max-w-full rounded-sm"
        :src="url ?? avatar"
      >
    </div>
    <BaseForm
      ref="formRef"
      :inputs="inputs"
      @image-selected="onImageSelected"
    />
  </BaseWidget>
</template>
