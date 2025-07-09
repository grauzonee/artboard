<script setup lang="ts">
import { ref, onMounted } from "vue";

const emit = defineEmits(["clicked"]);
defineProps({
  label: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "bg-primary-violet",
  },
  textColor: {
    type: String,
    default: "text-white",
  },
});
const showBtn = ref(false);

onMounted(() => {
  showBtn.value = true;
});

function handleClick() {
  emit("clicked");
}
</script>
<template>
  <transition name="btn">
    <button
      v-if="showBtn"
      :class="[
        'w-full rounded-md py-3 font-poppins font-semibold',
        bgColor,
        textColor,
      ]"
      @click="handleClick"
    >
      {{ label }}
    </button>
  </transition>
</template>

<style scoped>
.btn-enter-from {
  opacity: 0;
}
.btn-enter-active {
  transition: opacity 2s ease-out;
}
</style>
