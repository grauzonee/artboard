<script setup lang="ts">
import { ref, onMounted } from "vue";
import BaseWidget from "@/components/BaseWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import MaterialsForm from "@/components/MaterialsForm.vue";
import { inputs } from "@/components/inputs/NewPost.ts";
import { addPost, updatePost } from "@/helpers/posts.ts";

const emit = defineEmits(["formSubmitted"]);
const widgetRef = ref(null);
const formRef = ref(null);
const props = defineProps({
  post: {
    type: Object,
    required: false,
    default: null,
  },
});
const editedPost = ref(props.post ? { ...props.post } : {});

onMounted(() => {
  if (props.post) {
    inputs.imageUrl.required = false;
  }
});

async function submitForm() {
  try {
    if (formRef.value?.validate() === false) {
      return;
    }
    const formData = await formRef.value?.getFormData();
    console.log("formData", formData);
    if (props.post) {
      await updatePost(props.post.id, formData);
    } else {
      await addPost(formData);
    }
    emit("formSubmitted");
    widgetRef.value?.toggleWidget();
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
        :inputs-data="editedPost ?? {}"
      />
      <BaseButton
        :label="post ? 'Save' : 'Add'"
        @click="submitForm"
      />
    </div>
  </BaseWidget>
</template>
