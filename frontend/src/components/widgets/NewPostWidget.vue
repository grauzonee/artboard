<script setup lang="ts">
import { ref } from "vue";
import BaseWidget from "@/components/BaseWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import MaterialsField from "@/components/MaterialsField.vue";
import BaseForm from "@/components/BaseForm.vue";
import { inputs } from "@/components/inputs/NewPost.ts";

const widgetRef = ref(null);
const materialsRef = ref([]);
function addPost() {}

function onUpdateMaterials(newMaterials) {
  materialsRef.value = newMaterials;
}
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
      <BaseForm
        :inputs="inputs"
        inputs-classes="h-20 border-primary-violet"
      />
      <MaterialsField
        class="mb-3"
        :materials="materialsRef ?? []"
        @update-materials="onUpdateMaterials"
      />
      <BaseButton
        label="Add"
        @click="addPost"
      />
    </div>
  </BaseWidget>
</template>
