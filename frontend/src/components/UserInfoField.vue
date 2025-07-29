<script setup lang="ts">
import { defineProps, ref, inject } from "vue";
import BaseInput from "@/components/BaseInput.vue";

const emit = defineEmits(["toggleEdit", "submit"]);
const messageRef = inject("messageRef");
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    default: "text", // textarea | date
  },
  validation: {
    type: Object,
    default: null,
  },
});
const inputValue = ref(props.value);
const inputRef = ref(null);
const isEdit = ref(false);
function toggleEdit() {
  emit("toggleEdit");
  isEdit.value = !isEdit.value;
}

function turnEditOff() {
  inputValue.value = props.value;
  isEdit.value = false;
}

function submit() {
  if (props.validation) {
    const validationError = inputRef.value.validate();
    if (validationError !== true) {
      messageRef.value.setMessages([validationError]);
      setTimeout(() => {
        messageRef.value?.setMessages([]);
      }, 3000);
      return;
    }
  }
  emit("submit", props.name, inputValue.value);
}
defineExpose({ turnEditOff, toggleEdit, isEdit });
</script>
<template>
  <div class="user-info-field">
    <span class="text-gray-600 font-poppins font-semibold mb-1 block">{{
      label
    }}</span>
    <div
      v-if="!isEdit"
      class="flex flex-row justify-between items-center px-2"
    >
      <span>{{ value }}</span>
      <font-awesome-icon
        icon="pencil"
        class="h-2 pointer text-gray-500"
        @click="toggleEdit"
      />
    </div>
    <div
      v-if="isEdit"
      class="flex flex-row justify-between items-center px-2"
    >
      <BaseInput
        ref="inputRef"
        v-model="inputValue"
        :placeholder="value"
        border-width="1px"
        class="h-7 w-2/3"
        :input-type="inputType"
        :validation="validation"
      />
      <div class="w-1/6 flex flex-row justify-around items-center">
        <font-awesome-icon
          icon="circle-check"
          class="h-4 pointer text-emerald-500"
          @click="submit"
        />
        <font-awesome-icon
          icon="xmark"
          class="h-4 pointer text-red-500"
          @click="turnEditOff"
        />
      </div>
    </div>
  </div>
</template>
