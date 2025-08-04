<script setup lang="ts">
import BaseWidget from "@/components/BaseWidget.vue";
import AvatarHolder from "@/components/AvatarHolder.vue";
import { ref } from "vue";

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
    <AvatarHolder :url="url" class="h-2/3 max-w-fullh-2/3 max-w-full" />
    <BaseForm
      ref="formRef"
      :inputs="inputs"
      @image-selected="onImageSelected"
    />
  </BaseWidget>
</template>
