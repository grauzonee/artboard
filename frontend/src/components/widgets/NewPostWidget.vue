<script setup lang="ts">
import { ref } from "vue";
import BaseWidget from "@/components/BaseWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import MaterialsForm from "@/components/MaterialsForm.vue";
import { inputs } from "@/components/inputs/NewPost.ts";
import { addPost } from "@/helpers/posts.ts";

const emit = defineEmits(["postAdded"]);
const widgetRef = ref(null);
const formRef = ref(null);

async function createPost() {
  try {
    if (formRef.value?.validate() === false) {
      return;
    }
    const formData = await formRef.value?.getFormData();
    console.log("formData", formData);
    await addPost(formData);
    emit("postAdded");
  } catch (error) {
    console.log(error);
  }
}

defineExpose({
  toggleWidget: () => widgetRef.value?.toggleWidget(),
});
</script>
<template>
  <BaseWidget ref="widgetRef">
    <div class="flex flex-col px-8 gap-3">
      <p class="h3 color-gray-700 font-bold mb-3">
        New post
      </p>
      <MaterialsForm
        ref="formRef"
        :inputs="inputs"
        inputs-classes="h-20"
      />
      <BaseButton
        label="Add"
        @click="createPost"
      />
    </div>
  </BaseWidget>
</template>
