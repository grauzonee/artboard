<script setup lang="ts">
import { ref, onMounted } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { addComment } from "@/helpers/comments";

const props = defineProps<{ postId: string }>();
const emit = defineEmits(["commentAdded"]);
const showButtons = ref(false);

onMounted(() => {
  onInput();
});

const commentText = ref(null);

function onInput() {
  showButtons.value = commentText.value?.length > 0 ? true : false;
}

function onCancel() {
  commentText.value = "";
  onInput();
}

async function onSave() {
  const formData = {
    content: commentText.value,
    post: props.postId,
  };
  await addComment(formData);
  emit("commentAdded");
}
</script>
<template>
  <div class="w-full border-y pt-3 mb-3">
    <BaseInput
      v-model="commentText"
      input-type="textarea"
      placeholder="What do you think?"
      :border-width="0"
      @on-input="onInput"
    />
  </div>
  <div
    v-if="showButtons"
    class="flex flex-row justify-end gap-1 mb-3"
  >
    <div class="w-1/2 md:w-1/3 lg:w-1/6 shadow-lg">
      <BaseButton
        label="Save"
        class="text-xs"
        @clicked="onSave"
      />
    </div>
    <div class="w-1/2 md:w-1/3 lg:w-1/6 shadow-lg">
      <BaseButton
        label="Cancel"
        class="text-xs"
        bg-color="bg-white"
        text-color="text-primary-violet"
        @clicked="onCancel"
      />
    </div>
  </div>
</template>
