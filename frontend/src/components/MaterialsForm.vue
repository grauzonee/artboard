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

async function getFormData() {
  try {
    const urls = await formRef.value?.getFiles();
    let imageFields = {};
    if (urls.length > 0) {
      urls.forEach((url) => {
        imageFields[url.name] = url.url;
      });
    }
    const formData = formRef.value?.formData;
    return { ...formData, ...imageFields, materials: materialsRef.value ?? [] };
  } catch (error) {
    console.log(error);
    formRef.value?.setError([error.message]);
    return;
  }
}

defineExpose({
  getFormData,
  setError: (error) => formRef.value?.setError(error),
  validate: () => formRef.value?.validate(),
});
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
