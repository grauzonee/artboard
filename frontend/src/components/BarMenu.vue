<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";

const unselectedBgColor =
  "bg-lightGray hover:bg-primary-violet hover:text-white";

const selectedBgColor = "bg-primary-violet text-white";
defineProps({
  items: {
    type: Object,
    default: () => {},
  },
});
defineEmits(["itemSelected"]);
</script>
<template>
  <div class="w-full flex flex-row justify-between gap-4">
    <BaseButton
      v-for="[index, item] in Object.entries(items)"
      :key="index"
      :label="item.label"
      :bg-color="item.selected ? selectedBgColor : unselectedBgColor"
      text-color="text-primary-violet"
      @click="$emit('itemSelected', index)"
    />
  </div>
</template>
