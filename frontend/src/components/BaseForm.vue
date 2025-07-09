<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import FormMessage from "@/components/FormMessage.vue";
import { ref, defineProps, nextTick, reactive, watch } from "vue";
import { FormError } from "@/types/FormError.ts";
import { FormInput } from "@/types/FormInput.ts";

// Ref for FormMessage component
const messageRef = ref(null);
const inputRefs = ref(null);
const formData = reactive({});

const props = defineProps<{
  inputs: {
    type: FormInput[];
    required: true;
  };
}>();

const formInputs = ref<InputInstance[]>(props.inputs);

function setError(formError: FormError) {
  messageRef.value?.setMessages(formError.messages);
  if (formError.fields) {
    Object.values(formInputs.value).forEach((item, index) => {
      if (formError.fields.includes(item.name)) {
        highlightInput(index, "red");
      }
    });
  }
  setTimeout(() => {
    messageRef.value?.setMessages([]);
  }, 3000);
}

function highlightInput(index: number, color: string | null) {
  nextTick(() => {
    const inputContent = inputRefs.value[index];
    if (inputContent?.changeBorderColor && inputContent?.changeLabelColor) {
      inputContent.changeBorderColor(color);
      inputContent.changeLabelColor(color);
    } else {
      console.warn("Component or method not found");
    }
  });
}

function validate() {
  const validationErrors = [];
  const invalidFields = [];
  const inputNames = Object.keys(formInputs.value);
  inputRefs.value.forEach((item, index) => {
    const validationError = item.validate();
    if (validationError !== true) {
      validationErrors.push(validationError);
      invalidFields.push(inputNames[index]);
    }
  });
  if (validationErrors.length > 0) {
    const error = new FormError(validationErrors, invalidFields);
    setError(error);
    return false;
  }
  return true;
}

watch(
  () => formData.email,
  () => {
    Object.values(formInputs.value).forEach((item, index) => {
      if (item.name === "email") {
        inputRefs.value[index].setDefaultColor();
      }
    });
  },
);

watch(
  () => formData.password,
  () => {
    Object.values(formInputs.value).forEach((item, index) => {
      if (item.name === "password") {
        inputRefs.value[index].setDefaultColor();
      }
    });
  },
);

defineExpose({
  setError,
  formData,
  validate,
});
</script>
<template>
  <div
    class="form rounded-md bg-emerald-1 w-100 bg-white/10 backdrop-blur-md p-3 flex flex-col gap-5"
  >
    <FormMessage
      ref="messageRef"
      type="error"
    />
    <BaseInput
      v-for="[key, item] in Object.entries(formInputs)"
      :key="key"
      ref="inputRefs"
      v-model="formData[key]"
      :label="item.label"
      class="h-24"
      :validation="item.validation"
    />
    <slot />
  </div>
</template>
<style scoped>
.error-entry-from {
  opacity: 0;
}
.error-entry-active {
  transition: opacity 2s ease;
}
.error-leave-active {
  transition: opacity 2s ease-in;
}
.error-leave-to {
  opacity: 0;
}
</style>
