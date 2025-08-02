<script setup lang="ts">
import { ref } from "vue";
import BaseWidget from "@/components/BaseWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import MaterialsForm from "@/components/MaterialsForm.vue";
import { inputs } from "@/components/inputs/NewPost.ts";

const widgetRef = ref(null);

function addPost() {}

defineExpose({
  widgetRef,
});
</script>
<template>
  <BaseWidget ref="widgetRef">
    <div class="flex flex-col px-8 gap-3">
      <p class="h3 color-gray-700 font-bold mb-3">
        New post
      </p>
      <MaterialsForm
        :inputs="inputs"
        inputs-classes="h-20"
      />
      <BaseButton
        label="Add"
        @click="addPost"
      />
    </div>
  </BaseWidget>
</template>
