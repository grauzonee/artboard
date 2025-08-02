<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import SelectFileInput from "@/components/SelectFileInput.vue";
import FileDragAndDrop from "@/components/FileDragAndDrop.vue";
import FormMessage from "@/components/FormMessage.vue";
import { ref, defineProps, nextTick, reactive, watch, provide } from "vue";
import { FormError } from "@/types/FormError.ts";
import { FormInput } from "@/types/FormInput.ts";

// Ref for FormMessage component
const messageRef = ref(null);
const inputRefs = ref([]);
const formData = reactive({});

const props = defineProps<{
  inputs: {
    type: FormInput[];
    required: true;
  };
  inputsClasses: {
    type: string;
    default: "h-24";
  };
}>();

const emit = defineEmits(["imageSelected"]);

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

async function getFiles() {
  try {
    let fileUploadPromises = inputRefs.value
      .filter((ref) => ref?.uploadFile)
      .map((ref) => ref.uploadFile());

    const urls = await Promise.all(fileUploadPromises);
    return urls.filter((url) => url);
  } catch (error) {
    console.log(error);
  }
}

function onImageSelected(name) {
  emit("imageSelected", name);
}

provide(["setError"]);

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
  getFiles,
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
    <template
      v-for="[key, item] in Object.entries(formInputs)"
      :key="key"
    >
      <SelectFileInput
        v-if="item.type === 'file'"
        :ref="(el) => inputRefs.push(el)"
        :label="item.label"
        :name="item.name"
        @image-selected="onImageSelected(item.name)"
      />
      <FileDragAndDrop
        v-else-if="item.type === 'drop'"
        :ref="(el) => inputRefs.push(el)"
      />
      <BaseInput
        v-else
        :ref="(el) => inputRefs.push(el)"
        v-model="formData[key]"
        :label="item.label"
        :input-type="item.type ?? 'text'"
        :class="inputsClasses"
        :validation="item.validation"
      />
    </template>

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
