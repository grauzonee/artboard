<script setup lang="ts">
defineEmits(["deleteMaterial"]);
defineProps({
  canDelete: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "material",
  },
});
</script>

<template>
  <span
    class="block rounded shaded-sm bg-primary-violet text-white font-bold relative"
  >
    <span
      v-if="canDelete"
      class="absolute top-0 right-0 h-3 w-3 bg-red-600 rounded-full border border-gray-500 flex items-center justify-center text-xs cursor-pointer z-20"
      @click="$emit('deleteMaterial')"
    >
      <font-awesome-icon
        icon="xmark"
        class="h-2 cursor-pointer"
      />
    </span>
    {{ label }}
  </span>
</template>
