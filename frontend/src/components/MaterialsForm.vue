<script setup lang="ts">
import BaseForm from "@/components/BaseForm.vue";
import MaterialsField from "@/components/MaterialsField.vue";
import { FormInput } from "@/types/FormInput.ts";
import { ref } from "vue";

const formRef = ref(null);

const props = defineProps({
  inputs: {
    type: Array<FormInput>,
    required: true,
  },
  inputsClasses: {
    type: String,
    default: "h-24",
  },
  inputsData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const materials = ref(props.inputsData?.materials ?? []);

function onUpdateMaterials(newMaterials) {
  materials.value = newMaterials;
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
    return { ...formData, ...imageFields, materials: materials.value ?? [] };
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
    :inputs-data="inputsData"
  />
  <MaterialsField
    class="mb-3"
    :materials="materials ?? []"
    @update-materials="onUpdateMaterials"
  />
</template>
