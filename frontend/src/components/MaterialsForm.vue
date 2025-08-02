<script setup lang="ts">
import BaseForm from "@/components/BaseForm.vue";
import MaterialsField from "@/components/MaterialsField.vue";
import { FormInput } from "@/types/FormInput.ts";
import { ref } from "vue";

const materialsRef = ref(null);
const formRef = ref(null);

defineProps<{
  inputs: {
    type: FormInput[];
    required: true;
  };
  inputsClasses: {
    type: string;
    default: "h-24";
  };
}>();

function onUpdateMaterials(newMaterials) {
  materialsRef.value = newMaterials;
}

function getFormData() {
  const formData = formRef.value?.formData;
  return { ...formData, materials: materialsRef.value };
}
defineExpose({ getFormData });
</script>

<template>
  <BaseForm
    ref="formRef"
    :inputs="inputs"
    :inputs-classes="inputsClasses"
  />
  <MaterialsField
    class="mb-3"
    :materials="materialsRef ?? []"
    @update-materials="onUpdateMaterials"
  />
</template>
