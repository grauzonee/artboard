<script setup lang="ts">
import BaseWidget from "@/components/BaseWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import { ref } from "vue";
import { inputs } from "@/components/inputs/ChangePassword.ts";

const widgetRef = ref(null);
const formRef = ref(null);

defineExpose({
  widgetRef,
});

function onFormSubmit() {
  if (formRef.value?.validate() === false) {
    return;
  }
}
</script>

<template>
  <BaseWidget ref="widgetRef">
    <BaseForm
      ref="formRef"
      :inputs="inputs"
    />
    <BaseButton
      label="Change password"
      @clicked="onFormSubmit"
    />
  </BaseWidget>
</template>
