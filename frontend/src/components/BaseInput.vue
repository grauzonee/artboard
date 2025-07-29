<script setup lang="ts">
import { ref, onMounted, defineExpose, computed, defineModel } from "vue";
const modelValue = defineModel<string>();
const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  validation: {
    type: Object,
    default: null,
  },
  borderWidth: {
    type: String,
    default: "3px",
  },
  inputType: {
    type: String,
    default: "text",
  },
  bgColor: {
    type: String,
    default: "bg-inputs-bg",
  },
});

const showInput = ref(false);
const borderColor = ref("var(--color-inputs-border, brown)");
const labelColor = ref("black");

const inputStyles = computed(() => {
  return {
    border: `${props.borderWidth} ${borderColor.value} solid`,
    color: "var(--color-inputs-border, brown)",
  };
});

const labelStyles = computed(() => {
  return {
    color: labelColor.value,
  };
});

function setDefaultColor() {
  if (borderColor.value !== "var(--color-inputs-border, brown)") {
    borderColor.value = "var(--color-inputs-border, brown)";
  }
  if (labelColor.value !== "black") {
    labelColor.value = "black";
  }
}
function changeBorderColor(color?: string) {
  borderColor.value = color || "var(--color-inputs-border, brown)";
}

function changeLabelColor(color: string | null) {
  labelColor.value = color ?? "black";
}

function validate(): boolean | string {
  if (props.validation === null) {
    return true;
  }
  if (props.validation.minLength) {
    const minLength = props.validation.minLength.value;
    if (!modelValue.value || modelValue.value.length < minLength) {
      return props.validation.minLength.message;
    }
  }
  if (props.validation.regex) {
    const regex = new RegExp(props.validation.regex.value);
    if (!regex.test(modelValue.value)) {
      return props.validation.regex.message;
    }
  }
  return true;
}

defineExpose({
  setDefaultColor,
  changeBorderColor,
  changeLabelColor,
  validate,
});

onMounted(() => {
  showInput.value = true;
});
</script>
<template>
  <div class="flex flex-col gap-3">
    <label
      v-if="label"
      class="ml-3 font-poppins font-semibold text-black"
      :style="labelStyles"
      >{{ label }}</label
    >
    <transition name="input" v-if="inputType !== 'textarea'">
      <input
        v-if="showInput"
        v-model="modelValue"
        :class="['outline-none w-full h-full rounded-md px-5', bgColor]"
        :type="inputType"
        :placeholder="placeholder"
        :style="inputStyles"
        @input="onInput"
      />
    </transition>
    <transition name="textarea" v-if="inputType == 'textarea'">
      <textarea
        v-if="showInput && inputType == 'textarea'"
        v-model="modelValue"
        :class="['outline-none w-full h-full rounded-md px-5', bgColor]"
        :type="inputType"
        :placeholder="placeholder"
        :style="inputStyles"
        @input="onInput"
      ></textarea>
    </transition>
  </div>
</template>
<style scoped>
input {
  transition: border 0.3s ease-out;
}
label {
  transition: color 0.3s ease-out;
}
.input-enter-from {
  opacity: 0;
  margin-bottom: 20px;
}
.input-enter-to {
  opacity: 1;
  margin-bottom: 0px;
}
.input-enter-active {
  transition:
    opacity 2s ease,
    margin 0.3s ease-out;
}
</style>
